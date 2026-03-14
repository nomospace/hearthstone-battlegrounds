import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { HEROES } from '../../data/hero-data';

/**
 * 英雄计数器组件 - 对局中记录遇到的英雄
 */
@Component({
  selector: 'hbg-counter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="counter-page">
      <h2>🎯 英雄计数器</h2>
      <p class="subtitle">记录本局遇到的英雄，查看克制关系</p>
      
      <div class="counter-controls">
        <button class="btn-reset" (click)="resetCounter()">
          🔄 重置计数器
        </button>
        <span class="count-info">已记录 {{ selectedHeroes.length }} / 7 位英雄</span>
      </div>
      
      @if (selectedHeroes.length > 0) {
        <div class="selected-heroes">
          <h3>✅ 已记录英雄</h3>
          <div class="heroes-list">
            @for (hero of selectedHeroes; track hero.id) {
              <div class="hero-item">
                <img [src]="hero.avatar" [alt]="hero.name" class="hero-avatar" (error)="handleImageError($event)">
                <div class="hero-info">
                  <div class="hero-name">{{ hero.name }}</div>
                  @if (hero.counters && hero.counters.length > 0) {
                    <div class="hero-counters">
                      <span class="label">克制：</span>
                      @for (counter of hero.counters; track counter) {
                        <span class="counter-tag">{{ counter }}</span>
                      }
                    </div>
                  }
                </div>
                <button class="remove-btn" (click)="removeHero(hero.id)">✕</button>
              </div>
            }
          </div>
        </div>
        
        @if (selectedHeroes.length >= 2) {
          <div class="analysis-section">
            <h3>📊 局势分析</h3>
            <div class="analysis-cards">
              <div class="analysis-card">
                <div class="analysis-value">{{ getAverageWinRate() }}%</div>
                <div class="analysis-label">平均胜率</div>
              </div>
              <div class="analysis-card">
                <div class="analysis-value">{{ getTop4Rate() }}%</div>
                <div class="analysis-label">平均前四率</div>
              </div>
              <div class="analysis-card">
                <div class="analysis-value">{{ getDangerLevel() }}</div>
                <div class="analysis-label">危险等级</div>
              </div>
            </div>
          </div>
        }
      }
      
      <div class="all-heroes-section">
        <h3>🦸 点击添加英雄</h3>
        <div class="heroes-grid">
          @for (hero of availableHeroes; track hero.id) {
            <button class="hero-btn" (click)="addHero(hero)" [disabled]="isHeroSelected(hero.id)">
              <img [src]="hero.avatar" [alt]="hero.name" class="hero-avatar" (error)="handleImageError($event)">
              <div class="hero-name">{{ hero.name }}</div>
              <div class="tier-badge tier-{{ hero.tier.toLowerCase() }}">{{ hero.tier }}</div>
            </button>
          }
        </div>
      </div>
      
      <div class="back-links">
        <a routerLink="/heroes" class="back-link">← 返回英雄列表</a>
        <a routerLink="/home" class="back-link">🏠 返回首页</a>
      </div>
    </div>
  `,
  styles: [`
    .counter-page {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      opacity: 0.7;
      margin-bottom: 2rem;
    }
    
    .counter-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
    }
    
    .btn-reset {
      padding: 0.6rem 1.2rem;
      background: rgba(231, 76, 60, 0.3);
      border: 1px solid #e74c3c;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-reset:hover {
      background: rgba(231, 76, 60, 0.5);
    }
    
    .count-info {
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    section {
      margin-bottom: 2rem;
    }
    
    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #f39c12;
    }
    
    .heroes-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .hero-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border-left: 4px solid #f39c12;
    }
    
    .hero-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f39c12;
    }
    
    .hero-info {
      flex: 1;
    }
    
    .hero-name {
      font-weight: bold;
      margin-bottom: 0.3rem;
    }
    
    .hero-counters {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
    }
    
    .label {
      opacity: 0.7;
    }
    
    .counter-tag {
      padding: 0.2rem 0.6rem;
      background: rgba(46, 204, 113, 0.3);
      border: 1px solid #2ecc71;
      border-radius: 12px;
      font-size: 0.8rem;
    }
    
    .remove-btn {
      background: none;
      border: none;
      color: #e74c3c;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    .remove-btn:hover {
      opacity: 1;
    }
    
    .analysis-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .analysis-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
    }
    
    .analysis-value {
      font-size: 2rem;
      font-weight: bold;
      color: #f39c12;
      margin-bottom: 0.5rem;
    }
    
    .analysis-label {
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    .heroes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    }
    
    .hero-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      border-radius: 12px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    
    .hero-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
      border-color: #f39c12;
      transform: translateY(-2px);
    }
    
    .hero-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    
    .hero-btn .hero-avatar {
      width: 60px;
      height: 60px;
    }
    
    .hero-btn .hero-name {
      font-size: 0.85rem;
      text-align: center;
    }
    
    .tier-badge {
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: bold;
    }
    
    .tier-badge.tier-t0 { background: #f39c12; color: #000; }
    .tier-badge.tier-t1 { background: #3498db; }
    .tier-badge.tier-t2 { background: #2ecc71; }
    .tier-badge.tier-t3 { background: #95a5a6; }
    
    .back-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .back-link {
      color: #f39c12;
      text-decoration: none;
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.2s;
    }
    
    .back-link:hover {
      background: rgba(243, 156, 18, 0.2);
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .heroes-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
      
      .analysis-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CounterComponent {
  private readonly heroService = inject(HeroService);
  
  selectedHeroes: any[] = [];
  
  get availableHeroes() {
    return this.heroService.getAllHeroes();
  }
  
  isHeroSelected(heroId: string): boolean {
    return this.selectedHeroes.some(h => h.id === heroId);
  }
  
  addHero(hero: any): void {
    if (this.selectedHeroes.length >= 7 || this.isHeroSelected(hero.id)) {
      return;
    }
    this.selectedHeroes = [...this.selectedHeroes, hero];
  }
  
  removeHero(heroId: string): void {
    this.selectedHeroes = this.selectedHeroes.filter(h => h.id !== heroId);
  }
  
  resetCounter(): void {
    this.selectedHeroes = [];
  }
  
  getAverageWinRate(): string {
    if (this.selectedHeroes.length === 0) return '0';
    const sum = this.selectedHeroes.reduce((acc, h) => acc + h.winRate, 0);
    return (sum / this.selectedHeroes.length).toFixed(1);
  }
  
  getTop4Rate(): string {
    if (this.selectedHeroes.length === 0) return '0';
    const sum = this.selectedHeroes.reduce((acc, h) => acc + (h.top4Rate || 0), 0);
    return (sum / this.selectedHeroes.length).toFixed(1);
  }
  
  getDangerLevel(): string {
    const avgWinRate = parseFloat(this.getAverageWinRate());
    if (avgWinRate >= 55) return '🔴 高';
    if (avgWinRate >= 52) return '🟡 中';
    return '🟢 低';
  }
  
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
