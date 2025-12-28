/**
 * 完整系统验证
 * 
 * 验证整个 Tokyo Night 主题系统的完整性和正确性
 * Requirements: All requirements
 */

import { ThemeSystemIntegrator, createThemeSystemIntegrator, ThemeSystemConfig } from '../components/ThemeSystemIntegrator';
import { ThemeVariant } from '../types/colors';
import { getVariantColors, isValidVariant } from '../utils/colors';

/**
 * 系统验证结果
 */
export interface SystemValidationResult {
  /** 验证是否通过 */
  passed: boolean;
  /** 验证的组件数量 */
  componentsValidated: number;
  /** 通过的测试数量 */
  testsPassed: number;
  /** 失败的测试数量 */
  testsFailed: number;
  /** 错误列表 */
  errors: string[];
  /** 警告列表 */
  warnings: string[];
  /** 详细结果 */
  details: {
    colorSystem: boolean;
    variantManagement: boolean;
    visualHierarchy: boolean;
    systemIntegration: boolean;
    accessibility: boolean;
    errorHandling: boolean;
  };
}

/**
 * 完整系统验证器
 */
export class SystemValidator {
  private integrator: ThemeSystemIntegrator | null = null;
  private errors: string[] = [];
  private warnings: string[] = [];
  private testsPassed: number = 0;
  private testsFailed: number = 0;

  /**
   * 执行完整的系统验证
   */
  async validateCompleteSystem(): Promise<SystemValidationResult> {
    console.log('开始完整系统验证...');
    
    this.resetCounters();
    
    // 初始化系统
    const initResult = await this.initializeSystem();
    if (!initResult) {
      return this.createFailedResult('系统初始化失败');
    }

    // 验证各个组件
    const colorSystemResult = await this.validateColorSystem();
    const variantManagementResult = await this.validateVariantManagement();
    const visualHierarchyResult = await this.validateVisualHierarchy();
    const systemIntegrationResult = await this.validateSystemIntegration();
    const accessibilityResult = await this.validateAccessibility();
    const errorHandlingResult = await this.validateErrorHandling();

    // 清理资源
    this.cleanup();

    const allPassed = colorSystemResult && variantManagementResult && 
                     visualHierarchyResult && systemIntegrationResult && 
                     accessibilityResult && errorHandlingResult;

    console.log(`系统验证完成。通过: ${this.testsPassed}, 失败: ${this.testsFailed}`);

    return {
      passed: allPassed && this.testsFailed === 0,
      componentsValidated: 6,
      testsPassed: this.testsPassed,
      testsFailed: this.testsFailed,
      errors: [...this.errors],
      warnings: [...this.warnings],
      details: {
        colorSystem: colorSystemResult,
        variantManagement: variantManagementResult,
        visualHierarchy: visualHierarchyResult,
        systemIntegration: systemIntegrationResult,
        accessibility: accessibilityResult,
        errorHandling: errorHandlingResult,
      }
    };
  }

