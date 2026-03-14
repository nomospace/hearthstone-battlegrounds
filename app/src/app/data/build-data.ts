/**
 * 炉石传说酒馆战旗 - 流派/打法指南
 */

export interface BuildGuide {
  id: string;
  name: string;
  nameEn: string;
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  difficulty: '简单' | '中等' | '困难';
  description: string;
  coreCards: CoreCard[];
  gamePlan: GamePlan;
  tips: string[];
  counters: string[];
  synergies: string[];
}

export interface CoreCard {
  name: string;
  tier: number | string;
  description: string;
  priority: '核心' | '重要' | '过渡';
  imageUrl?: string;
}

export interface GamePlan {
  early: string;  // 1-3 本
  mid: string;    // 4-5 本
  late: string;   // 6 本
}

export const BUILD_GUIDES: BuildGuide[] = [
  // ==================== T0 流派 ====================
  {
    id: 'beast',
    name: '野兽流',
    nameEn: 'Beast',
    tier: 'T0',
    difficulty: '简单',
    description: '最稳定流派，养身材 + 跳操，新手推荐',
    coreCards: [
      { name: '普芬', tier: 6, description: '野兽流核心，发现野兽', priority: '核心', imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/BT_323.png' },
      { name: '瑞文戴尔男爵', tier: 5, description: '亡语触发额外一次', priority: '核心', imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/FP1_031.png' },
      { name: '狂战斧', tier: 5, description: '风怒，多段攻击', priority: '核心', imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/EX1_411.png' },
      { name: '熊妈妈', tier: 4, description: '野兽获得 +2/+2', priority: '重要', imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/LOE_061.png' },
      { name: '老鹰', tier: 3, description: '战吼：发现一个野兽', priority: '过渡', imageUrl: 'https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/LOE_050.png' }
    ],
    gamePlan: {
      early: '找野兽过渡，优先身材 buff',
      mid: '找瑞文 + 狂战斧，开始跳操',
      late: '普芬 + 双狂战，身材无限成长'
    },
    tips: [
      '前期不要 D 太多，保血找核心',
      '瑞文是质变点，一定要找',
      '注意站位，狂战斧放中间'
    ],
    counters: ['亡语流', '剧毒'],
    synergies: ['亡语', '战吼']
  },
  {
    id: 'element',
    name: '元素流',
    nameEn: 'Element',
    tier: 'T0',
    difficulty: '中等',
    description: '温度机制，直伤 + 身材兼备',
    coreCards: [
      { name: '拉格纳罗斯', tier: 6, description: '元素核心', priority: '核心' },
      { name: '冰元素', tier: 5, description: '降温组件', priority: '核心' },
      { name: '火元素', tier: 4, description: '直伤', priority: '重要' },
      { name: '元素使者', tier: 3, description: '过渡', priority: '过渡' }
    ],
    gamePlan: {
      early: '找元素过渡，注意温度',
      mid: '找冰火 combo，控温',
      late: '拉格纳罗斯 + 冰火，伤害爆炸'
    },
    tips: [
      '温度控制是关键',
      '冰火配合伤害最高',
      '注意对手流派，调整温度'
    ],
    counters: ['快攻', '直伤'],
    synergies: ['法术', '直伤']
  },
  {
    id: 'demon',
    name: '恶魔流',
    nameEn: 'Demon',
    tier: 'T0',
    difficulty: '中等',
    description: '卖血流，身材成长快',
    coreCards: [
      { name: '玛尔加尼斯', tier: 6, description: '恶魔核心，免死', priority: '核心' },
      { name: '主人', tier: 5, description: '召唤恶魔', priority: '核心' },
      { name: '鞭笞者', tier: 4, description: '身材 buff', priority: '重要' },
      { name: '小鬼', tier: 2, description: '过渡', priority: '过渡' }
    ],
    gamePlan: {
      early: '卖血找恶魔，注意血量',
      mid: '找主人 + 鞭笞者',
      late: '玛尔加尼斯保命，无限成长'
    },
    tips: [
      '血量控制很重要',
      '玛尔加尼斯是质变',
      '小心剧毒和直伤'
    ],
    counters: ['剧毒', '百分比伤害'],
    synergies: ['亡语', '召唤']
  },

  // ==================== T1 流派 ====================
  {
    id: 'mech',
    name: '机械流',
    nameEn: 'Mech',
    tier: 'T1',
    difficulty: '简单',
    description: '圣盾 + 磁力的经典组合',
    coreCards: [
      { name: '金刚刃牙', tier: 6, description: '机械核心', priority: '核心' },
      { name: '磁石', tier: 5, description: 'buff 载体', priority: '核心' },
      { name: '圣盾', tier: 4, description: '保护', priority: '重要' }
    ],
    gamePlan: {
      early: '找机械过渡，优先圣盾',
      mid: '找磁石 + 金刚',
      late: '身材 + 圣盾，非常稳定'
    },
    tips: [
      '圣盾是关键',
      '磁石可以继承 buff',
      '比较怕破盾'
    ],
    counters: ['破盾', '直伤'],
    synergies: ['圣盾', '磁力']
  },
  {
    id: 'dragon',
    name: '龙族流',
    nameEn: 'Dragon',
    tier: 'T1',
    difficulty: '困难',
    description: '后期大核，前期弱势',
    coreCards: [
      { name: '死亡之翼', tier: 6, description: '龙族核心', priority: '核心' },
      { name: '龙族 buff', tier: 5, description: '身材', priority: '核心' },
      { name: '雏龙', tier: 3, description: '过渡', priority: '过渡' }
    ],
    gamePlan: {
      early: '苟活，找龙族过渡',
      mid: '找龙族 buff',
      late: '死亡之翼 + buff，强度爆炸'
    },
    tips: [
      '前期要苟',
      '血量很重要',
      '6 本发力'
    ],
    counters: ['快攻', '前期压力'],
    synergies: ['战吼', '法术']
  },
  {
    id: 'deathrattle',
    name: '亡语流',
    nameEn: 'Deathrattle',
    tier: 'T1',
    difficulty: '中等',
    description: '亡语频率，灵活多变',
    coreCards: [
      { name: '瑞文', tier: 5, description: '亡语 x2', priority: '核心' },
      { name: '亡语长者', tier: 5, description: '亡语 x2', priority: '核心' },
      { name: '高价值亡语', tier: 6, description: '核心', priority: '重要' }
    ],
    gamePlan: {
      early: '找亡语过渡',
      mid: '找瑞文/长者',
      late: '亡语频率拉满'
    },
    tips: [
      '瑞文是核心',
      '注意亡语顺序',
      '可以转野兽'
    ],
    counters: ['沉默', '爆发育'],
    synergies: ['野兽', '召唤']
  },

  // ==================== T2 流派 ====================
  {
    id: 'pirate',
    name: '海盗流',
    nameEn: 'Pirate',
    tier: 'T2',
    difficulty: '简单',
    description: '快攻流，前期强势',
    coreCards: [
      { name: '海盗核心', tier: 6, description: '海盗 buff', priority: '核心' },
      { name: ' buff', tier: 5, description: '身材', priority: '重要' }
    ],
    gamePlan: {
      early: '海盗铺场',
      mid: '找核心 buff',
      late: '持续压血'
    },
    tips: [
      '前期优势',
      '注意血量交换',
      '后期乏力'
    ],
    counters: ['后期', '控制'],
    synergies: ['快攻', '直伤']
  },
  {
    id: 'spell',
    name: '法术流',
    nameEn: 'Spell',
    tier: 'T2',
    difficulty: '困难',
    description: '凯尔萨斯专属，操作难度高',
    coreCards: [
      { name: '凯尔萨斯', tier: '英雄', description: '免费法术', priority: '核心' },
      { name: '低费法术', tier: 3, description: '过渡', priority: '核心' },
      { name: '高费法术', tier: 6, description: '爆发', priority: '重要' }
    ],
    gamePlan: {
      early: '找低费法术',
      mid: '找 buff',
      late: '高费法术爆发'
    },
    tips: [
      '法术顺序很重要',
      '注意经济',
      '操作难度高'
    ],
    counters: ['快攻', '干扰'],
    synergies: ['元素', '杂耍']
  }
];

// 按难度筛选
export const getBuildsByDifficulty = (difficulty: string) =>
  BUILD_GUIDES.filter(b => b.difficulty === difficulty);

// 按 tier 筛选
export const getBuildsByTier = (tier: string) =>
  BUILD_GUIDES.filter(b => b.tier === tier);

// 搜索流派
export const searchBuilds = (keyword: string) =>
  BUILD_GUIDES.filter(b => 
    b.name.includes(keyword) || 
    b.nameEn.toLowerCase().includes(keyword.toLowerCase()) ||
    b.description.includes(keyword)
  );
