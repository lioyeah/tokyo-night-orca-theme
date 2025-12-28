/**
 * Tokyo Night 语义颜色系统演示
 * 
 * 展示语义颜色管理器的功能和用法示例
 */

import { SemanticColorManager, createSemanticColorManager } from './SemanticColorManager';
import { ThemeVariant } from '../types/colors';

/**
 * 语义颜色系统演示类
 */
export class SemanticColorDemo {
  private semanticColorManager: SemanticColorManager;
  private demoContainer: HTMLElement | null = null;

  constructor(variant: ThemeVariant = 'night') {
    this.semanticColorManager = createSemanticColorManager(variant, 'semantic-color-demo');
  }

  /**
   * 创建演示界面
   */
  public createDemo(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'semantic-color-demo';
    container.style.cssText = `
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--tokyo-night-bg-primary, #1a1b26);
      color: var(--tokyo-night-text-primary, #a9b1d6);
      min-height: 100vh;
    `;

    // 应用语义颜色样式
    this.semanticColorManager.apply();

    // 创建标题
    const title = document.createElement('h1');
    title.textContent = 'Tokyo Night 语义颜色系统演示';
    title.style.cssText = `
      color: var(--tokyo-night-primary);
      margin-bottom: 2rem;
      text-align: center;
    `;
    container.appendChild(title);

    // 创建按钮演示区域
    container.appendChild(this.createButtonDemo());

    // 创建文本演示区域
    container.appendChild(this.createTextDemo());

    // 创建通知演示区域
    container.appendChild(this.createNotificationDemo());

    // 创建状态指示器演示区域
    container.appendChild(this.createStatusDemo());

    // 创建变体切换控制
    container.appendChild(this.createVariantControls());

    this.demoContainer = container;
    return container;
  }

  /**
   * 创建按钮演示区域
   */
  private createButtonDemo(): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 3rem;';

    const heading = document.createElement('h2');
    heading.textContent = '语义按钮';
    heading.style.cssText = 'color: var(--tokyo-night-secondary); margin-bottom: 1rem;';
    section.appendChild(heading);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 1rem; flex-wrap: wrap;';

    const buttonTypes = [
      { class: 'primary', text: '主要操作' },
      { class: 'success', text: '成功' },
      { class: 'warning', text: '警告' },
      { class: 'danger', text: '危险' },
      { class: 'info', text: '信息' },
      { class: 'secondary', text: '次要' }
    ];

    buttonTypes.forEach(({ class: btnClass, text }) => {
      const button = document.createElement('button');
      button.className = `orca-button ${btnClass}`;
      button.textContent = text;
      button.style.cssText = `
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
      `;
      buttonContainer.appendChild(button);
    });

