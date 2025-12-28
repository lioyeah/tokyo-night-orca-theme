/**
 * 主题系统集成测试
 * 
 * 测试完整的主题系统功能和跨组件交互
 * Requirements: All requirements
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeVariant } from '../types/colors';
import { getVariantColors, isValidVariant } from '../utils/colors';
import { ThemeVariantManager, createThemeVariantManager } from '../theme/ThemeVariantManager';

// Mock DOM 环境
const mockDocument = {
  createElement: vi.fn(() => ({
    id: '',
    textContent: '',
    remove: vi.fn(),
    style: {},
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(() => false),
    },
  })),
  head: {
    appendChild: vi.fn(),
    contains: vi.fn(() => true),
    removeChild: vi.fn(),
  },
  getElementById: vi.fn(() => null),
  querySelectorAll: vi.fn(() => []),
  body: {
    style: {},
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(() => false),
    },
  },
};

const mockWindow = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  matchMedia: vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
  getComputedStyle: vi.fn(() => ({
    getPropertyValue: vi.fn(() => '#1a1b26'),
  })),
  orca: {
    themes: {
      register: vi.fn(),
      unregister: vi.fn(),
    },
    state: {
      plugins: {
        'test-plugin': {
          settings: {
            tokyoNightThemeVariant: 'night',
            tokyoNightAutoSwitchSystem: false,
            enableTokyoNightBaseBackground: true,
            enableTokyoNightSidebarColor: true,
          }
        }
      }
    }
  },
};

// 简化的主题系统集成管理器
class SimpleThemeSystemIntegrator {
  private themeVariantManager: ThemeVariantManager;

  constructor(private pluginId: string) {
    this.themeVariantManager = createThemeVariantManager(pluginId);
  }

  /**
   * 切换主题变体
   */
  async switchVariant(variant: ThemeVariant): Promise<void> {
    await this.themeVariantManager.switchVariant(variant);
  }

  /**
   * 获取当前变体
   */
  getCurrentVariant(): ThemeVariant {
    return this.themeVariantManager.currentVariant;
  }

  /**
   * 验证系统一致性
   */
  validateSystemConsistency(): {
    variantConsistency: boolean;
    colorConsistency: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    let variantConsistency = true;
    let colorConsistency = true;

    try {
      const currentVariant = this.themeVariantManager.currentVariant;
      
      // 验证变体一致性
      if (!isValidVariant(currentVariant)) {
        variantConsistency = false;
        errors.push(`Invalid current variant: ${currentVariant}`);
      }
      
      // 验证颜色一致性
      const colors = getVariantColors(currentVariant);
      if (!colors || !colors.background || !colors.text || !colors.semantic || !colors.ui) {
        colorConsistency = false;
        errors.push(`Incomplete color configuration for variant: ${currentVariant}`);
      }
      
    } catch (error) {
      errors.push(`System validation error: ${error}`);
      variantConsistency = false;
      colorConsistency = false;
    }

    return {
      variantConsistency,
      colorConsistency,
      errors
    };
  }

  /**
   * 获取系统状态
   */
  getSystemState(): {
    currentVariant: ThemeVariant;
    autoSwitchEnabled: boolean;
    systemPreference: 'light' | 'dark';
  } {
    return {
      currentVariant: this.themeVariantManager.currentVariant,
      autoSwitchEnabled: this.themeVariantManager.autoSwitchEnabled,
      systemPreference: this.themeVariantManager.detectSystemPreference(),
    };
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    // 简化的清理逻辑
  }
}

