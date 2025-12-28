/**
 * 动画系统测试
 * 验证动画系统的基本功能和可访问性合规性
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { AnimationSystem, createAnimationSystem } from './AnimationSystem';
import { ThemeVariant } from '../types/colors';

describe('AnimationSystem', () => {
  let animationSystem: AnimationSystem;
  const mockPluginId = 'test-plugin';

  beforeEach(() => {
    animationSystem = createAnimationSystem(mockPluginId);
    
    // Mock window.matchMedia for testing
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe('基本配置', () => {
    it('应该有正确的动画持续时间配置', () => {
      expect(animationSystem.duration.fast).toBe(150);
      expect(animationSystem.duration.normal).toBe(250);
      expect(animationSystem.duration.slow).toBe(350);
    });

    it('应该有正确的缓动函数配置', () => {
      expect(animationSystem.easing.ease).toBe('cubic-bezier(0.25, 0.1, 0.25, 1)');
      expect(animationSystem.easing.easeIn).toBe('cubic-bezier(0.42, 0, 1, 1)');
      expect(animationSystem.easing.easeOut).toBe('cubic-bezier(0, 0, 0.58, 1)');
      expect(animationSystem.easing.easeInOut).toBe('cubic-bezier(0.42, 0, 0.58, 1)');
    });
  });

  describe('过渡效果应用', () => {
    it('应该为指定元素生成正确的过渡CSS', () => {
      const css = animationSystem.applyTransitions('.test-element', ['background-color', 'color']);
      
      expect(css).toContain('.test-element');
      expect(css).toContain('transition: background-color 250ms');
      expect(css).toContain('color 250ms');
      expect(css).toContain('cubic-bezier(0.25, 0.1, 0.25, 1)');
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      expect(css).toContain('transition: none !important');
    });

    it('应该处理多个CSS属性', () => {
      const properties = ['opacity', 'transform', 'box-shadow'];
      const css = animationSystem.applyTransitions('.multi-prop', properties);
      
      properties.forEach(prop => {
        expect(css).toContain(prop);
      });
    });
  });

  describe('可访问性支持', () => {
    it('应该检测用户的减少动画偏好', () => {
      // Mock prefers-reduced-motion: reduce
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(animationSystem.respectMotionPreferences()).toBe(true);
    });

    it('应该在不支持matchMedia的环境中返回false', () => {
      // @ts-ignore
      delete window.matchMedia;
      
      expect(animationSystem.respectMotionPreferences()).toBe(false);
    });
  });

  describe('悬停效果生成', () => {
    it('应该为所有主题变体生成悬停效果CSS', () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      variants.forEach(variant => {
        const css = animationSystem.generateHoverEffects(variant);
        
        expect(css).toContain('transition:');
        expect(css).toContain('.orca-button');
        expect(css).toContain('nav#sidebar .item');
        expect(css).toContain(':hover');
        expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      });
    });

    it('应该包含按钮变换效果', () => {
      const css = animationSystem.generateHoverEffects('night');
      
      expect(css).toContain('transform: translateY(-1px)');
      expect(css).toContain('.orca-button:hover');
    });
  });

  describe('模态框动画生成', () => {
    it('应该生成模态框淡入动画', () => {
      const css = animationSystem.generateModalAnimations('night');
      
      expect(css).toContain('@keyframes modalFadeIn');
      expect(css).toContain('opacity: 0');
      expect(css).toContain('transform: scale(0.95)');
      expect(css).toContain('.orca-modal');
      expect(css).toContain('animation:');
    });

    it('应该包含背景遮罩动画', () => {
      const css = animationSystem.generateModalAnimations('storm');
      
      expect(css).toContain('@keyframes backdropFadeIn');
      expect(css).toContain('.orca-modal-backdrop');
    });

    it('应该包含面板滑入动画', () => {
      const css = animationSystem.generateModalAnimations('light');
      
      expect(css).toContain('@keyframes panelSlideIn');
      expect(css).toContain('transform: translateX(-100%)');
      expect(css).toContain('.orca-panel');
    });
  });

  describe('焦点指示器生成', () => {
    it('应该生成通用焦点指示器', () => {
      const css = animationSystem.generateFocusIndicators('night');
      
      expect(css).toContain('*:focus');
      expect(css).toContain('outline: 2px solid');
      expect(css).toContain('outline-offset: 2px');
    });

    it('应该为不同组件生成特定的焦点指示器', () => {
      const css = animationSystem.generateFocusIndicators('storm');
      
      expect(css).toContain('.orca-button:focus');
      expect(css).toContain('.orca-input-input:focus-within');
      expect(css).toContain('nav#sidebar .item:focus');
      expect(css).toContain('.orca-switch:focus');
    });

    it('应该支持高对比度模式', () => {
      const css = animationSystem.generateFocusIndicators('light');
      
      expect(css).toContain('@media (prefers-contrast: high)');
      expect(css).toContain('outline-width: 3px');
    });
  });

  describe('微交互效果', () => {
    it('应该生成按钮按下效果', () => {
      const css = animationSystem.generateMicroInteractions('night');
      
      expect(css).toContain('.orca-button:active');
      expect(css).toContain('transform: translateY(1px) scale(0.98)');
    });

    it('应该包含开关切换动画', () => {
      const css = animationSystem.generateMicroInteractions('storm');
      
      expect(css).toContain('.orca-switch-toggle');
      expect(css).toContain('transform: translateX(100%)');
    });

    it('应该包含复选框勾选动画', () => {
      const css = animationSystem.generateMicroInteractions('light');
      
      expect(css).toContain('@keyframes checkboxCheck');
      expect(css).toContain('.orca-checkbox');
    });
  });

  describe('完整动画CSS生成', () => {
    it('应该生成包含所有动画效果的完整CSS', () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      variants.forEach(variant => {
        const css = animationSystem.generateAnimationCSS(variant);
        
        // 验证包含所有主要部分
        expect(css).toContain('Tokyo Night 动画系统');
        expect(css).toContain(variant);
        expect(css).toContain('will-change');
        expect(css).toContain('@media (prefers-reduced-motion: reduce)');
        
        // 验证包含各种动画效果
        expect(css).toContain(':hover');
        expect(css).toContain(':focus');
        expect(css).toContain('@keyframes');
        expect(css).toContain('transition:');
      });
    });

    it('应该包含性能优化设置', () => {
      const css = animationSystem.generateAnimationCSS('night');
      
      expect(css).toContain('will-change: auto');
      expect(css).toContain('will-change: transform, opacity');
      expect(css).toContain('.animation-complete');
    });
  });

  describe('工厂函数', () => {
    it('应该创建AnimationSystem实例', () => {
      const instance = createAnimationSystem('test-id');
      
      expect(instance).toBeInstanceOf(AnimationSystem);
      expect(instance.duration.fast).toBe(150);
    });
  });

  /**
   * 属性测试：动画质量和可访问性
   * Feature: tokyo-night-theme-improvements, Property 5: Animation Quality and Accessibility
   * 验证需求 5.1, 5.2, 5.4
   */
  describe('Property 5: Animation Quality and Accessibility', () => {
    /**
     * 属性 5a: 动画时间应该适合交互类型
     * 验证不同类型的交互使用适当的动画持续时间
     */
    it('Property 5a: Animation timing should be appropriate for interaction type', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          fc.constantFrom('hover', 'modal', 'focus', 'micro'),
          
          (variant: ThemeVariant, interactionType: string) => {
            const animationSystem = createAnimationSystem('property-test');
            let css: string;
            let expectedDuration: number;
            
            // 根据交互类型获取相应的CSS和预期持续时间
            switch (interactionType) {
              case 'hover':
                css = animationSystem.generateHoverEffects(variant);
                expectedDuration = animationSystem.duration.fast; // 150ms
                break;
              case 'modal':
                css = animationSystem.generateModalAnimations(variant);
                expectedDuration = animationSystem.duration.slow; // 350ms
                break;
              case 'focus':
                css = animationSystem.generateFocusIndicators(variant);
                expectedDuration = animationSystem.duration.fast; // 150ms
                break;
              case 'micro':
                css = animationSystem.generateMicroInteractions(variant);
                expectedDuration = animationSystem.duration.normal; // 250ms
                break;
              default:
                return true; // 跳过未知类型
            }
            
            // 验证CSS包含适当的动画持续时间
            const durationPattern = new RegExp(`${expectedDuration}ms`);
            const hasCorrectDuration = durationPattern.test(css);
            
            // 验证CSS包含过渡或动画声明
            const hasTransitionOrAnimation = css.includes('transition:') || css.includes('animation:');
            
            // 验证包含减少动画的媒体查询
            const hasReducedMotionSupport = css.includes('@media (prefers-reduced-motion: reduce)');
            
            return hasCorrectDuration && hasTransitionOrAnimation && hasReducedMotionSupport;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * 属性 5b: 减少动画偏好应该被正确处理
     * 验证当用户偏好减少动画时，所有动画都被禁用
     */
    it('Property 5b: Reduced motion preferences should be properly respected', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          fc.constantFrom('hover', 'modal', 'focus', 'micro', 'complete'),
          
          (variant: ThemeVariant, animationType: string) => {
            const animationSystem = createAnimationSystem('reduced-motion-test');
            let css: string;
            
            // 获取不同类型的动画CSS
            switch (animationType) {
              case 'hover':
                css = animationSystem.generateHoverEffects(variant);
                break;
              case 'modal':
                css = animationSystem.generateModalAnimations(variant);
                break;
              case 'focus':
                css = animationSystem.generateFocusIndicators(variant);
                break;
              case 'micro':
                css = animationSystem.generateMicroInteractions(variant);
                break;
              case 'complete':
                css = animationSystem.generateAnimationCSS(variant);
                break;
              default:
                return true; // 跳过未知类型
            }
            
            // 验证包含减少动画的媒体查询
            const hasReducedMotionQuery = css.includes('@media (prefers-reduced-motion: reduce)');
            
            if (!hasReducedMotionQuery) {
              return false;
            }
            
            // 提取减少动画媒体查询内的内容
            const reducedMotionMatch = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([^}]+(?:\}[^}]*)*)\}/g);
            
            if (!reducedMotionMatch) {
              return false;
            }
            
            // 验证减少动画媒体查询中禁用了动画和过渡
            const reducedMotionContent = reducedMotionMatch.join(' ');
            const hasTransitionNone = reducedMotionContent.includes('transition: none') || 
                                    reducedMotionContent.includes('transition: none !important');
            const hasAnimationNone = reducedMotionContent.includes('animation: none') || 
                                   reducedMotionContent.includes('animation: none !important');
            const hasTransformNone = reducedMotionContent.includes('transform: none') || 
                                   reducedMotionContent.includes('transform: none !important');
            
            // 至少应该禁用过渡或动画
            return hasTransitionNone || hasAnimationNone || hasTransformNone;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * 属性 5c: 动画持续时间应该在合理范围内
     * 验证所有动画持续时间都在用户体验最佳实践范围内
     */
    it('Property 5c: Animation durations should be within reasonable UX ranges', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          
          (variant: ThemeVariant) => {
            const animationSystem = createAnimationSystem('duration-test');
            
            // 验证预定义的持续时间在合理范围内
            const { fast, normal, slow } = animationSystem.duration;
            
            // 快速动画：50-200ms（用于微交互）
            const fastInRange = fast >= 50 && fast <= 200;
            
            // 标准动画：200-400ms（用于状态变化）
            const normalInRange = normal >= 200 && normal <= 400;
            
            // 慢速动画：300-600ms（用于复杂变化）
            const slowInRange = slow >= 300 && slow <= 600;
            
            // 验证持续时间递增关系
            const correctOrder = fast < normal && normal <= slow;
            
            return fastInRange && normalInRange && slowInRange && correctOrder;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * 属性 5d: 缓动函数应该提供自然的动画感觉
     * 验证缓动函数使用标准的贝塞尔曲线值
     */
    it('Property 5d: Easing functions should provide natural animation feel', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('ease', 'easeIn', 'easeOut', 'easeInOut'),
          
          (easingType: string) => {
            const animationSystem = createAnimationSystem('easing-test');
            const easing = animationSystem.easing[easingType as keyof typeof animationSystem.easing];
            
            // 验证缓动函数是有效的CSS贝塞尔曲线
            const bezierPattern = /^cubic-bezier\(\s*([0-1](?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*([0-1](?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)$/;
            const matches = easing.match(bezierPattern);
            
            if (!matches) {
              return false;
            }
            
            // 验证贝塞尔曲线的x值在0-1范围内（CSS规范要求）
            const x1 = parseFloat(matches[1]);
            const x2 = parseFloat(matches[3]);
            
            return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * 属性 5e: 动画应该支持可访问性最佳实践
     * 验证动画系统包含所有必要的可访问性支持
     */
    it('Property 5e: Animations should support accessibility best practices', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          
          (variant: ThemeVariant) => {
            const animationSystem = createAnimationSystem('accessibility-test');
            const completeCSS = animationSystem.generateAnimationCSS(variant);
            
            // 验证包含减少动画支持
            const hasReducedMotionSupport = completeCSS.includes('@media (prefers-reduced-motion: reduce)');
            
            // 验证包含高对比度支持（在焦点指示器中）
            const hasHighContrastSupport = completeCSS.includes('@media (prefers-contrast: high)');
            
            // 验证焦点指示器有足够的对比度
            const hasFocusIndicators = completeCSS.includes('outline: 2px solid') || 
                                     completeCSS.includes('outline: 3px solid');
            
            // 验证焦点指示器有适当的偏移
            const hasOutlineOffset = completeCSS.includes('outline-offset:');
            
            // 验证包含性能优化（will-change属性）
            const hasPerformanceOptimization = completeCSS.includes('will-change:');
            
            return hasReducedMotionSupport && 
                   hasHighContrastSupport && 
                   hasFocusIndicators && 
                   hasOutlineOffset && 
                   hasPerformanceOptimization;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});