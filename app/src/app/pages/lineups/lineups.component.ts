import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LINEUPS, getLineupsByTier, getLineupsByBuild } from '../../data/lineup-data';
import type { Lineup } from '../../data/lineup-data';

/**
 * 阵容库组件
 */
@Component({
  selector: 'hbg-lineups',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lineups-page">
      <!-- 图片放大查看器 -->
      @if (showImageModal()) {
        <div class="image-modal-overlay" (click)="closeImageModal()"></div>
        <div class="image-modal">
          <button class="modal-close" (click)="closeImageModal()">✕</button>
          <img [src]="modalImageUrl()" [alt]="modalImageTitle()" class="modal-image">
          <div class="modal-caption">{{ modalImageTitle() }}</div>
        </div>
      }
      
      <h2>⚔️ 热门阵容库</h2>
      
      <div class="filters">
        <div class="filter-group">
          <label>按强度：</label>
          <div class="filter-buttons">
            @for (tier of tiers; track tier) {
              <button 
                [class.active]="tierFilter() === tier" 
                (click)="tierFilter.set(tier)">
                {{ tier === 'all' ? '全部' : tier }}
              </button>
            }
          </div>
        </div>
        
        <div class="filter-group">
          <label>按流派：</label>
          <div class="filter-buttons">
            @for (build of builds; track build) {
              <button 
                [class.active]="buildFilter() === build" 
                (click)="buildFilter.set(build)">
                {{ build === 'all' ? '全部' : build }}
              </button>
            }
          </div>
        </div>
      </div>

      <div class="lineups-grid">
        @for (lineup of filteredLineups(); track lineup.id) {
          <div class="lineup-card tier-{{ lineup.tier.toLowerCase() }}">
            <div class="lineup-header">
              <h3>{{ lineup.name }}</h3>
              <span class="tier-badge">{{ lineup.tier }}</span>
            </div>
            
            <p class="lineup-desc">{{ lineup.description }}</p>
            
            <div class="lineup-stats">
              <div class="stat">
                <span class="label">胜率</span>
                <span class="value">{{ lineup.winRate }}%</span>
              </div>
              <div class="stat">
                <span class="label">选择率</span>
                <span class="value">{{ lineup.pickRate }}%</span>
              </div>
              <div class="stat">
                <span class="label">均次</span>
                <span class="value">{{ lineup.avgPlacement }}</span>
              </div>
            </div>

            <div class="lineup-difficulty">
              难度：<span class="difficulty-{{ lineup.difficulty }}">{{ lineup.difficulty }}</span>
            </div>

            <div class="core-cards">
              <h4>🎯 核心卡牌</h4>
              <div class="cards-list">
                @for (card of getCoreCards(lineup); track card.name) {
                  <div class="card-item core-{{ card.core }}">
                    @if (card.imageUrl) {
                      <img [src]="card.imageUrl" [alt]="card.name" class="card-image" (error)="handleCardImageError($event)" (click)="openImageModal(card.imageUrl!, card.name)" style="cursor: pointer;" title="点击查看大图">
                    }
                    <div class="card-info">
                      <span class="card-tier">T{{ card.tier }}</span>
                      <span class="card-name">{{ card.name }}</span>
                      @if (card.core) {
                        <span class="core-tag">核心</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="lineup-tips">
              <h4>💡 运营思路</h4>
              <div class="game-plan">
                <div class="plan-step">
                  <span class="step-label">前期</span>
                  <span class="step-content">{{ lineup.gamePlan.early }}</span>
                </div>
                <div class="plan-step">
                  <span class="step-label">中期</span>
                  <span class="step-content">{{ lineup.gamePlan.mid }}</span>
                </div>
                <div class="plan-step">
                  <span class="step-label">后期</span>
                  <span class="step-content">{{ lineup.gamePlan.late }}</span>
                </div>
              </div>
            </div>

            <div class="lineup-matchups">
              <div class="matchup-section">
                <span class="matchup-label">克制</span>
                <div class="tags">
                  @for (counter of lineup.counters; track counter) {
                    <span class="tag counter">{{ counter }}</span>
                  }
                </div>
              </div>
              <div class="matchup-section">
                <span class="matchup-label">被克</span>
                <div class="tags">
                  @for (counter of lineup.counteredBy; track counter) {
                    <span class="tag countered">{{ counter }}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .lineups-page {
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

    .lineups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .lineup-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.5rem;
      border-left: 4px solid transparent;
    }

    .lineup-card.tier-t0 { border-left-color: #f39c12; }
    .lineup-card.tier-t1 { border-left-color: #3498db; }
    .lineup-card.tier-t2 { border-left-color: #2ecc71; }
    .lineup-card.tier-t3 { border-left-color: #95a5a6; }

    .lineup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .lineup-header h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    .tier-badge {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: bold;
    }

    .tier-t0 .tier-badge { background: #f39c12; color: #000; }
    .tier-t1 .tier-badge { background: #3498db; }
    .tier-t2 .tier-badge { background: #2ecc71; }
    .tier-t3 .tier-badge { background: #95a5a6; }

    .lineup-desc {
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .lineup-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .stat {
      text-align: center;
    }

    .stat .label {
      display: block;
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .stat .value {
      display: block;
      font-size: 1.3rem;
      font-weight: bold;
      color: #f39c12;
    }

    .lineup-difficulty {
      margin-bottom: 1rem;
    }

    .difficulty-简单 { color: #2ecc71; }
    .difficulty-中等 { color: #f39c12; }
    .difficulty-困难 { color: #e74c3c; }

    h4 {
      color: #f39c12;
      margin: 1rem 0 0.5rem;
    }

    .cards-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .card-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }

    .card-item.core-true {
      border-left: 3px solid #f39c12;
    }

    .card-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      transition: transform 0.2s;
    }
    
    .card-image:hover {
      transform: scale(1.1);
    }
    
    /* 图片查看器 Modal */
    .image-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .image-modal {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      animation: modalZoomIn 0.3s ease-out;
    }
    
    @keyframes modalZoomIn {
      from {
        transform: scale(0.8);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .modal-image {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }
    
    .modal-caption {
      text-align: center;
      color: #fff;
      margin-top: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .modal-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      padding: 0.5rem;
      transition: transform 0.2s;
    }
    
    .modal-close:hover {
      transform: scale(1.2);
    }

    .card-info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .card-tier {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .card-name {
      flex: 1;
    }

    .core-tag {
      background: #f39c12;
      color: #000;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: bold;
    }

    .game-plan {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .plan-step {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }

    .step-label {
      min-width: 50px;
      font-weight: bold;
      color: #f39c12;
    }

    .lineup-matchups {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }

    .matchup-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .matchup-label {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }

    .tag {
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .tag.counter {
      background: rgba(46, 204, 113, 0.3);
      border: 1px solid #2ecc71;
    }

    .tag.countered {
      background: rgba(231, 76, 60, 0.3);
      border: 1px solid #e74c3c;
    }

    @media (max-width: 768px) {
      .lineups-grid {
        grid-template-columns: 1fr;
      }

      .lineup-matchups {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LineupsComponent {
  readonly tierFilter = signal<string>('all');
  readonly buildFilter = signal<string>('all');
  
  // 图片查看器
  readonly showImageModal = signal<boolean>(false);
  readonly modalImageUrl = signal<string>('');
  readonly modalImageTitle = signal<string>('');
  
  openImageModal(imageUrl: string, title: string): void {
    this.modalImageUrl.set(imageUrl);
    this.modalImageTitle.set(title);
    this.showImageModal.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  closeImageModal(): void {
    this.showImageModal.set(false);
  }

  readonly tiers = ['all', 'T0', 'T1', 'T2'];
  readonly builds = ['all', '野兽', '元素', '恶魔', '机械', '龙族', '亡语'];

  readonly filteredLineups = computed(() => {
    let result = [...LINEUPS];
    const tier = this.tierFilter();
    const build = this.buildFilter();

    if (tier !== 'all') {
      result = result.filter(l => l.tier === tier);
    }

    if (build !== 'all') {
      result = result.filter(l => l.build === build);
    }

    return result;
  });

  getCoreCards(lineup: Lineup) {
    return lineup.cards.filter(c => c.core);
  }

  handleCardImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
