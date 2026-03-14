import { Component } from '@angular/core';
import { BUILD_GUIDES, getBuildsByTier, getBuildsByDifficulty } from '../../data/build-data';

@Component({
  selector: 'hbg-builds',
  standalone: true,
  template: `
    <div class="builds-page">
      <!-- 图片放大查看器 -->
      @if (showImageModal) {
        <div class="image-modal-overlay" (click)="closeImageModal()"></div>
        <div class="image-modal">
          <button class="modal-close" (click)="closeImageModal()">✕</button>
          <img [src]="modalImageUrl" [alt]="modalImageTitle" class="modal-image">
          <div class="modal-caption">{{ modalImageTitle }}</div>
        </div>
      }
      
      <h2>⚔️ 流派攻略</h2>
      
      <div class="filters">
        <div class="filter-group">
          <label>按强度：</label>
          <div class="filter-buttons">
            <button [class.active]="tierFilter === 'all'" (click)="tierFilter = 'all'">全部</button>
            <button [class.active]="tierFilter === 'T0'" (click)="tierFilter = 'T0'">T0</button>
            <button [class.active]="tierFilter === 'T1'" (click)="tierFilter = 'T1'">T1</button>
            <button [class.active]="tierFilter === 'T2'" (click)="tierFilter = 'T2'">T2</button>
          </div>
        </div>
        
        <div class="filter-group">
          <label>按难度：</label>
          <div class="filter-buttons">
            <button [class.active]="diffFilter === 'all'" (click)="diffFilter = 'all'">全部</button>
            <button [class.active]="diffFilter === '简单'" (click)="diffFilter = '简单'">简单</button>
            <button [class.active]="diffFilter === '中等'" (click)="diffFilter = '中等'">中等</button>
            <button [class.active]="diffFilter === '困难'" (click)="diffFilter = '困难'">困难</button>
          </div>
        </div>
      </div>
      
      <div class="builds-list">
        @for (build of filteredBuilds; track build.id) {
          <div class="build-detail-card" [class]="'tier-' + build.tier.toLowerCase()">
            <div class="build-header">
              <h3>{{ build.name }} <span class="build-en">{{ build.nameEn }}</span></h3>
              <div class="tier-badge">{{ build.tier }}</div>
            </div>
            
            <div class="build-desc">{{ build.description }}</div>
            
            <div class="build-meta">
              <span class="difficulty-tag">难度：{{ build.difficulty }}</span>
            </div>
            
            <div class="core-cards">
              <h4>🎯 核心卡牌</h4>
              <div class="cards-grid">
                @for (card of build.coreCards; track card.name) {
                  <div class="card-item" [class]="'priority-' + card.priority">
                    @if (card.imageUrl) {
                      <img [src]="card.imageUrl" [alt]="card.name" class="card-image" (error)="handleCardImageError($event)" (click)="openImageModal(card.imageUrl!, card.name)" style="cursor: pointer;" title="点击查看大图">
                    }
                    <div class="card-info">
                      <div class="card-name">{{ card.name }}</div>
                      <div class="card-desc">{{ card.description }}</div>
                    </div>
                    <div class="priority-badge">{{ card.priority }}</div>
                  </div>
                }
              </div>
            </div>
            
            <div class="game-plan">
              <h4>📋 运营思路</h4>
              <div class="plan-steps">
                <div class="plan-step">
                  <div class="step-label">前期 (1-3 本)</div>
                  <div class="step-content">{{ build.gamePlan.early }}</div>
                </div>
                <div class="plan-step">
                  <div class="step-label">中期 (4-5 本)</div>
                  <div class="step-content">{{ build.gamePlan.mid }}</div>
                </div>
                <div class="plan-step">
                  <div class="step-label">后期 (6 本)</div>
                  <div class="step-content">{{ build.gamePlan.late }}</div>
                </div>
              </div>
            </div>
            
            <div class="build-tips">
              <h4>💡 技巧提示</h4>
              <ul>
                @for (tip of build.tips; track tip) {
                  <li>{{ tip }}</li>
                }
              </ul>
            </div>
            
            <div class="build-matchups">
              <div class="matchup-section">
                <h5>⚠️ 克制流派</h5>
                <div class="tags">
                  @for (counter of build.counters; track counter) {
                    <span class="tag counter">{{ counter }}</span>
                  }
                </div>
              </div>
              <div class="matchup-section">
                <h5>✅ 配合流派</h5>
                <div class="tags">
                  @for (syn of build.synergies; track syn) {
                    <span class="tag synergy">{{ syn }}</span>
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
    .builds-page {
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
    
    .builds-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .build-detail-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2rem;
      border-left: 4px solid transparent;
    }
    
    .build-detail-card.tier-t0 { border-left-color: #f39c12; }
    .build-detail-card.tier-t1 { border-left-color: #3498db; }
    .build-detail-card.tier-t2 { border-left-color: #2ecc71; }
    .build-detail-card.tier-t3 { border-left-color: #95a5a6; }
    
    .build-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .build-header h3 {
      margin: 0;
      font-size: 1.8rem;
    }
    
    .build-en {
      font-size: 1rem;
      opacity: 0.7;
      margin-left: 0.5rem;
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
    
    .build-desc {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }
    
    .difficulty-tag {
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1.5rem;
    }
    
    h4 {
      color: #f39c12;
      margin: 1.5rem 0 1rem;
    }
    
    .core-cards {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.5rem;
      border-radius: 12px;
    }
    
    .cards-grid {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .card-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border-left: 3px solid transparent;
    }
    
    .card-item.priority-核心 { border-left-color: #e74c3c; }
    .card-item.priority-重要 { border-left-color: #f39c12; }
    .card-item.priority-过渡 { border-left-color: #3498db; }
    
    .card-image {
      width: 60px;
      height: 80px;
      object-fit: cover;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.3);
      flex-shrink: 0;
      transition: transform 0.2s;
    }
    
    .card-image:hover {
      transform: scale(1.05);
    }
    
    .card-tier {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
      min-width: 30px;
      text-align: center;
    }
    
    .card-info {
      flex: 1;
    }
    
    .card-name {
      font-weight: bold;
    }
    
    .card-desc {
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    .priority-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }
    
    .priority-核心 .priority-badge { background: #e74c3c; }
    .priority-重要 .priority-badge { background: #f39c12; }
    .priority-过渡 .priority-badge { background: #3498db; }
    
    .game-plan {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.5rem;
      border-radius: 12px;
    }
    
    .plan-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .plan-step {
      display: flex;
      gap: 1rem;
    }
    
    .step-label {
      min-width: 120px;
      font-weight: bold;
      color: #f39c12;
    }
    
    .build-tips {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.5rem;
      border-radius: 12px;
    }
    
    .build-tips ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .build-tips li {
      margin-bottom: 0.5rem;
    }
    
    .build-matchups {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .matchup-section h5 {
      margin-bottom: 0.5rem;
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tag {
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.9rem;
    }
    
    .tag.counter {
      background: rgba(231, 76, 60, 0.3);
      border: 1px solid #e74c3c;
    }
    
    .tag.synergy {
      background: rgba(46, 204, 113, 0.3);
      border: 1px solid #2ecc71;
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
      transition: transform 0.2s;
    }
    
    .modal-close:hover {
      transform: scale(1.2);
    }
    
    @media (max-width: 768px) {
      .build-matchups {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BuildsComponent {
  builds = BUILD_GUIDES;
  tierFilter = 'all';
  diffFilter = 'all';
  
  // 图片查看器
  showImageModal = false;
  modalImageUrl = '';
  modalImageTitle = '';
  
  openImageModal(imageUrl: string, title: string): void {
    this.modalImageUrl = imageUrl;
    this.modalImageTitle = title;
    this.showImageModal = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  closeImageModal(): void {
    this.showImageModal = false;
  }
  
  handleCardImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
  
  get filteredBuilds() {
    let result = [...this.builds];
    
    if (this.tierFilter !== 'all') {
      result = result.filter(b => b.tier === this.tierFilter);
    }
    
    if (this.diffFilter !== 'all') {
      result = result.filter(b => b.difficulty === this.diffFilter);
    }
    
    return result;
  }
}
