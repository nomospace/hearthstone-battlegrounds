import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HEROES, HEROES_BY_WINRATE, HEROES_BY_PICKRATE } from '../../data/hero-data';
import { BUILD_GUIDES } from '../../data/build-data';

@Component({
  selector: 'hbg-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <section class="hero-section">
        <h2>🔥 欢迎来到酒馆战旗攻略</h2>
        <p class="subtitle">最全面的英雄/流派/打法指南</p>
      </section>
      
      <section class="stats-section">
        <div class="stat-card">
          <div class="stat-number">{{ heroes.length }}</div>
          <div class="stat-label">英雄</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ builds.length }}</div>
          <div class="stat-label">流派</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">T0-T3</div>
          <div class="stat-label">强度分级</div>
        </div>
      </section>
      
      <section class="top-heroes">
        <h3>🏆 热门英雄 TOP5</h3>
        <div class="hero-list">
          @for (hero of topHeroes; track hero.id) {
            <div class="hero-card" [class]="'tier-' + hero.tier.toLowerCase()">
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
          }
        </div>
        <a routerLink="/heroes" class="view-all">查看全部英雄 →</a>
      </section>
      
      <section class="top-builds">
        <h3>⚔️ 推荐流派</h3>
        <div class="build-grid">
          @for (build of topBuilds; track build.id) {
            <div class="build-card" [class]="'tier-' + build.tier.toLowerCase()">
              <div class="build-name">{{ build.name }}</div>
              <div class="build-desc">{{ build.description }}</div>
              <div class="build-meta">
                <span class="difficulty">难度：{{ build.difficulty }}</span>
              </div>
            </div>
          }
        </div>
        <a routerLink="/builds" class="view-all">查看全部流派 →</a>
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
    
    .hero-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border-left: 4px solid transparent;
    }
    
    .hero-card.tier-t0 { border-left-color: #f39c12; }
    .hero-card.tier-t1 { border-left-color: #3498db; }
    .hero-card.tier-t2 { border-left-color: #2ecc71; }
    .hero-card.tier-t3 { border-left-color: #95a5a6; }
    
    .hero-rank {
      font-size: 1.5rem;
      font-weight: bold;
      width: 40px;
      text-align: center;
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
    
    .build-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }
    
    .build-card {
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border-left: 4px solid transparent;
    }
    
    .build-card.tier-t0 { border-left-color: #f39c12; }
    .build-card.tier-t1 { border-left-color: #3498db; }
    .build-card.tier-t2 { border-left-color: #2ecc71; }
    .build-card.tier-t3 { border-left-color: #95a5a6; }
    
    .build-name {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .build-desc {
      opacity: 0.8;
      margin-bottom: 1rem;
    }
    
    .difficulty {
      font-size: 0.9rem;
      padding: 0.3rem 0.8rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      display: inline-block;
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
    }
  `]
})
export class HomeComponent {
  heroes = HEROES;
  builds = BUILD_GUIDES;
  topHeroes = HEROES_BY_WINRATE.slice(0, 5);
  topBuilds = BUILD_GUIDES.filter(b => b.tier === 'T0' || b.tier === 'T1');
}
