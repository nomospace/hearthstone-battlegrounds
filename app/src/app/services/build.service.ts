import { Injectable, signal, computed } from '@angular/core';
import { BUILD_GUIDES, getBuildsByTier, getBuildsByDifficulty } from '../data/build-data';
import type { BuildGuide } from '../data/build-data';

/**
 * 流派服务 - 使用 Angular Signals 管理状态
 */
@Injectable({
  providedIn: 'root'
})
export class BuildService {
  // Signals 状态
  private readonly buildsSignal = signal<BuildGuide[]>(BUILD_GUIDES);
  private readonly tierFilterSignal = signal<string>('all');
  private readonly difficultyFilterSignal = signal<string>('all');

  // Computed 计算属性
  readonly filteredBuilds = computed(() => {
    let result = [...this.buildsSignal()];
    const tier = this.tierFilterSignal();
    const difficulty = this.difficultyFilterSignal();

    if (tier !== 'all') {
      result = result.filter(build => build.tier === tier);
    }

    if (difficulty !== 'all') {
      result = result.filter(build => build.difficulty === difficulty);
    }

    return result;
  });

  readonly topBuilds = computed(() => 
    this.buildsSignal().filter(build => build.tier === 'T0' || build.tier === 'T1')
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
   * 获取所有流派
   */
  getAllBuilds(): BuildGuide[] {
    return this.buildsSignal();
  }

  /**
   * 根据 ID 获取流派
   */
  getBuildById(id: string): BuildGuide | undefined {
    return this.buildsSignal().find(build => build.id === id);
  }

  /**
   * 重置筛选
   */
  resetFilters(): void {
    this.tierFilterSignal.set('all');
    this.difficultyFilterSignal.set('all');
  }
}