// 设置全局 mock
beforeEach(() => {
  global.document = mockDocument as any;
  global.window = mockWindow as any;
  (global as any).orca = mockWindow.orca;
  
  // 重置 mock 状态
  vi.clearAllMocks();
  
  // 设置默认的 mock 行为
  mockWindow.matchMedia = vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('主题系统集成测试', () => {
  let integrator: SimpleThemeSystemIntegrator;

  beforeEach(() => {
    integrator = new SimpleThemeSystemIntegrator('test-plugin');
  });

  afterEach(() => {
    if (integrator) {
      integrator.cleanup();
    }
  });

  describe('基本集成功能', () => {
    it('应该能够初始化主题系统', () => {
      const systemState = integrator.getSystemState();
      
      expect(systemState.currentVariant).toBe('night');
      expect(['light', 'dark']).toContain(systemState.systemPreference);
    });

    it('应该能够切换主题变体并保持系统一致性', async () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      for (const variant of variants) {
        await integrator.switchVariant(variant);
        
        const systemState = integrator.getSystemState();
        expect(systemState.currentVariant).toBe(variant);
        
        const validation = integrator.validateSystemConsistency();
        expect(validation.variantConsistency).toBe(true);
        expect(validation.colorConsistency).toBe(true);
        expect(validation.errors).toHaveLength(0);
      }
    });

    it('应该能够处理无效的变体切换请求', async () => {
      await expect(integrator.switchVariant('invalid' as any)).rejects.toThrow();
      
      // 验证系统状态没有被破坏
      const systemState = integrator.getSystemState();
      expect(['night', 'storm', 'light']).toContain(systemState.currentVariant);
      
      const validation = integrator.validateSystemConsistency();
      expect(validation.variantConsistency).toBe(true);
    });
  });

  describe('颜色系统一致性', () => {
    it('所有变体应该使用一致的颜色系统', async () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      for (const variant of variants) {
        await integrator.switchVariant(variant);
        
        const colors = getVariantColors(variant);
        expect(colors).toBeDefined();
        expect(colors.background).toBeDefined();
        expect(colors.text).toBeDefined();
        expect(colors.semantic).toBeDefined();
        expect(colors.ui).toBeDefined();
        
        // 验证颜色值的有效性
        expect(colors.background.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(colors.text.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(colors.semantic.red).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(colors.ui.border).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    });

    it('应该能够验证Tokyo Night颜色的真实性', async () => {
      // 验证 Night 变体的官方颜色
      await integrator.switchVariant('night');
      const nightColors = getVariantColors('night');
      expect(nightColors.background.primary).toBe('#1a1b26');
      expect(nightColors.semantic.red).toBe('#f7768e');
      expect(nightColors.semantic.blue).toBe('#7aa2f7');
      expect(nightColors.semantic.green).toBe('#9ece6a');

      // 验证 Storm 变体的官方颜色
      await integrator.switchVariant('storm');
      const stormColors = getVariantColors('storm');
      expect(stormColors.background.primary).toBe('#24283b');

      // 验证 Light 变体的官方颜色
      await integrator.switchVariant('light');
      const lightColors = getVariantColors('light');
      expect(lightColors.background.primary).toBe('#d5d6db');
    });
  });

  describe('系统集成功能', () => {
    it('应该能够检测系统偏好', () => {
      const systemState = integrator.getSystemState();
      expect(['light', 'dark']).toContain(systemState.systemPreference);
    });

    it('应该能够处理自动切换设置', () => {
      const systemState = integrator.getSystemState();
      expect(typeof systemState.autoSwitchEnabled).toBe('boolean');
    });

    it('应该能够在所有变体中保持系统集成功能', async () => {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      
      for (const variant of variants) {
        await integrator.switchVariant(variant);
        
        const systemState = integrator.getSystemState();
        expect(['light', 'dark']).toContain(systemState.systemPreference);
        expect(typeof systemState.autoSwitchEnabled).toBe('boolean');
      }
    });
  });

  describe('错误处理', () => {
    it('应该能够处理变体切换过程中的错误', async () => {
      // 模拟切换过程中的错误
      const originalSwitchVariant = integrator['themeVariantManager'].switchVariant;
      integrator['themeVariantManager'].switchVariant = vi.fn().mockRejectedValue(new Error('切换失败'));
      
      await expect(integrator.switchVariant('storm')).rejects.toThrow('切换失败');
      
      // 验证系统状态保持稳定
      const validation = integrator.validateSystemConsistency();
      expect(validation.variantConsistency).toBe(true);
      
      // 恢复原始函数
      integrator['themeVariantManager'].switchVariant = originalSwitchVariant;
    });

    it('应该能够处理系统偏好检测错误', () => {
      // 模拟系统偏好检测错误
      mockWindow.matchMedia = vi.fn(() => {
        throw new Error('matchMedia 不可用');
      });
      
      const systemState = integrator.getSystemState();
      expect(['light', 'dark']).toContain(systemState.systemPreference);
      
      const validation = integrator.validateSystemConsistency();
      expect(validation.variantConsistency).toBe(true);
      expect(validation.colorConsistency).toBe(true);
    });
  });

  describe('向后兼容性', () => {
    it('应该能够与现有的 Orca 主题 API 兼容', () => {
      // 验证 Orca API 调用不会破坏系统
      if ((global as any).orca?.themes?.register) {
        expect(() => {
          (global as any).orca.themes.register('tokyo-night', {
            displayName: 'Tokyo Night',
            cssFile: 'theme.css'
          });
        }).not.toThrow();
      }
      
      const validation = integrator.validateSystemConsistency();
      expect(validation.variantConsistency).toBe(true);
      expect(validation.colorConsistency).toBe(true);
    });

    it('应该能够处理缺少 Orca API 的情况', () => {
      // 模拟 Orca API 不可用
      const originalOrca = (global as any).orca;
      (global as any).orca = undefined;
      
      const testIntegrator = new SimpleThemeSystemIntegrator('no-orca-plugin');
      
      const systemState = testIntegrator.getSystemState();
      expect(['night', 'storm', 'light']).toContain(systemState.currentVariant);
      
      testIntegrator.cleanup();
      
      // 恢复原始 Orca 对象
      (global as any).orca = originalOrca;
    });
  });
});