// 调试对比度计算
import { getVariantColors, calculateContrastRatio } from './src/utils/colors.js';

console.log('检查 Tokyo Night 颜色对比度...');

const variants = ['night', 'storm', 'light'];

variants.forEach(variant => {
  console.log(`\n=== ${variant.toUpperCase()} 变体 ===`);
  
  const colors = getVariantColors(variant);
  
  const primaryContrast = calculateContrastRatio(
    colors.text.primary,
    colors.background.primary
  );
  
  const secondaryContrast = calculateContrastRatio(
    colors.text.secondary,
    colors.background.secondary
  );
  
  const codeContrast = calculateContrastRatio(
    colors.text.primary,
    colors.background.tertiary
  );
  
  console.log(`主要文本对比度: ${primaryContrast.toFixed(2)} (需要 >= 4.5)`);
  console.log(`次要文本对比度: ${secondaryContrast.toFixed(2)} (需要 >= 3.0)`);
  console.log(`代码文本对比度: ${codeContrast.toFixed(2)} (需要 >= 4.5)`);
  
  console.log(`颜色值:`);
  console.log(`  主要文本: ${colors.text.primary}`);
  console.log(`  主要背景: ${colors.background.primary}`);
  console.log(`  次要文本: ${colors.text.secondary}`);
  console.log(`  次要背景: ${colors.background.secondary}`);
  console.log(`  代码背景: ${colors.background.tertiary}`);
});