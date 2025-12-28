#!/usr/bin/env node

/**
 * 系统验证脚本
 * 
 * 运行完整的 Tokyo Night 主题系统验证
 */

import { validateCompleteSystem, printValidationResult } from '../src/validation/SystemValidation';

// 模拟 DOM 环境
const mockDocument = {
  head: {
    appendChild: () => {},
    removeChild: () => {},
    contains: () => true,
  },
  createElement: () => ({
    id: '',
    textContent: '',
    remove: () => {},
  }),
  getElementById: () => null,
};

const mockWindow = {
  matchMedia: () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
};

// 设置全局模拟
global.document = mockDocument as any;
global.window = mockWindow as any;

async function main() {
  console.log('🚀 开始 Tokyo Night 主题系统验证...\n');
  
  try {
    const result = await validateCompleteSystem();
    
    printValidationResult(result);
    
    if (result.passed) {
      console.log('🎉 系统验证完全通过！主题系统已准备就绪。');
      process.exit(0);
    } else {
      console.log('❌ 系统验证失败。请检查上述错误并修复。');
      process.exit(1);
    }
  } catch (error) {
    console.error('💥 验证过程中发生异常:', error);
    process.exit(1);
  }
}

main().catch(console.error);