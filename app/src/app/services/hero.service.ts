import { Injectable, signal, computed } from '@angular/core';
import { HEROES, HEROES_BY_WINRATE } from '../data/hero-data';
import type { Hero } from '../data/hero-data';

/**
 * 英雄服务 - 使用 Angular Signals 管理状态
 * 遵循 Smart/Dumb 组件架构，服务负责数据获取和状态管理
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // Signals 状态
  private readonly heroesSignal = signal<Hero[]>(HEROES);
  readonly tierFilterSignal = signal<string>('all');
  readonly difficultyFilterSignal = signal<string>('all');
  readonly sortTypeSignal = signal<'winrate' | 'pickrate'>('winrate');

  // Computed 计算属性 - 自动响应式
  readonly filteredHeroes = computed(() => {
    let result = [...this.heroesSignal()];
    const tier = this.tierFilterSignal();
    const difficulty = this.difficultyFilterSignal();
    const sortType = this.sortTypeSignal();

    if (tier !== 'all') {
      result = result.filter(hero => hero.tier === tier);
    }

    if (difficulty !== 'all') {
      result = result.filter(hero => hero.difficulty === difficulty);
    }

    if (sortType === 'winrate') {
      result.sort((a, b) => b.winRate - a.winRate);
    } else {
      result.sort((a, b) => b.pickRate - a.pickRate);
    }

    return result;
  });

  readonly topHeroes = computed(() => 
    HEROES_BY_WINRATE.slice(0, 5)
  );

  /**
   * 设置 Tier 筛选
   */
  setTierFilter(tier: string): void {
    this.tierFilterSignal.set(tier);
  }

  /**
   * 设置难度筛选
   */
  setDifficultyFilter(difficulty: string): void {
    this.difficultyFilterSignal.set(difficulty);
  }

  /**
   * 设置排序类型
   */
  setSortType(sortType: 'winrate' | 'pickrate'): void {
    this.sortTypeSignal.set(sortType);
  }

  /**
   * 根据 ID 获取英雄 (Signal)
   */
  getHeroByIdSignal(id: string) {
    return computed(() => 
      this.heroesSignal().find(hero => hero.id === id)
    );
  }
  
  /**
   * 获取所有英雄（用于计数器）
   */
  getAllHeroes(): Hero[] {
    return this.heroesSignal();
  }
}
