# 炉石传说酒馆战棋数据来源

## 官方数据源

### 1. HearthstoneJSON (主要数据源)
- **网址**: https://art.hearthstonejson.com
- **内容**: 卡牌图片、英雄头像、技能图标
- **API**: 无需 API Key，直接访问 CDN
- **格式**: `https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/{CARD_ID}.png`

### 2. 炉石传说官方 API
- **网址**: https://hearthstone.blzdev.ru
- **内容**: 卡牌数据、英雄信息
- **需要**: API Key

### 3. Hearthstone Wiki (Fandom)
- **网址**: https://hearthstone.fandom.com
- **内容**: 英雄技能、攻略、统计数据

### 4. HSReplay (统计数据)
- **网址**: https://hsreplay.net/battlegrounds/
- **内容**: 英雄胜率、选择率、前四率
- **需要**: 爬虫或 API

## 当前数据存储位置

```
app/src/app/data/
├── hero-data.ts          # 英雄数据（手动维护）
└── hero-data.spec.ts     # 测试文件
```

## 数据更新流程

### 手动更新（当前方式）
1. 访问 HSReplay 查看最新统计数据
2. 访问 HearthstoneJSON 获取卡牌 ID
3. 编辑 `hero-data.ts` 更新数据
4. 运行测试验证
5. 构建部署

### 自动化更新（未来计划）
1. 创建数据同步脚本
2. 定时从 HSReplay 爬虫
3. 自动更新 `hero-data.ts`
4. 触发 CI/CD 部署

## 最新英雄列表（版本 27.6.2）

共 12 位英雄，数据最后更新：2026-03-14

### T0 英雄 (3 位)
- 亚煞极
- 玛维·影歌
- 凯尔萨斯·逐日者

### T1 英雄 (4 位)
- 恐龙大师布莱恩
- 普芬
- 沃金
- 希尔瓦娜斯·风行者

### T2 英雄 (3 位)
- 玛里苟斯
- 拉格纳罗斯
- 死亡之翼

### T3 英雄 (2 位)
- 米尔豪斯
- 帕奇维克

## 数据字段说明

```typescript
interface Hero {
  id: string;           // 英雄 ID（英文小写）
  name: string;         // 中文名称
  nameEn: string;       // 英文名称
  avatar: string;       // 头像 URL
  tier: 'T0'|'T1'|'T2'|'T3';  // 强度分级
  winRate: number;      // 胜率 (%)
  pickRate: number;     // 选择率 (%)
  avgPlacement: number; // 平均名次
  gamesPlayed: number;  // 对局数
  top4Rate: number;     // 前四率 (%)
  difficulty: '简单'|'中等'|'困难';
  playstyle: string[];  // 打法风格
  bestBuilds: string[]; // 推荐流派
  description: string;  // 简介
  tips: string[];       // 使用技巧
  powerSpikes: string[]; // 强势期（如 "4 本"）
  counters: string[];   // 克制的英雄
  counteredBy: string[]; // 被克制的英雄
  ability: HeroAbility; // 技能信息
  synergies: HeroCard[]; // 推荐配合卡牌
}
```

## 数据验证清单

- [ ] 所有英雄头像链接可访问
- [ ] 技能图标链接可访问
- [ ] 配合卡牌图片链接可访问
- [ ] 胜率数据与 HSReplay 一致
- [ ] 克制关系正确
- [ ] 强势期标注准确
