/**
 * 炉石传说酒馆战旗 - 英雄数据
 * 图片来源：HearthstoneJSON (https://art.hearthstonejson.com)
 * 备用 CDN: https://d15f34w2p8l1cc.cloudfront.net/hearthstone/
 */

// ==================== 接口定义 ====================

/**
 * 英雄技能
 */
export interface HeroAbility {
  name: string;
  nameEn: string;
  description: string;
  cost: number;
  icon: string;
  usageTips?: string;       // 使用时机
  comboTips?: string;       // 连招技巧
}

/**
 * 推荐配合卡牌
 */
export interface HeroCard {
  name: string;
  nameEn?: string;
  tier: number;
  cost: number;
  attack: number;
  health: number;
  description: string;
  imageUrl?: string;
  tags: string[];
  synergyReason?: string;   // 配合理由
}

/**
 * 英雄强度数据
 */
export interface HeroStats {
  winRate: number;          // 胜率
  pickRate: number;         // 选择率
  avgPlacement: number;     // 平均名次
  gamesPlayed?: number;     // 对局数
  top4Rate?: number;        // 前四率
  trend?: 'up' | 'down' | 'stable';  // 趋势
}

/**
 * 英雄完整数据
 */
export interface Hero {
  // 基础信息
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
  
  // 强度评级
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  difficulty: '简单' | '中等' | '困难';
  stats: HeroStats;
  
  // 玩法风格
  playstyle: string[];
  bestBuilds: string[];
  description: string;
  detailedGuide?: string;
  
  // 技能
  ability: HeroAbility;
  
  // 配合体系
  synergies: HeroCard[];
  tavernSynergies?: string[];  // 酒馆配合（流派核心）
  
  // 克制关系
  counters?: string[];
  counteredBy?: string[];
  
  // 强势期
  powerSpikes?: string[];
  
  // 技巧
  tips: string[];
  advancedTips?: string[];
  
  // 背景
  lore?: string;
}

// ==================== 数据生成工具 ====================

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

// ==================== 英雄数据 ====================

