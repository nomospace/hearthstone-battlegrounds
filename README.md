# 🔥 炉石传说酒馆战旗攻略 H5

炉石传说酒馆战旗攻略应用 - 最全面的英雄/流派/打法指南

## 🌐 在线访问

https://nomospace.github.io/hearthstone-battlegrounds/

## ✨ 功能特性

### 🏆 英雄大全
- **强度分级**：T0-T3，清晰明了
- **多维筛选**：按强度、难度、胜率、选择率
- **详细数据**：胜率、选择率、平均排名
- **使用技巧**：每个英雄的核心打法

### ⚔️ 流派攻略
- **主流流派**：野兽/元素/恶魔/机械/龙族/亡语
- **核心卡牌**：T0-T6 关键卡牌推荐
- **运营思路**：前期/中期/后期打法
- **克制关系**：天敌和配合流派

### 📱 响应式设计
- 完美适配手机/平板/电脑
- H5 版本，即开即用
- 离线可用（PWA 支持）

## 🚀 本地开发

```bash
cd app
npm install
npm start
```

访问：http://localhost:4200

## 📦 构建部署

```bash
# 构建
npm run build

# 部署到 GitHub Pages
./deploy.sh
```

## 📊 数据来源

- HSReplay 胜率统计
- Windburr 社区热度
- 职业选手打法总结

## 📁 项目结构

```
hearthstone-battlegrounds/
├── app/                      # Angular 应用
│   ├── src/
│   │   ├── app/
│   │   │   ├── data/        # 英雄/流派数据
│   │   │   ├── pages/       # 页面组件
│   │   │   └── app.component.ts
│   │   └── index.html
│   └── package.json
├── .github/workflows/        # CI/CD
└── deploy.sh                 # 部署脚本
```

## 🦞 技术栈

- **前端**：Angular 17
- **样式**：SCSS + 响应式
- **部署**：GitHub Pages
- **构建**：Angular CLI

## 📝 更新日志

- v1.0.0 - 初始版本
  - 10+ 热门英雄数据
  - 8 个主流流派攻略
  - 多维度筛选功能

## 🙏 致谢

感谢所有分享攻略的社区玩家！

---

**Made with ❤️ by 金大虾**
