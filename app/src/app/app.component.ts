import { Component, Inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

/**
 * 根组件 - Smart Component
 * 负责导航布局和路由配置
 */
@Component({
  selector: 'hbg-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-container">
      <!-- 顶部公告栏 -->
      @if (showAnnouncement) {
        <div class="announcement-bar">
          <span class="announcement-text">📢 当前版本：32.2.2 - 数据持续更新中</span>
          <button class="announcement-close" (click)="closeAnnouncement()">✕</button>
        </div>
      }
      
      <nav class="navbar">
        <div class="nav-brand">
          <span class="logo">🔥</span>
          <h1>酒馆战旗攻略</h1>
        </div>
        
        <!-- 桌面端导航 -->
        <div class="nav-links" [class.mobile-open]="mobileMenuOpen()">
          <a routerLink="/home" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">首页</a>
          <a routerLink="/heroes" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">英雄</a>
          <a routerLink="/matches" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">比赛</a>
          <a routerLink="/daily" routerLinkActive="active" class="nav-item" (click)="closeMobileMenu()">每日</a>
        </div>
        
        <!-- 移动端汉堡菜单按钮 -->
        <button class="hamburger" (click)="toggleMobileMenu()" [class.active]="mobileMenuOpen()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <!-- 返回顶部按钮 -->
      @if (showBackToTop()) {
        <button class="back-to-top" (click)="scrollToTop()" title="返回顶部">
          ⬆️
        </button>
      }
      
      <footer class="footer">
        <p>🦞 炉石传说酒馆战棋攻略 H5 | 数据持续更新</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
    }
    
    .announcement-bar {
      background: linear-gradient(90deg, #f39c12, #e74c3c);
      padding: 0.8rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }
    
    .announcement-text {
      flex: 1;
    }
    
    .announcement-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .announcement-close:hover {
      opacity: 1;
    }
    
    .navbar {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .logo {
      font-size: 2rem;
    }
    
    .nav-brand h1 {
      font-size: 1.5rem;
      margin: 0;
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    
    .nav-item {
      color: #fff;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
    
    .nav-item:hover {
      background: rgba(243, 156, 18, 0.2);
    }
    
    .nav-item.active {
      background: linear-gradient(45deg, #f39c12, #e74c3c);
    }
    
    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }
    
    /* 汉堡菜单按钮 */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      z-index: 200;
    }
    
    .hamburger span {
      width: 25px;
      height: 3px;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s;
    }
    
    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
    
    /* 返回顶部按钮 */
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(45deg, #f39c12, #e74c3c);
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s;
      z-index: 1000;
    }
    
    .back-to-top:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
    }
    
    .footer {
      background: rgba(0, 0, 0, 0.3);
      padding: 1.5rem;
      text-align: center;
      margin-top: auto;
    }
    
    .footer p {
      margin: 0;
      opacity: 0.7;
    }
    
    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
      }
      
      .hamburger {
        display: flex;
      }
      
      .nav-links {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(26, 26, 46, 0.98);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
      }
      
      .nav-links.mobile-open {
        opacity: 1;
        visibility: visible;
      }
      
      .nav-item {
        font-size: 1.3rem;
        padding: 1rem 2rem;
      }
      
      .main-content {
        padding: 1rem;
      }
      
      .announcement-bar {
        padding: 0.6rem 1rem;
        font-size: 0.8rem;
      }
      
      .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        font-size: 1.2rem;
      }
    }
  `]
})
export class AppComponent {
  showAnnouncement = true;
  mobileMenuOpen = signal(false);
  showBackToTop = signal(false);
  
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    // 路由切换时滚动到顶部
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.document.documentElement.scrollTop = 0;
        this.document.body.scrollTop = 0;
        this.mobileMenuOpen.set(false);
      });
    
    // 监听滚动显示返回顶部按钮
    this.document.defaultView?.addEventListener('scroll', () => {
      this.showBackToTop.set(window.scrollY > 300);
    });
  }
  
  closeAnnouncement(): void {
    this.showAnnouncement = false;
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }
  
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
  
  scrollToTop(): void {
    this.document.documentElement.scrollTop = 0;
    this.document.body.scrollTop = 0;
  }
}
