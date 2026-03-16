import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HEROES, HEROES_BY_WINRATE } from '../../data/hero-data';

@Component({
  selector: 'hbg-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <!-- 版本信息栏 -->
      <div class="version-bar">
        <span class="version-badge">📋 版本: 32.2.2</span>
        <span class="update-time">更新于: 2026-03-15</span>
      </div>
      
      <!-- 新手入门区 -->
      <section class="beginner-section">
        <h2>🎮 新手入门</h2>
        <div class="beginner-cards">
          <div class="beginner-card">
            <div class="card-icon">💰</div>
            <h4>金币运营</h4>
            <p>每回合买随从、升级酒馆、刷新。前期多升本，后期稳阵容。</p>
          </div>
          <div class="beginner-card">
            <div class="card-icon">⬆️</div>
            <h4>升级节奏</h4>
            <p>1-3费升2本，4-5费升3本，7费升4本，9费升5本。</p>
          </div>
          <div class="beginner-card">
            <div class="card-icon">🎯</div>
            <h4>三连技巧</h4>
            <p>3个相同随从自动合并+1/+1，获得一张高阶随从奖励。</p>
          </div>
          <div class="beginner-card">
            <div class="card-icon">🛡️</div>
            <h4>关键术语</h4>
            <p><b title="免疫一次伤害">圣盾</b> | <b title="一击必杀">剧毒</b> | <b title="必须先打">嘲讽</b> | <b title="攻击两次">风怒</b></p>
            <p class="term-hint">💡 悬停查看解释</p>
          </div>
        </div>
        <div class="beginner-heroes">
          <h4>🌟 新手推荐英雄</h4>
          <div class="recommended-list">
            @for (hero of beginnerHeroes; track hero.id) {
              <a [routerLink]="['/heroes', hero.id]" class="recommended-hero">
                <img [src]="hero.avatar" [alt]="hero.name" class="hero-thumb" onerror="this.style.display='none'">
                <div class="hero-quick-info">
                  <span class="hero-name">{{ hero.name }}</span>
                  <span class="hero-tier" [class]="'tier-' + hero.tier.toLowerCase()">{{ hero.tier }}</span>
                </div>
                <span class="win-rate">胜率 {{ hero.stats.winRate }}%</span>
              </a>
            }
          </div>
        </div>
      </section>
      
      <!-- 热门英雄 TOP5 -->
      <section class="top-heroes">
        <div class="section-header">
          <h3>🏆 热门英雄 TOP5</h3>
          <a routerLink="/heroes" class="view-all-link">查看全部 →</a>
        </div>
        <div class="hero-list">
          @for (hero of topHeroes; track hero.id) {
            <a [routerLink]="['/heroes', hero.id]" class="hero-card" [class]="'tier-' + hero.tier.toLowerCase()">
              <div class="rank-badge">{{ $index + 1 }}</div>
              <img [src]="hero.avatar" [alt]="hero.name" class="hero-avatar" onerror="this.src='assets/hero-placeholder.png'">
              <div class="hero-content">
                <div class="hero-header">
                  <span class="hero-name">{{ hero.name }}</span>
                  <span class="tier-badge" [class]="'tier-' + hero.tier.toLowerCase()">{{ hero.tier }}</span>
                </div>
                <div class="hero-meta">
                  <span class="meta-item">
                    <span class="meta-label">胜率</span>
                    <span class="meta-value">{{ hero.stats.winRate }}%</span>
                  </span>
                  <span class="meta-item">
                    <span class="meta-label">选择率</span>
                    <span class="meta-value">{{ hero.stats.pickRate }}%</span>
                  </span>
                  <span class="meta-item">
                    <span class="meta-label">平均排名</span>
                    <span class="meta-value">{{ hero.stats.avgPlacement }}</span>
                  </span>
                </div>
                <div class="hero-builds">
                  @for (build of hero.bestBuilds.slice(0, 3); track build) {
                    <span class="build-tag">{{ build }}</span>
                  }
                </div>
              </div>
              <div class="trend-indicator" [class.up]="hero.stats.trend === 'up'" [class.down]="hero.stats.trend === 'down'">
                {{ hero.stats.trend === 'up' ? '📈' : hero.stats.trend === 'down' ? '📉' : '➡️' }}
              </div>
            </a>
          }
        </div>
      </section>
      
      <!-- 强度分级卡片 -->
      <section class="tier-section">
        <h3>📊 强度分级</h3>
        <div class="tier-cards">
          @for (tier of tiers; track tier.name) {
            <div class="tier-card" [class]="'tier-' + tier.class">
              <div class="tier-header">
                <span class="tier-label">{{ tier.name }}</span>
                <span class="tier-winrate">{{ tier.avgWinRate }}%</span>
              </div>
              <p class="tier-desc">{{ tier.desc }}</p>
              <div class="tier-heroes">
                @for (hero of getHeroesByTier(tier.name).slice(0, 4); track hero.id) {
                  <a [routerLink]="['/heroes', hero.id]" class="tier-hero-chip">
                    <img [src]="hero.avatar" [alt]="hero.name" class="chip-avatar" onerror="this.style.display='none'">
                    <span>{{ hero.name }}</span>
                  </a>
                }
                @if (getHeroesByTier(tier.name).length > 4) {
                  <span class="more-count">+{{ getHeroesByTier(tier.name).length - 4 }}</span>
                }
              </div>
            </div>
          }
        </div>
      </section>
      
      <!-- 快速导航 -->
      <section class="quick-nav">
        <h3>🧭 快速导航</h3>
        <div class="nav-grid">
          <a routerLink="/heroes" class="nav-card primary">
            <div class="nav-icon">🦸</div>
            <div class="nav-info">
              <span class="nav-title">英雄大全</span>
              <span class="nav-desc">全部{{ heroes.length }}位英雄</span>
            </div>
          </a>
          <a routerLink="/matches" class="nav-card">
            <div class="nav-icon">🎬</div>
            <div class="nav-info">
              <span class="nav-title">比赛集锦</span>
              <span class="nav-desc">精彩对局回放</span>
            </div>
          </a>
          <a routerLink="/daily" class="nav-card">
            <div class="nav-icon">🎲</div>
            <div class="nav-info">
              <span class="nav-title">每日推荐</span>
              <span class="nav-desc">今日强势英雄</span>
            </div>
          </a>
        </div>
      </section>
      
      <!-- 版本更新日志 -->
      <section class="changelog">
        <h3>📝 版本更新</h3>
        <div class="changelog-list">
          <div class="changelog-item">
            <span class="changelog-date">2026-03-15</span>
            <span class="changelog-content">新增英雄数据更新，优化移动端体验</span>
          </div>
          <div class="changelog-item">
            <span class="changelog-date">2026-03-10</span>
            <span class="changelog-content">强度分级调整：亚煞极升至T0</span>
          </div>
          <div class="changelog-item">
            <span class="changelog-date">2026-03-01</span>
            <span class="changelog-content">新增新手入门专区</span>
          </div>
        </div>
      </section>
      
      <!-- 反馈入口 -->
      <section class="feedback-section">
        <p>💡 有建议或发现错误？欢迎反馈！</p>
        <a href="mailto:jinlu_hz@126.com" class="feedback-btn">📧 联系作者</a>
      </section>
    </div>
  `,
  styles: [`
    .home {
      max-width: 1000px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    /* 版本栏 */
    .version-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    
    .version-badge {
      background: #f39c12;
      color: #000;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 600;
    }
    
    .update-time {
      opacity: 0.7;
    }
    
    /* 新手区 */
    .beginner-section {
      background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      color: #1B5E20;
    }
    
    .beginner-section h2 {
      color: #2E7D32;
      margin-bottom: 1rem;
    }
    
    .beginner-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .beginner-card {
      background: white;
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
    }
    
    .card-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .beginner-card h4 {
      margin: 0.5rem 0;
      color: #333;
    }
    
    .beginner-card p {
      font-size: 0.85rem;
      color: #666;
      margin: 0;
    }
    
    .beginner-heroes h4 {
      margin-bottom: 0.75rem;
    }
    
    .recommended-list {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    
    .recommended-hero {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: white;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      text-decoration: none;
      color: #333;
    }
    
    .hero-thumb {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    
    .hero-quick-info {
      display: flex;
      flex-direction: column;
    }
    
    .hero-quick-info .hero-name {
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .hero-tier {
      font-size: 0.7rem;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      background: #666;
      color: white;
    }
    
    .hero-tier.tier-t0 { background: #f39c12; }
    .hero-tier.tier-t1 { background: #3498db; }
    
    .win-rate {
      font-size: 0.75rem;
      color: #666;
    }
    
    /* 热门英雄 */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .section-header h3 {
      margin: 0;
    }
    
    .view-all-link {
      color: #f39c12;
      text-decoration: none;
      font-size: 0.9rem;
    }
    
    .hero-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .hero-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      border-left: 4px solid transparent;
      transition: all 0.2s;
    }
    
    .hero-card:hover {
      background: rgba(255,255,255,0.12);
      transform: translateX(4px);
    }
    
    .hero-card.tier-t0 { border-left-color: #f39c12; }
    .hero-card.tier-t1 { border-left-color: #3498db; }
    .hero-card.tier-t2 { border-left-color: #2ecc71; }
    .hero-card.tier-t3 { border-left-color: #95a5a6; }
    
    .rank-badge {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #f39c12, #e74c3c);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.9rem;
      color: white;
      flex-shrink: 0;
    }
    
    .hero-avatar {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }
    
    .hero-content {
      flex: 1;
      min-width: 0;
    }
    
    .hero-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }
    
    .hero-name {
      font-weight: 600;
      font-size: 1rem;
    }
    
    .tier-badge {
      font-size: 0.7rem;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      background: #666;
      color: white;
    }
    
    .tier-badge.tier-t0 { background: #f39c12; color: #000; }
    .tier-badge.tier-t1 { background: #3498db; }
    .tier-badge.tier-t2 { background: #2ecc71; }
    .tier-badge.tier-t3 { background: #95a5a6; }
    
    .hero-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: #aaa;
      margin-bottom: 0.25rem;
    }
    
    .meta-item {
      display: flex;
      gap: 0.25rem;
    }
    
    .meta-label {
      opacity: 0.7;
    }
    
    .meta-value {
      color: #f39c12;
      font-weight: 600;
    }
    
    .hero-builds {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .build-tag {
      font-size: 0.7rem;
      padding: 0.15rem 0.5rem;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
    }
    
    .trend-indicator {
      font-size: 1.2rem;
      opacity: 0.6;
    }
    
    .trend-indicator.up { opacity: 1; }
    .trend-indicator.down { opacity: 0.5; }
    
    /* 强度分级 */
    .tier-section {
      margin: 2rem 0;
    }
    
    .tier-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }
    
    .tier-card {
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 1rem;
      border-left: 4px solid transparent;
    }
    
    .tier-card.tier-t0 { border-left-color: #f39c12; background: rgba(243,156,18,0.1); }
    .tier-card.tier-t1 { border-left-color: #3498db; background: rgba(52,152,219,0.1); }
    .tier-card.tier-t2 { border-left-color: #2ecc71; background: rgba(46,204,113,0.1); }
    .tier-card.tier-t3 { border-left-color: #95a5a6; background: rgba(149,165,166,0.1); }
    
    .tier-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .tier-label {
      font-size: 1.25rem;
      font-weight: bold;
    }
    
    .tier-winrate {
      background: rgba(255,255,255,0.15);
      padding: 0.25rem 0.75rem;
      border-radius: 8px;
      font-size: 0.9rem;
    }
    
    .tier-desc {
      font-size: 0.85rem;
      opacity: 0.7;
      margin-bottom: 0.75rem;
    }
    
    .tier-heroes {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }
    
    .tier-hero-chip {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.6rem;
      background: rgba(255,255,255,0.1);
      border-radius: 16px;
      text-decoration: none;
      color: inherit;
      font-size: 0.8rem;
      transition: background 0.2s;
    }
    
    .tier-hero-chip:hover {
      background: rgba(255,255,255,0.2);
    }
    
    .chip-avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    
    .more-count {
      font-size: 0.8rem;
      color: #999;
    }
    
    /* 快速导航 */
    .quick-nav {
      margin: 2rem 0;
    }
    
    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .nav-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
      border: 2px solid transparent;
    }
    
    .nav-card:hover {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.2);
    }
    
    .nav-card.primary {
      background: rgba(243,156,18,0.15);
      border-color: #f39c12;
    }
    
    .nav-icon {
      font-size: 2rem;
    }
    
    .nav-info {
      display: flex;
      flex-direction: column;
    }
    
    .nav-title {
      font-weight: 600;
      color: #f39c12;
    }
    
    .nav-desc {
      font-size: 0.85rem;
      opacity: 0.7;
    }
    
    /* 更新日志 */
    .changelog {
      margin: 2rem 0;
    }
    
    .changelog-list {
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      overflow: hidden;
    }
    
    .changelog-item {
      display: flex;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-size: 0.9rem;
    }
    
    .changelog-item:last-child {
      border-bottom: none;
    }
    
    .changelog-date {
      color: #999;
      min-width: 100px;
    }
    
    .changelog-content {
      flex: 1;
    }
    
    /* 反馈 */
    .feedback-section {
      text-align: center;
      padding: 1.5rem;
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      margin-top: 2rem;
    }
    
    .feedback-section p {
      margin-bottom: 0.75rem;
      opacity: 0.8;
    }
    
    .feedback-btn {
      display: inline-block;
      padding: 0.6rem 1.5rem;
      background: rgba(255,255,255,0.1);
      border-radius: 20px;
      text-decoration: none;
      color: inherit;
      transition: background 0.2s;
    }
    
    .feedback-btn:hover {
      background: rgba(255,255,255,0.2);
    }
    
    /* 响应式 */
    @media (max-width: 600px) {
      .version-bar {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
      }
      
      .beginner-cards {
        grid-template-columns: 1fr 1fr;
      }
      
      .hero-meta {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .tier-cards {
        grid-template-columns: 1fr;
      }
      
      .changelog-item {
        flex-direction: column;
        gap: 0.25rem;
      }
    }
  `]
})
export class HomeComponent {
  heroes = HEROES;
  topHeroes = HEROES_BY_WINRATE.slice(0, 5);
  
  // 新手推荐英雄（T0和简单难度）
  beginnerHeroes = HEROES.filter(h => 
    h.tier === 'T0' || (h.tier === 'T1' && h.difficulty === '简单')
  ).slice(0, 4);
  
  tiers = [
    { name: 'T0', class: 't0', avgWinRate: 57.7, desc: '版本答案，优先选择' },
    { name: 'T1', class: 't1', avgWinRate: 54.7, desc: '强度在线，稳定上分' },
    { name: 'T2', class: 't2', avgWinRate: 52.1, desc: '特定配合下可选' },
    { name: 'T3', class: 't3', avgWinRate: 49.2, desc: '娱乐为主，慎选' }
  ];
  
  getHeroesByTier(tier: string) {
    return this.heroes.filter(h => h.tier === tier);
  }
}