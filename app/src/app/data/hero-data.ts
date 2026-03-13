/**
 * 炉石传说酒馆战旗 - 英雄数据
 * 数据来源：HSReplay、Windburr、社区热度统计
 */

export interface Hero {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  winRate: number;      // 胜率
  pickRate: number;     // 选择率
  avgPlacement: number; // 平均排名
  difficulty: '简单' | '中等' | '困难';
  playstyle: string[];  // 打法风格
  bestBuilds: string[]; // 推荐流派
  description: string;
  tips: string[];       // 使用技巧
}

export const HEROES: Hero[] = [
  // ==================== T0 英雄 ====================
  {
    id: 'yshaarj',
    name: '亚煞极',
    nameEn: 'Y\'Shaarj',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/yshaarj.png',
    tier: 'T0',
    winRate: 58.5,
    pickRate: 15.2,
    avgPlacement: 3.2,
    difficulty: '中等',
    playstyle: ['经济运营', '节奏型'],
    bestBuilds: ['任意', '恶魔', '野兽'],
    description: '战吼额外触发一次，万能引擎，适配几乎所有流派',
    tips: [
      '优先找高价值战吼随从',
      '6 本后强度质变',
      '注意经济节奏，不要过度贪战吼'
    ]
  },
  {
    id: 'maiev',
    name: '玛维·影歌',
    nameEn: 'Maiev Shadowsong',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/maiev.png',
    tier: 'T0',
    winRate: 57.8,
    pickRate: 18.5,
    avgPlacement: 3.3,
    difficulty: '简单',
    playstyle: ['发现', '灵活'],
    bestBuilds: ['任意', '元素', '机械'],
    description: '发现并复制对手的随从，克制流+信息优势',
    tips: [
      '优先复制对手核心',
      '注意发现池质量',
      '后期可以找关键铜须'
    ]
  },
  {
    id: 'kaelthas',
    name: '凯尔萨斯·逐日者',
    nameEn: 'Kael\'thas Sunstrider',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/kael.png',
    tier: 'T0',
    winRate: 56.9,
    pickRate: 12.8,
    avgPlacement: 3.4,
    difficulty: '困难',
    playstyle: ['法术流', '运营'],
    bestBuilds: ['元素', '野兽', '杂耍'],
    description: '每回合第一个法术免费，法术流核心',
    tips: [
      '前期找低费法术过渡',
      '6 本后强度爆炸',
      '注意法术释放顺序'
    ]
  },

  // ==================== T1 英雄 ====================
  {
    id: 'dinoboard',
    name: '恐龙大师布莱恩',
    nameEn: 'Dinoboard',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/brian.png',
    tier: 'T1',
    winRate: 55.2,
    pickRate: 10.5,
    avgPlacement: 3.6,
    difficulty: '简单',
    playstyle: ['战吼', '经济'],
    bestBuilds: ['野兽', '元素', '任意'],
    description: '战吼触发两次，简化版亚煞极',
    tips: [
      '优先找战吼随从',
      '经济压力大时选这个',
      '配合铜须效果拔群'
    ]
  },
  {
    id: 'puffin',
    name: '普芬',
    nameEn: 'Puffin',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/puffin.png',
    tier: 'T1',
    winRate: 54.8,
    pickRate: 14.2,
    avgPlacement: 3.7,
    difficulty: '中等',
    playstyle: ['野兽', '身材'],
    bestBuilds: ['野兽', '恶魔'],
    description: '野兽流核心，养身材神器',
    tips: [
      '早点找野兽核心',
      '配合跳操组件',
      '注意血量健康'
    ]
  },
  {
    id: 'voljin',
    name: '沃金',
    nameEn: 'Vol\'jin',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/voljin.png',
    tier: 'T1',
    winRate: 54.5,
    pickRate: 9.8,
    avgPlacement: 3.8,
    difficulty: '中等',
    playstyle: ['交换', '控制'],
    bestBuilds: ['恶魔', '元素', '任意'],
    description: '交换生命值，以弱胜强',
    tips: [
      '前期用弱随换对手强随',
      '后期可以换关键 buff',
      '注意交换时机'
    ]
  },
  {
    id: 'sylvanas',
    name: '希尔瓦娜斯·风行者',
    nameEn: 'Sylvanas Windrunner',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/sylvanas.png',
    tier: 'T1',
    winRate: 54.2,
    pickRate: 11.3,
    avgPlacement: 3.9,
    difficulty: '简单',
    playstyle: ['亡语', '节奏'],
    bestBuilds: ['亡语', '野兽', '任意'],
    description: '亡语获得对手随从，克制流',
    tips: [
      '优先亡语频率',
      '后期找高价值亡语',
      '注意死亡顺序'
    ]
  },

  // ==================== T2 英雄 ====================
  {
    id: 'malygos',
    name: '玛里苟斯',
    nameEn: 'Malygos',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/malygos.png',
    tier: 'T2',
    winRate: 52.5,
    pickRate: 8.2,
    avgPlacement: 4.1,
    difficulty: '中等',
    playstyle: ['法术', '爆发'],
    bestBuilds: ['元素', '杂耍'],
    description: '法术伤害 +2，法术流组件',
    tips: [
      '配合低费法术刷',
      '注意生存',
      '后期找关键法术'
    ]
  },
  {
    id: 'ragnaros',
    name: '拉格纳罗斯',
    nameEn: 'Ragnaros',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/ragnaros.png',
    tier: 'T2',
    winRate: 52.1,
    pickRate: 7.5,
    avgPlacement: 4.2,
    difficulty: '简单',
    playstyle: ['元素', '直伤'],
    bestBuilds: ['元素', '火元素'],
    description: '元素流核心，直伤拉满',
    tips: [
      '早点找元素',
      '注意温度机制',
      '配合冰元素'
    ]
  },
  {
    id: 'deathwing',
    name: '死亡之翼',
    nameEn: 'Deathwing',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/deathwing.png',
    tier: 'T2',
    winRate: 51.8,
    pickRate: 6.8,
    avgPlacement: 4.3,
    difficulty: '困难',
    playstyle: ['龙族', '后期'],
    bestBuilds: ['龙族', '恶魔'],
    description: '龙族核心，后期大核',
    tips: [
      '前期苟活',
      '6 本发力',
      '找关键龙族 buff'
    ]
  },

  // ==================== T3 英雄 ====================
  {
    id: 'millhouse',
    name: '米尔豪斯',
    nameEn: 'Millhouse',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/millhouse.png',
    tier: 'T3',
    winRate: 49.5,
    pickRate: 5.2,
    avgPlacement: 4.8,
    difficulty: '困难',
    playstyle: ['经济', '赌博'],
    bestBuilds: ['任意'],
    description: '买随从便宜，卖随从亏钱',
    tips: [
      '前期优势',
      '注意经济节奏',
      '后期乏力'
    ]
  },
  {
    id: 'patchwerk',
    name: '帕奇维克',
    nameEn: 'Patchwerk',
    avatar: 'https://static.wikia.nocookie.net/hearthstone/images/patchwerk.png',
    tier: 'T3',
    winRate: 48.8,
    pickRate: 4.5,
    avgPlacement: 5.0,
    difficulty: '简单',
    playstyle: ['血量', '苟活'],
    bestBuilds: ['任意'],
    description: '40 血开局，容错率高',
    tips: [
      '适合新手',
      '不要无脑贪',
      '后期需要找核心'
    ]
  }
];

// 按胜率排序
export const HEROES_BY_WINRATE = [...HEROES].sort((a, b) => b.winRate - a.winRate);

// 按选择率排序
export const HEROES_BY_PICKRATE = [...HEROES].sort((a, b) => b.pickRate - a.pickRate);

// 按难度筛选
export const getHeroesByDifficulty = (difficulty: string) => 
  HEROES.filter(h => h.difficulty === difficulty);

// 按流派筛选
export const getHeroesByBuild = (build: string) => 
  HEROES.filter(h => h.bestBuilds.includes(build) || h.bestBuilds.includes('任意'));

// 按 tier 筛选
export const getHeroesByTier = (tier: string) => 
  HEROES.filter(h => h.tier === tier);
