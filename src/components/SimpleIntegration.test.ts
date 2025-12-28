import { describe, it, expect } from 'vitest';

describe('简单集成测试', () => {
  it('应该能够导入主要组件', async () => {
    const { ThemeVariantManager } = await import('../theme/ThemeVariantManager');
    const { TypographySystem } = await import('./TypographySystem');
    
    expect(ThemeVariantManager).toBeDefined();
    expect(TypographySystem).toBeDefined();
  });

  it('应该能够创建组件实例', async () => {
    const { ThemeVariantManager } = await import('../theme/ThemeVariantManager');
    const { TypographySystem } = await import('./TypographySystem');
    
    const themeManager = new ThemeVariantManager('test-plugin');
    const typography = new TypographySystem('night', 'test-plugin');
    
    expect(themeManager).toBeDefined();
    expect(typography).toBeDefined();
    
    // 清理
    themeManager.cleanup();
    typography.remove();
  });
});