/**
 * Property-Based Tests for Sidebar Style Manager
 * 
 * Feature: tokyo-night-theme-improvements, Property 3: Interactive State Feedback
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { SidebarStyleManager, createSidebarStyleManager } from './SidebarStyleManager';
import { ThemeVariant } from '../types/colors';
import { getVariantColors } from '../utils/colors';

// Mock DOM environment
const mockDocument = {
  createElement: vi.fn(() => ({
    id: '',
    textContent: '',
    remove: vi.fn(),
  })),
  head: {
    appendChild: vi.fn(),
    contains: vi.fn(() => true),
  },
  getElementById: vi.fn(() => null),
};

// Setup global mocks
beforeEach(() => {
  global.document = mockDocument as any;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Sidebar Style Manager', () => {
  let sidebarManager: SidebarStyleManager;

  beforeEach(() => {
    sidebarManager = createSidebarStyleManager('night', 'test-plugin');
  });

  afterEach(() => {
    sidebarManager.remove();
  });

  /**
   * Property 3: Interactive State Feedback
   * For any interactive element (buttons, sidebar items, inputs), hover and selection states 
   * should provide clear but subtle visual feedback without overwhelming the content
   * Validates: Requirements 2.2, 2.3, 6.1
   */
  test('Property 3: Interactive elements provide subtle but clear feedback across all variants', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('item', 'button', 'input', 'icon', 'calendar'),
        (variant: ThemeVariant, elementType: string) => {
          const manager = createSidebarStyleManager(variant, 'test-feedback');
          
          try {
            const colors = getVariantColors(variant);
            const config = manager.getConfig();
            
            // 验证基础配置符合微妙反馈的要求
            expect(config.backgroundOpacity).toBeLessThan(1.0); // 背景静音
            expect(config.backgroundOpacity).toBeGreaterThan(0.5); // 但仍可见
            expect(config.textOpacity).toBeLessThan(1.0); // 文本静音
            expect(config.iconOpacity).toBeLessThan(config.textOpacity); // 图标更静音
            expect(config.borderWeight).toBe('minimal'); // 最小化边框
            
            // 生成相应的CSS并验证
            const feedbackCSS = manager.generateSubtleFeedbackStyles();
            const iconCSS = manager.generateMutedIconStyles();
            const borderCSS = manager.generateMinimalBorderStyles();
            
            // 验证基础状态使用静音颜色
            expect(feedbackCSS).toContain(colors.text.secondary);
            expect(feedbackCSS).toContain(`opacity: ${config.textOpacity}`);
            
            // 验证悬停状态提供清晰但微妙的反馈
            expect(feedbackCSS).toContain(colors.ui.hover);
            expect(feedbackCSS).toContain(colors.text.primary);
            expect(feedbackCSS).toContain('opacity: 1'); // 悬停时恢复完全不透明度
            expect(feedbackCSS).toContain('transition:'); // 平滑过渡
            
            // 验证选择状态适度突出但不过分
            expect(feedbackCSS).toContain(colors.ui.selection);
            expect(feedbackCSS).toContain(colors.semantic.blue); // 左边框指示器
            expect(feedbackCSS).toContain('border-left: 2px solid');
            
            // 验证图标使用一致的静音色调
            expect(iconCSS).toContain(colors.text.muted);
            expect(iconCSS).toContain(`opacity: ${config.iconOpacity}`);
            
            // 验证边框最小化
            expect(borderCSS).toContain('border: none');
            expect(borderCSS).toContain('box-shadow: none');
            
            // 验证特定元素类型的处理
            switch (elementType) {
              case 'item':
                expect(feedbackCSS).toContain('padding: 0.4rem 0.8rem');
                expect(feedbackCSS).toContain('border-radius: 4px');
                expect(feedbackCSS).toContain('transform: translateX(2px)'); // 悬停时的微妙移动
                break;
                
              case 'input':
                const inputCSS = manager.generateInputStyles();
                expect(inputCSS).toContain(colors.background.primary);
                expect(inputCSS).toContain('opacity: 0.9'); // 降低视觉权重
                expect(inputCSS).toContain(colors.text.muted); // 占位符静音
                break;
                
              case 'icon':
                expect(iconCSS).toContain('width: 1.2rem');
                expect(iconCSS).toContain('height: 1.2rem');
                expect(iconCSS).toContain('vertical-align: middle');
                break;
                
              case 'calendar':
                const calendarCSS = manager.generateCalendarStyles();
                expect(calendarCSS).toContain(colors.semantic.cyan);
                expect(calendarCSS).toContain(colors.semantic.blue);
                expect(calendarCSS).toContain('opacity: 0.9'); // 静音但功能性
                break;
            }
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3a: Muted background colors reduce visual weight
   * For any variant, sidebar background should be muted to reduce visual prominence
   * Validates: Requirements 2.1
   */
  test('Property 3a: Muted background colors effectively reduce visual weight', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          const manager = createSidebarStyleManager(variant, 'test-muted-bg');
          
          try {
            const colors = getVariantColors(variant);
            const config = manager.getConfig();
            const mutedCSS = manager.generateMutedBackgroundStyles();
            
            // 验证使用次要背景色
            expect(mutedCSS).toContain(colors.background.secondary);
            
            // 验证整体不透明度降低
            expect(mutedCSS).toContain(`opacity: ${config.backgroundOpacity}`);
            expect(config.backgroundOpacity).toBeLessThan(1.0);
            expect(config.backgroundOpacity).toBeGreaterThan(0.7); // 不能太透明
            
            // 验证移除视觉干扰元素
            expect(mutedCSS).toContain('box-shadow: none');
            expect(mutedCSS).toContain('z-index: 5'); // 较低的层次
            
            // 验证边框极其微妙
            expect(mutedCSS).toContain(`${colors.ui.border}66`); // 66表示40%不透明度
            
            // 验证分区背景透明
            expect(mutedCSS).toContain('background-color: transparent');
            
            // 验证平滑过渡
            expect(mutedCSS).toContain(`transition: opacity ${config.hoverTransitionDuration} ease`);
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3b: Icon colors maintain consistency while being muted
   * For any variant, all sidebar icons should use consistent muted tones
   * Validates: Requirements 2.4
   */
  test('Property 3b: Icon colors maintain consistency while being appropriately muted', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('search', 'calendar', 'settings', 'folder', 'file', 'toolbar'),
        (variant: ThemeVariant, iconType: string) => {
          const manager = createSidebarStyleManager(variant, 'test-icon-consistency');
          
          try {
            const colors = getVariantColors(variant);
            const config = manager.getConfig();
            const iconCSS = manager.generateMutedIconStyles();
            
            // 验证基础图标使用静音颜色
            expect(iconCSS).toContain(colors.text.muted);
            expect(iconCSS).toContain(`opacity: ${config.iconOpacity}`);
            expect(config.iconOpacity).toBeLessThan(config.textOpacity); // 图标比文本更静音
            
            // 验证图标尺寸一致性
            expect(iconCSS).toContain('width: 1.2rem');
            expect(iconCSS).toContain('height: 1.2rem');
            expect(iconCSS).toContain('vertical-align: middle');
            
            // 验证悬停时的微妙增强
            expect(iconCSS).toContain(colors.text.secondary); // 悬停时的颜色
            expect(iconCSS).toContain('opacity: 0.9'); // 悬停时的不透明度
            
            // 验证激活状态使用主要颜色
            expect(iconCSS).toContain(colors.text.primary);
            expect(iconCSS).toContain('opacity: 1'); // 激活时完全不透明
            
            // 验证特殊功能图标的语义颜色（但仍然静音）
            switch (iconType) {
              case 'search':
                expect(iconCSS).toContain(`${colors.semantic.cyan}88`); // 88表示约53%不透明度
                break;
              case 'calendar':
                expect(iconCSS).toContain(`${colors.semantic.blue}88`);
                break;
              case 'folder':
                expect(iconCSS).toContain(`${colors.semantic.yellow}88`);
                break;
              case 'settings':
              case 'file':
                expect(iconCSS).toContain(colors.text.muted); // 使用基础静音色
                break;
              case 'toolbar':
                expect(iconCSS).toContain('opacity: 0.6'); // 工具栏图标更加静音
                break;
            }
            
            // 验证平滑过渡效果
            expect(iconCSS).toContain(`transition: color ${config.hoverTransitionDuration} ease`);
            expect(iconCSS).toContain(`opacity ${config.hoverTransitionDuration} ease`);
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3c: Border emphasis is minimized throughout sidebar elements
   * For any sidebar element, borders should be minimal or removed entirely
   * Validates: Requirements 2.5
   */
  test('Property 3c: Border emphasis is consistently minimized across all sidebar elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('main', 'items', 'inputs', 'buttons', 'dropdowns', 'tabs'),
        (variant: ThemeVariant, elementCategory: string) => {
          const manager = createSidebarStyleManager(variant, 'test-minimal-borders');
          
          try {
            const colors = getVariantColors(variant);
            const config = manager.getConfig();
            const borderCSS = manager.generateMinimalBorderStyles();
            
            // 验证边框权重配置
            expect(config.borderWeight).toBe('minimal');
            
            // 验证主侧边栏边框极其微妙
            expect(borderCSS).toContain(`${colors.ui.border}44`); // 44表示约27%不透明度
            expect(borderCSS).toContain('border-top: none');
            expect(borderCSS).toContain('border-bottom: none');
            expect(borderCSS).toContain('border-left: none');
            
            // 验证内部分隔线几乎不可见
            expect(borderCSS).toContain(`${colors.ui.border}22`); // 22表示约13%不透明度
            expect(borderCSS).toContain('height: 1px'); // 极细的分隔线
            
            // 验证项目边框完全移除
            expect(borderCSS).toContain('border: none !important');
            expect(borderCSS).toContain('outline: none !important');
            
            // 验证不同元素类别的边框处理
            switch (elementCategory) {
              case 'main':
                expect(borderCSS).toContain('border-right: 1px solid');
                expect(borderCSS).toContain(`${colors.ui.border}44`);
                break;
                
              case 'items':
                expect(borderCSS).toContain('border: none !important');
                break;
                
              case 'inputs':
                // 输入框保持功能性边框但极其微妙
                expect(borderCSS).toContain(`${colors.ui.border}66`); // 66表示40%不透明度
                expect(borderCSS).toContain('box-shadow: none');
                expect(borderCSS).toContain('border-radius: 4px');
                break;
                
              case 'buttons':
                expect(borderCSS).toContain('border: none !important');
                break;
                
              case 'dropdowns':
                // 下拉菜单保持功能性但降低视觉权重
                expect(borderCSS).toContain(`${colors.ui.border}88`); // 88表示约53%不透明度
                break;
                
              case 'tabs':
                expect(borderCSS).toContain(`${colors.ui.border}33`); // 33表示20%不透明度
                expect(borderCSS).toContain('border-bottom: 2px solid transparent');
                break;
            }
            
            // 验证焦点边框的微妙处理
            expect(borderCSS).toContain(`${colors.ui.focus}88`); // 焦点边框也要微妙
            expect(borderCSS).toContain(`${colors.ui.focus}33`); // 焦点阴影更微妙
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3d: Hover and selection states provide appropriate feedback levels
   * For any interactive state, feedback should be proportional to the element's importance
   * Validates: Requirements 2.2, 2.3
   */
  test('Property 3d: Interactive states provide proportional feedback based on element importance', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('hover', 'active', 'selected', 'focus'),
        fc.constantFrom('primary-item', 'secondary-item', 'input', 'button', 'icon'),
        (variant: ThemeVariant, interactionState: string, elementImportance: string) => {
          const manager = createSidebarStyleManager(variant, 'test-proportional-feedback');
          
          try {
            const colors = getVariantColors(variant);
            const config = manager.getConfig();
            const feedbackCSS = manager.generateSubtleFeedbackStyles();
            const iconCSS = manager.generateMutedIconStyles();
            const inputCSS = manager.generateInputStyles();
            
            // 验证反馈强度与元素重要性成正比
            switch (elementImportance) {
              case 'primary-item':
                // 主要项目应该有更明显的反馈
                expect(feedbackCSS).toContain(colors.ui.hover);
                expect(feedbackCSS).toContain(colors.text.primary);
                expect(feedbackCSS).toContain('opacity: 1'); // 完全不透明
                expect(feedbackCSS).toContain('transform: translateX(2px)'); // 微妙的移动
                break;
                
              case 'secondary-item':
                // 次要项目反馈更微妙
                expect(feedbackCSS).toContain(colors.text.secondary);
                expect(feedbackCSS).toContain('opacity: 0.9'); // 稍微降低
                break;
                
              case 'input':
                // 输入框反馈应该清晰但不突兀
                expect(inputCSS).toContain('opacity: 1'); // 焦点时完全不透明
                expect(inputCSS).toContain(colors.background.primary);
                break;
                
              case 'icon':
                // 图标反馈最微妙
                expect(iconCSS).toContain('opacity: 0.9'); // 悬停时轻微增强
                expect(iconCSS).toContain(colors.text.secondary);
                break;
            }
            
            // 验证不同交互状态的处理
            switch (interactionState) {
              case 'hover':
                expect(feedbackCSS).toContain(':hover');
                expect(feedbackCSS).toContain(`transition: all ${config.hoverTransitionDuration} ease`);
                break;
                
              case 'active':
                expect(feedbackCSS).toContain(':active');
                expect(feedbackCSS).toContain('transform:'); // 按下效果
                expect(feedbackCSS).toContain('scale(0.98)'); // 轻微缩放
                break;
                
              case 'selected':
                expect(feedbackCSS).toContain('.active');
                expect(feedbackCSS).toContain('.selected');
                expect(feedbackCSS).toContain(colors.ui.selection);
                expect(feedbackCSS).toContain('border-left: 2px solid'); // 选择指示器
                break;
                
              case 'focus':
                expect(feedbackCSS).toContain(':focus');
                expect(feedbackCSS).toContain('outline: 2px solid');
                expect(feedbackCSS).toContain(colors.ui.focus);
                break;
            }
            
            // 验证所有反馈都包含平滑过渡
            expect(feedbackCSS).toContain('transition:');
            expect(feedbackCSS).toContain(config.hoverTransitionDuration);
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3e: Configuration updates maintain consistency
   * For any configuration change, the updated styles should maintain design principles
   * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5
   */
  test('Property 3e: Configuration updates maintain design consistency and principles', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.float({ min: Math.fround(0.6), max: Math.fround(0.95), noNaN: true }), // backgroundOpacity
        fc.float({ min: Math.fround(0.7), max: Math.fround(0.95), noNaN: true }), // textOpacity
        (variant: ThemeVariant, bgOpacity: number, textOpacity: number) => {
          // 确保iconOpacity始终小于或等于textOpacity
          const iconOpacity = Math.max(0.5, Math.min(textOpacity - 0.05, 0.8));
          
          const manager = createSidebarStyleManager(variant, 'test-config-updates');
          
          try {
            // 更新配置
            const newConfig = {
              backgroundOpacity: bgOpacity,
              textOpacity: textOpacity,
              iconOpacity: iconOpacity,
              hoverTransitionDuration: '0.15s',
              borderWeight: 'minimal' as const,
            };
            
            manager.updateConfig(newConfig);
            const updatedConfig = manager.getConfig();
            
            // 验证配置正确更新
            expect(updatedConfig.backgroundOpacity).toBe(bgOpacity);
            expect(updatedConfig.textOpacity).toBe(textOpacity);
            expect(updatedConfig.iconOpacity).toBe(iconOpacity);
            expect(updatedConfig.hoverTransitionDuration).toBe('0.15s');
            
            // 验证设计原则保持一致
            // 1. 图标应该比文本更静音
            expect(updatedConfig.iconOpacity).toBeLessThanOrEqual(updatedConfig.textOpacity);
            
            // 2. 背景应该有一定的透明度以实现静音效果
            expect(updatedConfig.backgroundOpacity).toBeLessThan(1.0);
            expect(updatedConfig.backgroundOpacity).toBeGreaterThan(0.5);
            
            // 3. 文本应该保持可读性
            expect(updatedConfig.textOpacity).toBeGreaterThan(0.6);
            
            // 4. 边框权重应该保持最小化
            expect(updatedConfig.borderWeight).toBe('minimal');
            
            // 验证生成的CSS反映了新配置
            const generatedCSS = manager.generateSidebarCSS();
            expect(generatedCSS).toContain(`opacity: ${bgOpacity}`);
            expect(generatedCSS).toContain(`opacity: ${textOpacity}`);
            expect(generatedCSS).toContain(`opacity: ${iconOpacity}`);
            expect(generatedCSS).toContain('transition:');
            expect(generatedCSS).toContain('0.15s');
            
            // 验证可访问性仍然满足要求
            const accessibility = manager.validateAccessibility();
            expect(accessibility.meetsWCAG).toBe(true);
            expect(accessibility.textContrast).toBeGreaterThan(2.5); // 基本可读性
            expect(accessibility.hoverContrast).toBeGreaterThan(3.0); // 悬停时更清晰
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3f: Variant switching preserves sidebar design principles
   * For any variant change, sidebar styling should adapt while maintaining design consistency
   * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5
   */
  test('Property 3f: Variant switching preserves sidebar design principles across all variants', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('night', 'storm', 'light'),
        (initialVariant: ThemeVariant, targetVariant: ThemeVariant) => {
          const manager = createSidebarStyleManager(initialVariant, 'test-variant-switching');
          
          try {
            // 记录初始配置
            const initialConfig = manager.getConfig();
            const initialAccessibility = manager.validateAccessibility();
            
            // 切换变体
            manager.updateVariant(targetVariant);
            
            // 验证配置结构保持一致
            const updatedConfig = manager.getConfig();
            expect(updatedConfig.backgroundOpacity).toBe(initialConfig.backgroundOpacity);
            expect(updatedConfig.textOpacity).toBe(initialConfig.textOpacity);
            expect(updatedConfig.iconOpacity).toBe(initialConfig.iconOpacity);
            expect(updatedConfig.hoverTransitionDuration).toBe(initialConfig.hoverTransitionDuration);
            expect(updatedConfig.borderWeight).toBe(initialConfig.borderWeight);
            
            // 验证设计原则在新变体中保持一致
            const newColors = getVariantColors(targetVariant);
            const updatedCSS = manager.generateSidebarCSS();
            
            // 1. 静音背景原则
            expect(updatedCSS).toContain(newColors.background.secondary);
            expect(updatedCSS).toContain(`opacity: ${updatedConfig.backgroundOpacity}`);
            
            // 2. 微妙反馈原则
            expect(updatedCSS).toContain(newColors.ui.hover);
            expect(updatedCSS).toContain(newColors.text.primary);
            expect(updatedCSS).toContain('transition:');
            
            // 3. 静音图标原则
            expect(updatedCSS).toContain(newColors.text.muted);
            expect(updatedCSS).toContain(`opacity: ${updatedConfig.iconOpacity}`);
            
            // 4. 最小化边框原则
            expect(updatedCSS).toContain('border: none');
            expect(updatedCSS).toContain('box-shadow: none');
            
            // 5. 选择状态原则
            expect(updatedCSS).toContain(newColors.ui.selection);
            expect(updatedCSS).toContain(newColors.semantic.blue);
            expect(updatedCSS).toContain('border-left: 2px solid');
            
            // 验证可访问性在新变体中仍然满足
            const updatedAccessibility = manager.validateAccessibility();
            expect(updatedAccessibility.meetsWCAG).toBe(true);
            
            // 验证视觉层次关系保持一致（侧边栏应该比主内容区域更静音）
            expect(updatedAccessibility.textContrast).toBeLessThan(4.5); // 比编辑器对比度低
            expect(updatedAccessibility.textContrast).toBeGreaterThan(2.5); // 但仍可读
            
            return true;
          } finally {
            manager.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});