    section.appendChild(buttonContainer);
    return section;
  }

  /**
   * 创建文本演示区域
   */
  private createTextDemo(): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 3rem;';

    const heading = document.createElement('h2');
    heading.textContent = '语义文本';
    heading.style.cssText = 'color: var(--tokyo-night-secondary); margin-bottom: 1rem;';
    section.appendChild(heading);

    const textContainer = document.createElement('div');
    textContainer.style.cssText = 'display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));';

    const textTypes = [
      { class: 'text-error', text: '错误文本' },
      { class: 'text-warning', text: '警告文本' },
      { class: 'text-success', text: '成功文本' },
      { class: 'text-info', text: '信息文本' },
      { class: 'text-link', text: '链接文本' },
      { class: 'text-code', text: 'console.log("代码文本")' }
    ];

    textTypes.forEach(({ class: textClass, text }) => {
      const textElement = document.createElement('div');
      textElement.className = textClass;
      textElement.textContent = text;
      textElement.style.cssText = 'padding: 0.5rem; font-size: 1rem;';
      textContainer.appendChild(textElement);
    });

    section.appendChild(textContainer);
    return section;
  }

  /**
   * 创建通知演示区域
   */
  private createNotificationDemo(): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 3rem;';

    const heading = document.createElement('h2');
    heading.textContent = '通知和警告框';
    heading.style.cssText = 'color: var(--tokyo-night-secondary); margin-bottom: 1rem;';
    section.appendChild(heading);

    const notificationContainer = document.createElement('div');
    notificationContainer.style.cssText = 'display: grid; gap: 1rem;';

    const notificationTypes = [
      { class: 'alert-error', text: '这是一个错误通知，表示操作失败或出现问题。' },
      { class: 'alert-warning', text: '这是一个警告通知，提醒用户注意潜在问题。' },
      { class: 'alert-success', text: '这是一个成功通知，确认操作已成功完成。' },
      { class: 'alert-info', text: '这是一个信息通知，提供有用的信息或提示。' }
    ];

    notificationTypes.forEach(({ class: alertClass, text }) => {
      const alert = document.createElement('div');
      alert.className = `alert ${alertClass}`;
      alert.textContent = text;
      alert.style.cssText = `
        padding: 1rem;
        border-radius: 0.5rem;
        border-left: 4px solid;
        font-size: 0.9rem;
        line-height: 1.4;
      `;
      notificationContainer.appendChild(alert);
    });

    section.appendChild(notificationContainer);
    return section;
  }

  /**
   * 创建状态指示器演示区域
   */
  private createStatusDemo(): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 3rem;';

    const heading = document.createElement('h2');
    heading.textContent = '状态指示器';
    heading.style.cssText = 'color: var(--tokyo-night-secondary); margin-bottom: 1rem;';
    section.appendChild(heading);

    const statusContainer = document.createElement('div');
    statusContainer.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;';

    // 状态徽章
    const badgeContainer = document.createElement('div');
    badgeContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap;';

    const badgeTypes = [
      { class: 'error', text: '错误' },
      { class: 'warning', text: '警告' },
      { class: 'success', text: '成功' },
      { class: 'info', text: '信息' }
    ];

    badgeTypes.forEach(({ class: badgeClass, text }) => {
      const badge = document.createElement('span');
      badge.className = `badge ${badgeClass}`;
      badge.textContent = text;
      badge.style.cssText = `
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.025em;
      `;
      badgeContainer.appendChild(badge);
    });

    // 状态点
    const dotContainer = document.createElement('div');
    dotContainer.style.cssText = 'display: flex; gap: 1rem; align-items: center;';

    badgeTypes.forEach(({ class: dotClass, text }) => {
      const dotWrapper = document.createElement('div');
      dotWrapper.style.cssText = 'display: flex; align-items: center; gap: 0.5rem;';

      const dot = document.createElement('span');
      dot.className = `status-dot ${dotClass}`;
      dot.style.cssText = `
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      `;

      const label = document.createElement('span');
      label.textContent = text;
      label.style.cssText = 'font-size: 0.9rem;';

      dotWrapper.appendChild(dot);
      dotWrapper.appendChild(label);
      dotContainer.appendChild(dotWrapper);
    });

    statusContainer.appendChild(badgeContainer);
    statusContainer.appendChild(dotContainer);
    section.appendChild(statusContainer);
    return section;
  }

  /**
   * 创建变体切换控制
   */
  private createVariantControls(): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 2rem; text-align: center;';

    const heading = document.createElement('h2');
    heading.textContent = '主题变体切换';
    heading.style.cssText = 'color: var(--tokyo-night-secondary); margin-bottom: 1rem;';
    section.appendChild(heading);

    const controlContainer = document.createElement('div');
    controlContainer.style.cssText = 'display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;';

    const variants = [
      { value: 'night', label: 'Tokyo Night (最暗)' },
      { value: 'storm', label: 'Tokyo Night Storm (中等暗)' },
      { value: 'light', label: 'Tokyo Night Light (亮色)' }
    ];

    variants.forEach(({ value, label }) => {
      const button = document.createElement('button');
      button.className = 'orca-button secondary';
      button.textContent = label;
      button.style.cssText = `
        padding: 0.75rem 1.5rem;
        border: 1px solid var(--tokyo-night-border);
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
        background-color: var(--tokyo-night-bg-secondary);
        color: var(--tokyo-night-text-primary);
      `;

      button.addEventListener('click', () => {
        this.switchVariant(value as ThemeVariant);
        // 更新按钮状态
        controlContainer.querySelectorAll('button').forEach(btn => {
          btn.style.backgroundColor = 'var(--tokyo-night-bg-secondary)';
          btn.style.color = 'var(--tokyo-night-text-primary)';
        });
        button.style.backgroundColor = 'var(--tokyo-night-primary)';
        button.style.color = 'var(--tokyo-night-bg-primary)';
      });

      // 设置当前变体的按钮状态
      if (value === this.semanticColorManager.getCurrentVariant()) {
        button.style.backgroundColor = 'var(--tokyo-night-primary)';
        button.style.color = 'var(--tokyo-night-bg-primary)';
      }

      controlContainer.appendChild(button);
    });

    section.appendChild(controlContainer);
    return section;
  }

  /**
   * 切换主题变体
   */
  public switchVariant(variant: ThemeVariant): void {
    this.semanticColorManager.updateVariant(variant);
    console.log(`切换到 ${variant} 变体`);
    
    // 生成使用报告
    const report = this.semanticColorManager.generateUsageReport();
    console.log('语义颜色使用报告:', report);
  }

  /**
   * 获取当前语义颜色管理器
   */
  public getSemanticColorManager(): SemanticColorManager {
    return this.semanticColorManager;
  }

  /**
   * 清理演示
   */
  public cleanup(): void {
    this.semanticColorManager.remove();
    if (this.demoContainer && this.demoContainer.parentNode) {
      this.demoContainer.parentNode.removeChild(this.demoContainer);
    }
  }
}

/**
 * 创建语义颜色演示实例
 */
export function createSemanticColorDemo(variant: ThemeVariant = 'night'): SemanticColorDemo {
  return new SemanticColorDemo(variant);
}

/**
 * 在页面中启动演示
 */
export function startSemanticColorDemo(variant: ThemeVariant = 'night'): SemanticColorDemo {
  const demo = createSemanticColorDemo(variant);
  const demoElement = demo.createDemo();
  
  // 如果页面已加载，直接添加到body
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(demoElement);
    });
  } else {
    document.body.appendChild(demoElement);
  }
  
  return demo;
}

// 如果在浏览器环境中直接运行此文件，自动启动演示
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // 可以通过URL参数指定变体
  const urlParams = new URLSearchParams(window.location.search);
  const variant = (urlParams.get('variant') as ThemeVariant) || 'night';
  
  // 延迟启动，确保页面加载完成
  setTimeout(() => {
    const demo = startSemanticColorDemo(variant);
    console.log('Tokyo Night 语义颜色演示已启动');
    console.log('当前变体:', demo.getSemanticColorManager().getCurrentVariant());
    console.log('语义颜色映射:', demo.getSemanticColorManager().getSemanticMapping());
  }, 100);
}