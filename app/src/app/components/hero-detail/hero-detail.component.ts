import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import type { Hero } from '../../data/hero-data';

/**
 * 英雄详情组件 - Dumb Component
 * 显示英雄头像、技能、推荐卡牌
 */
@Component({
  selector: 'hbg-hero-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (hero(); as heroData) {
      <div class="hero-detail">
        <!-- 图片放大查看器 -->
        @if (showImageModal()) {
          <div class="image-modal-overlay" (click)="closeImageModal()"></div>
          <div class="image-modal">
            <button class="modal-close" (click)="closeImageModal()">✕</button>
            <img [src]="modalImageUrl()" [alt]="modalImageTitle()" class="modal-image">
            <div class="modal-caption">{{ modalImageTitle() }}</div>
          </div>
        }
        
        <!-- 英雄头部 -->
        <div class="hero-header-section">
          <div class="hero-avatar-wrapper">
            <img [src]="heroData.avatar" [alt]="heroData.name" class="hero-avatar-img" (error)="handleImageError($event)" (click)="openImageModal(heroData.avatar, heroData.name)" style="cursor: pointer;">
            <div class="tier-badge tier-{{ heroData.tier.toLowerCase() }}">{{ heroData.tier }}</div>
            <div class="click-hint">点击查看大图</div>
          </div>
          
          <div class="hero-info">
            <h2>{{ heroData.name }}</h2>
            <p class="hero-english">{{ heroData.nameEn }}</p>
            <div class="hero-stats-row">
              <span class="stat">胜率：<strong>{{ heroData.winRate }}%</strong></span>
              <span class="stat">选择率：<strong>{{ heroData.pickRate }}%</strong></span>
              <span class="stat">均次：<strong>{{ heroData.avgPlacement }}</strong></span>
            </div>
          </div>
        </div>

        <!-- 英雄技能 -->
        <section class="ability-section">
          <h3>⚡ 英雄技能</h3>
          <div class="ability-card">
            <img [src]="heroData.ability.icon" [alt]="heroData.ability.name" class="ability-icon-img" (error)="handleImageError($event)">
            <div class="ability-info">
              <h4>{{ heroData.ability.name }} <span class="ability-cost">({{ heroData.ability.cost }}费)</span></h4>
              <p class="ability-desc">{{ heroData.ability.description }}</p>
            </div>
          </div>
        </section>

        <!-- 推荐卡牌 -->
        <section class="synergies-section">
          <h3>🎯 推荐配合卡牌</h3>
          <div class="cards-grid">
            @for (card of heroData.synergies; track card.name) {
              <div class="card-item tier-{{ getCardTierClass(card.tier) }}">
                <div class="card-image-wrapper">
                  <img [src]="card.imageUrl" [alt]="card.name" class="card-image" (error)="handleCardImageError($event)">
                </div>
                <div class="card-content">
                  <div class="card-header">
                    <span class="card-tier">T{{ card.tier }}</span>
                    <span class="card-cost">{{ card.cost }}费</span>
                  </div>
                  <h4 class="card-name">{{ card.name }}</h4>
                  <div class="card-stats">
                    <span>⚔️{{ card.attack }}/{{ card.health }}❤️</span>
                  </div>
                  <p class="card-desc">{{ card.description }}</p>
                  <div class="card-tags">
                    @for (tag of card.tags; track tag) {
                      <span class="tag">{{ tag }}</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- 使用技巧 -->
        <section class="tips-section">
          <h3>💡 使用技巧</h3>
          <ul class="tips-list">
            @for (tip of heroData.tips; track tip) {
              <li>{{ tip }}</li>
            }
          </ul>
        </section>

        <div class="back-link">
          <a routerLink="/heroes">← 返回英雄列表</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .hero-detail {
      max-width: 900px;
      margin: 0 auto;
    }

    .hero-header-section {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
    }

    .hero-avatar-wrapper {
      position: relative;
    }
    
    .click-hint {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.75rem;
      opacity: 0.6;
      white-space: nowrap;
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

    .hero-avatar {
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      border: 4px solid #f39c12;
      overflow: hidden;
    }

    .hero-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .tier-badge {
      position: absolute;
      bottom: -10px;
      right: -10px;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: bold;
      font-size: 0.9rem;
    }

    .tier-t0 { background: #f39c12; color: #000; }
    .tier-t1 { background: #3498db; }
    .tier-t2 { background: #2ecc71; }
    .tier-t3 { background: #95a5a6; }

    .hero-info h2 {
      margin: 0 0 0.5rem;
      font-size: 2rem;
    }

    .hero-english {
      opacity: 0.7;
      margin-bottom: 1rem;
    }

    .hero-stats-row {
      display: flex;
      gap: 1.5rem;
    }

    .stat strong {
      color: #f39c12;
    }

    section {
      margin-bottom: 2rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #f39c12;
    }

    .ability-card {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border-left: 4px solid #f39c12;
    }

    .ability-icon {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(243, 156, 18, 0.2);
      border-radius: 12px;
      overflow: hidden;
    }

    .ability-icon-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 5px;
    }

    .ability-info h4 {
      margin: 0 0 0.5rem;
      font-size: 1.3rem;
    }

    .ability-cost {
      color: #3498db;
      font-size: 0.9rem;
    }

    .ability-desc {
      margin: 0;
      opacity: 0.9;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }

    .card-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border-left: 4px solid transparent;
      transition: transform 0.2s;
    }
    
    .card-item:hover {
      transform: translateY(-2px);
    }
    
    .card-image-wrapper {
      width: 100px;
      height: 140px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .card-content {
      flex: 1;
      min-width: 0;
    }

    .card-item.tier-6 { border-left-color: #f39c12; }
    .card-item.tier-5 { border-left-color: #9b59b6; }
    .card-item.tier-4 { border-left-color: #3498db; }
    .card-item.tier-3 { border-left-color: #2ecc71; }
    .card-item.tier-2 { border-left-color: #95a5a6; }
    .card-item.tier-1 { border-left-color: #7f8c8d; }

    .card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .card-tier {
      font-weight: bold;
      color: #f39c12;
    }

    .card-cost {
      color: #3498db;
    }

    .card-name {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    .card-stats {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .card-desc {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }

    .tag {
      padding: 0.2rem 0.6rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .tips-list {
      list-style: none;
      padding: 0;
    }

    .tips-list li {
      padding: 0.8rem;
      margin-bottom: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border-left: 3px solid #2ecc71;
    }

    .back-link {
      margin-top: 2rem;
      text-align: center;
    }

    .back-link a {
      color: #f39c12;
      text-decoration: none;
      font-size: 1.1rem;
    }

    .back-link a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .hero-header-section {
        flex-direction: column;
        text-align: center;
      }

      .hero-avatar {
        margin: 0 auto;
      }

      .hero-stats-row {
        justify-content: center;
      }

      .ability-card {
        flex-direction: column;
        text-align: center;
      }

      .ability-icon {
        margin: 0 auto;
      }
      
      .card-item {
        flex-direction: column;
      }
      
      .card-image-wrapper {
        width: 100%;
        height: 140px;
      }
    }
  `]
})
export class HeroDetailComponent {
  private readonly heroService = inject(HeroService);
  readonly heroId = input.required<string>();

  readonly hero = this.heroService.getHeroByIdSignal(this.heroId());
  
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

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.style.background = 'rgba(243, 156, 18, 0.3)';
      parent.innerHTML = '🖼️';
    }
  }

  handleCardImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.style.background = 'rgba(100, 100, 100, 0.3)';
      parent.innerHTML = '🃏';
    }
  }

  getCardTierClass(tier: number): string {
    return String(tier);
  }
}
