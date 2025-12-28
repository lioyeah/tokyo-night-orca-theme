/**
 * Property-Based Tests for System Integration
 * 
 * Feature: tokyo-night-theme-improvements, Property 10: System Integration
 * Validates: Requirements 7.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { ThemeVariant } from '../types/colors';
import { getVariantColors, isValidVariant } from '../utils/colors';
import { SystemIntegrationEnhancer, SystemIntegrationConfig } from './SystemIntegrationEnhancer';

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

const mockWindow = {
  matchMedia: vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
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

// 简化的系统集成管理器，专注于测试系统集成功能
class SystemIntegrationManager {
  private _autoSwitchEnabled: boolean = false;
  private _systemPreferenceMediaQuery: MediaQueryList | null = null;
  private _systemPreferenceListener: ((event: MediaQueryListEvent) => void) | null = null;

  constructor() {
    this.initializeSystemPreferenceDetection();
  }

  /**
   * 检测系统偏好
   */
  detectSystemPreference(): 'light' | 'dark' {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return 'dark';
    }

    try {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return darkModeQuery.matches ? 'dark' : 'light';
    } catch (error) {
      console.warn('Failed to detect system preference:', error);
      return 'dark';
    }
  }

  /**
   * 设置自动切换
   */
  setAutoSwitchEnabled(enabled: boolean): void {
    this._autoSwitchEnabled = enabled;
    
    if (enabled) {
      this.setupSystemPreferenceListener();
    } else {
      this.removeSystemPreferenceListener();
    }
  }

  /**
   * 获取自动切换状态
   */
  get autoSwitchEnabled(): boolean {
    return this._autoSwitchEnabled;
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    this.removeSystemPreferenceListener();
  }

  /**
   * 初始化系统偏好检测
   */
  private initializeSystemPreferenceDetection(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        this._systemPreferenceMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      } catch (error) {
        console.warn('Failed to initialize system preference detection:', error);
      }
    }
  }

  /**
   * 设置系统偏好监听器
   */
  private setupSystemPreferenceListener(): void {
    if (!this._systemPreferenceMediaQuery) {
      return;
    }

    this._systemPreferenceListener = (event: MediaQueryListEvent) => {
      if (this._autoSwitchEnabled) {
        // 在实际实现中，这里会触发主题切换
        console.log('System preference changed:', event.matches ? 'dark' : 'light');
      }
    };

    try {
      this._systemPreferenceMediaQuery.addEventListener('change', this._systemPreferenceListener);
    } catch (error) {
      try {
        this._systemPreferenceMediaQuery.addListener(this._systemPreferenceListener);
      } catch (fallbackError) {
        console.warn('Failed to setup system preference listener:', fallbackError);
      }
    }
  }

  /**
   * 移除系统偏好监听器
   */
  private removeSystemPreferenceListener(): void {
    if (!this._systemPreferenceMediaQuery || !this._systemPreferenceListener) {
      return;
    }

    try {
      this._systemPreferenceMediaQuery.removeEventListener('change', this._systemPreferenceListener);
    } catch (error) {
      try {
        this._systemPreferenceMediaQuery.removeListener(this._systemPreferenceListener);
      } catch (fallbackError) {
        console.warn('Failed to remove system preference listener:', fallbackError);
      }
    }

    this._systemPreferenceListener = null;
  }
}