  /**
   * 初始化系统
   */
  private async initializeSystem(): Promise<boolean> {
    try {
      const config: ThemeSystemConfig = {
        pluginId: 'system-validation-test',
        debugLogging: false,
        autoSwitchEnabled: false,
        initialVariant: 'night',
      };

      this.integrator = createThemeSystemIntegrator(config);
      
      // 等待一小段时间让组件完全初始化
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 验证初始化状态
      const state = this.integrator.getSystemState();
      if (!state.componentsInitialized) {
        this.addError('系统组件初始化失败');
        return false;
      }

      this.testsPassed++;
      console.log('✓ 系统初始化成功');
      return true;
    } catch (error: unknown) {
      this.addError(`系统初始化异常: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }

  /**
   * 验证颜色系统
   */
  private async validateColorSystem(): Promise<boolean> {
    console.log('验证颜色系统...');
    
    try {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      let allValid = true;

      for (const variant of variants) {
        // 验证变体有效性
        if (!isValidVariant(variant)) {
          this.addError(`无效的变体: ${variant}`);
          allValid = false;
          continue;
        }

        // 验证颜色配置
        const colors = getVariantColors(variant);
        if (!colors) {
          this.addError(`变体 ${variant} 的颜色配置缺失`);
          allValid = false;
          continue;
        }

        // 验证颜色结构完整性
        const requiredSections = ['background', 'text', 'semantic', 'ui'] as const;
        for (const section of requiredSections) {
          if (!colors[section]) {
            this.addError(`变体 ${variant} 缺少 ${section} 颜色配置`);
            allValid = false;
          }
        }

        // 验证语义颜色
        const semanticColors = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan', 'orange'] as const;
        for (const color of semanticColors) {
          const colorValue = colors.semantic[color];
          if (!colorValue) {
            this.addError(`变体 ${variant} 缺少语义颜色: ${color}`);
            allValid = false;
          } else if (!/^#[0-9a-fA-F]{6}$/.test(colorValue)) {
            this.addError(`变体 ${variant} 的 ${color} 颜色格式无效: ${colorValue}`);
            allValid = false;
          }
        }

        if (allValid) {
          this.testsPassed++;
        } else {
          this.testsFailed++;
        }
      }

      if (allValid) {
        console.log('✓ 颜色系统验证通过');
      } else {
        console.log('✗ 颜色系统验证失败');
      }

      return allValid;
    } catch (error: unknown) {
      this.addError(`颜色系统验证异常: ${error instanceof Error ? error.message : String(error)}`);
      this.testsFailed++;
      return false;
    }
  }

  /**
   * 验证变体管理
   */
  private async validateVariantManagement(): Promise<boolean> {
    console.log('验证变体管理...');
    
    if (!this.integrator) {
      this.addError('系统集成器未初始化');
      this.testsFailed++;
      return false;
    }

    try {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      let allValid = true;

      // 测试变体切换
      for (const variant of variants) {
        const initialVariant = this.integrator.getCurrentVariant();
        
        await this.integrator.switchVariant(variant);
        const currentVariant = this.integrator.getCurrentVariant();
        
        if (currentVariant !== variant) {
          this.addError(`变体切换失败: 期望 ${variant}, 实际 ${currentVariant}`);
          allValid = false;
        }
      }

      // 测试无效变体处理
      try {
        await this.integrator.switchVariant('invalid' as ThemeVariant);
        this.addError('应该拒绝无效变体，但没有抛出错误');
        allValid = false;
      } catch (error) {
        // 预期的错误，这是正确的行为
        this.testsPassed++;
      }

      // 验证变体配置
      const allConfigs = this.integrator.getAllVariantConfigs();
      if (!allConfigs || Object.keys(allConfigs).length !== 3) {
        this.addError('变体配置不完整');
        allValid = false;
      }

      if (allValid) {
        this.testsPassed++;
        console.log('✓ 变体管理验证通过');
      } else {
        this.testsFailed++;
        console.log('✗ 变体管理验证失败');
      }

      return allValid;
    } catch (error: unknown) {
      this.addError(`变体管理验证异常: ${error instanceof Error ? error.message : String(error)}`);
      this.testsFailed++;
      return false;
    }
  }

  /**
   * 验证视觉层次
   */
  private async validateVisualHierarchy(): Promise<boolean> {
    console.log('验证视觉层次...');
    
    if (!this.integrator) {
      this.addError('系统集成器未初始化');
      this.testsFailed++;
      return false;
    }

    try {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      let allValid = true;

      for (const variant of variants) {
        await this.integrator.switchVariant(variant);
        
        const colors = this.integrator.getVariantColors(variant);
        
        // 验证编辑器背景比侧边栏背景更突出
        // 这里我们检查颜色是否定义正确
        if (!colors.background.primary || !colors.background.secondary) {
          this.addError(`变体 ${variant} 的背景颜色配置不完整`);
          allValid = false;
        }

        // 验证文本层次
        if (!colors.text.primary || !colors.text.secondary || !colors.text.muted) {
          this.addError(`变体 ${variant} 的文本颜色层次不完整`);
          allValid = false;
        }
      }

      if (allValid) {
        this.testsPassed++;
        console.log('✓ 视觉层次验证通过');
      } else {
        this.testsFailed++;
        console.log('✗ 视觉层次验证失败');
      }

      return allValid;
    } catch (error: unknown) {
      this.addError(`视觉层次验证异常: ${error instanceof Error ? error.message : String(error)}`);
      this.testsFailed++;
      return false;
    }
  }

  /**
   * 验证系统集成
   */
  private async validateSystemIntegration(): Promise<boolean> {
    console.log('验证系统集成...');
    
    if (!this.integrator) {
      this.addError('系统集成器未初始化');
      this.testsFailed++;
      return false;
    }

    try {
      let allValid = true;

      // 验证系统偏好检测
      const systemPreference = this.integrator.detectSystemPreference();
      if (!['light', 'dark'].includes(systemPreference)) {
        this.addError(`无效的系统偏好: ${systemPreference}`);
        allValid = false;
      }

      // 验证自动切换功能
      this.integrator.setAutoSwitchEnabled(true);
      const state = this.integrator.getSystemState();
      if (!state.autoSwitchEnabled) {
        this.addError('自动切换设置失败');
        allValid = false;
      }

      // 验证系统一致性
      const validation = this.integrator.validateSystemConsistency();
      if (!validation.variantConsistency || !validation.colorConsistency) {
        this.addError('系统一致性验证失败');
        this.warnings.push(...validation.warnings);
        allValid = false;
      }

      if (allValid) {
        this.testsPassed++;
        console.log('✓ 系统集成验证通过');
      } else {
        this.testsFailed++;
        console.log('✗ 系统集成验证失败');
      }

      return allValid;
    } catch (error: unknown) {
      this.addError(`系统集成验证异常: ${error instanceof Error ? error.message : String(error)}`);
      this.testsFailed++;
      return false;
    }
  }

  /**
   * 验证可访问性
   */
  private async validateAccessibility(): Promise<boolean> {
    console.log('验证可访问性...');
    
    if (!this.integrator) {
      this.addError('系统集成器未初始化');
      this.testsFailed++;
      return false;
    }

    try {
      const variants: ThemeVariant[] = ['night', 'storm', 'light'];
      let allValid = true;

      for (const variant of variants) {
        await this.integrator.switchVariant(variant);
        
        try {
          const accessibility = this.integrator.validateAccessibility();
          
          if (!accessibility.meetsWCAG) {
            this.addError(`变体 ${variant} 不符合 WCAG 标准`);
            allValid = false;
          }

          // 验证对比度要求
          if (accessibility.editorContrast < 4.5) {
            this.addError(`变体 ${variant} 编辑器对比度不足: ${accessibility.editorContrast}`);
            allValid = false;
          }

          if (accessibility.sidebarContrast < 3.0) {
            this.addWarning(`变体 ${variant} 侧边栏对比度较低: ${accessibility.sidebarContrast}`);
          }
        } catch (error: unknown) {
          this.addError(`变体 ${variant} 可访问性验证失败: ${error instanceof Error ? error.message : String(error)}`);
          allValid = false;
        }
      }

      if (allValid) {
        this.testsPassed++;
        console.log('✓ 可访问性验证通过');
      } else {
        this.testsFailed++;
        console.log('✗ 可访问性验证失败');
      }

      return allValid;
    } catch (error: unknown) {
      this.addError(`可访问性验证异常: ${error instanceof Error ? error.message : String(error)}`);
      this.testsFailed++;
      return false;
    }
  }

  /**
   * 验证错误处理
   */
  private async validateErrorHandling(): Promise<boolean> {
    console.log('验证错误处理...');
    
    if (!this.integrator) {
      this.addError('系统集成器未初始化');
      this.testsFailed++;
      return false;
    }

    try {
      let allValid = true;

      // 验证系统健康状态
      const healthStatus = this.integrator.getHealthStatus();
      if (!healthStatus.healthy && healthStatus.issues.length === 0) {
        this.addError('系统健康状态检查不一致');
        allValid = false;
      }

      // 测试错误恢复
      try {
        // 尝试一些可能导致错误的操作
        await this.integrator.switchVariant('invalid' as ThemeVariant);
        this.addError('错误处理测试失败：应该抛出错误');
        allValid = false;
      } catch (error) {
        // 预期的错误，验证系统是否仍然可用
        const state = this.integrator.getSystemState();
        if (!state.componentsInitialized) {
          this.addError('错误后系统状态异常');
          allValid = false;
        }
      }

      if (allValid) {
        this.testsPassed++;
        console.log('✓ 错误处理验证通过');
      } else {
        this.testsFailed++;
        console.log('✗ 错误处理验证失败');
      }

      return allValid;
    } catch (error: unknown) {
      this.addError(`错误处理验证异常: ${error instanceof Error ? error.message : String(error)}`);
      this.testsFailed++;
      return false;
    }
  }

  /**
   * 清理资源
   */
  private cleanup(): void {
    if (this.integrator) {
      this.integrator.cleanup();
      this.integrator = null;
    }
  }

  /**
   * 重置计数器
   */
  private resetCounters(): void {
    this.errors = [];
    this.warnings = [];
    this.testsPassed = 0;
    this.testsFailed = 0;
  }

  /**
   * 添加错误
   */
  private addError(message: string): void {
    this.errors.push(message);
    console.error(`✗ ${message}`);
  }

  /**
   * 添加警告
   */
  private addWarning(message: string): void {
    this.warnings.push(message);
    console.warn(`⚠ ${message}`);
  }

  /**
   * 创建失败结果
   */
  private createFailedResult(reason: string): SystemValidationResult {
    return {
      passed: false,
      componentsValidated: 0,
      testsPassed: 0,
      testsFailed: 1,
      errors: [reason],
      warnings: [],
      details: {
        colorSystem: false,
        variantManagement: false,
        visualHierarchy: false,
        systemIntegration: false,
        accessibility: false,
        errorHandling: false,
      }
    };
  }
}

/**
 * 执行完整系统验证的便捷函数
 */
export async function validateCompleteSystem(): Promise<SystemValidationResult> {
  const validator = new SystemValidator();
  return await validator.validateCompleteSystem();
}

/**
 * 打印验证结果
 */
export function printValidationResult(result: SystemValidationResult): void {
  console.log('\n=== 系统验证结果 ===');
  console.log(`总体状态: ${result.passed ? '✓ 通过' : '✗ 失败'}`);
  console.log(`验证组件: ${result.componentsValidated}`);
  console.log(`通过测试: ${result.testsPassed}`);
  console.log(`失败测试: ${result.testsFailed}`);
  
  if (result.errors.length > 0) {
    console.log('\n错误:');
    result.errors.forEach(error => console.log(`  ✗ ${error}`));
  }
  
  if (result.warnings.length > 0) {
    console.log('\n警告:');
    result.warnings.forEach(warning => console.log(`  ⚠ ${warning}`));
  }
  
  console.log('\n详细结果:');
  Object.entries(result.details).forEach(([component, passed]) => {
    console.log(`  ${component}: ${passed ? '✓' : '✗'}`);
  });
  
  console.log('==================\n');
}