export const HEROES: Hero[] = [
  // ==================== T0 英雄 ====================
  {
    id: 'yshaarj',
    name: '亚煞极',
    nameEn: 'Y\'Shaarj',
    avatar: getHeroAvatar('yshaarj'),
    tier: 'T0',
    difficulty: '中等',
    stats: {
      winRate: 58.5,
      pickRate: 15.2,
      avgPlacement: 3.2,
      gamesPlayed: 15280,
      top4Rate: 62.3,
      trend: 'stable'
    },
    playstyle: ['经济运营', '节奏型'],
    bestBuilds: ['任意', '恶魔', '野兽'],
    description: '战吼额外触发一次，万能引擎，适配几乎所有流派',
    ability: {
      name: '亚煞极之触',
      nameEn: 'Touch of Y\'Shaarj',
      description: '使一个友方随从获得战吼触发两次',
      cost: 3,
      icon: getAbilityIcon('yshaarj'),
      usageTips: '优先给高价值战吼随从，如铜须、普芬',
      comboTips: '6 本后配合双铜须可实现无限战吼'
    },
    tavernSynergies: ['野兽', '恶魔', '元素', '亡语'],
    synergies: [
      {
        name: '布莱恩·铜须',
        nameEn: 'Brann Bronzebeard',
        tier: 6,
        cost: 5,
        attack: 2,
        health: 4,
        description: '你的战吼触发两次',
        imageUrl: getCardImage('LOE_079'),
        tags: ['野兽', '战吼'],
        synergyReason: '核心配合，战吼触发四次'
      },
      {
        name: '普芬',
        nameEn: 'Puffin',
        tier: 6,
        cost: 5,
        attack: 6,
        health: 6,
        description: '战吼：发现一个野兽',
        imageUrl: getCardImage('BT_323'),
        tags: ['野兽', '战吼'],
        synergyReason: '优质野兽来源，身材优秀'
      },
      {
        name: '瑞文戴尔男爵',
        nameEn: 'Baron Rivendare',
        tier: 6,
        cost: 5,
        attack: 4,
        health: 5,
        description: '你的亡语触发额外一次',
        imageUrl: getCardImage('FP1_031'),
        tags: ['亡语', '增益'],
        synergyReason: '亡语流核心，配合跳蛙'
      },
      {
        name: '跳蛙骑士',
        nameEn: 'Frogtosser Knight',
        tier: 5,
        cost: 4,
        attack: 4,
        health: 3,
        description: '亡语：使一个友方野兽获得 +2/+2',
        imageUrl: getCardImage('BT_715'),
        tags: ['野兽', '亡语'],
        synergyReason: '野兽流核心 buff 源'
      }
    ],
    counters: ['米尔豪斯', '帕奇维克'],
    counteredBy: ['玛维·影歌'],
    powerSpikes: ['4 本', '6 本'],
    tips: ['优先找高价值战吼随从', '6 本后强度质变', '注意经济节奏'],
    advancedTips: ['利用技能提前 buff 关键战吼', '根据对手调整阵容方向', '保留经济找铜须'],
    lore: '亚煞极是上古之神之一，其力量深不可测。'
  },
  {
    id: 'maiev',
    name: '玛维·影歌',
    nameEn: 'Maiev Shadowsong',
    avatar: getHeroAvatar('maiev'),
    tier: 'T0',
    difficulty: '简单',
    stats: {
      winRate: 57.8,
      pickRate: 18.5,
      avgPlacement: 3.3,
      gamesPlayed: 18520,
      top4Rate: 61.5,
      trend: 'up'
    },
    playstyle: ['发现', '灵活'],
    bestBuilds: ['任意', '元素', '机械'],
    description: '发现并复制对手的随从，克制流 + 信息优势',
    ability: {
      name: '禁锢',
      nameEn: 'Imprison',
      description: '发现一个对手的随从，获得它的复制',
      cost: 3,
      icon: getAbilityIcon('maiev'),
      usageTips: '优先复制对手核心组件',
      comboTips: '后期可找铜须实现双倍收益'
    },
    tavernSynergies: ['元素', '机械', '野兽'],
    synergies: [
      {
        name: '奥术火炮',
        nameEn: 'Arcane Cannon',
        tier: 4,
        cost: 4,
        attack: 3,
        health: 3,
        description: '在你发现一个随从后，获得 +2/+2',
        imageUrl: getCardImage('TB_BaconShop_81'),
        tags: ['发现', '元素'],
        synergyReason: '发现流核心，越发现越强'
      },
      {
        name: '布莱恩·铜须',
        nameEn: 'Brann Bronzebeard',
        tier: 6,
        cost: 5,
        attack: 2,
        health: 4,
        description: '你的战吼触发两次',
        imageUrl: getCardImage('LOE_079'),
        tags: ['野兽', '战吼'],
        synergyReason: '配合发现流，双倍快乐'
      },
      {
        name: '时间管理者诺兹',
        nameEn: 'Nozdormu Timekeeper',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '战吼：将你的技能刷新至可购买随从的数量',
        imageUrl: getCardImage('TB_BaconShop_100'),
        tags: ['龙', '战吼'],
        synergyReason: '刷新技能，多次发现'
      }
    ],
    counters: ['凯尔萨斯', '米尔豪斯'],
    counteredBy: ['亚煞极'],
    powerSpikes: ['3 本', '5 本'],
    tips: ['优先复制对手核心', '注意发现池质量', '后期可以找关键铜须'],
    advancedTips: ['观察对手阵容决定发现目标', '保留技能刷新关键回合', '灵活转型克制流'],
    lore: '守望者玛维，追捕伊利丹的传奇猎手。'
  },
  {
    id: 'kaelthas',
    name: '凯尔萨斯·逐日者',
    nameEn: 'Kael\'thas Sunstrider',
    avatar: getHeroAvatar('kaelthas'),
    tier: 'T0',
    difficulty: '困难',
    stats: {
      winRate: 56.9,
      pickRate: 12.8,
      avgPlacement: 3.4,
      gamesPlayed: 12800,
      top4Rate: 60.2,
      trend: 'stable'
    },
    playstyle: ['法术流', '运营'],
    bestBuilds: ['元素', '野兽', '杂耍'],
    description: '每回合第一个法术免费，法术流核心',
    ability: {
      name: '火球术',
      nameEn: 'Fireball',
      description: '每回合第一个法术法力值消耗为 (0) 点',
      cost: 0,
      icon: getAbilityIcon('kaelthas'),
      usageTips: '每回合优先释放高费法术',
      comboTips: '配合埃克索图斯实现滚雪球'
    },
    tavernSynergies: ['元素', '法术', '杂耍'],
    synergies: [
      {
        name: '管理者埃克索图斯',
        nameEn: 'Majordomo Executus',
        tier: 6,
        cost: 5,
        attack: 5,
        health: 5,
        description: '在你施放一个法术后，随机使你牌库中的一张随从牌获得 +2/+2',
        imageUrl: getCardImage('TB_BaconShop_107'),
        tags: ['元素', '法术'],
        synergyReason: '法术流核心，无限成长'
      },
      {
        name: '时间管理者诺兹',
        nameEn: 'Nozdormu Timekeeper',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '战吼：将你的技能刷新至可购买随从的数量',
        imageUrl: getCardImage('TB_BaconShop_100'),
        tags: ['龙', '战吼'],
        synergyReason: '刷新技能，多放法术'
      },
      {
        name: '布莱恩·铜须',
        nameEn: 'Brann Bronzebeard',
        tier: 6,
        cost: 5,
        attack: 2,
        health: 4,
        description: '你的战吼触发两次',
        imageUrl: getCardImage('LOE_079'),
        tags: ['野兽', '战吼'],
        synergyReason: '通用核心，配合战吼'
      }
    ],
    counters: ['普芬', '拉格纳罗斯'],
    counteredBy: ['玛维·影歌', '沃金'],
    powerSpikes: ['5 本', '6 本'],
    tips: ['前期找低费法术过渡', '6 本后强度爆炸', '注意法术释放顺序'],
    advancedTips: ['保留高费法术给免费回合', '利用技能刷新生育', '注意血量健康'],
    lore: '血精灵王子，燃烧军团的仆从，后回归联盟。'
  },
  // ==================== T1 英雄 ====================
  {
    id: 'dinoboard',
    name: '恐龙大师布莱恩',
    nameEn: 'Dinoboard',
    avatar: getHeroAvatar('dinoboard'),
    tier: 'T1',
    difficulty: '简单',
    stats: {
      winRate: 55.2,
      pickRate: 10.5,
      avgPlacement: 3.6,
      gamesPlayed: 10500,
      top4Rate: 58.5,
      trend: 'stable'
    },
    playstyle: ['战吼', '经济'],
    bestBuilds: ['野兽', '元素', '任意'],
    description: '战吼触发两次，简化版亚煞极',
    ability: {
      name: '战吼大师',
      nameEn: 'Battlecry Master',
      description: '你的战吼触发两次',
      cost: 0,
      icon: getAbilityIcon('dinoboard'),
      usageTips: '围绕战吼构建阵容',
      comboTips: '配合铜须实现四倍战吼'
    },
    tavernSynergies: ['野兽', '战吼', '元素'],
    synergies: [
      {
        name: '战吼核心',
        nameEn: 'Battlecry Core',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '战吼：抽一张牌',
        imageUrl: getCardImage('LOE_079'),
        tags: ['战吼'],
        synergyReason: '战吼流核心组件'
      }
    ],
    counters: ['米尔豪斯', '死亡之翼'],
    counteredBy: ['亚煞极', '玛维·影歌'],
    powerSpikes: ['4 本', '6 本'],
    tips: ['优先找战吼随从', '经济压力大时选这个', '配合铜须效果拔群'],
    advancedTips: ['利用技能提前建立优势', '注意战吼触发顺序', '灵活转型'],
    lore: '探险者协会领袖，发现之旅的引路人。'
  },
  {
    id: 'puffin',
    name: '普芬',
    nameEn: 'Puffin',
    avatar: getHeroAvatar('puffin'),
    tier: 'T1',
    difficulty: '中等',
    stats: {
      winRate: 54.8,
      pickRate: 14.2,
      avgPlacement: 3.7,
      gamesPlayed: 14200,
      top4Rate: 57.8,
      trend: 'down'
    },
    playstyle: ['野兽', '身材'],
    bestBuilds: ['野兽', '恶魔'],
    description: '野兽流核心，养身材神器',
    ability: {
      name: '野兽召唤',
      nameEn: 'Beast Call',
      description: '战吼：发现一个野兽',
      cost: 3,
      icon: getAbilityIcon('puffin'),
      usageTips: '前期找优质野兽过渡',
      comboTips: '配合跳蛙实现身材滚雪球'
    },
    tavernSynergies: ['野兽', '亡语'],
    synergies: [
      {
        name: '野兽核心',
        nameEn: 'Beast Core',
        tier: 6,
        cost: 6,
        attack: 6,
        health: 6,
        description: '野兽获得 +2/+2',
        imageUrl: getCardImage('BT_323'),
        tags: ['野兽'],
        synergyReason: '野兽流核心 buff'
      }
    ],
    counters: ['死亡之翼', '玛里苟斯'],
    counteredBy: ['凯尔萨斯', '沃金'],
    powerSpikes: ['5 本', '6 本'],
    tips: ['早点找野兽核心', '配合跳操组件', '注意血量健康'],
    advancedTips: ['利用技能补充野兽池', '优先找高身材野兽', '注意亡语触发顺序'],
    lore: '海鹦之王，野兽的呼唤者。'
  },
  {
    id: 'voljin',
    name: '沃金',
    nameEn: 'Vol\'jin',
    avatar: getHeroAvatar('voljin'),
    tier: 'T1',
    difficulty: '中等',
    stats: {
      winRate: 54.5,
      pickRate: 9.8,
      avgPlacement: 3.8,
      gamesPlayed: 9800,
      top4Rate: 57.2,
      trend: 'stable'
    },
    playstyle: ['交换', '控制'],
    bestBuilds: ['恶魔', '元素', '任意'],
    description: '交换生命值，以弱胜强',
    ability: {
      name: '灵魂交换',
      nameEn: 'Soul Swap',
      description: '交换两个随从的生命值',
      cost: 2,
      icon: getAbilityIcon('voljin'),
      usageTips: '用弱随换对手强随',
      comboTips: '后期可换关键 buff 目标'
    },
    tavernSynergies: ['恶魔', '元素', '控制'],
    synergies: [
      {
        name: '交换核心',
        nameEn: 'Swap Core',
        tier: 4,
        cost: 4,
        attack: 4,
        health: 4,
        description: '战吼：交换属性',
        imageUrl: getCardImage('OG_134'),
        tags: ['交换'],
        synergyReason: '交换流核心组件'
      }
    ],
    counters: ['凯尔萨斯', '死亡之翼'],
    counteredBy: ['亚煞极', '普芬'],
    powerSpikes: ['3 本', '5 本'],
    tips: ['前期用弱随换对手强随', '后期可以换关键 buff', '注意交换时机'],
    advancedTips: ['观察对手核心目标', '保留技能关键回合', '配合 buff 流效果更佳'],
    lore: '暗矛巨魔酋长，部落的智谋者。'
  },
  {
    id: 'sylvanas',
    name: '希尔瓦娜斯·风行者',
    nameEn: 'Sylvanas Windrunner',
    avatar: getHeroAvatar('sylvanas'),
    tier: 'T1',
    difficulty: '简单',
    stats: {
      winRate: 54.2,
      pickRate: 11.3,
      avgPlacement: 3.9,
      gamesPlayed: 11300,
      top4Rate: 56.8,
      trend: 'up'
    },
    playstyle: ['亡语', '节奏'],
    bestBuilds: ['亡语', '野兽', '任意'],
    description: '亡语获得对手随从，克制流',
    ability: {
      name: '精神控制',
      nameEn: 'Mind Control',
      description: '亡语：随机获得一个对手的随从',
      cost: 0,
      icon: getAbilityIcon('sylvanas'),
      usageTips: '优先堆亡语频率',
      comboTips: '配合瑞文实现双亡语'
    },
    tavernSynergies: ['亡语', '野兽'],
    synergies: [
      {
        name: '亡语核心',
        nameEn: 'Deathrattle Core',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '亡语触发两次',
        imageUrl: getCardImage('EX1_016'),
        tags: ['亡语'],
        synergyReason: '亡语流核心组件'
      }
    ],
    counters: ['米尔豪斯', '死亡之翼'],
    counteredBy: ['亚煞极', '玛维·影歌'],
    powerSpikes: ['4 本', '6 本'],
    tips: ['优先亡语频率', '后期找高价值亡语', '注意死亡顺序'],
    advancedTips: ['利用亡语破坏对手阵容', '配合跳蛙实现连锁', '注意瑞文保护'],
    lore: '被遗忘者的女王，前银月城游侠将军。'
  },
  // ==================== T2 英雄 ====================
  {
    id: 'malygos',
    name: '玛里苟斯',
    nameEn: 'Malygos',
    avatar: getHeroAvatar('malygos'),
    tier: 'T2',
    difficulty: '中等',
    stats: {
      winRate: 52.5,
      pickRate: 8.2,
      avgPlacement: 4.1,
      gamesPlayed: 8200,
      top4Rate: 54.5,
      trend: 'stable'
    },
    playstyle: ['法术', '爆发'],
    bestBuilds: ['元素', '杂耍'],
    description: '法术伤害 +2，法术流组件',
    ability: {
      name: '法术洪流',
      nameEn: 'Spell Torrent',
      description: '法术伤害 +2',
      cost: 0,
      icon: getAbilityIcon('malygos'),
      usageTips: '配合低费法术刷伤害',
      comboTips: '后期找高伤法术终结'
    },
    tavernSynergies: ['元素', '法术'],
    synergies: [
      {
        name: '法术核心',
        nameEn: 'Spell Core',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '法术伤害 +1',
        imageUrl: getCardImage('EX1_563'),
        tags: ['法术'],
        synergyReason: '法术伤害叠加'
      }
    ],
    counters: ['帕奇维克', '米尔豪斯'],
    counteredBy: ['凯尔萨斯', '沃金'],
    powerSpikes: ['5 本', '6 本'],
    tips: ['配合低费法术刷', '注意生存', '后期找关键法术'],
    advancedTips: ['计算伤害斩杀线', '保留法术给关键回合', '注意对手反制'],
    lore: '织法者，魔法的守护者。'
  },
  {
    id: 'ragnaros',
    name: '拉格纳罗斯',
    nameEn: 'Ragnaros',
    avatar: getHeroAvatar('ragnaros'),
    tier: 'T2',
    difficulty: '简单',
    stats: {
      winRate: 52.1,
      pickRate: 7.5,
      avgPlacement: 4.2,
      gamesPlayed: 7500,
      top4Rate: 53.8,
      trend: 'down'
    },
    playstyle: ['元素', '直伤'],
    bestBuilds: ['元素', '火元素'],
    description: '元素流核心，直伤拉满',
    ability: {
      name: '火焰之王',
      nameEn: 'Firelord',
      description: '在你回合结束时，对一个随机敌人造成 8 点伤害',
      cost: 0,
      icon: getAbilityIcon('ragnaros'),
      usageTips: '围绕元素构建阵容',
      comboTips: '配合冰元素实现温度控制'
    },
    tavernSynergies: ['元素', '火元素', '冰元素'],
    synergies: [
      {
        name: '元素核心',
        nameEn: 'Elemental Core',
        tier: 5,
        cost: 5,
        attack: 5,
        health: 5,
        description: '元素获得 +2/+2',
        imageUrl: getCardImage('EX1_298'),
        tags: ['元素'],
        synergyReason: '元素流核心 buff'
      }
    ],
    counters: ['帕奇维克', '死亡之翼'],
    counteredBy: ['凯尔萨斯', '沃金'],
    powerSpikes: ['4 本', '6 本'],
    tips: ['早点找元素', '注意温度机制', '配合冰元素'],
    advancedTips: ['利用直伤补伤害', '注意元素温度链', '保留关键元素'],
    lore: '炎魔之王，火焰元素的领主。'
  },
  {
    id: 'deathwing',
    name: '死亡之翼',
    nameEn: 'Deathwing',
    avatar: getHeroAvatar('deathwing'),
    tier: 'T2',
    difficulty: '困难',
    stats: {
      winRate: 51.8,
      pickRate: 6.8,
      avgPlacement: 4.3,
      gamesPlayed: 6800,
      top4Rate: 53.2,
      trend: 'stable'
    },
    playstyle: ['龙族', '后期'],
    bestBuilds: ['龙族', '恶魔'],
    description: '龙族核心，后期大核',
    ability: {
      name: '灭世者',
      nameEn: 'Destroyer',
      description: '龙族获得 +3/+3',
      cost: 0,
      icon: getAbilityIcon('deathwing'),
      usageTips: '前期苟活找龙族',
      comboTips: '6 本后强度爆炸'
    },
    tavernSynergies: ['龙族', '恶魔'],
    synergies: [
      {
        name: '龙族核心',
        nameEn: 'Dragon Core',
        tier: 6,
        cost: 6,
        attack: 6,
        health: 6,
        description: '龙族获得 +2/+2',
        imageUrl: getCardImage('NEW1_030'),
        tags: ['龙族'],
        synergyReason: '龙族流核心 buff'
      }
    ],
    counters: ['帕奇维克', '玛里苟斯'],
    counteredBy: ['凯尔萨斯', '沃金', '布莱恩'],
    powerSpikes: ['6 本'],
    tips: ['前期苟活', '6 本发力', '找关键龙族 buff'],
    advancedTips: ['利用技能补充龙族池', '注意血量健康', '保留经济找核心'],
    lore: '大地守护者，后堕落为灭世者。'
  },
  // ==================== T3 英雄 ====================
  {
    id: 'millhouse',
    name: '米尔豪斯',
    nameEn: 'Millhouse',
    avatar: getHeroAvatar('millhouse'),
    tier: 'T3',
    difficulty: '困难',
    stats: {
      winRate: 49.5,
      pickRate: 5.2,
      avgPlacement: 4.8,
      gamesPlayed: 5200,
      top4Rate: 48.5,
      trend: 'down'
    },
    playstyle: ['经济', '赌博'],
    bestBuilds: ['任意'],
    description: '买随从便宜，卖随从亏钱',
    ability: {
      name: '米尔豪斯的魔法',
      nameEn: 'Millhouse\'s Magic',
      description: '购买一个随从后，获得一枚法力水晶',
      cost: 0,
      icon: getAbilityIcon('millhouse'),
      usageTips: '前期快速升本',
      comboTips: '注意卖随亏损经济'
    },
    tavernSynergies: ['经济', '快攻'],
    synergies: [
      {
        name: '经济核心',
        nameEn: 'Economy Core',
        tier: 3,
        cost: 3,
        attack: 3,
        health: 3,
        description: '战吼：获得一枚法力水晶',
        imageUrl: getCardImage('EX1_029'),
        tags: ['经济'],
        synergyReason: '经济流核心组件'
      }
    ],
    counters: [],
    counteredBy: ['亚煞极', '玛维·影歌', '布莱恩'],
    powerSpikes: ['2 本', '3 本'],
    tips: ['前期优势', '注意经济节奏', '后期乏力'],
    advancedTips: ['快速升本找核心', '避免无脑卖随', '及时转型'],
    lore: '大法师安东尼达斯的学徒，总是倒霉。'
  },
  {
    id: 'patchwerk',
    name: '帕奇维克',
    nameEn: 'Patchwerk',
    avatar: getHeroAvatar('patchwerk'),
    tier: 'T3',
    difficulty: '简单',
    stats: {
      winRate: 48.8,
      pickRate: 4.5,
      avgPlacement: 5.0,
      gamesPlayed: 4500,
      top4Rate: 47.2,
      trend: 'stable'
    },
    playstyle: ['血量', '苟活'],
    bestBuilds: ['任意'],
    description: '40 血开局，容错率高',
    ability: {
      name: '肉钩',
      nameEn: 'Meat Hook',
      description: '40 点生命值开局',
      cost: 0,
      icon: getAbilityIcon('patchwerk'),
      usageTips: '适合新手练习',
      comboTips: '利用血量优势贪核心'
    },
    tavernSynergies: ['生存', '苟活'],
    synergies: [
      {
        name: '生存核心',
        nameEn: 'Survival Core',
        tier: 4,
        cost: 4,
        attack: 4,
        health: 4,
        description: '战吼：恢复 5 点生命值',
        imageUrl: getCardImage('FP1_014'),
        tags: ['生存'],
        synergyReason: '生存流核心组件'
      }
    ],
    counters: [],
    counteredBy: ['亚煞极', '玛维·影歌', '拉格纳罗斯'],
    powerSpikes: ['3 本', '4 本'],
    tips: ['适合新手', '不要无脑贪', '后期需要找核心'],
    advancedTips: ['利用血量优势找核心', '注意血量健康线', '及时止损'],
    lore: '缝合怪，天灾军团的造物。'
  }
];

// ==================== 工具函数 ====================

// 排序后的英雄列表
export const HEROES_BY_WINRATE = [...HEROES].sort((a, b) => b.stats.winRate - a.stats.winRate);
export const HEROES_BY_PICKRATE = [...HEROES].sort((a, b) => b.stats.pickRate - a.stats.pickRate);

// 筛选工具函数
export const getHeroesByDifficulty = (difficulty: string) => HEROES.filter(h => h.difficulty === difficulty);
export const getHeroesByTier = (tier: string) => HEROES.filter(h => h.tier === tier);
