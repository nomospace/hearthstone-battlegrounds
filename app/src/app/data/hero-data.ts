/**
 * 炉石传说酒馆战旗 - 英雄数据
 * 图片来源：HearthstoneJSON (https://art.hearthstonejson.com)
 * 备用 CDN: https://d15f34w2p8l1cc.cloudfront.net/hearthstone/
 */

export interface HeroAbility {
  name: string;
  nameEn: string;
  description: string;
  cost: number;
  icon: string;
}

export interface HeroCard {
  name: string;
  tier: number;
  cost: number;
  attack: number;
  health: number;
  description: string;
  imageUrl?: string;
  tags: string[];
}

export interface Hero {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  winRate: number;
  pickRate: number;
  avgPlacement: number;
  difficulty: '简单' | '中等' | '困难';
  playstyle: string[];
  bestBuilds: string[];
  description: string;
  tips: string[];
  ability: HeroAbility;
  synergies: HeroCard[];
  // 新增：对局数据
  gamesPlayed?: number;     // 对局数
  top4Rate?: number;        // 前四率
  // 新增：克制关系
  counters?: string[];      // 克制哪些英雄
  counteredBy?: string[];   // 被哪些英雄克制
  // 新增：强势期
  powerSpikes?: string[];   // 如 "3 本", "5 本", "6 本"
}

// 炉石传说卡牌 ID 映射（使用标准卡牌 ID，非酒馆战旗专属）
// 来源：HearthstoneJSON - https://art.hearthstonejson.com
const CARD_IDS: Record<string, string> = {
  // 英雄头像
  'yshaarj': 'TRL_541',     // 亚煞极 - 酒馆战旗英雄卡
  'maiev': 'BT_187',        // 玛维·影歌
  'kaelthas': 'BT_006',     // 凯尔萨斯
  'dinoboard': 'TRL_092',   // 恐龙大师布莱恩
  'puffin': 'BT_323',       // 普芬
  'voljin': 'OG_134',       // 沃金
  'sylvanas': 'EX1_016',    // 希尔瓦娜斯
  'malygos': 'EX1_563',     // 玛里苟斯
  'ragnaros': 'EX1_298',    // 拉格纳罗斯
  'deathwing': 'NEW1_030',  // 死亡之翼
  'millhouse': 'EX1_029',   // 米尔豪斯
  'patchwerk': 'FP1_014',   // 帕奇维克
  
  // 技能图标（使用英雄技能卡牌）
  'yshaarj_skill': 'TRL_541',
  'maiev_skill': 'BT_187',
  'kaelthas_skill': 'BT_006',
  'dinoboard_skill': 'TRL_092t',
  'puffin_skill': 'BT_323',
  'voljin_skill': 'OG_134',
  'sylvanas_skill': 'EX1_016',
  'malygos_skill': 'EX1_563',
  'ragnaros_skill': 'EX1_298',
  'deathwing_skill': 'NEW1_030',
  'millhouse_skill': 'EX1_029',
  'patchwerk_skill': 'FP1_014'
};

// CDN 配置 - 主备切换
const CDN_PRIMARY = 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x';
const CDN_FALLBACK = 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone';

// 生成英雄头像 URL（主备双 CDN）
const getHeroAvatar = (heroId: string) => {
  const cardId = CARD_IDS[heroId] || 'CS2_222';
  return `${CDN_PRIMARY}/${cardId}.png`;
};

// 生成技能图标 URL
const getAbilityIcon = (heroId: string) => {
  const skillId = CARD_IDS[`${heroId}_skill`] || 'CS2_222';
  return `${CDN_PRIMARY}/${skillId}.png`;
};

// 生成卡牌图片 URL
const getCardImage = (cardId: string) => {
  return `${CDN_PRIMARY}/${cardId}.png`;
};

