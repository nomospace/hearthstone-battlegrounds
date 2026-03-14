# 🦞 部署指南

## 快速部署

```bash
# 1. 构建
cd app && npm run build

# 2. 部署（项目根目录）
cd ..
./deploy.sh
```

## 自动化流程

```bash
# 一键构建 + 部署
cd app && npm run build && cd .. && ./deploy.sh
```

## 脚本说明

`deploy.sh` 自动完成：
1. ✅ 检查构建产物是否存在
2. ✅ 清理 Nginx 旧文件
3. ✅ 同步新构建产物
4. ✅ 设置正确的文件权限
5. ✅ 重载 Nginx 服务
6. ✅ 验证 HTTP 状态码

## 手动部署（备选）

如果脚本不可用，手动执行：

```bash
# 同步文件
sudo cp -r app/dist/hearthstone-battlegrounds/browser/* /var/www/hearthstone-battlegrounds/browser/

# 设置权限
sudo chown -R nginx:nginx /var/www/hearthstone-battlegrounds/browser
sudo chmod -R 755 /var/www/hearthstone-battlegrounds/browser

# 重载 Nginx
sudo nginx -s reload
```

## 访问地址

- 本地：http://localhost
- 公网：http://<服务器 IP>

## 故障排查

```bash
# 检查 Nginx 状态
sudo systemctl status nginx

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 测试配置
sudo nginx -t

# 验证服务
curl -I http://localhost
```
