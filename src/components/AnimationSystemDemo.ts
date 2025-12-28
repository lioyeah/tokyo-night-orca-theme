/**
 * 动画系统演示
 * 展示如何使用 AnimationSystem 类
 */

import { createAnimationSystem } from './AnimationSystem';
import { ThemeVariant } from '../types/colors';

/**
 * 演示动画系统的基本用法
 */
export function demonstrateAnimationSystem() {
  console.log('=== Tokyo Night 动画系统演示 ===');
  
  // 创建动画系统实例
  const animationSystem = createAnimationSystem('demo-plugin');
  
  console.log('1. 动画持续时间配置:');
  console.log(`   快速: ${animationSystem.duration.fast}ms`);
  console.log(`   标准: ${animationSystem.duration.normal}ms`);
  console.log(`   慢速: ${animationSystem.duration.slow}ms`);
  
  console.log('\n2. 缓动函数配置:');
  console.log(`   标准缓动: ${animationSystem.easing.ease}`);
  console.log(`   缓入: ${animationSystem.easing.easeIn}`);
  console.log(`   缓出: ${animationSystem.easing.easeOut}`);
  console.log(`   缓入缓出: ${animationSystem.easing.easeInOut}`);
  
  console.log('\n3. 检测用户动画偏好:');
  const respectsMotion = animationSystem.respectMotionPreferences();
  console.log(`   用户偏好减少动画: ${respectsMotion}`);
  
  console.log('\n4. 生成过渡效果 CSS:');
  const transitionCSS = animationSystem.applyTransitions('.demo-element', ['opacity', 'transform']);
  console.log('   生成的 CSS 片段:');
  console.log(transitionCSS.substring(0, 200) + '...');
  
  console.log('\n5. 为不同主题变体生成动画:');
  const variants: ThemeVariant[] = ['night', 'storm', 'light'];
  
  variants.forEach(variant => {
    console.log(`\n   ${variant.toUpperCase()} 变体:`);
    
    // 生成悬停效果
    const hoverCSS = animationSystem.generateHoverEffects(variant);
    console.log(`   - 悬停效果 CSS: ${hoverCSS.length} 字符`);
    
    // 生成模态框动画
    const modalCSS = animationSystem.generateModalAnimations(variant);
    console.log(`   - 模态框动画 CSS: ${modalCSS.length} 字符`);
    
    // 生成焦点指示器
    const focusCSS = animationSystem.generateFocusIndicators(variant);
    console.log(`   - 焦点指示器 CSS: ${focusCSS.length} 字符`);
    
    // 生成完整动画 CSS
    const fullCSS = animationSystem.generateAnimationCSS(variant);
    console.log(`   - 完整动画 CSS: ${fullCSS.length} 字符`);
  });
  
  console.log('\n=== 演示完成 ===');
}

/**
 * 展示动画系统的可访问性特性
 */
export function demonstrateAccessibilityFeatures() {
  console.log('\n=== 可访问性特性演示 ===');
  
  const animationSystem = createAnimationSystem('accessibility-demo');
  
  // 生成包含可访问性支持的 CSS
  const nightCSS = animationSystem.generateAnimationCSS('night');
  
  // 检查是否包含 prefers-reduced-motion 媒体查询
  const hasReducedMotion = nightCSS.includes('@media (prefers-reduced-motion: reduce)');
  console.log(`包含减少动画媒体查询: ${hasReducedMotion}`);
  
  // 检查是否包含高对比度支持
  const hasHighContrast = nightCSS.includes('@media (prefers-contrast: high)');
  console.log(`包含高对比度支持: ${hasHighContrast}`);
  
  // 检查焦点指示器
  const hasFocusIndicators = nightCSS.includes(':focus');
  console.log(`包含焦点指示器: ${hasFocusIndicators}`);
  
  console.log('=== 可访问性演示完成 ===');
}

/**
 * 展示动画系统的性能优化特性
 */
export function demonstratePerformanceFeatures() {
  console.log('\n=== 性能优化特性演示 ===');
  
  const animationSystem = createAnimationSystem('performance-demo');
  const css = animationSystem.generateAnimationCSS('night');
  
  // 检查硬件加速优化
  const hasWillChange = css.includes('will-change:');
  console.log(`包含硬件加速优化: ${hasWillChange}`);
  
  // 检查动画完成后的清理
  const hasAnimationComplete = css.includes('.animation-complete');
  console.log(`包含动画完成清理: ${hasAnimationComplete}`);
  
  // 检查合理的动画持续时间
  const durations = [
    animationSystem.duration.fast,
    animationSystem.duration.normal,
    animationSystem.duration.slow
  ];
  
  const allReasonable = durations.every(d => d >= 100 && d <= 500);
  console.log(`动画持续时间合理 (100-500ms): ${allReasonable}`);
  console.log(`实际持续时间: ${durations.join('ms, ')}ms`);
  
  console.log('=== 性能优化演示完成 ===');
}

// 如果直接运行此文件，执行演示
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  // Node.js 环境下的演示
  demonstrateAnimationSystem();
  demonstrateAccessibilityFeatures();
  demonstratePerformanceFeatures();
}