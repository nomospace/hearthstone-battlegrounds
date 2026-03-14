#!/bin/bash
# 🦞 一键部署脚本 - Angular 项目 → Nginx
# 用法：./deploy.sh

set -e

PROJECT_NAME="hearthstone-battlegrounds"
DIST_DIR="app/dist/${PROJECT_NAME}/browser"
NGINX_ROOT="/var/www/${PROJECT_NAME}/browser"

echo "🦞 开始部署 ${PROJECT_NAME}..."

# 1. 检查构建产物是否存在
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

# 6. 验证部署
echo "✅ 验证部署..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80)
if [ "$HTTP_CODE" = "200" ]; then
    echo "🎉 部署成功！"
    echo "🌐 访问地址：http://localhost:80"
else
    echo "⚠️  部署完成但 HTTP 状态码异常：$HTTP_CODE"
    exit 1
fi
