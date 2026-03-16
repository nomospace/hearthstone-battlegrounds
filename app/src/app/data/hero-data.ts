/**
 * 炉石传说酒馆战旗 - 完整英雄数据
 * 数据更新日期: 2026-03-16
 * 版本: 32.2.2
 * 
 * 图片来源:
 * - 英雄头像: 本地 assets/heroes/ 目录
 * - 技能图标: 本地 assets/abilities/ 目录
 */

// ==================== 接口定义 ====================

export interface HeroAbility {
  name: string;
  nameEn: string;
  description: string;
  cost: number;
  icon: string;
  usageTips?: string;
  comboTips?: string;
}

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
  synergyReason?: string;
}

export interface HeroStats {
  winRate: number;
  pickRate: number;
  avgPlacement: number;
  gamesPlayed?: number;
  top4Rate?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface Hero {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  difficulty: '简单' | '中等' | '困难';
  stats: HeroStats;
  playstyle: string[];
  bestBuilds: string[];
  description: string;
  detailedGuide?: string;
  ability: HeroAbility;
  synergies: HeroCard[];
  tavernSynergies?: string[];
  counters?: string[];
  counteredBy?: string[];
  powerSpikes?: string[];
  tips: string[];
  advancedTips?: string[];
  lore?: string;
}

// ==================== 英雄数据 ====================

export const HEROES: Hero[] = [
  // ==================== T0 级英雄 ====================
  {
    id: 'yshaarj',
    name: '亚煞极',
    nameEn: "Y'Shaarj",
    avatar: 'assets/heroes/TRL_541.png',
    tier: 'T0',
    difficulty: '中等',
    stats: { winRate: 58.5, pickRate: 12.3, avgPlacement: 3.2, top4Rate: 72, trend: 'up' },
    playstyle: ['成长型', '滚雪球'],
    bestBuilds: ['野兽', '元素', '机械'],
    description: '每当你购买一个随从，获得+1/+1。强力的成长能力使其成为版本首选。',
    ability: {
      name: '腐化之心',
      nameEn: 'Corrupted Heart',
      description: '每当你购买一个随从，获得+1/+1。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_036.png',
      usageTips: '前期快速买怪，后期用身材优势碾压对手',
      comboTips: '配合刷新随从可以更快成长'
    },
    synergies: [],
    tavernSynergies: ['野兽', '元素', '机械'],
    tips: ['前期尽量买低费随从', '不需要刻意刷新，买就是了', '中期卖怪升本不影响成长'],
    advancedTips: ['可以保留关键三连不买，等刷新后再买', '后期配合酒馆法术效果更好']
  },
  {
    id: 'maiev',
    name: '玛维·影歌',
    nameEn: "Maiev Shadowsong",
    avatar: 'assets/heroes/BT_187.png',
    tier: 'T0',
    difficulty: '中等',
    stats: { winRate: 57.8, pickRate: 11.8, avgPlacement: 3.3, top4Rate: 70, trend: 'stable' },
    playstyle: ['节奏型', '控场'],
    bestBuilds: ['元素', '鱼人', '亡灵'],
    description: '战吼：使一个随从休眠3回合。',
    ability: {
      name: '影歌牢笼',
      nameEn: 'Shadowsong Cage',
      description: '战吼：使一个随从休眠3回合。',
      cost: 1,
      icon: 'assets/abilities/TB_BaconShop_HP_035.png',
      usageTips: '用来控制对手核心随从',
      comboTips: '可以连续控制多个威胁'
    },
    synergies: [],
    tavernSynergies: ['元素', '鱼人', '亡灵'],
    tips: ['控制对手核心牌', '注意费用管理', '可以控自己的亡语牌'],
    advancedTips: ['计算好休眠回合数', '配合复生效果更好']
  },
  {
    id: 'kaelthas',
    name: '凯尔萨斯',
    nameEn: 'Kael\'thas Sunstrider',
    avatar: 'assets/heroes/BT_255.png',
    tier: 'T0',
    difficulty: '简单',
    stats: { winRate: 57.2, pickRate: 10.5, avgPlacement: 3.4, top4Rate: 68, trend: 'up' },
    playstyle: ['经济型', '升本加速'],
    bestBuilds: ['元素', '龙', '机械'],
    description: '每购买3个随从，下一个随从免费获得。',
    ability: {
      name: '太阳之井',
      nameEn: 'Sunwell',
      description: '每购买3个随从，下一个随从免费获得。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_008.png',
      usageTips: '买3送1，经济优势巨大',
      comboTips: '配合酒馆法术更高效'
    },
    synergies: [],
    tavernSynergies: ['元素', '龙', '机械'],
    tips: ['前期能买就买', '免费的机会要珍惜', '可以故意保留免费次数'],
    advancedTips: ['计算好第4个免费', '可以卖怪重新计算']
  },
  {
    id: 'dinoboard',
    name: '恐龙大师布莱恩',
    nameEn: 'Dinotamer Brann',
    avatar: 'assets/heroes/TB_BaconShop_HERO_43.png',
    tier: 'T0',
    difficulty: '简单',
    stats: { winRate: 56.9, pickRate: 13.2, avgPlacement: 3.5, top4Rate: 67, trend: 'stable' },
    playstyle: ['战吼流', '滚雪球'],
    bestBuilds: ['野兽', '龙', '元素'],
    description: '你的战吼触发两次。',
    ability: {
      name: '双重战吼',
      nameEn: 'Double Battlecry',
      description: '你的战吼触发两次。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_022.png',
      usageTips: '所有战吼效果翻倍',
      comboTips: '配合战吼随从收益巨大'
    },
    synergies: [],
    tavernSynergies: ['野兽', '龙', '元素'],
    tips: ['优先拿战吼随从', '刷新随从效果更好', '中后期优势明显'],
    advancedTips: ['配合发现类战吼收益最大', '可以调整站位配合']
  },
  {
    id: 'puffin',
    name: '菌菇术士弗洛',
    nameEn: 'Patches the Pirate',
    avatar: 'assets/heroes/CFM_637.png',
    tier: 'T1',
    difficulty: '中等',
    stats: { winRate: 55.8, pickRate: 8.5, avgPlacement: 3.6, top4Rate: 65, trend: 'down' },
    playstyle: ['节奏型', '野兽'],
    bestBuilds: ['野兽', '鱼人'],
    description: '战吼：使你的野兽获得+1/+1。',
    ability: {
      name: '野性成长',
      nameEn: 'Wild Growth',
      description: '战吼：使你的野兽获得+1/+1。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_027.png',
      usageTips: '专精野兽流派',
      comboTips: '野兽数量越多收益越大'
    },
    synergies: [],
    tavernSynergies: ['野兽'],
    tips: ['专注野兽流派', '每回合使用都有收益', '配合野兽战吼更强'],
    advancedTips: ['可以转型但野兽最优', '注意三连时机']
  },
  // ==================== T1 级英雄 ====================
  {
    id: 'voljin',
    name: '沃尔金',
    nameEn: 'Vol\'jin',
    avatar: 'assets/heroes/TRL_527.png',
    tier: 'T1',
    difficulty: '中等',
    stats: { winRate: 55.5, pickRate: 9.2, avgPlacement: 3.7, top4Rate: 64, trend: 'stable' },
    playstyle: ['灵活型', '转换'],
    bestBuilds: ['元素', '亡灵', '机械'],
    description: '战吼：与一个随从交换属性值。',
    ability: {
      name: '暗影转换',
      nameEn: 'Shadow Swap',
      description: '战吼：与一个随从交换属性值。',
      cost: 1,
      icon: 'assets/abilities/TB_BaconShop_HP_028.png',
      usageTips: '可以把小身材换成大身材',
      comboTips: '配合成长型随从效果更好'
    },
    synergies: [],
    tavernSynergies: ['元素', '亡灵', '机械'],
    tips: ['注意交换时机', '可以救活残血随从', '费用管理很重要'],
    advancedTips: ['记住常用属性值', '可以故意保留低身材']
  },
  {
    id: 'sylvanas',
    name: '希尔瓦娜斯',
    nameEn: 'Sylvanas Windrunner',
    avatar: 'assets/heroes/FP1_016.png',
    tier: 'T1',
    difficulty: '中等',
    stats: { winRate: 55.2, pickRate: 10.1, avgPlacement: 3.8, top4Rate: 63, trend: 'up' },
    playstyle: ['控制型', '亡语'],
    bestBuilds: ['亡灵', '野兽', '机械'],
    description: '亡语：获得一个随机敌方随从的控制权。',
    ability: {
      name: '黑暗女王',
      nameEn: 'Dark Queen',
      description: '亡语：获得一个随机敌方随从的控制权。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_024.png',
      usageTips: '送掉可以偷对手的牌',
      comboTips: '配合自杀效果更好'
    },
    synergies: [],
    tavernSynergies: ['亡灵', '野兽'],
    tips: ['可以故意送掉', '注意对手站位', '偷到关键牌很重要'],
    advancedTips: ['计算对手核心牌', '可以多次触发']
  },
  {
    id: 'malygos',
    name: '玛里苟斯',
    nameEn: 'Malygos',
    avatar: 'assets/heroes/DRG_270.png',
    tier: 'T1',
    difficulty: '困难',
    stats: { winRate: 54.8, pickRate: 7.8, avgPlacement: 3.9, top4Rate: 62, trend: 'stable' },
    playstyle: ['法术型', '龙'],
    bestBuilds: ['龙', '元素'],
    description: '战吼：发现一张法术牌。',
    ability: {
      name: '魔法涌动',
      nameEn: 'Magic Surge',
      description: '战吼：发现一张法术牌。',
      cost: 1,
      icon: 'assets/abilities/TB_BaconShop_HP_014.png',
      usageTips: '可以获得强力法术',
      comboTips: '多次使用收益更大'
    },
    synergies: [],
    tavernSynergies: ['龙', '元素'],
    tips: ['法术可以改变战局', '注意费用', '选择合适的法术'],
    advancedTips: ['记住法术池', '可以调整策略']
  },
  {
    id: 'ragnaros',
    name: '拉格纳罗斯',
    nameEn: 'Ragnaros the Firelord',
    avatar: 'assets/heroes/EX1_298.png',
    tier: 'T1',
    difficulty: '简单',
    stats: { winRate: 54.5, pickRate: 8.9, avgPlacement: 4.0, top4Rate: 61, trend: 'down' },
    playstyle: ['伤害型', '元素'],
    bestBuilds: ['元素', '机械'],
    description: '在你的回合结束时，对一个随机敌人造成8点伤害。',
    ability: {
      name: '炎魔之手',
      nameEn: 'Firelord\'s Hand',
      description: '在你的回合结束时，对一个随机敌人造成8点伤害。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_019.png',
      usageTips: '稳定的伤害输出',
      comboTips: '配合其他伤害效果'
    },
    synergies: [],
    tavernSynergies: ['元素', '机械'],
    tips: ['伤害稳定但随机', '可以清理小随从', '不需要太多操作'],
    advancedTips: ['可以配合圣盾更有效', '注意随机性']
  },
  {
    id: 'deathwing',
    name: '死亡之翼',
    nameEn: 'Deathwing',
    avatar: 'assets/heroes/TB_BaconShop_HERO_52.png',
    tier: 'T1',
    difficulty: '简单',
    stats: { winRate: 54.2, pickRate: 9.5, avgPlacement: 4.1, top4Rate: 60, trend: 'stable' },
    playstyle: ['进攻型', '龙'],
    bestBuilds: ['龙', '野兽'],
    description: '你的随从获得+3攻击力。',
    ability: {
      name: '毁灭之翼',
      nameEn: 'Wing of Destruction',
      description: '你的随从获得+3攻击力。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_001.png',
      usageTips: '所有随从攻击力+3',
      comboTips: '配合风怒效果更好'
    },
    synergies: [],
    tavernSynergies: ['龙', '野兽'],
    tips: ['攻击力优势明显', '快速结束战斗', '不需要防御'],
    advancedTips: ['配合圣盾更安全', '注意血量管理']
  },
  // ==================== T2 级英雄 ====================
  {
    id: 'illidan',
    name: '伊利丹',
    nameEn: 'Illidan Stormrage',
    avatar: 'assets/heroes/BT_487.png',
    tier: 'T2',
    difficulty: '中等',
    stats: { winRate: 53.5, pickRate: 11.2, avgPlacement: 4.2, top4Rate: 58, trend: 'stable' },
    playstyle: ['恶魔', '节奏型'],
    bestBuilds: ['恶魔', '亡灵'],
    description: '战吼：使你的恶魔获得+1/+1。',
    ability: {
      name: '邪能之力',
      nameEn: 'Fel Power',
      description: '战吼：使你的恶魔获得+1/+1。',
      cost: 0,
      icon: 'assets/abilities/TB_BaconShop_HP_017.png',
      usageTips: '专注恶魔流派',
      comboTips: '恶魔数量越多越好'
    },
    synergies: [],
    tavernSynergies: ['恶魔'],
    tips: ['专注恶魔', '保持恶魔数量', '配合恶魔战吼'],
    advancedTips: ['可以转型但恶魔最优', '注意站位']
  },
  {
    id: 'arthur',
    name: '阿瑟斯',
    nameEn: 'Prince Arthas',
    avatar: 'assets/heroes/ICC_850.png',
    tier: 'T2',
    difficulty: '中等',
    stats: { winRate: 52.8, pickRate: 6.5, avgPlacement: 4.4, top4Rate: 55, trend: 'down' },
    playstyle: ['亡灵', '控制型'],
    bestBuilds: ['亡灵', '鱼人'],
    description: '战吼：复活一个友方亡语随从。',
    ability: {
      name: '死亡骑士',
      nameEn: 'Death Knight',
      description: '战吼：复活一个友方亡语随从。',
      cost: 2,
      icon: 'assets/abilities/TB_BaconShop_HP_024.png',
      usageTips: '可以触发两次亡语',
      comboTips: '配合高价值亡语'
    },
    synergies: [],
    tavernSynergies: ['亡灵'],
    tips: ['选择高价值亡语', '费用管理很重要', '可以反复使用'],
    advancedTips: ['计算亡语价值', '配合复生效果']
  },
  {
    id: 'jaraxxus',
    name: '加拉克苏斯',
    nameEn: 'Lord Jaraxxus',
    avatar: 'assets/heroes/EX1_323.png',
    tier: 'T2',
    difficulty: '困难',
    stats: { winRate: 52.5, pickRate: 5.8, avgPlacement: 4.5, top4Rate: 54, trend: 'stable' },
    playstyle: ['恶魔', '后期型'],
    bestBuilds: ['恶魔', '元素'],
    description: '战吼：装备一把3/8的血怒之剑。',
    ability: {
      name: '恶魔领主',
      nameEn: 'Demon Lord',
      description: '战吼：装备一把3/8的血怒之剑。',
      cost: 3,
      icon: 'assets/abilities/TB_BaconShop_HP_036.png',
      usageTips: '武器可以改变战局',
      comboTips: '配合攻击力加成'
    },
    synergies: [],
    tavernSynergies: ['恶魔'],
    tips: ['武器价值很高', '注意使用时机', '后期更有用'],
    advancedTips: ['可以配合风怒', '注意耐久度']
  }
];

// 按胜率排序的英雄列表
export const HEROES_BY_WINRATE = [...HEROES].sort((a, b) => b.stats.winRate - a.stats.winRate);

// 获取指定强度的英雄
export function getHeroesByTier(tier: string): Hero[] {
  return HEROES.filter(hero => hero.tier === tier);
}

// 根据 ID 获取英雄
export function getHeroById(id: string): Hero | undefined {
  return HEROES.find(hero => hero.id === id);
}