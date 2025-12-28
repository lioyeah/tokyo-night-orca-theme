/**
 * 语义颜色管理器属性测试
 * 
 * 属性 9：语义颜色逻辑
 * 验证需求：3.3（语义颜色分配）、3.5（一致的语义颜色使用）
 */

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { SemanticColorManager, SemanticColorMapping } from './SemanticColorManager';
import { ThemeVariant } from '../types/colors';
import { getVariantColors } from '../utils/colors';

describe('语义颜色管理器属性测试 - 属性 9：语义颜色逻辑', () => {
  let semanticColorManager: SemanticColorManager;
  const pluginId = 'test-plugin-id';

  beforeEach(() => {
    // 清理之前的样式元素
    const existingStyles = document.querySelectorAll('style[id*="semantic-colors"]');
    existingStyles.forEach(style => style.remove());
  });

  /**
   * Property 9: Semantic Color Logic
   * For any UI element requiring semantic color (errors, warnings, success, info), 
   * the correct Tokyo Night semantic color should be applied according to the 
   * element's meaning and context
   * Validates: Requirements 3.3, 3.5
   */
  describe('属性 9：语义颜色逻辑 - Property-Based Tests', () => {
    it('Property 9a: 所有主题变体中语义颜色映射应该遵循Tokyo Night官方规范', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          (variant: ThemeVariant) => {
            const manager = new SemanticColorManager(variant, pluginId);
            
            try {
              const mapping = manager.getSemanticMapping();
              const colors = getVariantColors(variant);
              
              // 验证语义颜色映射遵循Tokyo Night规范 - 需求 3.3
              expect(mapping.error).toBe(colors.semantic.red);      // 错误使用红色
              expect(mapping.warning).toBe(colors.semantic.yellow); // 警告使用黄色
              expect(mapping.success).toBe(colors.semantic.green);  // 成功使用绿色
              expect(mapping.info).toBe(colors.semantic.cyan);      // 信息使用青色
              expect(mapping.primary).toBe(colors.semantic.blue);   // 主要操作使用蓝色
              expect(mapping.secondary).toBe(colors.semantic.purple); // 次要操作使用紫色
              expect(mapping.code).toBe(colors.semantic.orange);    // 代码使用橙色
              
              // 验证相关语义状态使用一致的颜色 - 需求 3.5
              expect(mapping.error).toBe(mapping.danger);  // 错误和危险应该相同
              expect(mapping.primary).toBe(mapping.link);  // 主要操作和链接应该相同
              expect(mapping.info).toBe(mapping.accent);   // 信息和强调应该相同
              
              // 验证所有语义颜色都来自Tokyo Night调色板
              const allSemanticColors = Object.values(mapping);
              const tokyoNightColors = Object.values(colors.semantic);
              
              allSemanticColors.forEach(semanticColor => {
                expect(tokyoNightColors).toContain(semanticColor);
              });
              
              return true;
            } finally {
              manager.remove();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 9b: UI元素语义颜色应用应该在所有变体中保持一致性', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          fc.constantFrom('error', 'warning', 'success', 'info', 'primary', 'secondary'),
          (variant: ThemeVariant, semanticType: string) => {
            const manager = new SemanticColorManager(variant, pluginId);
            
            try {
              const uiConfig = manager.getUIElementConfig();
              const mapping = manager.getSemanticMapping();
              
              // 验证按钮颜色与语义映射一致 - 需求 3.5
              if (semanticType in uiConfig.buttons && semanticType in mapping) {
                expect(uiConfig.buttons[semanticType as keyof typeof uiConfig.buttons])
                  .toBe(mapping[semanticType as keyof typeof mapping]);
              }
              
              // 验证文本颜色与语义映射一致
              if (semanticType in uiConfig.text && semanticType in mapping) {
                expect(uiConfig.text[semanticType as keyof typeof uiConfig.text])
                  .toBe(mapping[semanticType as keyof typeof mapping]);
              }
              
              // 验证背景和边框颜色基于语义颜色生成
              if (semanticType in uiConfig.backgrounds && semanticType in mapping) {
                const baseColor = mapping[semanticType as keyof typeof mapping];
                const backgroundColor = uiConfig.backgrounds[semanticType as keyof typeof uiConfig.backgrounds];
                const borderColor = uiConfig.borders[semanticType as keyof typeof uiConfig.borders];
                
                // 背景和边框颜色应该包含基础语义颜色的十六进制值（去掉#）
                expect(backgroundColor).toContain(baseColor.replace('#', ''));
                expect(borderColor).toContain(baseColor.replace('#', ''));
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

    it('Property 9c: 生成的CSS应该为所有语义元素类型应用正确的颜色', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          fc.constantFrom('button', 'text', 'background', 'notification', 'badge'),
          (variant: ThemeVariant, elementType: string) => {
            const manager = new SemanticColorManager(variant, pluginId);
            
            try {
              const css = manager.generateSemanticColorCSS();
              const mapping = manager.getSemanticMapping();
              
              // 验证CSS包含所有语义颜色类 - 需求 3.5
              if (elementType === 'button') {
                expect(css).toContain('.orca-button.primary');
                expect(css).toContain('.orca-button.success');
                expect(css).toContain('.orca-button.warning');
                expect(css).toContain('.orca-button.danger');
                expect(css).toContain('.orca-button.info');
                expect(css).toContain('.orca-button.secondary');
                
                // 验证按钮CSS包含正确的语义颜色
                expect(css).toContain(mapping.primary);
                expect(css).toContain(mapping.success);
                expect(css).toContain(mapping.warning);
                expect(css).toContain(mapping.danger);
                expect(css).toContain(mapping.info);
                expect(css).toContain(mapping.secondary);
              }
              
              if (elementType === 'text') {
                expect(css).toContain('.text-error');
                expect(css).toContain('.text-warning');
                expect(css).toContain('.text-success');
                expect(css).toContain('.text-info');
                expect(css).toContain('.text-link');
                expect(css).toContain('.text-code');
                
                // 验证文本CSS包含正确的语义颜色
                expect(css).toContain(mapping.error);
                expect(css).toContain(mapping.warning);
                expect(css).toContain(mapping.success);
                expect(css).toContain(mapping.info);
                expect(css).toContain(mapping.link);
                expect(css).toContain(mapping.code);
              }
              
              if (elementType === 'background') {
                expect(css).toContain('.bg-error');
                expect(css).toContain('.bg-warning');
                expect(css).toContain('.bg-success');
                expect(css).toContain('.bg-info');
              }
              
              if (elementType === 'notification') {
                expect(css).toContain('.alert-error');
                expect(css).toContain('.alert-warning');
                expect(css).toContain('.alert-success');
                expect(css).toContain('.alert-info');
              }
              
              if (elementType === 'badge') {
                expect(css).toContain('.status-badge.error');
                expect(css).toContain('.status-badge.warning');
                expect(css).toContain('.status-badge.success');
                expect(css).toContain('.status-badge.info');
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

    it('Property 9d: CSS自定义属性应该包含所有语义颜色变量', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          (variant: ThemeVariant) => {
            const manager = new SemanticColorManager(variant, pluginId);
            
            try {
              const css = manager.generateSemanticColorCSS();
              const mapping = manager.getSemanticMapping();
              
              // 验证CSS包含所有语义颜色变量 - 需求 3.3, 3.5
              expect(css).toContain(`--tokyo-night-error: ${mapping.error}`);
              expect(css).toContain(`--tokyo-night-warning: ${mapping.warning}`);
              expect(css).toContain(`--tokyo-night-success: ${mapping.success}`);
              expect(css).toContain(`--tokyo-night-info: ${mapping.info}`);
              expect(css).toContain(`--tokyo-night-primary: ${mapping.primary}`);
              expect(css).toContain(`--tokyo-night-secondary: ${mapping.secondary}`);
              expect(css).toContain(`--tokyo-night-accent: ${mapping.accent}`);
              expect(css).toContain(`--tokyo-night-link: ${mapping.link}`);
              expect(css).toContain(`--tokyo-night-code: ${mapping.code}`);
              
              // 验证所有变量值都是有效的十六进制颜色
              Object.values(mapping).forEach(color => {
                expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
              });
              
              return true;
            } finally {
              manager.remove();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 9e: 语义颜色一致性验证应该在所有变体中通过', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          (variant: ThemeVariant) => {
            const manager = new SemanticColorManager(variant, pluginId);
            
            try {
              const validation = manager.validateSemanticConsistency();
              
              // 验证语义颜色一致性 - 需求 3.5
              expect(validation.isConsistent).toBe(true);
              expect(validation.issues).toHaveLength(0);
              
              // 如果有问题，应该有相应的建议
              if (!validation.isConsistent) {
                expect(validation.recommendations.length).toBeGreaterThan(0);
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

    it('Property 9f: 使用报告应该包含完整的语义颜色信息', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('night', 'storm', 'light'),
          (variant: ThemeVariant) => {
            const manager = new SemanticColorManager(variant, pluginId);
            
            try {
              const report = manager.generateUsageReport();
              
              // 验证报告包含所有必要信息 - 需求 3.3, 3.5
              expect(report.variant).toBe(variant);
              expect(report.semanticColors).toBeDefined();
              expect(report.uiElements).toBeDefined();
              expect(report.cssVariables).toBeDefined();
              expect(report.consistency).toBeDefined();
              
              // 验证语义颜色映射完整性
              const expectedSemanticKeys = [
                'error', 'warning', 'success', 'info', 'danger',
                'primary', 'secondary', 'accent', 'link', 'code'
              ];
              
              expectedSemanticKeys.forEach(key => {
                expect(report.semanticColors).toHaveProperty(key);
                expect(typeof report.semanticColors[key as keyof typeof report.semanticColors]).toBe('string');
                expect(report.semanticColors[key as keyof typeof report.semanticColors]).toMatch(/^#[0-9a-fA-F]{6}$/);
              });
              
              // 验证CSS变量映射
              expectedSemanticKeys.forEach(key => {
                const cssVarKey = `--tokyo-night-${key}`;
                expect(report.cssVariables).toHaveProperty(cssVarKey);
              });
              
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

  describe('属性 9.1：跨变体的语义颜色一致性', () => {
    it('所有主题变体应该使用相同的语义颜色映射逻辑', () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      const semanticMappings: SemanticColorMapping[] = [];

      variants.forEach(variant => {
        const manager = new SemanticColorManager(variant, pluginId);
        const mapping = manager.getSemanticMapping();
        const colors = getVariantColors(variant);
        
        // 验证语义颜色映射遵循Tokyo Night规范
        expect(mapping.error).toBe(colors.semantic.red);
        expect(mapping.warning).toBe(colors.semantic.yellow);
        expect(mapping.success).toBe(colors.semantic.green);
        expect(mapping.info).toBe(colors.semantic.cyan);
        expect(mapping.primary).toBe(colors.semantic.blue);
        expect(mapping.secondary).toBe(colors.semantic.purple);
        expect(mapping.code).toBe(colors.semantic.orange);
        
        // 验证相关语义状态使用一致的颜色
        expect(mapping.error).toBe(mapping.danger); // 错误和危险应该相同
        expect(mapping.primary).toBe(mapping.link); // 主要操作和链接应该相同
        expect(mapping.info).toBe(mapping.accent); // 信息和强调应该相同
        
        semanticMappings.push(mapping);
        manager.remove();
      });

      // 验证所有变体的语义映射结构一致
      const firstMapping = semanticMappings[0];
      semanticMappings.forEach(mapping => {
        expect(Object.keys(mapping).sort()).toEqual(Object.keys(firstMapping).sort());
      });
    });

    it('语义颜色应该正确映射到Tokyo Night官方颜色', () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      variants.forEach(variant => {
        const manager = new SemanticColorManager(variant, pluginId);
        const mapping = manager.getSemanticMapping();
        const colors = getVariantColors(variant);
        
        // 验证每个语义颜色都来自Tokyo Night调色板
        const allSemanticColors = Object.values(mapping);
        const tokyoNightColors = Object.values(colors.semantic);
        
        allSemanticColors.forEach(semanticColor => {
          expect(tokyoNightColors).toContain(semanticColor);
        });
        
        manager.remove();
      });
    });
  });

  describe('属性 9.2：UI元素语义颜色应用一致性', () => {
    it('相同语义的UI元素应该使用一致的颜色', () => {
      const manager = new SemanticColorManager('night', pluginId);
      const uiConfig = manager.getUIElementConfig();
      const mapping = manager.getSemanticMapping();
      
      // 验证按钮颜色与语义映射一致
      expect(uiConfig.buttons.primary).toBe(mapping.primary);
      expect(uiConfig.buttons.success).toBe(mapping.success);
      expect(uiConfig.buttons.warning).toBe(mapping.warning);
      expect(uiConfig.buttons.danger).toBe(mapping.danger);
      expect(uiConfig.buttons.info).toBe(mapping.info);
      
      // 验证文本颜色与语义映射一致
      expect(uiConfig.text.error).toBe(mapping.error);
      expect(uiConfig.text.warning).toBe(mapping.warning);
      expect(uiConfig.text.success).toBe(mapping.success);
      expect(uiConfig.text.info).toBe(mapping.info);
      expect(uiConfig.text.link).toBe(mapping.link);
      expect(uiConfig.text.code).toBe(mapping.code);
      
      manager.remove();
    });

    it('背景和边框颜色应该基于语义颜色生成', () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      variants.forEach(variant => {
        const manager = new SemanticColorManager(variant, pluginId);
        const uiConfig = manager.getUIElementConfig();
        const mapping = manager.getSemanticMapping();
        
        // 验证背景颜色是语义颜色的透明版本
        expect(uiConfig.backgrounds.error).toContain(mapping.error.replace('#', ''));
        expect(uiConfig.backgrounds.warning).toContain(mapping.warning.replace('#', ''));
        expect(uiConfig.backgrounds.success).toContain(mapping.success.replace('#', ''));
        expect(uiConfig.backgrounds.info).toContain(mapping.info.replace('#', ''));
        
        // 验证边框颜色是语义颜色的透明版本
        expect(uiConfig.borders.error).toContain(mapping.error.replace('#', ''));
        expect(uiConfig.borders.warning).toContain(mapping.warning.replace('#', ''));
        expect(uiConfig.borders.success).toContain(mapping.success.replace('#', ''));
        expect(uiConfig.borders.info).toContain(mapping.info.replace('#', ''));
        
        manager.remove();
      });
    });
  });

  describe('属性 9.3：CSS生成的语义颜色一致性', () => {
    it('生成的CSS应该包含所有语义颜色类', () => {
      const manager = new SemanticColorManager('night', pluginId);
      const css = manager.generateSemanticColorCSS();
      
      // 验证按钮样式包含所有语义类
      expect(css).toContain('.orca-button.primary');
      expect(css).toContain('.orca-button.success');
      expect(css).toContain('.orca-button.warning');
      expect(css).toContain('.orca-button.danger');
      expect(css).toContain('.orca-button.info');
      
      // 验证文本样式包含所有语义类
      expect(css).toContain('.text-error');
      expect(css).toContain('.text-warning');
      expect(css).toContain('.text-success');
      expect(css).toContain('.text-info');
      expect(css).toContain('.text-link');
      expect(css).toContain('.text-code');
      
      // 验证背景样式包含所有语义类
      expect(css).toContain('.bg-error');
      expect(css).toContain('.bg-warning');
      expect(css).toContain('.bg-success');
      expect(css).toContain('.bg-info');
      
      // 验证通知样式包含所有语义类
      expect(css).toContain('.alert-error');
      expect(css).toContain('.alert-warning');
      expect(css).toContain('.alert-success');
      expect(css).toContain('.alert-info');
      
      manager.remove();
    });

    it('CSS自定义属性应该包含所有语义颜色', () => {
      const manager = new SemanticColorManager('night', pluginId);
      const css = manager.generateSemanticColorCSS();
      const mapping = manager.getSemanticMapping();
      
      // 验证CSS包含所有语义颜色变量
      expect(css).toContain(`--tokyo-night-error: ${mapping.error}`);
      expect(css).toContain(`--tokyo-night-warning: ${mapping.warning}`);
      expect(css).toContain(`--tokyo-night-success: ${mapping.success}`);
      expect(css).toContain(`--tokyo-night-info: ${mapping.info}`);
      expect(css).toContain(`--tokyo-night-primary: ${mapping.primary}`);
      expect(css).toContain(`--tokyo-night-secondary: ${mapping.secondary}`);
      expect(css).toContain(`--tokyo-night-accent: ${mapping.accent}`);
      expect(css).toContain(`--tokyo-night-link: ${mapping.link}`);
      expect(css).toContain(`--tokyo-night-code: ${mapping.code}`);
      
      manager.remove();
    });
  });

  describe('基本功能验证', () => {
    it('应该能够创建语义颜色管理器实例', () => {
      const manager = new SemanticColorManager('night', pluginId);
      
      expect(manager).toBeDefined();
      expect(manager.getCurrentVariant()).toBe('night');
      
      const mapping = manager.getSemanticMapping();
      expect(mapping).toBeDefined();
      expect(typeof mapping.error).toBe('string');
      expect(mapping.error).toMatch(/^#[0-9a-fA-F]{6}$/);
      
      manager.remove();
    });

    it('应该能够根据语义获取颜色', () => {
      const manager = new SemanticColorManager('night', pluginId);
      
      const errorColor = manager.getSemanticColor('error');
      const successColor = manager.getSemanticColor('success');
      
      expect(errorColor).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(successColor).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(errorColor).not.toBe(successColor);
      
      manager.remove();
    });

    it('应该能够验证语义颜色一致性', () => {
      const manager = new SemanticColorManager('night', pluginId);
      
      const validation = manager.validateSemanticConsistency();
      
      expect(validation).toBeDefined();
      expect(typeof validation.isConsistent).toBe('boolean');
      expect(Array.isArray(validation.issues)).toBe(true);
      expect(Array.isArray(validation.recommendations)).toBe(true);
      
      manager.remove();
    });

    it('应该能够生成使用报告', () => {
      const manager = new SemanticColorManager('night', pluginId);
      
      const report = manager.generateUsageReport();
      
      expect(report).toBeDefined();
      expect(report.variant).toBe('night');
      expect(report.semanticColors).toBeDefined();
      expect(report.uiElements).toBeDefined();
      expect(report.cssVariables).toBeDefined();
      expect(report.consistency).toBeDefined();
      
      manager.remove();
    });
  });
});