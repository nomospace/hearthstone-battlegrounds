#!/bin/bash
# 🦞 一键部署和更新脚本
# 用法：./scripts/deploy-and-update.sh

set -e

PROJECT_NAME="hearthstone-battlegrounds"
DIST_DIR="app/dist/${PROJECT_NAME}/browser"
NGINX_ROOT="/var/www/${PROJECT_NAME}/browser"

echo "🦞 开始部署 ${PROJECT_NAME}..."
echo "================================"

# 1. 检查构建产物是否存在
echo "📦 检查构建产物..."
if [ ! -d "$DIST_DIR" ]; then
    echo "❌ 构建产物不存在：$DIST_DIR"
    echo "💡 请先运行：cd app && npm run build"
    exit 1
fi

# 2. 清理旧文件
echo "🧹 清理旧部署..."
sudo rm -rf ${NGINX_ROOT}/*

# 3. 同步新文件
echo "📦 同步构建产物..."
sudo cp -r ${DIST_DIR}/* ${NGINX_ROOT}/

# 4. 设置权限
echo "🔐 设置权限..."
sudo chown -R nginx:nginx ${NGINX_ROOT}
sudo chmod -R 755 ${NGINX_ROOT}

# 5. 重载 Nginx
echo "🔄 重载 Nginx..."
sudo nginx -t && sudo nginx -s reload

# 6. 注入部署时间戳
echo "🕐 注入部署时间戳..."
DEPLOY_TIME=$(date '+%Y-%m-%d %H:%M:%S %Z')
if [ -f "${NGINX_ROOT}/index.html" ]; then
    sudo sed -i "s|</body>|<div style=\"position:fixed;bottom:5px;right:10px;font-size:11px;opacity:0.5;z-index:9999;\">🦞 部署时间：${DEPLOY_TIME}</div></body>|g" ${NGINX_ROOT}/index.html
    sudo sed -i "s|</html>|<!-- 🦞 部署时间：${DEPLOY_TIME} --></html>|g" ${NGINX_ROOT}/index.html
    echo "   部署时间：${DEPLOY_TIME}"
fi

# 7. 验证部署
echo "✅ 验证部署..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80)
if [ "$HTTP_CODE" = "200" ]; then
    echo "🎉 部署成功！"
    echo "🌐 访问地址：http://localhost:80"
    echo ""
    echo "📊 页面列表："
    echo "   - 首页：http://localhost:80/home"
    echo "   - 英雄大全：http://localhost:80/heroes"
    echo "   - 英雄计数器：http://localhost:80/counter"
else
    echo "⚠️  部署完成但 HTTP 状态码异常：$HTTP_CODE"
    exit 1
fi
