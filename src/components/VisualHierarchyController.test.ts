/**
 * Property-Based Tests for Visual Hierarchy Consistency
 * 
 * Feature: tokyo-night-theme-improvements, Property 1: Visual Hierarchy Consistency
 * Validates: Requirements 1.1, 1.3, 2.1
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { VisualHierarchyController, createVisualHierarchyController } from './VisualHierarchyController';
import { ThemeVariant } from '../types/colors';
import { getVariantColors, calculateContrastRatio } from '../utils/colors';

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

describe('Visual Hierarchy Consistency', () => {
  let controller: VisualHierarchyController;

  beforeEach(() => {
    controller = createVisualHierarchyController('night', 'test-plugin');
  });

  afterEach(() => {
    controller.remove();
  });

  /**
   * Property 1: Visual Hierarchy Consistency
   * For any UI state and theme variant, the editor area should have higher visual prominence 
   * (contrast, saturation, brightness) than the sidebar, and UI elements should have lower 
   * visual weight than content areas
   * Validates: Requirements 1.1, 1.3, 2.1
   */
  test('Property 1: Editor area maintains higher visual prominence than sidebar across all variants', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          // 创建控制器实例
          const hierarchyController = createVisualHierarchyController(variant, 'test-hierarchy');
          
          try {
            const colors = getVariantColors(variant);
            
            // 验证编辑器区域具有更高的视觉优先级
            // 1. 编辑器使用主要背景色，侧边栏使用次要背景色
            expect(colors.background.primary).not.toBe(colors.background.secondary);
            
            // 2. 编辑器文本对比度应该高于侧边栏文本对比度
            const editorTextContrast = calculateContrastRatio(
              colors.text.primary,
              colors.background.primary
            );
            
            const sidebarTextContrast = calculateContrastRatio(
              colors.text.secondary,
              colors.background.secondary
            );
            
            // 编辑器文本对比度应该更高（更突出）
            expect(editorTextContrast).toBeGreaterThan(sidebarTextContrast);
            
            // 3. 验证编辑器对比度满足可访问性要求（WCAG AA标准）
            expect(editorTextContrast).toBeGreaterThanOrEqual(4.5);
            
            // 4. 验证侧边栏对比度满足基本可读性要求
            expect(sidebarTextContrast).toBeGreaterThanOrEqual(3.0);
            
            // 5. 验证视觉层次配置的一致性
            const config = hierarchyController.getConfig();
            expect(config.editor.emphasis).toBe('high');
            expect(config.sidebar.emphasis).toBe('low');
            expect(config.ui.emphasis).toBe('medium');
            
            // 6. 验证编辑器配置的对比度要求
            expect(config.editor.textContrast).toBe(4.5); // WCAG AA 最低标准
            expect(config.sidebar.textContrast).toBe(3.0); // 降低但仍可读
            
            // 7. 验证侧边栏的视觉权重降低
            expect(config.sidebar.opacity).toBeLessThan(1.0);
            expect(config.sidebar.opacity).toBeGreaterThan(0.5); // 仍然可见
            
            // 8. 验证UI元素的微妙性
            expect(config.ui.subtlety).toBe('high');
            expect(config.ui.borderWeight).toBe('minimal');
            expect(config.ui.shadowDepth).toBe('subtle');
            
            return true;
          } finally {
            hierarchyController.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1a: CSS generation maintains visual hierarchy principles
   * For any variant, generated CSS should enforce editor prominence over sidebar
   * Validates: Requirements 1.1, 1.3
   */
  test('Property 1a: Generated CSS enforces editor prominence over sidebar', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          const hierarchyController = createVisualHierarchyController(variant, 'test-css');
          
          try {
            const colors = getVariantColors(variant);
            
            // 生成各个部分的CSS
            const editorCSS = hierarchyController.emphasizeEditor();
            const sidebarCSS = hierarchyController.subduesSidebar();
            const uiCSS = hierarchyController.balanceUIElements();
            const focusCSS = hierarchyController.applyFocusStates();
            
            // 验证编辑器CSS包含正确的颜色
            expect(editorCSS).toContain(colors.background.primary);
            expect(editorCSS).toContain(colors.text.primary);
            expect(editorCSS).toContain(colors.ui.focus);
            expect(editorCSS).toContain(colors.ui.selection);
            
            // 验证侧边栏CSS使用次要颜色
            expect(sidebarCSS).toContain(colors.background.secondary);
            expect(sidebarCSS).toContain(colors.text.secondary);
            expect(sidebarCSS).toContain(colors.text.muted);
            
            // 验证侧边栏CSS包含透明度设置
            const config = hierarchyController.getConfig();
            expect(sidebarCSS).toContain(`opacity: ${config.sidebar.opacity}`);
            
            // 验证UI CSS使用适当的颜色
            expect(uiCSS).toContain(colors.semantic.blue);
            expect(uiCSS).toContain(colors.ui.hover);
            expect(uiCSS).toContain(colors.ui.border);
            
            // 验证焦点CSS使用焦点颜色
            expect(focusCSS).toContain(colors.ui.focus);
            
            // 验证完整CSS生成
            const fullCSS = hierarchyController.generateHierarchyCSS();
            expect(fullCSS).toContain(editorCSS);
            expect(fullCSS).toContain(sidebarCSS);
            expect(fullCSS).toContain(uiCSS);
            expect(fullCSS).toContain(focusCSS);
            
            // 验证z-index层次
            expect(fullCSS).toContain('z-index: 10'); // 编辑器区域
            expect(fullCSS).toContain('z-index: 5');  // 侧边栏
            expect(fullCSS).toContain('z-index: 100'); // 弹出层
            
            return true;
          } finally {
            hierarchyController.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1b: Accessibility validation maintains hierarchy while meeting standards
   * For any variant, accessibility validation should confirm hierarchy while meeting WCAG standards
   * Validates: Requirements 1.1, 2.1
   */
  test('Property 1b: Accessibility validation maintains hierarchy while meeting WCAG standards', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          const hierarchyController = createVisualHierarchyController(variant, 'test-accessibility');
          
          try {
            // 更新控制器到指定变体
            hierarchyController.updateVariant(variant);
            
            // 验证可访问性
            const accessibility = hierarchyController.validateAccessibility();
            
            // 验证编辑器对比度满足WCAG AA标准
            expect(accessibility.editorContrast).toBeGreaterThanOrEqual(4.5);
            
            // 验证侧边栏对比度满足基本可读性
            expect(accessibility.sidebarContrast).toBeGreaterThanOrEqual(3.0);
            
            // 验证焦点对比度满足可访问性要求
            expect(accessibility.focusContrast).toBeGreaterThanOrEqual(3.0);
            
            // 验证整体WCAG合规性
            expect(accessibility.meetsWCAG).toBe(true);
            
            // 验证视觉层次：编辑器对比度 > 侧边栏对比度
            expect(accessibility.editorContrast).toBeGreaterThan(accessibility.sidebarContrast);
            
            // 验证焦点指示器足够突出
            expect(accessibility.focusContrast).toBeGreaterThanOrEqual(3.0);
            
            return true;
          } finally {
            hierarchyController.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1c: UI element visual weight is lower than content areas
   * For any UI element styling, visual weight should be lower than content areas
   * Validates: Requirements 1.3, 2.1
   */
  test('Property 1c: UI elements have lower visual weight than content areas', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('button', 'input', 'modal', 'menu', 'table'),
        (variant: ThemeVariant, uiElementType: string) => {
          const hierarchyController = createVisualHierarchyController(variant, 'test-ui-weight');
          
          try {
            const colors = getVariantColors(variant);
            const uiCSS = hierarchyController.balanceUIElements();
            
            // 验证UI元素使用微妙的颜色
            switch (uiElementType) {
              case 'button':
                // 按钮应该使用语义颜色但不过度突出
                expect(uiCSS).toContain(colors.semantic.blue);
                expect(uiCSS).toContain('border-radius: 6px');
                expect(uiCSS).toContain('transition: all 0.2s ease');
                break;
                
              case 'input':
                // 输入框应该使用边框颜色而不是强烈的背景
                expect(uiCSS).toContain(colors.ui.border);
                expect(uiCSS).toContain(colors.background.primary);
                expect(uiCSS).toContain('box-shadow: none');
                break;
                
              case 'modal':
                // 模态框应该使用第三级背景色
                expect(uiCSS).toContain(colors.background.tertiary);
                expect(uiCSS).toContain('border-radius: 8px');
                break;
                
              case 'menu':
                // 菜单项应该使用微妙的悬停效果
                expect(uiCSS).toContain(colors.ui.hover);
                expect(uiCSS).toContain('border-radius: 4px');
                expect(uiCSS).toContain('transition:');
                break;
                
              case 'table':
                // 表格应该使用微妙的边框和悬停效果
                expect(uiCSS).toContain(colors.ui.border);
                expect(uiCSS).toContain(colors.ui.selection);
                break;
            }
            
            // 验证所有UI元素都避免使用主要文本颜色作为背景
            // （这会与内容竞争）
            expect(uiCSS).not.toContain(`background-color: ${colors.text.primary}`);
            
            // 验证UI元素使用适当的过渡效果（微妙但响应）
            expect(uiCSS).toContain('transition:');
            
            // 验证滚动条样式是微妙的
            expect(uiCSS).toContain('width: 8px'); // 细滚动条
            expect(uiCSS).toContain(colors.ui.border); // 使用边框颜色
            
            return true;
          } finally {
            hierarchyController.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1d: Visual hierarchy consistency across variant updates
   * For any variant change, visual hierarchy principles should be maintained
   * Validates: Requirements 1.1, 1.3, 2.1
   */
  test('Property 1d: Visual hierarchy consistency is maintained across variant updates', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('night', 'storm', 'light'),
        (initialVariant: ThemeVariant, targetVariant: ThemeVariant) => {
          const hierarchyController = createVisualHierarchyController(initialVariant, 'test-variant-update');
          
          try {
            // 记录初始状态
            const initialConfig = hierarchyController.getConfig();
            const initialAccessibility = hierarchyController.validateAccessibility();
            
            // 更新到目标变体
            hierarchyController.updateVariant(targetVariant);
            
            // 验证更新后的状态
            const updatedConfig = hierarchyController.getConfig();
            const updatedAccessibility = hierarchyController.validateAccessibility();
            
            // 验证配置结构保持一致
            expect(updatedConfig.editor.emphasis).toBe(initialConfig.editor.emphasis);
            expect(updatedConfig.sidebar.emphasis).toBe(initialConfig.sidebar.emphasis);
            expect(updatedConfig.ui.emphasis).toBe(initialConfig.ui.emphasis);
            
            // 验证对比度要求保持一致
            expect(updatedConfig.editor.textContrast).toBe(initialConfig.editor.textContrast);
            expect(updatedConfig.sidebar.textContrast).toBe(initialConfig.sidebar.textContrast);
            
            // 验证透明度设置保持一致
            expect(updatedConfig.sidebar.opacity).toBe(initialConfig.sidebar.opacity);
            
            // 验证可访问性标准在所有变体中都得到满足
            expect(updatedAccessibility.meetsWCAG).toBe(true);
            expect(updatedAccessibility.editorContrast).toBeGreaterThanOrEqual(4.5);
            expect(updatedAccessibility.sidebarContrast).toBeGreaterThanOrEqual(3.0);
            
            // 验证视觉层次关系保持不变
            expect(updatedAccessibility.editorContrast).toBeGreaterThan(updatedAccessibility.sidebarContrast);
            
            // 验证当前变体正确更新
            expect(hierarchyController.getCurrentVariant()).toBe(targetVariant);
            
            return true;
          } finally {
            hierarchyController.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1e: Focus states maintain hierarchy while providing clear accessibility
   * For any focus state, accessibility should be clear while maintaining visual hierarchy
   * Validates: Requirements 1.1, 1.3
   */
  test('Property 1e: Focus states maintain hierarchy while providing clear accessibility', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('editor', 'sidebar', 'button', 'input', 'link', 'menu'),
        (variant: ThemeVariant, focusElementType: string) => {
          const hierarchyController = createVisualHierarchyController(variant, 'test-focus');
          
          try {
            const colors = getVariantColors(variant);
            const focusCSS = hierarchyController.applyFocusStates();
            
            // 验证所有焦点状态都使用一致的焦点颜色
            expect(focusCSS).toContain(colors.ui.focus);
            
            // 验证焦点指示器的可见性
            expect(focusCSS).toContain('outline: 2px solid');
            expect(focusCSS).toContain('outline-offset:');
            
            // 验证不同元素类型的焦点处理
            switch (focusElementType) {
              case 'editor':
                // 编辑器焦点应该有额外的阴影效果
                expect(focusCSS).toContain('box-shadow: 0 0 0 3px');
                expect(focusCSS).toContain('outline-offset: -2px');
                break;
                
              case 'sidebar':
                // 侧边栏项目焦点应该适应其较低的视觉权重
                expect(focusCSS).toContain('outline-offset: -2px');
                expect(focusCSS).toContain('border-radius: 4px');
                break;
                
              case 'button':
                // 按钮焦点应该有额外的阴影
                expect(focusCSS).toContain('box-shadow: 0 0 0 3px');
                expect(focusCSS).toContain('outline-offset: 2px');
                break;
                
              case 'input':
                // 输入框焦点使用边框而不是轮廓
                expect(focusCSS).toContain('border-color:');
                expect(focusCSS).toContain('box-shadow: 0 0 0 2px');
                break;
                
              case 'link':
                // 链接焦点应该有圆角
                expect(focusCSS).toContain('border-radius: 2px');
                expect(focusCSS).toContain('outline-offset: 2px');
                break;
                
              case 'menu':
                // 菜单项焦点应该结合背景色变化
                expect(focusCSS).toContain(colors.ui.hover);
                expect(focusCSS).toContain('outline-offset: -2px');
                break;
            }
            
            // 验证焦点可见性标准
            const focusContrast = calculateContrastRatio(colors.ui.focus, colors.background.primary);
            expect(focusContrast).toBeGreaterThanOrEqual(3.0);
            
            // 验证focus-visible支持
            expect(focusCSS).toContain(':focus-visible');
            expect(focusCSS).toContain(':focus:not(:focus-visible)');
            
            return true;
          } finally {
            hierarchyController.remove();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});