export const HEROES: Hero[] = [
  // ==================== T0 英雄 ====================
  {
    id: 'yshaarj',
    name: '亚煞极',
    nameEn: 'Y\'Shaarj',
    avatar: getHeroAvatar('yshaarj'),
    tier: 'T0',
    winRate: 58.5,
    pickRate: 15.2,
    avgPlacement: 3.2,
    gamesPlayed: 15280,
    top4Rate: 62.3,
    difficulty: '中等',
    playstyle: ['经济运营', '节奏型'],
    bestBuilds: ['任意', '恶魔', '野兽'],
    description: '战吼额外触发一次，万能引擎，适配几乎所有流派',
    tips: ['优先找高价值战吼随从', '6 本后强度质变', '注意经济节奏'],
    powerSpikes: ['4 本', '6 本'],
    counters: ['米尔豪斯', '帕奇维克'],
    counteredBy: ['玛维·影歌'],
    ability: {
      name: '亚煞极之触',
      nameEn: 'Touch of Y\'Shaarj',
      description: '使一个友方随从获得战吼触发两次',
      cost: 3,
      icon: getAbilityIcon('yshaarj')
    },
    synergies: [
      {
        name: '布莱恩·铜须',
        tier: 6,
        cost: 5,
        attack: 2,
        health: 4,
        description: '你的战吼触发两次',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/LOE_079.png',
        tags: ['野兽', '战吼']
      },
      {
        name: '普芬',
        tier: 6,
        cost: 5,
        attack: 6,
        health: 6,
        description: '战吼：发现一个野兽',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/BT_323.png',
        tags: ['野兽', '战吼']
      },
      {
        name: '瑞文戴尔男爵',
        tier: 6,
        cost: 5,
        attack: 4,
        health: 5,
        description: '你的亡语触发额外一次',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/FP1_031.png',
        tags: ['亡语', '增益']
      },
      {
        name: '跳蛙骑士',
        tier: 5,
        cost: 4,
        attack: 4,
        health: 3,
        description: '亡语：使一个友方野兽获得 +2/+2',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/BT_715.png',
        tags: ['野兽', '亡语']
      }
    ]
  },
  {
    id: 'maiev',
    name: '玛维·影歌',
    nameEn: 'Maiev Shadowsong',
    avatar: getHeroAvatar('maiev'),
    tier: 'T0',
    winRate: 57.8,
    pickRate: 18.5,
    avgPlacement: 3.3,
    difficulty: '简单',
    playstyle: ['发现', '灵活'],
    bestBuilds: ['任意', '元素', '机械'],
    description: '发现并复制对手的随从，克制流 + 信息优势',
    tips: ['优先复制对手核心', '注意发现池质量', '后期可以找关键铜须'],
    ability: {
      name: '禁锢',
      nameEn: 'Imprison',
      description: '发现一个对手的随从，获得它的复制',
      cost: 3,
      icon: getAbilityIcon('maiev')
    },
    synergies: [
      {
        name: '奥术火炮',
        tier: 4,
        cost: 4,
        attack: 3,
        health: 3,
        description: '在你发现一个随从后，获得 +2/+2',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/TB_BaconShop_81.png',
        tags: ['发现', '元素']
      },
      {
        name: '布莱恩·铜须',
        tier: 6,
        cost: 5,
        attack: 2,
        health: 4,
        description: '你的战吼触发两次',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/LOE_079.png',
        tags: ['野兽', '战吼']
      },
      {
        name: '时间管理者诺兹',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '战吼：将你的技能刷新至可购买随从的数量',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/TB_BaconShop_100.png',
        tags: ['龙', '战吼']
      }
    ]
  },
  {
    id: 'kaelthas',
    name: '凯尔萨斯·逐日者',
    nameEn: 'Kael\'thas Sunstrider',
    avatar: getHeroAvatar('kaelthas'),
    tier: 'T0',
    winRate: 56.9,
    pickRate: 12.8,
    avgPlacement: 3.4,
    difficulty: '困难',
    playstyle: ['法术流', '运营'],
    bestBuilds: ['元素', '野兽', '杂耍'],
    description: '每回合第一个法术免费，法术流核心',
    tips: ['前期找低费法术过渡', '6 本后强度爆炸', '注意法术释放顺序'],
    ability: {
      name: '火球术',
      nameEn: 'Fireball',
      description: '每回合第一个法术法力值消耗为 (0) 点',
      cost: 0,
      icon: getAbilityIcon('kaelthas')
    },
    synergies: [
      {
        name: '管理者埃克索图斯',
        tier: 6,
        cost: 5,
        attack: 5,
        health: 5,
        description: '在你施放一个法术后，随机使你牌库中的一张随从牌获得 +2/+2',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/TB_BaconShop_107.png',
        tags: ['元素', '法术']
      },
      {
        name: '时间管理者诺兹',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '战吼：将你的技能刷新至可购买随从的数量',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/TB_BaconShop_100.png',
        tags: ['龙', '战吼']
      },
      {
        name: '布莱恩·铜须',
        tier: 6,
        cost: 5,
        attack: 2,
        health: 4,
        description: '你的战吼触发两次',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/LOE_079.png',
        tags: ['野兽', '战吼']
      }
    ]
  },
  // ==================== T1 英雄 ====================
  {
    id: 'dinoboard',
    name: '恐龙大师布莱恩',
    nameEn: 'Dinoboard',
    avatar: getHeroAvatar('dinoboard'),
    tier: 'T1',
    winRate: 55.2,
    pickRate: 10.5,
    avgPlacement: 3.6,
    difficulty: '简单',
    playstyle: ['战吼', '经济'],
    bestBuilds: ['野兽', '元素', '任意'],
    description: '战吼触发两次，简化版亚煞极',
    tips: ['优先找战吼随从', '经济压力大时选这个', '配合铜须效果拔群'],
    ability: {
      name: '战吼大师',
      nameEn: 'Battlecry Master',
      description: '你的战吼触发两次',
      cost: 0,
      icon: getAbilityIcon('dinoboard')
    },
    synergies: [
      {
        name: '战吼核心',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '战吼：抽一张牌',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/LOE_079.png',
        tags: ['战吼']
      }
    ]
  },
  {
    id: 'puffin',
    name: '普芬',
    nameEn: 'Puffin',
    avatar: getHeroAvatar('puffin'),
    tier: 'T1',
    winRate: 54.8,
    pickRate: 14.2,
    avgPlacement: 3.7,
    difficulty: '中等',
    playstyle: ['野兽', '身材'],
    bestBuilds: ['野兽', '恶魔'],
    description: '野兽流核心，养身材神器',
    tips: ['早点找野兽核心', '配合跳操组件', '注意血量健康'],
    ability: {
      name: '野兽召唤',
      nameEn: 'Beast Call',
      description: '战吼：发现一个野兽',
      cost: 3,
      icon: getAbilityIcon('puffin')
    },
    synergies: [
      {
        name: '野兽核心',
        tier: 6,
        cost: 6,
        attack: 6,
        health: 6,
        description: '野兽获得 +2/+2',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/BT_323.png',
        tags: ['野兽']
      }
    ]
  },
  {
    id: 'voljin',
    name: '沃金',
    nameEn: 'Vol\'jin',
    avatar: getHeroAvatar('voljin'),
    tier: 'T1',
    winRate: 54.5,
    pickRate: 9.8,
    avgPlacement: 3.8,
    difficulty: '中等',
    playstyle: ['交换', '控制'],
    bestBuilds: ['恶魔', '元素', '任意'],
    description: '交换生命值，以弱胜强',
    tips: ['前期用弱随换对手强随', '后期可以换关键 buff', '注意交换时机'],
    ability: {
      name: '灵魂交换',
      nameEn: 'Soul Swap',
      description: '交换两个随从的生命值',
      cost: 2,
      icon: getAbilityIcon('voljin')
    },
    synergies: [
      {
        name: '交换核心',
        tier: 4,
        cost: 4,
        attack: 4,
        health: 4,
        description: '战吼：交换属性',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/OG_134.png',
        tags: ['交换']
      }
    ]
  },
  {
    id: 'sylvanas',
    name: '希尔瓦娜斯·风行者',
    nameEn: 'Sylvanas Windrunner',
    avatar: getHeroAvatar('sylvanas'),
    tier: 'T1',
    winRate: 54.2,
    pickRate: 11.3,
    avgPlacement: 3.9,
    difficulty: '简单',
    playstyle: ['亡语', '节奏'],
    bestBuilds: ['亡语', '野兽', '任意'],
    description: '亡语获得对手随从，克制流',
    tips: ['优先亡语频率', '后期找高价值亡语', '注意死亡顺序'],
    ability: {
      name: '精神控制',
      nameEn: 'Mind Control',
      description: '亡语：随机获得一个对手的随从',
      cost: 0,
      icon: getAbilityIcon('sylvanas')
    },
    synergies: [
      {
        name: '亡语核心',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '亡语触发两次',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/EX1_016.png',
        tags: ['亡语']
      }
    ]
  },
  // ==================== T2 英雄 ====================
  {
    id: 'malygos',
    name: '玛里苟斯',
    nameEn: 'Malygos',
    avatar: getHeroAvatar('malygos'),
    tier: 'T2',
    winRate: 52.5,
    pickRate: 8.2,
    avgPlacement: 4.1,
    difficulty: '中等',
    playstyle: ['法术', '爆发'],
    bestBuilds: ['元素', '杂耍'],
    description: '法术伤害 +2，法术流组件',
    tips: ['配合低费法术刷', '注意生存', '后期找关键法术'],
    ability: {
      name: '法术洪流',
      nameEn: 'Spell Torrent',
      description: '法术伤害 +2',
      cost: 0,
      icon: getAbilityIcon('malygos')
    },
    synergies: [
      {
        name: '法术核心',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '法术伤害 +1',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/EX1_563.png',
        tags: ['法术']
      }
    ]
  },
  {
    id: 'ragnaros',
    name: '拉格纳罗斯',
    nameEn: 'Ragnaros',
    avatar: getHeroAvatar('ragnaros'),
    tier: 'T2',
    winRate: 52.1,
    pickRate: 7.5,
    avgPlacement: 4.2,
    difficulty: '简单',
    playstyle: ['元素', '直伤'],
    bestBuilds: ['元素', '火元素'],
    description: '元素流核心，直伤拉满',
    tips: ['早点找元素', '注意温度机制', '配合冰元素'],
    ability: {
      name: '火焰之王',
      nameEn: 'Firelord',
      description: '在你回合结束时，对一个随机敌人造成 8 点伤害',
      cost: 0,
      icon: getAbilityIcon('ragnaros')
    },
    synergies: [
      {
        name: '元素核心',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '元素获得 +2/+2',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/EX1_298.png',
        tags: ['元素']
      }
    ]
  },
  {
    id: 'deathwing',
    name: '死亡之翼',
    nameEn: 'Deathwing',
    avatar: getHeroAvatar('deathwing'),
    tier: 'T2',
    winRate: 51.8,
    pickRate: 6.8,
    avgPlacement: 4.3,
    difficulty: '困难',
    playstyle: ['龙族', '后期'],
    bestBuilds: ['龙族', '恶魔'],
    description: '龙族核心，后期大核',
    tips: ['前期苟活', '6 本发力', '找关键龙族 buff'],
    ability: {
      name: '灭世者',
      nameEn: 'Destroyer',
      description: '龙族获得 +3/+3',
      cost: 0,
      icon: getAbilityIcon('deathwing')
    },
    synergies: [
      {
        name: '龙族核心',
        tier: 6,
        cost: 6,
        attack: 6,
        health: 6,
        description: '龙族获得 +2/+2',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/NEW1_030.png',
        tags: ['龙族']
      }
    ]
  },
  // ==================== T3 英雄 ====================
  {
    id: 'millhouse',
    name: '米尔豪斯',
    nameEn: 'Millhouse',
    avatar: getHeroAvatar('millhouse'),
    tier: 'T3',
    winRate: 49.5,
    pickRate: 5.2,
    avgPlacement: 4.8,
    difficulty: '困难',
    playstyle: ['经济', '赌博'],
    bestBuilds: ['任意'],
    description: '买随从便宜，卖随从亏钱',
    tips: ['前期优势', '注意经济节奏', '后期乏力'],
    ability: {
      name: '米尔豪斯的魔法',
      nameEn: 'Millhouse\'s Magic',
      description: '购买一个随从后，获得一枚法力水晶',
      cost: 0,
      icon: getAbilityIcon('millhouse')
    },
    synergies: [
      {
        name: '经济核心',
        tier: 3,
        cost: 3,
        attack: 3,
        health: 3,
        description: '战吼：获得一枚法力水晶',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/EX1_029.png',
        tags: ['经济']
      }
    ]
  },
  {
    id: 'patchwerk',
    name: '帕奇维克',
    nameEn: 'Patchwerk',
    avatar: getHeroAvatar('patchwerk'),
    tier: 'T3',
    winRate: 48.8,
    pickRate: 4.5,
    avgPlacement: 5.0,
    difficulty: '简单',
    playstyle: ['血量', '苟活'],
    bestBuilds: ['任意'],
    description: '40 血开局，容错率高',
    tips: ['适合新手', '不要无脑贪', '后期需要找核心'],
    ability: {
      name: '肉钩',
      nameEn: 'Meat Hook',
      description: '40 点生命值开局',
      cost: 0,
      icon: getAbilityIcon('patchwerk')
    },
    synergies: [
      {
        name: '生存核心',
        tier: 4,
        cost: 4,
        attack: 4,
        health: 4,
        description: '战吼：恢复 5 点生命值',
        imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/FP1_014.png',
        tags: ['生存']
      }
    ]
  }
];

// 排序后的英雄列表
export const HEROES_BY_WINRATE = [...HEROES].sort((a, b) => b.winRate - a.winRate);
export const HEROES_BY_PICKRATE = [...HEROES].sort((a, b) => b.pickRate - a.pickRate);

// 筛选工具函数
export const getHeroesByDifficulty = (difficulty: string) => HEROES.filter(h => h.difficulty === difficulty);
export const getHeroesByTier = (tier: string) => HEROES.filter(h => h.tier === tier);
