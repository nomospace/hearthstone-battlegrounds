import { Injectable, signal, computed } from '@angular/core';
import type { Hero } from '../data/hero-data';

export interface HeroComparison {
  hero1: Hero;
  hero2: Hero;
  winRateDiff: number;
  pickRateDiff: number;
  avgPlacementDiff: number;
  betterHero: Hero;
}

/**
 * 英雄对比服务
 */
@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private readonly selectedHeroesSignal = signal<Hero[]>([]);

  readonly selectedHeroes = this.selectedHeroesSignal;
  readonly canCompare = computed(() => this.selectedHeroesSignal().length >= 2);

  /**
   * 添加英雄到对比列表
   */
  addHero(hero: Hero): void {
    const current = this.selectedHeroesSignal();
    if (current.find(h => h.id === hero.id)) {
      return; // 已存在
    }
    if (current.length >= 3) {
      this.selectedHeroesSignal.set([hero]); // 最多 3 个
    } else {
      this.selectedHeroesSignal.set([...current, hero]);
    }
  }

  /**
   * 移除英雄
   */
  removeHero(heroId: string): void {
    const current = this.selectedHeroesSignal();
    this.selectedHeroesSignal.set(current.filter(h => h.id !== heroId));
  }

  /**
   * 清空对比列表
   */
  clear(): void {
    this.selectedHeroesSignal.set([]);
  }

  /**
   * 对比两个英雄
   */
  compareHeroes(hero1: Hero, hero2: Hero): HeroComparison {
    const winRateDiff = hero1.winRate - hero2.winRate;
    const pickRateDiff = hero1.pickRate - hero2.pickRate;
    const avgPlacementDiff = hero2.avgPlacement - hero1.avgPlacement; // 越低越好

    const score1 = hero1.winRate * 0.5 + (4 - hero1.avgPlacement) * 10;
    const score2 = hero2.winRate * 0.5 + (4 - hero2.avgPlacement) * 10;

    return {
      hero1,
      hero2,
      winRateDiff,
      pickRateDiff,
      avgPlacementDiff,
      betterHero: score1 > score2 ? hero1 : hero2
    };
  }

  /**
   * 获取对比数据（多个英雄）
   */
  getComparisonData(): HeroComparison[] {
    const heroes = this.selectedHeroesSignal();
    const comparisons: HeroComparison[] = [];

    for (let i = 0; i < heroes.length - 1; i++) {
      for (let j = i + 1; j < heroes.length; j++) {
        comparisons.push(this.compareHeroes(heroes[i], heroes[j]));
      }
    }

    return comparisons;
  }

  /**
   * 获取最佳英雄
   */
  getBestHero(): Hero | null {
    const heroes = this.selectedHeroesSignal();
    if (heroes.length === 0) return null;

    return heroes.reduce((best, current) => {
      const bestScore = best.winRate * 0.5 + (4 - best.avgPlacement) * 10;
      const currentScore = current.winRate * 0.5 + (4 - current.avgPlacement) * 10;
      return currentScore > bestScore ? current : best;
    });
  }
}
