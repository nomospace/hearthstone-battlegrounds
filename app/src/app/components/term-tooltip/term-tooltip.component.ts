import { Component, input } from '@angular/core';

/**
 * 术语悬浮提示组件
 * 用于显示酒馆战棋关键术语的解释
 */

export interface TermDefinition {
  term: string;
  definition: string;
  icon?: string;
}

// 常用术语定义
export const TERM_DEFINITIONS: Record<string, TermDefinition> = {
  '圣盾': { term: '圣盾', definition: '免疫下一次伤害，无论是攻击还是技能伤害', icon: '🛡️' },
  '剧毒': { term: '剧毒', definition: '对任何随从造成伤害都会将其消灭', icon: '☠️' },
  '嘲讽': { term: '嘲讽', definition: '敌方必须先攻击嘲讽随从才能攻击其他目标', icon: '🛡️' },
  '风怒': { term: '风怒', definition: '每回合可以攻击两次', icon: '💨' },
  '超级风怒': { term: '超级风怒', definition: '每回合可以攻击四次', icon: '🌪️' },
  '复生': { term: '复生', definition: '死亡后以1点生命值复活一次', icon: '💀' },
  '亡语': { term: '亡语', definition: '随从死亡时触发的效果', icon: '👻' },
  '战吼': { term: '战吼', definition: '打出随从时立即触发的效果', icon: '📢' },
  '三连': { term: '三连', definition: '三个相同随从合并，获得+1/+1和一张高阶奖励牌', icon: '✨' },
  '酒馆': { term: '酒馆', definition: '购买随从和升级的地方，每回合自动刷新', icon: '🍺' },
  '升本': { term: '升本', definition: '升级酒馆等级，解锁更高阶随从', icon: '⬆️' },
  '冻结': { term: '冻结', definition: '随从无法行动一回合', icon: '❄️' },
  '免疫': { term: '免疫', definition: '本回合不会受到任何伤害', icon: '🌟' },
  '潜行': { term: '潜行', definition: '无法被选为攻击目标，攻击后失效', icon: '👤' },
};

@Component({
  selector: 'hbg-term-tooltip',
  standalone: true,
  template: `
    <span class="term-wrapper">
      <span class="term-text" [class.has-tooltip]="definition()">{{ term() }}</span>
      @if (definition()) {
        <span class="tooltip">
          @if (definition()?.icon) {
            <span class="tooltip-icon">{{ definition()?.icon }}</span>
          }
          <span class="tooltip-text">{{ definition()?.definition }}</span>
        </span>
      }
    </span>
  `,
  styles: [`
    .term-wrapper {
      position: relative;
      display: inline-block;
    }
    
    .term-text {
      font-weight: 600;
      color: #f39c12;
    }
    
    .term-text.has-tooltip {
      cursor: help;
      border-bottom: 1px dashed #f39c12;
    }
    
    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.95);
      color: #fff;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      white-space: nowrap;
      max-width: 280px;
      white-space: normal;
      text-align: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(243, 156, 18, 0.3);
    }
    
    .term-wrapper:hover .tooltip {
      opacity: 1;
      visibility: visible;
      bottom: calc(100% + 8px);
    }
    
    .tooltip-icon {
      font-size: 1.2rem;
      margin-right: 0.3rem;
    }
    
    .tooltip-text {
      line-height: 1.4;
    }
    
    /* 移动端：长按显示 */
    @media (max-width: 768px) {
      .term-wrapper:active .tooltip {
        opacity: 1;
        visibility: visible;
        bottom: calc(100% + 8px);
      }
    }
  `]
})
export class TermTooltipComponent {
  term = input.required<string>();
  
  definition = input<TermDefinition | null>(null);
  
  // 静态方法获取术语定义
  static getDefinition(term: string): TermDefinition | null {
    return TERM_DEFINITIONS[term] || null;
  }
}