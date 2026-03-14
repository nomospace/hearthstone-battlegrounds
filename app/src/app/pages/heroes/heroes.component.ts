import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero.service';

/**
 * 英雄列表组件 - Dumb Component
 * 使用 OnPush 变更检测策略，所有数据通过 Input 接收
 */
@Component({
  selector: 'hbg-heroes',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="heroes-page">
      <h2>🏆 英雄大全</h2>
      
      <div class="filters">
        <div class="filter-group">
          <label>按强度：</label>
          <div class="filter-buttons">
            @for (tier of tiers; track tier) {
              <button 
                [class.active]="tierFilter() === tier" 
                (click)="setTierFilter(tier)">
                {{ tier === 'all' ? '全部' : tier }}
              </button>
            }
          </div>
        </div>
        
        <div class="filter-group">
          <label>按难度：</label>
          <div class="filter-buttons">
            @for (diff of difficulties; track diff) {
              <button 
                [class.active]="difficultyFilter() === diff" 
                (click)="setDifficultyFilter(diff)">
                {{ diff === 'all' ? '全部' : diff }}
              </button>
            }
          </div>
        </div>
        
        <div class="filter-group">
          <label>排序：</label>
          <div class="filter-buttons">
            <button 
              [class.active]="sortType() === 'winrate'" 
              (click)="setSortType('winrate')">
              胜率
            </button>
            <button 
              [class.active]="sortType() === 'pickrate'" 
              (click)="setSortType('pickrate')">
              选择率
            </button>
          </div>
        </div>
      </div>
      
      <div class="heroes-grid">
        @for (hero of filteredHeroes(); track hero.id) {
          <a [routerLink]="['/heroes', hero.id]" class="hero-link">
            <div class="hero-detail-card" [class]="'tier-' + hero.tier.toLowerCase()">
            <div class="hero-header">
              <div class="hero-avatar">
                <img [src]="hero.avatar" [alt]="hero.name" class="hero-avatar-img" (error)="handleImageError($event)">
              </div>
              <div class="hero-basic">
                <h3>{{ hero.name }}</h3>
                <div class="hero-english">{{ hero.nameEn }}</div>
              </div>
              <div class="tier-badge">{{ hero.tier }}</div>
            </div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-value">{{ hero.winRate }}%</div>
                <div class="stat-label">胜率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ hero.pickRate }}%</div>
                <div class="stat-label">选择率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ hero.avgPlacement }}</div>
                <div class="stat-label">均次</div>
              </div>
            </div>
            
            <div class="hero-meta">
              <div class="meta-row">
                <span class="meta-label">难度：</span>
                <span class="meta-value">{{ hero.difficulty }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">打法：</span>
                <div class="tags">
                  @for (style of hero.playstyle; track style) {
                    <span class="tag">{{ style }}</span>
                  }
                </div>
              </div>
              <div class="meta-row">
                <span class="meta-label">推荐流派：</span>
                <div class="tags">
                  @for (build of hero.bestBuilds; track build) {
                    <span class="tag">{{ build }}</span>
                  }
                </div>
              </div>
            </div>
            
            <div class="hero-desc">
              <p>{{ hero.description }}</p>
            </div>
            
            <div class="hero-tips">
              <h4>💡 使用技巧</h4>
              <ul>
                @for (tip of hero.tips; track tip) {
                  <li>{{ tip }}</li>
                }
              </ul>
            </div>
          </div>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .heroes-page {
      max-width: 1400px;
    }
    
    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
    
    .filters {
      background: rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }
    
    .filter-group {
      margin-bottom: 1rem;
    }
    
    .filter-group:last-child {
      margin-bottom: 0;
    }
    
    .filter-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .filter-buttons button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .filter-buttons button:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .filter-buttons button.active {
      background: linear-gradient(45deg, #f39c12, #e74c3c);
    }
    
    .heroes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    
    .hero-link {
      text-decoration: none;
      color: inherit;
      display: block;
      transition: transform 0.3s;
    }

    .hero-link:hover {
      transform: translateY(-4px);
    }

    .hero-detail-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.5rem;
      border-left: 4px solid transparent;
    }
    
    .hero-detail-card.tier-t0 { border-left-color: #f39c12; }
    .hero-detail-card.tier-t1 { border-left-color: #3498db; }
    .hero-detail-card.tier-t2 { border-left-color: #2ecc71; }
    .hero-detail-card.tier-t3 { border-left-color: #95a5a6; }
    
    .hero-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .hero-avatar {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      border: 3px solid #f39c12;
      overflow: hidden;
      flex-shrink: 0;
    }
    
    .hero-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .hero-basic h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .hero-english {
      opacity: 0.7;
      font-size: 0.9rem;
    }
    
    .tier-badge {
      margin-left: auto;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: bold;
    }
    
    .tier-t0 .tier-badge { background: #f39c12; color: #000; }
    .tier-t1 .tier-badge { background: #3498db; }
    .tier-t2 .tier-badge { background: #2ecc71; }
    .tier-t3 .tier-badge { background: #95a5a6; }
    
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #f39c12;
    }
    
    .stat-label {
      font-size: 0.8rem;
      opacity: 0.7;
    }
    
    .hero-meta {
      margin-bottom: 1rem;
    }
    
    .meta-row {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: flex-start;
    }
    
    .meta-label {
      min-width: 80px;
      opacity: 0.7;
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }
    
    .tag {
      padding: 0.2rem 0.6rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      font-size: 0.85rem;
    }
    
    .hero-desc {
      margin-bottom: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
    }
    
    .hero-tips h4 {
      margin-bottom: 0.5rem;
      color: #f39c12;
    }
    
    .hero-tips ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .hero-tips li {
      margin-bottom: 0.3rem;
    }
    
    @media (max-width: 768px) {
      .heroes-grid {
        grid-template-columns: 1fr;
      }
      
      .filter-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class HeroesComponent {
  private readonly heroService = inject(HeroService);
  
  // 从服务获取 Signals
  readonly filteredHeroes = this.heroService.filteredHeroes;
  readonly tierFilter = this.heroService.tierFilterSignal;
  readonly difficultyFilter = this.heroService.difficultyFilterSignal;
  readonly sortType = this.heroService.sortTypeSignal;
  
  // 静态数据
  readonly tiers = ['all', 'T0', 'T1', 'T2', 'T3'];
  readonly difficulties = ['all', '简单', '中等', '困难'];
  
  setTierFilter(tier: string): void {
    this.heroService.setTierFilter(tier);
  }
  
  setDifficultyFilter(difficulty: string): void {
    this.heroService.setDifficultyFilter(difficulty);
  }
  
  setSortType(sortType: 'winrate' | 'pickrate'): void {
    this.heroService.setSortType(sortType);
  }
  
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.style.background = 'rgba(243, 156, 18, 0.3)';
      parent.innerHTML = '🦸';
    }
  }
}
