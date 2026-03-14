import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HEROES, Hero } from '../../data/hero-data';

interface DailyFortune {
  fortune: string;
  luck: '大吉' | '吉' | '中吉' | '小吉' | '末吉';
  color: string;
  tips: string;
}

@Component({
  selector: 'hbg-daily-pick',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="daily-page">
      <div class="page-header">
        <h2>🎲 每日推荐</h2>
        <a routerLink="/home" class="back-home-link">🏠 返回首页</a>
      </div>
      
      <p class="page-intro">
        每日随机推荐一位英雄，看看今天的幸运之选是谁！
      </p>
      
      <!-- 今日运势 -->
      <section class="fortune-section">
        <div class="fortune-card" [style.border-color]="todayFortune().color">
          <div class="fortune-header">
            <span class="fortune-icon">📅</span>
            <span class="fortune-date">{{ currentDate }}</span>
          </div>
          <div class="fortune-main">
            <span class="fortune-luck" [style.color]="todayFortune().color">
              {{ todayFortune().luck }}
            </span>
            <span class="fortune-text">{{ todayFortune().fortune }}</span>
          </div>
          <div class="fortune-tips">💡 {{ todayFortune().tips }}</div>
        </div>
      </section>
      
      <!-- 今日推荐英雄 -->
      <section class="hero-section">
        <div class="hero-card" [class]="'tier-' + dailyHero().tier.toLowerCase()">
          <div class="hero-badge">今日推荐</div>
          
          <div class="hero-content">
            <div class="hero-avatar-container">
              <img [src]="dailyHero().avatar" [alt]="dailyHero().name" class="hero-avatar" (error)="handleImageError($event)">
              <div class="hero-tier-badge">{{ dailyHero().tier }}</div>
            </div>
            
            <div class="hero-info">
              <h3 class="hero-name">{{ dailyHero().name }}</h3>
              <div class="hero-name-en">{{ dailyHero().nameEn }}</div>
              
              <div class="hero-stats">
                <div class="stat">
                  <span class="stat-value">{{ dailyHero().winRate }}%</span>
                  <span class="stat-label">胜率</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ dailyHero().pickRate }}%</span>
                  <span class="stat-label">选择率</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ dailyHero().avgPlacement }}</span>
                  <span class="stat-label">均次</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="ability-section">
            <h4>⚡ 英雄技能</h4>
            <div class="ability-info">
              <img [src]="dailyHero().ability.icon" [alt]="dailyHero().ability.name" class="ability-icon" (error)="handleAbilityImageError($event)">
              <div>
                <div class="ability-name">{{ dailyHero().ability.name }}</div>
                <div class="ability-desc">{{ dailyHero().ability.description }}</div>
                <div class="ability-cost">💰 消耗：{{ dailyHero().ability.cost }}</div>
              </div>
            </div>
          </div>
          
          <div class="recommendation-section">
            <h4>🎯 推荐理由</h4>
            <p class="recommendation-text">{{ getRecommendationReason() }}</p>
          </div>
          
          <div class="build-section">
            <h4>🏗️ 适合流派</h4>
            <div class="build-tags">
              @for (build of dailyHero().bestBuilds; track build) {
                <span class="build-tag">{{ build }}</span>
              }
            </div>
          </div>
          
          <div class="tips-section">
            <h4>💡 使用技巧</h4>
            <ul class="tips-list">
              @for (tip of dailyHero().tips; track tip) {
                <li>{{ tip }}</li>
              }
            </ul>
          </div>
        </div>
      </section>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="refresh-btn" (click)="refreshHero()">
          🔄 换一个
        </button>
        <a [routerLink]="['/heroes', dailyHero().id]" class="detail-btn">
          📖 查看详情
        </a>
      </div>
      
      <!-- 免责声明 -->
      <div class="disclaimer">
        <p>✨ 每日推荐仅供娱乐参考，实际对局请根据发牌员和局势灵活调整</p>
      </div>
    </div>
  `,
  styles: [`
    .daily-page {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    h2 {
      font-size: 2rem;
      margin: 0;
    }
    
    .back-home-link {
      color: #f39c12;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      background: rgba(243, 156, 18, 0.1);
      transition: all 0.2s;
    }
    
    .back-home-link:hover {
      background: rgba(243, 156, 18, 0.2);
      text-decoration: none;
    }
    
    .page-intro {
      opacity: 0.8;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    
    .fortune-section {
      margin-bottom: 2rem;
    }
    
    .fortune-card {
      background: linear-gradient(135deg, rgba(243, 156, 18, 0.15), rgba(231, 76, 60, 0.15));
      border-radius: 16px;
      padding: 1.5rem;
      border: 2px solid #f39c12;
      text-align: center;
    }
    
    .fortune-header {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      opacity: 0.8;
    }
    
    .fortune-icon {
      font-size: 1.2rem;
    }
    
    .fortune-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .fortune-luck {
      font-size: 2rem;
      font-weight: bold;
    }
    
    .fortune-text {
      font-size: 1.1rem;
    }
    
    .fortune-tips {
      background: rgba(0, 0, 0, 0.2);
      padding: 0.8rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
    }
    
    .hero-section {
      margin-bottom: 2rem;
    }
    
    .hero-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2rem;
      border-left: 5px solid;
    }
    
    .hero-card.tier-t0 { border-left-color: #f39c12; }
    .hero-card.tier-t1 { border-left-color: #3498db; }
    .hero-card.tier-t2 { border-left-color: #2ecc71; }
    .hero-card.tier-t3 { border-left-color: #95a5a6; }
    
    .hero-badge {
      display: inline-block;
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      color: #fff;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    
    .hero-content {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      align-items: center;
    }
    
    .hero-avatar-container {
      position: relative;
      width: 120px;
      height: 120px;
      flex-shrink: 0;
    }
    
    .hero-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #f39c12;
    }
    
    .hero-tier-badge {
      position: absolute;
      bottom: -5px;
      right: -5px;
      background: #f39c12;
      color: #000;
      padding: 0.3rem 0.6rem;
      border-radius: 8px;
      font-weight: bold;
      font-size: 0.9rem;
    }
    
    .hero-info {
      flex: 1;
    }
    
    .hero-name {
      font-size: 2rem;
      margin: 0;
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-name-en {
      opacity: 0.7;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .hero-stats {
      display: flex;
      gap: 2rem;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-value {
      display: block;
      font-size: 1.8rem;
      font-weight: bold;
      color: #f39c12;
    }
    
    .stat-label {
      font-size: 0.85rem;
      opacity: 0.7;
    }
    
    .ability-section,
    .recommendation-section,
    .build-section,
    .tips-section {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.2rem;
      border-radius: 12px;
      margin-bottom: 1rem;
    }
    
    .ability-section h4,
    .recommendation-section h4,
    .build-section h4,
    .tips-section h4 {
      margin: 0 0 1rem 0;
      color: #f39c12;
      font-size: 1.1rem;
    }
    
    .ability-info {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .ability-icon {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      border: 2px solid #f39c12;
      object-fit: cover;
    }
    
    .ability-name {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
    
    .ability-desc {
      opacity: 0.8;
      font-size: 0.95rem;
      margin-bottom: 0.3rem;
    }
    
    .ability-cost {
      font-size: 0.85rem;
      opacity: 0.7;
    }
    
    .recommendation-text {
      line-height: 1.6;
      opacity: 0.9;
    }
    
    .build-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .build-tag {
      padding: 0.4rem 1rem;
      background: rgba(243, 156, 18, 0.2);
      border-radius: 20px;
      font-size: 0.9rem;
      border: 1px solid rgba(243, 156, 18, 0.4);
    }
    
    .tips-list {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .tips-list li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 2rem;
    }
    
    .refresh-btn,
    .detail-btn {
      padding: 0.8rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
    }
    
    .refresh-btn {
      background: rgba(243, 156, 18, 0.2);
      border: 2px solid #f39c12;
      color: #f39c12;
    }
    
    .refresh-btn:hover {
      background: rgba(243, 156, 18, 0.3);
      transform: translateY(-2px);
    }
    
    .detail-btn {
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      border: none;
      color: #fff;
    }
    
    .detail-btn:hover {
      transform: translateY(-2px);
      text-decoration: none;
    }
    
    .disclaimer {
      text-align: center;
      opacity: 0.6;
      font-size: 0.9rem;
      padding: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 768px) {
      .hero-content {
        flex-direction: column;
        text-align: center;
      }
      
      .hero-stats {
        justify-content: center;
      }
      
      .ability-info {
        flex-direction: column;
        text-align: center;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .refresh-btn,
      .detail-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class DailyPickComponent {
  readonly dailyHero = signal<Hero>(HEROES[0]);
  readonly todayFortune = signal<DailyFortune>({
    fortune: '',
    luck: '中吉',
    color: '#f39c12',
    tips: ''
  });
  
  currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  
  constructor() {
    this.generateDailyPick();
  }
  
  generateDailyPick(): void {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const randomIndex = seed % HEROES.length;
    this.dailyHero.set(HEROES[randomIndex]);
    
    // 生成今日运势
    const fortunes: DailyFortune[] = [
      { fortune: '适合上分，多玩几把', luck: '大吉', color: '#e74c3c', tips: '今天手感很好，建议多打几把' },
      { fortune: '运势不错，稳扎稳打', luck: '吉', color: '#f39c12', tips: '按照节奏打，不要贪' },
      { fortune: '平稳发展，见好就收', luck: '中吉', color: '#3498db', tips: '正常发挥即可' },
      { fortune: '小心谨慎，避免连败', luck: '小吉', color: '#2ecc71', tips: '输了就休息，不要硬玩' },
      { fortune: '宜休息，不宜上分', luck: '末吉', color: '#95a5a6', tips: '今天适合看比赛学习' }
    ];
    
    const fortuneIndex = (seed + randomIndex) % fortunes.length;
    this.todayFortune.set(fortunes[fortuneIndex]);
  }
  
  refreshHero(): void {
    const randomIndex = Math.floor(Math.random() * HEROES.length);
    this.dailyHero.set(HEROES[randomIndex]);
  }
  
  getRecommendationReason(): string {
    const hero = this.dailyHero();
    const reasons: Record<string, string> = {
      'T0': '版本答案，强度在线，无脑选就对了！',
      'T1': '强度很高，稳定上分的选择。',
      'T2': '有特定配合时很强，看发牌员给不给力。',
      'T3': '娱乐为主，玩的就是开心！'
    };
    
    let reason = reasons[hero.tier] || '看心情选择。';
    reason += ` ${hero.description}`;
    return reason;
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
  
  handleAbilityImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.style.background = 'rgba(243, 156, 18, 0.3)';
      parent.innerHTML = '⚡';
    }
  }
}