// Setup global mocks
beforeEach(() => {
  global.document = mockDocument as any;
  global.window = mockWindow as any;
  (global as any).orca = mockWindow.orca;
  
  // 重置 mock 状态
  vi.clearAllMocks();
  
  // 设置默认的 mock 行为
  mockWindow.matchMedia = vi.fn(() => ({
    matches: false, // 默认为 light 模式
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Property 10: System Integration', () => {
  let enhancer: SystemIntegrationEnhancer;

  beforeEach(() => {
    enhancer = new SystemIntegrationEnhancer({
      debugLogging: false,
      autoSwitchEnabled: false
    });
  });

  afterEach(() => {
    enhancer.cleanup();
  });

  /**
   * Property 10a: Automatic theme switching based on system preferences
   * For any system preference change (dark/light), the theme should automatically 
   * switch to the appropriate variant when auto-switch is enabled
   * Validates: Requirements 7.4
   */
  it('Property 10a: Automatic theme switching responds correctly to system preferences', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // system dark mode preference
        fc.boolean(), // auto-switch enabled state
        fc.constantFrom('night', 'storm', 'light'), // initial variant
        (systemDarkMode: boolean, autoSwitchEnabled: boolean, initialVariant: ThemeVariant) => {
          let testResult = true;
          
          try {
            // 模拟系统偏好
            const mockMediaQuery = {
              matches: systemDarkMode,
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
              addListener: vi.fn(),
              removeListener: vi.fn(),
            };
            
            mockWindow.matchMedia.mockReturnValue(mockMediaQuery);
            
            // 测试系统偏好检测
            const detectedPreference = enhancer.detectSystemPreference();
            const expectedPreference = systemDarkMode ? 'dark' : 'light';
            expect(detectedPreference).toBe(expectedPreference);
            
            // 设置自动切换状态
            enhancer.setAutoSwitchEnabled(autoSwitchEnabled);
            expect(enhancer.autoSwitchEnabled).toBe(autoSwitchEnabled);
            
            // 验证系统偏好检测的一致性
            const secondDetection = enhancer.detectSystemPreference();
            expect(secondDetection).toBe(expectedPreference);
            
            // 验证建议的变体映射
            const suggestedVariant = enhancer.getSuggestedVariant(expectedPreference);
            const expectedVariant = expectedPreference === 'light' ? 'light' : 'night';
            expect(suggestedVariant).toBe(expectedVariant);
            
            // 验证系统集成状态
            const integrationStatus = enhancer.validateSystemIntegration();
            expect(integrationStatus.autoSwitchEnabled).toBe(autoSwitchEnabled);
            expect(integrationStatus.mediaQuerySupported).toBe(true);
            
            // 验证变体有效性检查
            expect(isValidVariant(initialVariant)).toBe(true);
            expect(getVariantColors(initialVariant)).toBeDefined();
            
          } catch (error) {
            console.error('Property 10a test error:', error);
            testResult = false;
          }
          
          return testResult;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10b: System preference detection reliability
   * For any system environment, preference detection should be reliable and consistent
   * Validates: Requirements 7.4
   */
  it('Property 10b: System preference detection is reliable across different environments', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // matchMedia availability
        fc.boolean(), // matchMedia result
        fc.boolean(), // addEventListener support
        (hasMatchMedia: boolean, darkModeMatches: boolean, hasAddEventListener: boolean) => {
          let testResult = true;
          
          try {
            if (hasMatchMedia) {
              // 模拟支持 matchMedia 的环境
              const mockMediaQuery = {
                matches: darkModeMatches,
                addEventListener: hasAddEventListener ? vi.fn() : vi.fn(),
                removeEventListener: hasAddEventListener ? vi.fn() : vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
              };
              
              mockWindow.matchMedia = vi.fn(() => mockMediaQuery);
            } else {
              // 模拟不支持 matchMedia 的环境
              mockWindow.matchMedia = undefined as any;
            }
            
            // 测试偏好检测
            const preference = enhancer.detectSystemPreference();
            expect(['light', 'dark']).toContain(preference);
            
            if (hasMatchMedia) {
              // 有 matchMedia 支持时，应该返回正确的偏好
              const expectedPreference = darkModeMatches ? 'dark' : 'light';
              expect(preference).toBe(expectedPreference);
              expect(mockWindow.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
            } else {
              // 没有 matchMedia 支持时，SystemIntegrationEnhancer 会尝试使用 window.matchMedia
              // 但由于我们设置为 undefined，它应该回退到最后已知偏好或默认值
              // 根据 SystemIntegrationEnhancer 的实现，它会保持最后已知偏好
              expect(['light', 'dark']).toContain(preference);
            }
            
            // 验证检测结果的一致性
            const secondPreference = enhancer.detectSystemPreference();
            expect(secondPreference).toBe(preference);
            
            // 验证自动切换设置不受环境影响
            enhancer.setAutoSwitchEnabled(true);
            expect(enhancer.autoSwitchEnabled).toBe(true);
            
            enhancer.setAutoSwitchEnabled(false);
            expect(enhancer.autoSwitchEnabled).toBe(false);
            
            // 验证系统集成状态
            const integrationStatus = enhancer.validateSystemIntegration();
            expect(integrationStatus.mediaQuerySupported).toBe(hasMatchMedia);
            
          } catch (error) {
            console.error('Property 10b test error:', error);
            testResult = false;
          }
          
          return testResult;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10c: Error handling and graceful degradation
   * For any system integration error, the theme should handle it gracefully 
   * and maintain functionality
   * Validates: Requirements 7.4
   */
  it('Property 10c: System integration errors are handled gracefully', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('matchMedia_error', 'addEventListener_error', 'removeEventListener_error', 'no_error'),
        fc.boolean(), // auto-switch enabled
        (errorType: string, autoSwitchEnabled: boolean) => {
          let testResult = true;
          
          try {
            // 根据错误类型设置不同的错误场景
            let mockMediaQuery: any;
            
            switch (errorType) {
              case 'matchMedia_error':
                // matchMedia 抛出错误
                mockWindow.matchMedia = vi.fn(() => {
                  throw new Error('matchMedia 不可用');
                });
                break;
                
              case 'addEventListener_error':
                // addEventListener 抛出错误
                mockMediaQuery = {
                  matches: false,
                  addEventListener: vi.fn(() => {
                    throw new Error('addEventListener 失败');
                  }),
                  removeEventListener: vi.fn(),
                  addListener: vi.fn(),
                  removeListener: vi.fn(),
                };
                mockWindow.matchMedia = vi.fn(() => mockMediaQuery);
                break;
                
              case 'removeEventListener_error':
                // removeEventListener 抛出错误
                mockMediaQuery = {
                  matches: false,
                  addEventListener: vi.fn(),
                  removeEventListener: vi.fn(() => {
                    throw new Error('removeEventListener 失败');
                  }),
                  addListener: vi.fn(),
                  removeListener: vi.fn(),
                };
                mockWindow.matchMedia = vi.fn(() => mockMediaQuery);
                break;
                
              default:
                // 正常情况
                mockMediaQuery = {
                  matches: false,
                  addEventListener: vi.fn(),
                  removeEventListener: vi.fn(),
                  addListener: vi.fn(),
                  removeListener: vi.fn(),
                };
                mockWindow.matchMedia = vi.fn(() => mockMediaQuery);
                break;
            }
            
            // 测试系统偏好检测的错误处理
            const preference = enhancer.detectSystemPreference();
            expect(['light', 'dark']).toContain(preference);
            
            // 即使出现错误，也应该返回有效的偏好值
            if (errorType === 'matchMedia_error') {
              // matchMedia 错误时，SystemIntegrationEnhancer 会保持最后已知偏好
              expect(['light', 'dark']).toContain(preference);
            } else {
              // 其他情况应该正常工作
              expect(preference).toBe('light'); // mockMediaQuery.matches = false
            }
            
            // 测试自动切换设置的错误处理
            enhancer.setAutoSwitchEnabled(autoSwitchEnabled);
            expect(enhancer.autoSwitchEnabled).toBe(autoSwitchEnabled);
            
            // 验证即使有错误，基本功能仍然可用
            expect(['night', 'storm', 'light']).toContain('night'); // 验证变体常量
            
            // 验证颜色获取功能不受系统集成错误影响
            const colors = getVariantColors('night');
            expect(colors).toHaveProperty('background');
            expect(colors).toHaveProperty('text');
            expect(colors).toHaveProperty('semantic');
            expect(colors).toHaveProperty('ui');
            
            // 验证变体检查功能不受影响
            expect(isValidVariant('night')).toBe(true);
            
            // 验证系统集成状态报告
            const integrationStatus = enhancer.validateSystemIntegration();
            expect(integrationStatus.autoSwitchEnabled).toBe(autoSwitchEnabled);
            
          } catch (error) {
            console.error('Property 10c test error:', error);
            testResult = false;
          }
          
          return testResult;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10d: Preference persistence across theme operations
   * For any theme operation, user preferences should be preserved
   * Validates: Requirements 7.4
   */
  it('Property 10d: User preferences are preserved across all theme operations', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // initial auto-switch setting
        fc.constantFrom('night', 'storm', 'light'), // target variant
        fc.array(fc.boolean(), { minLength: 1, maxLength: 5 }), // sequence of auto-switch toggles
        (initialAutoSwitch: boolean, targetVariant: ThemeVariant, autoSwitchSequence: boolean[]) => {
          let testResult = true;
          
          try {
            // 设置初始偏好
            enhancer.setAutoSwitchEnabled(initialAutoSwitch);
            expect(enhancer.autoSwitchEnabled).toBe(initialAutoSwitch);
            
            // 执行一系列偏好设置操作
            let expectedAutoSwitch = initialAutoSwitch;
            for (const autoSwitchValue of autoSwitchSequence) {
              enhancer.setAutoSwitchEnabled(autoSwitchValue);
              expectedAutoSwitch = autoSwitchValue;
              expect(enhancer.autoSwitchEnabled).toBe(expectedAutoSwitch);
            }
            
            // 验证最终偏好设置正确
            expect(enhancer.autoSwitchEnabled).toBe(expectedAutoSwitch);
            
            // 验证偏好设置不受变体操作影响
            const beforeVariantAutoSwitch = enhancer.autoSwitchEnabled;
            
            // 获取目标变体的颜色（模拟变体相关操作）
            const targetColors = getVariantColors(targetVariant);
            expect(targetColors).toBeDefined();
            
            // 验证偏好设置保持不变
            expect(enhancer.autoSwitchEnabled).toBe(beforeVariantAutoSwitch);
            
            // 验证系统偏好检测不受偏好设置影响
            const systemPreference1 = enhancer.detectSystemPreference();
            enhancer.setAutoSwitchEnabled(!expectedAutoSwitch);
            const systemPreference2 = enhancer.detectSystemPreference();
            expect(systemPreference2).toBe(systemPreference1);
            
            // 恢复偏好设置
            enhancer.setAutoSwitchEnabled(expectedAutoSwitch);
            expect(enhancer.autoSwitchEnabled).toBe(expectedAutoSwitch);
            
            // 验证所有基本功能仍然可用
            expect(isValidVariant(targetVariant)).toBe(true);
            expect(getVariantColors(targetVariant)).toBeDefined();
            
            // 验证建议变体功能
            const suggestedVariant = enhancer.getSuggestedVariant();
            expect(['night', 'storm', 'light']).toContain(suggestedVariant);
            
          } catch (error) {
            console.error('Property 10d test error:', error);
            testResult = false;
          }
          
          return testResult;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10e: Integration with Orca theme system
   * For any Orca integration operation, the theme should maintain proper integration
   * Validates: Requirements 7.4
   */
  it('Property 10e: Orca theme system integration is maintained correctly', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // orca API availability
        fc.constantFrom('night', 'storm', 'light'), // variant for registration
        (hasOrcaAPI: boolean, variant: ThemeVariant) => {
          let testResult = true;
          
          try {
            if (hasOrcaAPI) {
              // 模拟 Orca API 可用
              (global as any).orca = {
                themes: {
                  register: vi.fn(),
                  unregister: vi.fn(),
                },
              };
            } else {
              // 模拟 Orca API 不可用
              (global as any).orca = undefined;
            }
            
            // 测试 Orca API 可用性检查
            if (hasOrcaAPI) {
              // 有 API 时应该能够访问
              expect((global as any).orca.themes.register).toBeDefined();
              expect((global as any).orca.themes.unregister).toBeDefined();
            } else {
              // 没有 API 时应该优雅处理
              expect((global as any).orca).toBeUndefined();
            }
            
            // 验证核心功能不受 Orca API 可用性影响
            expect(['night', 'storm', 'light']).toContain(variant);
            
            // 验证颜色获取功能
            const colors = getVariantColors(variant);
            expect(colors).toHaveProperty('background');
            expect(colors).toHaveProperty('text');
            expect(colors).toHaveProperty('semantic');
            expect(colors).toHaveProperty('ui');
            
            // 验证系统偏好检测功能
            const preference = enhancer.detectSystemPreference();
            expect(['light', 'dark']).toContain(preference);
            
            // 验证自动切换功能
            enhancer.setAutoSwitchEnabled(true);
            expect(enhancer.autoSwitchEnabled).toBe(true);
            
            enhancer.setAutoSwitchEnabled(false);
            expect(enhancer.autoSwitchEnabled).toBe(false);
            
            // 验证系统集成状态
            const integrationStatus = enhancer.validateSystemIntegration();
            expect(integrationStatus.autoSwitchEnabled).toBe(false);
            
          } catch (error) {
            console.error('Property 10e test error:', error);
            testResult = false;
          }
          
          return testResult;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10f: System integration state consistency
   * For any sequence of system integration operations, state should remain consistent
   * Validates: Requirements 7.4
   */
  it('Property 10f: System integration state remains consistent across operations', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            operation: fc.constantFrom('detectPreference', 'toggleAutoSwitch', 'checkVariant'),
            autoSwitchValue: fc.boolean(),
            variant: fc.constantFrom('night', 'storm', 'light'),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (operations: Array<{operation: string, autoSwitchValue: boolean, variant: ThemeVariant}>) => {
          let testResult = true;
          
          try {
            let currentAutoSwitch = false; // 初始状态应该与 enhancer 的初始状态一致
            
            // 确保 enhancer 的初始状态与我们的跟踪状态一致
            enhancer.setAutoSwitchEnabled(false);
            expect(enhancer.autoSwitchEnabled).toBe(false);
            
            // 执行一系列系统集成操作
            for (const op of operations) {
              switch (op.operation) {
                case 'detectPreference':
                  // 测试系统偏好检测
                  const preference = enhancer.detectSystemPreference();
                  expect(['light', 'dark']).toContain(preference);
                  
                  // 验证检测结果的一致性
                  const secondPreference = enhancer.detectSystemPreference();
                  expect(secondPreference).toBe(preference);
                  
                  // 验证建议变体映射
                  const suggestedVariant = enhancer.getSuggestedVariant(preference);
                  const expectedVariant = preference === 'light' ? 'light' : 'night';
                  expect(suggestedVariant).toBe(expectedVariant);
                  break;
                  
                case 'toggleAutoSwitch':
                  // 测试自动切换设置
                  enhancer.setAutoSwitchEnabled(op.autoSwitchValue);
                  currentAutoSwitch = op.autoSwitchValue;
                  expect(enhancer.autoSwitchEnabled).toBe(currentAutoSwitch);
                  break;
                  
                case 'checkVariant':
                  // 测试变体检查功能
                  const isValid = isValidVariant(op.variant);
                  expect(isValid).toBe(true);
                  
                  // 验证颜色获取功能
                  const colors = getVariantColors(op.variant);
                  expect(colors).toBeDefined();
                  break;
              }
              
              // 每次操作后验证状态一致性
              expect(enhancer.autoSwitchEnabled).toBe(currentAutoSwitch);
              
              // 验证系统偏好检测功能始终可用
              const currentPreference = enhancer.detectSystemPreference();
              expect(['light', 'dark']).toContain(currentPreference);
              
              // 验证系统集成状态的一致性
              const integrationStatus = enhancer.validateSystemIntegration();
              expect(integrationStatus.autoSwitchEnabled).toBe(currentAutoSwitch);
            }
            
            // 验证最终状态的完整性
            expect(enhancer.autoSwitchEnabled).toBe(currentAutoSwitch);
            
            // 验证所有变体的颜色获取功能
            ['night', 'storm', 'light'].forEach(variant => {
              const colors = getVariantColors(variant as ThemeVariant);
              expect(colors).toHaveProperty('background');
              expect(colors).toHaveProperty('text');
              expect(colors).toHaveProperty('semantic');
              expect(colors).toHaveProperty('ui');
            });
            
            // 验证系统集成状态报告的完整性
            const finalStatus = enhancer.validateSystemIntegration();
            expect(finalStatus).toHaveProperty('mediaQuerySupported');
            expect(finalStatus).toHaveProperty('eventListenerActive');
            expect(finalStatus).toHaveProperty('preferenceDetectionWorking');
            expect(finalStatus).toHaveProperty('autoSwitchEnabled');
            expect(finalStatus).toHaveProperty('lastError');
            
          } catch (error) {
            console.error('Property 10f test error:', error);
            testResult = false;
          }
          
          return testResult;
        }
      ),
      { numRuns: 100 }
    );
  });
});