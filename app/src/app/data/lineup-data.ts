/**
 * 阵容数据
 */
export interface LineupCard {
  name: string;
  tier: number;
  attack: number;
  health: number;
  description: string;
  tags: string[];
  core: boolean; // 是否核心卡
}

export interface Lineup {
  id: string;
  name: string;
  nameEn: string;
  build: string; // 流派
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  winRate: number;
  pickRate: number;
  avgPlacement: number;
  description: string;
  difficulty: '简单' | '中等' | '困难';
  cards: LineupCard[];
  positioning: string[]; // 站位建议
  gamePlan: {
    early: string;
    mid: string;
    late: string;
  };
  counters: string[]; // 克制流派
  counteredBy: string[]; // 被克制
  tips: string[];
}

export const LINEUPS: Lineup[] = [
  {
    id: 'beast-jump',
    name: '野兽跳操流',
    nameEn: 'Beast Jump',
    build: '野兽',
    tier: 'T0',
    winRate: 58.2,
    pickRate: 22.5,
    avgPlacement: 3.1,
    description: '当前版本最热门流派，通过亡语频率实现无限成长',
    difficulty: '中等',
    cards: [
      {
        name: '普芬',
        tier: 6,
        attack: 6,
        health: 6,
        description: '战吼：发现一个野兽',
        tags: ['野兽', '战吼'],
        core: true
      },
      {
        name: '瑞文戴尔男爵',
        tier: 5,
        attack: 1,
        health: 1,
        description: '你的亡语触发两次',
        tags: ['亡语'],
        core: true
      },
      {
        name: '亡语长者',
        tier: 5,
        attack: 5,
        health: 5,
        description: '亡语：使你的其他亡语随从触发两次',
        tags: ['亡语'],
        core: true
      },
      {
        name: '跳操核心',
        tier: 4,
        attack: 4,
        health: 4,
        description: '亡语：随机使一个友方野兽获得 +2/+2',
        tags: ['野兽', '亡语'],
        core: true
      },
      {
        name: '狂战斧',
        tier: 5,
        attack: 5,
        health: 3,
        description: '攻击时，也对相邻的随从造成伤害',
        tags: ['武器'],
        core: true
      },
      {
        name: '熊妈妈',
        tier: 4,
        attack: 5,
        health: 5,
        description: '在你的回合结束时，使其他友方野兽获得 +1/+1',
        tags: ['野兽'],
        core: false
      }
    ],
    positioning: ['狂战斧放中间', '瑞文和长者分开站', '熊妈妈靠边'],
    gamePlan: {
      early: '找野兽过渡，优先身材 buff，不要 D 太多',
      mid: '找瑞文/长者，开始跳操，注意血量健康',
      late: '普芬 + 双狂战，身材无限成长，注意站位'
    },
    counters: ['快攻', '直伤'],
    counteredBy: ['剧毒', '沉默'],
    tips: [
      '瑞文是质变点，一定要找',
      '注意站位，狂战斧放中间',
      '血量健康很重要，不要无脑贪',
      '遇到剧毒流要小心'
    ]
  },
  {
    id: 'element-temperature',
    name: '元素温度流',
    nameEn: 'Element Temperature',
    build: '元素',
    tier: 'T0',
    winRate: 56.8,
    pickRate: 18.3,
    avgPlacement: 3.3,
    description: '通过冰火元素配合，实现直伤 + 身材双丰收',
    difficulty: '中等',
    cards: [
      {
        name: '拉格纳罗斯',
        tier: 6,
        attack: 8,
        health: 8,
        description: '元素获得 +2/+2 和突袭',
        tags: ['元素'],
        core: true
      },
      {
        name: '冰元素',
        tier: 5,
        attack: 5,
        health: 5,
        description: '战吼：冻结一个敌人。元素获得 +3/+3',
        tags: ['元素', '战吼'],
        core: true
      },
      {
        name: '火元素',
        tier: 4,
        attack: 4,
        health: 4,
        description: '元素获得 +1 攻击力',
        tags: ['元素'],
        core: true
      },
      {
        name: '元素使者',
        tier: 3,
        attack: 3,
        health: 3,
        description: '战吼：发现一个元素',
        tags: ['元素', '战吼'],
        core: false
      }
    ],
    positioning: ['冰火分开站', '拉格放中间'],
    gamePlan: {
      early: '找元素过渡，注意温度控制',
      mid: '找冰火 combo，控温在合适范围',
      late: '拉格纳罗斯 + 冰火，伤害爆炸'
    },
    counters: ['快攻', '直伤'],
    counteredBy: ['控制', '沉默'],
    tips: [
      '温度控制是关键',
      '冰火配合伤害最高',
      '注意对手流派，调整温度'
    ]
  },
  {
    id: 'demon-sellout',
    name: '恶魔卖血流',
    nameEn: 'Demon Sellout',
    build: '恶魔',
    tier: 'T1',
    winRate: 54.5,
    pickRate: 15.2,
    avgPlacement: 3.5,
    description: '通过卖血快速成长，玛尔加尼斯保命',
    difficulty: '困难',
    cards: [
      {
        name: '玛尔加尼斯',
        tier: 6,
        attack: 6,
        health: 6,
        description: '恶魔获得 +2/+2，你的英雄免疫',
        tags: ['恶魔'],
        core: true
      },
      {
        name: '主人',
        tier: 5,
        attack: 5,
        health: 5,
        description: '战吼：召唤两个 1/1 的小鬼',
        tags: ['恶魔', '战吼'],
        core: true
      },
      {
        name: '鞭笞者',
        tier: 4,
        attack: 4,
        health: 4,
        description: '战吼：对所有角色造成 2 点伤害',
        tags: ['恶魔', '战吼'],
        core: false
      }
    ],
    positioning: ['玛尔加尼斯放安全位置'],
    gamePlan: {
      early: '卖血找恶魔，注意血量',
      mid: '找主人 + 鞭笞者，快速成长',
      late: '玛尔加尼斯保命，无限成长'
    },
    counters: ['快攻', '直伤'],
    counteredBy: ['剧毒', '百分比伤害'],
    tips: [
      '血量控制很重要',
      '玛尔加尼斯是质变',
      '小心剧毒和直伤'
    ]
  }
];

// 按流派分类
export const getLineupsByBuild = (build: string) =>
  LINEUPS.filter(l => l.build === build);

// 按 tier 筛选
export const getLineupsByTier = (tier: string) =>
  LINEUPS.filter(l => l.tier === tier);

// 搜索阵容
export const searchLineups = (keyword: string) =>
  LINEUPS.filter(l =>
    l.name.includes(keyword) ||
    l.nameEn.toLowerCase().includes(keyword.toLowerCase()) ||
    l.build.includes(keyword)
  );
