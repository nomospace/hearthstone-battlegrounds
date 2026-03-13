#!/bin/bash
# deploy.sh - 酒馆战旗攻略部署脚本

set -e

MESSAGE=${1:-"🦞 deploy $(date +%Y-%m-%d_%H:%M)"}

cd "$(dirname "$0")"

echo "🚀 炉石传说酒馆战旗攻略 部署工具"
echo "=================================="
echo ""

echo "🔨 步骤 1/3: 构建静态文件..."
cd app
npm run build
cd ..

echo ""
echo "📝 步骤 2/3: 提交构建产物..."
git add -A
git commit -m "$MESSAGE" || echo "⚠️  没有需要提交的更改"

echo ""
echo "📤 步骤 3/3: 推送到 GitHub..."
for i in $(seq 1 5); do 
  echo "=== 尝试 $i/5 ==="
  if git push origin main 2>&1; then
    echo "✅ 推送成功!"
    break
  else
    echo "❌ 失败，等待 2 秒后重试..."
    sleep 2
  fi
done

echo ""
echo "=================================="
echo "✅ 部署完成！"
echo ""
echo "📱 访问地址："
echo "   https://nomospace.github.io/hearthstone-battlegrounds/"
echo ""
echo "📊 查看构建状态："
echo "   https://github.com/nomospace/hearthstone-battlegrounds/actions"
echo ""
