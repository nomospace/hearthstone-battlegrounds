# 🦞 酒馆战棋攻略 H5 - 部署说明

## ✅ 部署完成

**访问地址**: http://localhost:3000

**部署时间**: 2026-03-14

---

## 📝 Nginx 配置

配置文件位置：`/etc/nginx/conf.d/hearthstone-battlegrounds.conf`

```nginx
server {
    listen 3000;
    server_name _;
    root /var/www/hearthstone-battlegrounds/browser;
    index index.html;

    # Angular SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
```

---

## 🚀 部署步骤

### 1. 构建项目

```bash
cd /home/admin/.openclaw/workspace/hearthstone-battlegrounds/app
npm run build
```

构建产物位置：
```
/home/admin/.openclaw/workspace/hearthstone-battlegrounds/app/dist/hearthstone-battlegrounds/browser/
```

### 2. 执行部署脚本

```bash
cd /home/admin/.openclaw/workspace/hearthstone-battlegrounds
./deploy.sh
```

### 3. 验证部署

```bash
# 检查 HTTP 状态码
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# 查看页面内容
curl http://localhost:3000 | head -20
```

---

## 🔧 端口配置

### 当前配置
- **端口**: 3000
- **协议**: HTTP
- **路由**: Angular SPA (try_files)

### 如需修改端口

1. 编辑 Nginx 配置：
```bash
sudo vim /etc/nginx/conf.d/hearthstone-battlegrounds.conf
```

2. 修改 `listen` 端口：
```nginx
listen 3000;  # 改为其他端口，如 8080
```

3. 重载 Nginx：
```bash
sudo nginx -t && sudo nginx -s reload
```

---

## 🐛 常见问题

### Q: 页面 404？
**A**: 检查 Nginx 配置中的 `root` 路径是否正确

### Q: 刷新后 404？
**A**: 确保配置了 `try_files $uri $uri/ /index.html`

### Q: 端口被占用？
**A**: 修改配置文件中的端口号，然后重载 Nginx

### Q: 静态资源加载失败？
**A**: 检查文件权限和缓存配置

---

## 📊 访问统计

- **首页**: http://localhost:3000/home
- **英雄列表**: http://localhost:3000/heroes
- **比赛集锦**: http://localhost:3000/matches
- **每日推荐**: http://localhost:3000/daily

---

## 🔗 相关文档

- [项目 README](README.md)
- [部署指南](DEPLOY.md)
- [更新日志](CHANGELOG-2026-03-14.md)

---

_最后更新：2026-03-14 15:06_
