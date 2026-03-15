import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import type { Hero } from '../../data/hero-data';

/**
 * 英雄详情组件 - Dumb Component
 * 
 * 展示模块：
 * 1. 强度数据卡片 - 胜率、选择率、均次、前四率、趋势箭头
 * 2. 技能详解 - 技能图标、名称、消耗、说明、使用技巧
 * 3. 酒馆配合 - 推荐流派、核心卡牌
 * 4. 克制关系 - 克制谁、被谁克制
 * 5. 强势期 - 几本发力期
 * 6. 使用技巧 - 基础技巧 + 进阶技巧
 * 7. 推荐卡牌 - 已有，保持
 */
@Component({
  selector: 'hbg-hero-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (hero(); as heroData) {
      <div class="hero-detail">
        <!-- 面包屑导航 -->
        <nav class="breadcrumb">
          <a routerLink="/home">首页</a>
          <span class="separator">›</span>
          <a routerLink="/heroes">英雄大全</a>
          <span class="separator">›</span>
          <span class="current">{{ heroData.name }}</span>
        </nav>

        <!-- 图片放大查看器 -->
        @if (showImageModal()) {
          <div class="image-modal-overlay" (click)="closeImageModal()"></div>
          <div class="image-modal">
            <button class="modal-close" (click)="closeImageModal()">✕</button>
            <img [src]="modalImageUrl()" [alt]="modalImageTitle()" class="modal-image" (error)="handleModalImageError($event)">
            <div class="modal-caption">{{ modalImageTitle() }}</div>
          </div>
        }

        <!-- 英雄头部 + 强度数据 -->
        <div class="hero-header-section">
          <div class="hero-avatar-wrapper">
            <img [src]="heroData.avatar" [alt]="heroData.name" class="hero-avatar-img" (error)="handleImageError($event)" (click)="openImageModal(heroData.avatar, heroData.name)" style="cursor: pointer;" title="点击查看大图">
            <div class="tier-badge tier-{{ heroData.tier.toLowerCase() }}">{{ heroData.tier }}</div>
            <div class="click-hint">🔍 点击放大</div>
          </div>

          <div class="hero-info">
            <h2>{{ heroData.name }}</h2>
            <p class="hero-english">{{ heroData.nameEn }}</p>
            <p class="hero-description">{{ heroData.description }}</p>
            
            <!-- 强度数据卡片 -->
            <div class="stats-card">
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-label">胜率</span>
                  <span class="stat-value highlight">{{ heroData.stats.winRate }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">选择率</span>
                  <span class="stat-value">{{ heroData.stats.pickRate }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">均次</span>
                  <span class="stat-value">{{ heroData.stats.avgPlacement }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">前四率</span>
                  <span class="stat-value">{{ heroData.stats.top4Rate }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">对局数</span>
                  <span class="stat-value">{{ heroData.stats.gamesPlayed | number }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">趋势</span>
                  <span class="stat-value trend-{{ heroData.stats.trend }}">
                    @if (heroData.stats.trend === 'up') {
                      <span>📈 上升</span>
                    } @else if (heroData.stats.trend === 'down') {
                      <span>📉 下降</span>
                    } @else {
                      <span>➡️ 稳定</span>
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 英雄技能 -->
        <section class="detail-section">
          <h3 class="section-title">⚡ 英雄技能</h3>
          <div class="ability-card">
            <img [src]="heroData.ability.icon" [alt]="heroData.ability.name" class="ability-icon-img" (error)="handleImageError($event)">
            <div class="ability-info">
              <div class="ability-header">
                <h4 class="ability-name">{{ heroData.ability.name }}</h4>
                <span class="ability-cost">{{ heroData.ability.cost }}费</span>
              </div>
              <p class="ability-desc">{{ heroData.ability.description }}</p>
              @if (heroData.ability.usageTips) {
                <div class="ability-tips">
                  <strong>💡 使用时机：</strong>{{ heroData.ability.usageTips }}
                </div>
              }
              @if (heroData.ability.comboTips) {
                <div class="ability-tips">
                  <strong>⚔️ 连招技巧：</strong>{{ heroData.ability.comboTips }}
                </div>
              }
            </div>
          </div>
        </section>

        <!-- 酒馆配合 -->
        @if (heroData.tavernSynergies && heroData.tavernSynergies.length > 0) {
          <section class="detail-section">
            <h3 class="section-title">🏗️ 酒馆配合</h3>
            <div class="tavern-synergies">
              <div class="synergy-tags">
                @for (synergy of heroData.tavernSynergies; track synergy) {
                  <span class="synergy-tag">{{ synergy }}</span>
                }
              </div>
              <p class="synergy-desc">推荐围绕这些流派构建阵容</p>
            </div>
          </section>
        }

        <!-- 推荐配合卡牌 -->
        <section class="detail-section">
          <h3 class="section-title">🎯 推荐配合卡牌</h3>
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
                  @if (card.nameEn) {
                    <p class="card-english">{{ card.nameEn }}</p>
                  }
                  <div class="card-stats">
                    <span>⚔️{{ card.attack }}/{{ card.health }}❤️</span>
                  </div>
                  <p class="card-desc">{{ card.description }}</p>
                  @if (card.synergyReason) {
                    <p class="card-synergy">✨ {{ card.synergyReason }}</p>
                  }
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

        <!-- 克制关系 -->
        @if ((heroData.counters && heroData.counters.length > 0) || (heroData.counteredBy && heroData.counteredBy.length > 0)) {
          <section class="detail-section">
            <h3 class="section-title">⚔️ 克制关系</h3>
            <div class="counter-grid">
              @if (heroData.counters && heroData.counters.length > 0) {
                <div class="counter-box">
                  <h4 class="counter-title">✅ 克制</h4>
                  <div class="counter-list">
                    @for (counter of heroData.counters; track counter) {
                      <span class="counter-item">{{ counter }}</span>
                    }
                  </div>
                </div>
              }
              @if (heroData.counteredBy && heroData.counteredBy.length > 0) {
                <div class="counter-box">
                  <h4 class="counter-title">❌ 被克制</h4>
                  <div class="counter-list">
                    @for (counter of heroData.counteredBy; track counter) {
                      <span class="counter-item">{{ counter }}</span>
                    }
                  </div>
                </div>
              }
            </div>
          </section>
        }

        <!-- 强势期 -->
        @if (heroData.powerSpikes && heroData.powerSpikes.length > 0) {
          <section class="detail-section">
            <h3 class="section-title">📈 强势期</h3>
            <div class="power-spikes">
              @for (spike of heroData.powerSpikes; track spike) {
                <div class="spike-item">
                  <span class="spike-icon">🎯</span>
                  <span class="spike-text">{{ spike }}</span>
                </div>
              }
            </div>
            <p class="spikes-desc">在这些时期该英雄强度显著提升</p>
          </section>
        }

        <!-- 使用技巧 -->
        <section class="detail-section">
          <h3 class="section-title">💡 使用技巧</h3>
          <div class="tips-container">
            <div class="tips-box">
              <h4 class="tips-title">📘 基础技巧</h4>
              <ul class="tips-list">
                @for (tip of heroData.tips; track tip) {
                  <li>{{ tip }}</li>
                }
              </ul>
            </div>
            @if (heroData.advancedTips && heroData.advancedTips.length > 0) {
              <div class="tips-box advanced">
                <h4 class="tips-title">📗 进阶技巧</h4>
                <ul class="tips-list">
                  @for (tip of heroData.advancedTips; track tip) {
                    <li>{{ tip }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        </section>

        <!-- 背景故事 -->
        @if (heroData.lore) {
          <section class="detail-section">
            <h3 class="section-title">📖 背景故事</h3>
            <div class="lore-box">
              <p>{{ heroData.lore }}</p>
            </div>
          </section>
        }

        <!-- 返回链接 -->
        <div class="back-links">
          <a routerLink="/heroes" class="back-link">← 返回英雄列表</a>
          <a routerLink="/home" class="back-link">🏠 返回首页</a>
          <a routerLink="/daily" class="back-link">📅 每日推荐</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .hero-detail {
      max-width: 1000px;
      margin: 0 auto;
      padding: 1rem;
    }

    /* ========== 面包屑导航 ========== */
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 8px;
    }

    .breadcrumb a {
      color: #f39c12;
      text-decoration: none;
      transition: color 0.2s;
    }

    .breadcrumb a:hover {
      color: #ffb74d;
      text-decoration: underline;
    }

    .breadcrumb .separator {
      color: #666;
    }

    .breadcrumb .current {
      color: #fff;
      font-weight: 600;
    }

    /* ========== 头部区域 ========== */
    .hero-header-section {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }

    .hero-avatar-wrapper {
      position: relative;
      flex-shrink: 0;
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

    .hero-avatar-img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 4px solid #f39c12;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .hero-avatar-img:hover {
      transform: scale(1.05);
    }

    .tier-badge {
      position: absolute;
      bottom: -10px;
      right: -10px;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: bold;
      font-size: 0.9rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .tier-t0 { background: #f39c12; color: #000; }
    .tier-t1 { background: #3498db; color: #fff; }
    .tier-t2 { background: #2ecc71; color: #fff; }
    .tier-t3 { background: #95a5a6; color: #fff; }

    .hero-info {
      flex: 1;
      min-width: 0;
    }

    .hero-info h2 {
      margin: 0 0 0.3rem;
      font-size: 2rem;
      color: #f39c12;
    }

    .hero-english {
      opacity: 0.7;
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }

    .hero-description {
      margin: 0 0 1rem;
      opacity: 0.9;
      line-height: 1.5;
    }

    /* ========== 强度数据卡片 ========== */
    .stats-card {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid rgba(243, 156, 18, 0.3);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }

    .stat-label {
      font-size: 0.8rem;
      opacity: 0.7;
      margin-bottom: 0.3rem;
    }

    .stat-value {
      font-size: 1.2rem;
      font-weight: bold;
      color: #f39c12;
    }

    .stat-value.highlight {
      font-size: 1.4rem;
      color: #e74c3c;
    }

    .trend-up { color: #2ecc71 !important; }
    .trend-down { color: #e74c3c !important; }
    .trend-stable { color: #95a5a6 !important; }

    /* ========== 通用区块样式 ========== */
    .detail-section {
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
      margin: 0 0 1rem;
      color: #f39c12;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* ========== 技能区域 ========== */
    .ability-card {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border-left: 4px solid #f39c12;
    }

    .ability-icon-img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      flex-shrink: 0;
      background: rgba(243, 156, 18, 0.1);
      border-radius: 12px;
      padding: 5px;
    }

    .ability-info {
      flex: 1;
    }

    .ability-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .ability-name {
      margin: 0;
      font-size: 1.3rem;
      color: #f39c12;
    }

    .ability-cost {
      color: #3498db;
      font-weight: bold;
      font-size: 1rem;
    }

    .ability-desc {
      margin: 0 0 1rem;
      opacity: 0.9;
      line-height: 1.5;
    }

    .ability-tips {
      padding: 0.5rem 0.8rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    /* ========== 酒馆配合 ========== */
    .tavern-synergies {
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
    }

    .synergy-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .synergy-tag {
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #f39c12, #e67e22);
      color: #000;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.9rem;
    }

    .synergy-desc {
      margin: 0;
      opacity: 0.7;
      font-size: 0.9rem;
    }

    /* ========== 卡牌网格 ========== */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }

    .card-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      border-left: 4px solid transparent;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .card-item.tier-6 { border-left-color: #f39c12; }
    .card-item.tier-5 { border-left-color: #9b59b6; }
    .card-item.tier-4 { border-left-color: #3498db; }
    .card-item.tier-3 { border-left-color: #2ecc71; }
    .card-item.tier-2 { border-left-color: #95a5a6; }
    .card-item.tier-1 { border-left-color: #7f8c8d; }

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

    .card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }

    .card-tier {
      font-weight: bold;
      color: #f39c12;
    }

    .card-cost {
      color: #3498db;
    }

    .card-name {
      margin: 0.3rem 0;
      font-size: 1.1rem;
      font-weight: bold;
    }

    .card-english {
      margin: 0 0 0.3rem;
      font-size: 0.8rem;
      opacity: 0.6;
    }

    .card-stats {
      margin-bottom: 0.5rem;
      font-weight: bold;
      font-size: 0.9rem;
    }

    .card-desc {
      font-size: 0.85rem;
      opacity: 0.85;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .card-synergy {
      font-size: 0.8rem;
      color: #2ecc71;
      margin-bottom: 0.5rem;
      font-style: italic;
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
      font-size: 0.75rem;
    }

    /* ========== 克制关系 ========== */
    .counter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .counter-box {
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
    }

    .counter-title {
      margin: 0 0 0.8rem;
      font-size: 1rem;
      color: #f39c12;
    }

    .counter-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .counter-item {
      padding: 0.4rem 0.8rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      font-size: 0.9rem;
    }

    /* ========== 强势期 ========== */
    .power-spikes {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .spike-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.2rem;
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: #fff;
      border-radius: 12px;
      font-weight: bold;
    }

    .spike-icon {
      font-size: 1.2rem;
    }

    .spikes-desc {
      margin: 0;
      opacity: 0.7;
      font-size: 0.9rem;
    }

    /* ========== 使用技巧 ========== */
    .tips-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .tips-box {
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border-left: 4px solid #2ecc71;
    }

    .tips-box.advanced {
      border-left-color: #9b59b6;
    }

    .tips-title {
      margin: 0 0 0.8rem;
      font-size: 1rem;
      color: #f39c12;
    }

    .tips-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .tips-list li {
      padding: 0.6rem 0.8rem;
      margin-bottom: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border-left: 3px solid #2ecc71;
      line-height: 1.4;
    }

    .tips-box.advanced .tips-list li {
      border-left-color: #9b59b6;
    }

    /* ========== 背景故事 ========== */
    .lore-box {
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      border-left: 4px solid #9b59b6;
      font-style: italic;
      line-height: 1.6;
    }

    .lore-box p {
      margin: 0;
    }

    /* ========== 图片查看器 Modal ========== */
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

    /* ========== 返回链接 ========== */
    .back-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
    
    .back-link {
      color: #f39c12;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.7rem 1.2rem;
      border-radius: 8px;
      background: rgba(243, 156, 18, 0.1);
      transition: all 0.2s;
      border: 1px solid rgba(243, 156, 18, 0.3);
    }
    
    .back-link:hover {
      background: rgba(243, 156, 18, 0.2);
      text-decoration: none;
      transform: translateY(-2px);
    }

    /* ========== 响应式设计 ========== */
    @media (max-width: 768px) {
      .hero-header-section {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
      }

      .hero-avatar-wrapper {
        margin: 0 auto;
      }

      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .ability-card {
        flex-direction: column;
        text-align: center;
      }

      .ability-header {
        flex-direction: column;
        gap: 0.5rem;
      }

      .card-item {
        flex-direction: column;
      }

      .card-image-wrapper {
        width: 100%;
        height: 140px;
      }

      .tips-container {
        grid-template-columns: 1fr;
      }

      .counter-grid {
        grid-template-columns: 1fr;
      }

      .back-links {
        flex-direction: column;
        align-items: center;
      }

      .back-link {
        width: 100%;
        max-width: 250px;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .hero-info h2 {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 1.2rem;
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

  handleModalImageError(event: Event): void {
    console.error('Modal image load failed:', event);
    alert('图片加载失败，可能是网络问题或图片链接失效');
  }

  getCardTierClass(tier: number): string {
    return String(tier);
  }
}
