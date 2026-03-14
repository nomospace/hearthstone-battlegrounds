import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Match {
  id: string;
  title: string;
  date: string;
  url: string;
  description: string;
  category: 'domestic' | 'international' | 'highlights';
  thumbnail?: string;
}

@Component({
  selector: 'hbg-matches',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="matches-page">
      <div class="page-header">
        <h2>🎬 比赛集锦</h2>
        <a routerLink="/home" class="back-home-link">🏠 返回首页</a>
      </div>
      
      <p class="page-intro">
        精选国内外精彩酒馆战棋比赛，学习顶级选手的思路与操作
      </p>
      
      <!-- 国内赛事 -->
      <section class="matches-section">
        <h3 class="section-title">🇨🇳 国内赛事</h3>
        <div class="matches-grid">
          @for (match of domesticMatches; track match.id) {
            <a [href]="match.url" target="_blank" rel="noopener noreferrer" class="match-card">
              <div class="match-header">
                <span class="match-category domestic">国内</span>
                <span class="match-date">{{ match.date }}</span>
              </div>
              <h4 class="match-title">{{ match.title }}</h4>
              <p class="match-desc">{{ match.description }}</p>
              <div class="match-link">
                <span>立即观看</span>
                <span class="arrow">→</span>
              </div>
            </a>
          }
        </div>
      </section>
      
      <!-- 国际赛事 -->
      <section class="matches-section">
        <h3 class="section-title">🌍 国际赛事</h3>
        <div class="matches-grid">
          @for (match of internationalMatches; track match.id) {
            <a [href]="match.url" target="_blank" rel="noopener noreferrer" class="match-card">
              <div class="match-header">
                <span class="match-category international">国际</span>
                <span class="match-date">{{ match.date }}</span>
              </div>
              <h4 class="match-title">{{ match.title }}</h4>
              <p class="match-desc">{{ match.description }}</p>
              <div class="match-link">
                <span>立即观看</span>
                <span class="arrow">→</span>
              </div>
            </a>
          }
        </div>
      </section>
      
      <!-- 精彩集锦 -->
      <section class="matches-section">
        <h3 class="section-title">⭐ 精彩集锦</h3>
        <div class="matches-grid">
          @for (match of highlights; track match.id) {
            <a [href]="match.url" target="_blank" rel="noopener noreferrer" class="match-card highlight">
              <div class="match-header">
                <span class="match-category highlight-cat">集锦</span>
                <span class="match-date">{{ match.date }}</span>
              </div>
              <h4 class="match-title">{{ match.title }}</h4>
              <p class="match-desc">{{ match.description }}</p>
              <div class="match-link">
                <span>立即观看</span>
                <span class="arrow">→</span>
              </div>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .matches-page {
      max-width: 1200px;
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
    
    .matches-section {
      margin: 3rem 0;
    }
    
    .section-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid rgba(243, 156, 18, 0.3);
    }
    
    .matches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    
    .match-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.5rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s;
      border: 2px solid transparent;
      display: flex;
      flex-direction: column;
    }
    
    .match-card:hover {
      transform: translateY(-5px);
      border-color: #f39c12;
      background: rgba(255, 255, 255, 0.15);
    }
    
    .match-card.highlight {
      border-left: 4px solid #f39c12;
    }
    
    .match-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .match-category {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
    }
    
    .match-category.domestic {
      background: #e74c3c;
      color: #fff;
    }
    
    .match-category.international {
      background: #3498db;
      color: #fff;
    }
    
    .match-category.highlight-cat {
      background: #f39c12;
      color: #000;
    }
    
    .match-date {
      font-size: 0.85rem;
      opacity: 0.7;
    }
    
    .match-title {
      font-size: 1.2rem;
      margin: 0 0 0.8rem 0;
      color: #f39c12;
    }
    
    .match-desc {
      flex: 1;
      opacity: 0.8;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .match-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #f39c12;
      font-weight: bold;
      margin-top: auto;
    }
    
    .arrow {
      transition: transform 0.2s;
    }
    
    .match-card:hover .arrow {
      transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
      .matches-grid {
        grid-template-columns: 1fr;
      }
      
      .page-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class MatchesComponent {
  domesticMatches: Match[] = [
    {
      id: 'd1',
      title: '2024 黄金战队联赛 - 酒馆战棋决赛',
      date: '2024-12-15',
      url: 'https://www.bilibili.com/video/BV1xxx',
      description: '国内顶级选手巅峰对决，见证新版本首个冠军的诞生。比赛充满了精彩的运营和神操作。',
      category: 'domestic'
    },
    {
      id: 'd2',
      title: '网易杯酒馆战棋邀请赛',
      date: '2024-11-20',
      url: 'https://www.bilibili.com/video/BV1yyy',
      description: '八大主播齐聚一堂，展示当前版本最强理解和打法思路。',
      category: 'domestic'
    },
    {
      id: 'd3',
      title: '虎牙酒馆战棋月度赛',
      date: '2025-01-10',
      url: 'https://www.huya.com/xxx',
      description: '月度积分赛精彩集锦，看职业选手如何稳定上分。',
      category: 'domestic'
    }
  ];
  
  internationalMatches: Match[] = [
    {
      id: 'i1',
      title: 'Hearthstone Masters - Battlegrounds',
      date: '2024-12-01',
      url: 'https://www.twitch.tv/videos/xxx',
      description: '暴雪官方大师赛，全球顶尖选手同台竞技，代表当前版本最高水平。',
      category: 'international'
    },
    {
      id: 'i2',
      title: 'DreamHack 酒馆战棋公开赛',
      date: '2024-10-25',
      url: 'https://www.twitch.tv/videos/yyy',
      description: '欧洲赛区预选赛，众多欧美知名主播参赛，风格迥异。',
      category: 'international'
    },
    {
      id: 'i3',
      title: '韩国 GSTL 联赛 - 酒馆战棋',
      date: '2025-01-05',
      url: 'https://www.afreecatv.com/xxx',
      description: '韩国职业联赛，学习韩式运营和细节处理。',
      category: 'international'
    }
  ];
  
  highlights: Match[] = [
    {
      id: 'h1',
      title: '10 大神级操作合集',
      date: '2025-01-15',
      url: 'https://www.bilibili.com/video/BV1zzz',
      description: '盘点近期比赛中的精彩操作，每一帧都是细节。',
      category: 'highlights'
    },
    {
      id: 'h2',
      title: '逆风翻盘名场面 TOP5',
      date: '2025-01-08',
      url: 'https://www.bilibili.com/video/BV1aaa',
      description: '绝境之下力挽狂澜，感受酒馆战棋的魅力。',
      category: 'highlights'
    },
    {
      id: 'h3',
      title: '新版本套路速成指南',
      date: '2025-01-12',
      url: 'https://www.bilibili.com/video/BV1bbb',
      description: '快速掌握 27.6 版本主流打法，上分必备。',
      category: 'highlights'
    },
    {
      id: 'h4',
      title: '趣味娱乐局合集',
      date: '2025-01-10',
      url: 'https://www.bilibili.com/video/BV1ccc',
      description: '欢乐时刻，感受酒馆战棋的娱乐性。',
      category: 'highlights'
    }
  ];
}
