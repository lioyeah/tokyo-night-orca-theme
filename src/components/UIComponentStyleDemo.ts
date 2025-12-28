/**
 * UI Component Style Demo for Tokyo Night Theme
 * 
 * 演示UI组件样式管理器的功能，展示按钮、输入框、下拉菜单、
 * 模态框和表格的样式生成和应用。
 */

import { UIComponentStyleManager } from './UIComponentStyleManager';
import { ThemeVariant } from '../types/colors';

/**
 * 演示UI组件样式管理器的功能
 */
export function demonstrateUIComponentStyles() {
  console.log('=== Tokyo Night UI组件样式管理器演示 ===');

  // 创建不同变体的样式管理器
  const variants: ThemeVariant[] = ['night', 'storm', 'light'];
  
  variants.forEach(variant => {
    console.log(`\n--- ${variant.toUpperCase()} 变体 ---`);
    
    const manager = new UIComponentStyleManager(variant, 'demo-plugin');
    
    // 展示配置信息
    const config = manager.getConfig();
    console.log('配置信息:', {
      borderRadius: config.borderRadius,
      transitions: config.transitions,
      spacing: config.spacing
    });
    
    // 展示按钮样式生成
    const buttonCSS = manager.generateButtonStyles();
    console.log('按钮样式长度:', buttonCSS.length, '字符');
    console.log('包含主要按钮样式:', buttonCSS.includes('.orca-button.primary'));
    console.log('包含悬停效果:', buttonCSS.includes(':hover'));
    
    // 展示输入框样式生成
    const inputCSS = manager.generateInputStyles();
    console.log('输入框样式长度:', inputCSS.length, '字符');
    console.log('包含焦点状态:', inputCSS.includes(':focus-within'));
    
    // 展示表格样式生成
    const tableCSS = manager.generateTableStyles();
    console.log('表格样式长度:', tableCSS.length, '字符');
    console.log('包含行悬停:', tableCSS.includes('tr:hover'));
    
    // 展示完整CSS生成
    const fullCSS = manager.generateUIComponentCSS();
    console.log('完整CSS长度:', fullCSS.length, '字符');
    console.log('包含全局样式:', fullCSS.includes('::selection'));
    
    // 展示可访问性验证
    const accessibility = manager.validateAccessibility();
    console.log('可访问性验证:', {
      meetsWCAG: accessibility.meetsWCAG,
      buttonContrast: accessibility.buttonContrast,
      recommendations: accessibility.recommendations.length
    });
  });
  
  console.log('\n=== 演示完成 ===');
}

/**
 * 生成样式预览HTML
 */
export function generateStylePreviewHTML(): string {
  const manager = new UIComponentStyleManager('night', 'preview-plugin');
  const css = manager.generateUIComponentCSS();
  
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tokyo Night UI组件样式预览</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: #1a1b26;
            color: #a9b1d6;
            padding: 2rem;
            line-height: 1.6;
        }
        
        .preview-section {
            margin-bottom: 3rem;
            padding: 2rem;
            background-color: #24283b;
            border-radius: 8px;
            border: 1px solid #292e42;
        }
        
        .preview-title {
            color: #7aa2f7;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            border-bottom: 2px solid #292e42;
            padding-bottom: 0.5rem;
        }
        
        .component-group {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        ${css}
    </style>
</head>
<body>
    <h1 style="color: #f7768e; text-align: center; margin-bottom: 3rem;">
        Tokyo Night UI组件样式预览
    </h1>
    
    <div class="preview-section">
        <h2 class="preview-title">按钮组件</h2>
        <div class="component-group">
            <button class="orca-button primary">主要按钮</button>
            <button class="orca-button secondary">次要按钮</button>
            <button class="orca-button ghost">幽灵按钮</button>
            <button class="orca-button" disabled>禁用按钮</button>
        </div>
    </div>
    
    <div class="preview-section">
        <h2 class="preview-title">输入框组件</h2>
        <div class="component-group">
            <div class="orca-input-input">
                <input type="text" placeholder="普通输入框" />
            </div>
            <div class="orca-input-input error">
                <input type="text" placeholder="错误状态" />
            </div>
            <div class="orca-input-input success">
                <input type="text" placeholder="成功状态" />
            </div>
        </div>
    </div>
    
    <div class="preview-section">
        <h2 class="preview-title">表格组件</h2>
        <table class="orca-table">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>按钮样式</td>
                    <td>UI组件</td>
                    <td>已完成</td>
                    <td><button class="orca-button small">编辑</button></td>
                </tr>
                <tr>
                    <td>输入框样式</td>
                    <td>UI组件</td>
                    <td>已完成</td>
                    <td><button class="orca-button small">编辑</button></td>
                </tr>
                <tr>
                    <td>表格样式</td>
                    <td>UI组件</td>
                    <td>已完成</td>
                    <td><button class="orca-button small">编辑</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="preview-section">
        <h2 class="preview-title">卡片组件</h2>
        <div class="orca-card">
            <div class="orca-card-header">
                <h3>Tokyo Night 主题</h3>
            </div>
            <div class="orca-card-content">
                <p>这是一个使用Tokyo Night主题样式的卡片组件示例。</p>
                <p>展示了一致的圆角、颜色和间距设计。</p>
            </div>
            <div class="orca-card-footer">
                <button class="orca-button primary">确认</button>
                <button class="orca-button ghost">取消</button>
            </div>
        </div>
    </div>
    
    <footer style="text-align: center; margin-top: 3rem; color: #565f89;">
        <p>Tokyo Night UI组件样式系统 - 微妙、专业的外观设计</p>
    </footer>
</body>
</html>
  `;
}

// 如果直接运行此文件，执行演示
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  demonstrateUIComponentStyles();
}