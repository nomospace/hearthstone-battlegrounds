import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HEROES, HEROES_BY_WINRATE } from '../../data/hero-data';

@Component({
  selector: 'hbg-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <section class="hero-section">
        <h2>🍺 欢迎来到酒馆战棋攻略</h2>
        <p class="subtitle">最全面的英雄/技能/配合指南</p>
      </section>
      
      <section class="stats-section">
        <div class="stat-card">
          <div class="stat-number">{{ heroes.length }}</div>
          <div class="stat-label">英雄</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">T0-T3</div>
          <div class="stat-label">强度分级</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">100+</div>
          <div class="stat-label">卡牌配合</div>
        </div>
      </section>
      
      <section class="top-heroes">
        <h3>🏆 热门英雄 TOP5</h3>
        <div class="hero-list">
          @for (hero of topHeroes; track hero.id) {
            <a [routerLink]="['/heroes', hero.id]" class="hero-link">
              <div class="hero-card" [class]="'tier-' + hero.tier.toLowerCase()">
                <img [src]="hero.avatar" [alt]="hero.name" class="hero-avatar" (error)="handleImageError($event)">
                <div class="hero-rank">{{ $index + 1 }}</div>
                <div class="hero-info">
                  <div class="hero-name">{{ hero.name }}</div>
                  <div class="hero-stats">
                    <span class="stat">胜率 {{ hero.winRate }}%</span>
                    <span class="stat">选择率 {{ hero.pickRate }}%</span>
                  </div>
                </div>
                <div class="hero-tier">{{ hero.tier }}</div>
              </div>
            </a>
          }
        </div>
        <a routerLink="/heroes" class="view-all">查看全部 {{ heroes.length }} 位英雄 →</a>
      </section>
      
      <section class="features-section">
        <h3>📚 攻略内容</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🦸</div>
            <h4>英雄大全</h4>
            <p>所有英雄的详细信息，包括技能、胜率、选择率</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h4>技能解析</h4>
            <p>每个英雄技能的详细用法和时机</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h4>配合推荐</h4>
            <p>每个英雄的最佳配合卡牌和打法思路</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h4>强度分级</h4>
            <p>T0-T3 强度排名，帮你快速选择</p>
          </div>
        </div>
      </section>
      
      <section class="tier-overview">
        <h3>📊 强度分级概览</h3>
        <div class="tier-grid">
          @for (tier of tiers; track tier.name) {
            <div class="tier-card" [class]="'tier-' + tier.class">
              <div class="tier-header">
                <span class="tier-name">{{ tier.name }}</span>
                <span class="tier-count">{{ tier.count }} 位</span>
              </div>
              <div class="tier-desc">{{ tier.desc }}</div>
              <div class="tier-heroes">
                @for (hero of getHeroesByTier(tier.name); track hero.id) {
                  <a [routerLink]="['/heroes', hero.id]" class="tier-hero-tag">{{ hero.name }}</a>
                }
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .hero-section {
      text-align: center;
      padding: 3rem 0;
    }
    
    .hero-section h2 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
    }
    
    .stats-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .stat-label {
      margin-top: 0.5rem;
      opacity: 0.8;
    }
    
    section {
      margin: 3rem 0;
    }
    
    h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
    
    .hero-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .hero-link {
      text-decoration: none;
      color: inherit;
    }
    
    .hero-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border-left: 4px solid transparent;
      transition: transform 0.2s, background 0.2s;
    }
    
    .hero-card:hover {
      transform: translateX(5px);
      background: rgba(255, 255, 255, 0.15);
    }
    
    .hero-card.tier-t0 { border-left-color: #f39c12; }
    .hero-card.tier-t1 { border-left-color: #3498db; }
    .hero-card.tier-t2 { border-left-color: #2ecc71; }
    .hero-card.tier-t3 { border-left-color: #95a5a6; }
    
    .hero-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f39c12;
    }
    
    .hero-rank {
      font-size: 1.5rem;
      font-weight: bold;
      width: 40px;
      text-align: center;
      color: #f39c12;
    }
    
    .hero-info {
      flex: 1;
    }
    
    .hero-name {
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .hero-stats {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    .hero-tier {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: bold;
    }
    
    .tier-t0 .hero-tier { background: #f39c12; color: #000; }
    .tier-t1 .hero-tier { background: #3498db; }
    .tier-t2 .hero-tier { background: #2ecc71; }
    .tier-t3 .hero-tier { background: #95a5a6; }
    
    .features-section {
      margin: 4rem 0;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      transition: transform 0.2s;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature-card h4 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      color: #f39c12;
    }
    
    .feature-card p {
      opacity: 0.8;
      font-size: 0.95rem;
    }
    
    .tier-overview {
      margin: 4rem 0;
    }
    
    .tier-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .tier-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      border-radius: 16px;
      border-left: 4px solid transparent;
    }
    
    .tier-card.tier-t0 { border-left-color: #f39c12; }
    .tier-card.tier-t1 { border-left-color: #3498db; }
    .tier-card.tier-t2 { border-left-color: #2ecc71; }
    .tier-card.tier-t3 { border-left-color: #95a5a6; }
    
    .tier-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .tier-name {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .tier-count {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.9rem;
    }
    
    .tier-desc {
      opacity: 0.7;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .tier-heroes {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tier-hero-tag {
      padding: 0.3rem 0.8rem;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      font-size: 0.85rem;
      text-decoration: none;
      color: inherit;
      transition: background 0.2s;
    }
    
    .tier-hero-tag:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    
    .view-all {
      display: block;
      text-align: center;
      margin-top: 1.5rem;
      color: #f39c12;
      text-decoration: none;
      font-size: 1.1rem;
    }
    
    .view-all:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .hero-section h2 {
        font-size: 1.8rem;
      }
      
      .stats-section {
        grid-template-columns: 1fr;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .tier-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  heroes = HEROES;
  topHeroes = HEROES_BY_WINRATE.slice(0, 5);
  
  tiers = [
    { name: 'T0', class: 't0', count: 0, desc: '版本答案，无脑选' },
    { name: 'T1', class: 't1', count: 0, desc: '强度在线，稳定上分' },
    { name: 'T2', class: 't2', count: 0, desc: '有特定配合时可选' },
    { name: 'T3', class: 't3', count: 0, desc: '娱乐为主，慎选' }
  ];
  
  constructor() {
    // 计算每个分级的英雄数量
    this.tiers.forEach(tier => {
      tier.count = this.heroes.filter(h => h.tier === tier.name).length;
    });
  }
  
  getHeroesByTier(tier: string) {
    return this.heroes.filter(h => h.tier === tier);
  }
  
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
