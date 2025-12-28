# Design Document: Tokyo Night Theme Improvements

## Overview

This design document outlines the technical approach for improving the Tokyo Night theme for Orca Notes. The improvements focus on creating a refined, professional aesthetic that follows the official Tokyo Night design language while implementing the "editor-focused, sidebar-subdued" philosophy of official Orca themes.

The design introduces three Tokyo Night variants (Night, Storm, Light), enhanced visual hierarchy, and refined component styling that maintains the authentic Tokyo Night color relationships while improving usability and visual appeal.

## Architecture

### Theme Structure

The improved theme system will maintain the existing plugin architecture while extending it to support multiple variants:

```
tokyo-night-theme/
├── src/
│   ├── main.ts                 # Main plugin entry point
│   ├── variants/
│   │   ├── night.ts           # Tokyo Night (darkest)
│   │   ├── storm.ts           # Tokyo Night Storm
│   │   └── light.ts           # Tokyo Night Light
│   ├── components/
│   │   ├── sidebar.ts         # Sidebar-specific styling
│   │   ├── editor.ts          # Editor area styling
│   │   └── ui-components.ts   # General UI components
│   └── utils/
│       ├── colors.ts          # Color system utilities
│       └── animations.ts      # Animation helpers
├── public/
│   ├── theme-night.css        # Static CSS for Night variant
│   ├── theme-storm.css        # Static CSS for Storm variant
│   └── theme-light.css        # Static CSS for Light variant
└── package.json
```

### Color System Architecture

The color system will be built around the official Tokyo Night palette with semantic color assignments:

```typescript
interface TokyoNightColors {
  // Base colors
  background: {
    primary: string;    // Main editor background
    secondary: string;  // Sidebar/panel background
    tertiary: string;   // Modal/popup background
  };
  
  // Text colors
  text: {
    primary: string;    // Main content text
    secondary: string;  // UI labels and secondary text
    muted: string;      // Comments and disabled text
  };
  
  // Semantic colors
  semantic: {
    red: string;        // Errors, keywords
    orange: string;     // Numbers, constants
    yellow: string;     // Functions, warnings
    green: string;      // Strings, success
    cyan: string;       // Properties, info
    blue: string;       // Functions, primary actions
    purple: string;     // Keywords, special
  };
  
  // UI colors
  ui: {
    border: string;     // Borders and separators
    hover: string;      // Hover states
    selection: string;  // Selected items
    focus: string;      // Focus indicators
  };
}
```

## Components and Interfaces

### 1. Theme Variant Manager

Manages switching between Tokyo Night variants and maintains consistent behavior:

```typescript
interface ThemeVariantManager {
  currentVariant: 'night' | 'storm' | 'light';
  
  switchVariant(variant: string): Promise<void>;
  getVariantColors(variant: string): TokyoNightColors;
  applyVariant(variant: string): void;
  detectSystemPreference(): 'light' | 'dark';
}
```

### 2. Visual Hierarchy Controller

Implements the editor-focused design philosophy:

```typescript
interface VisualHierarchyController {
  emphasizeEditor(): void;
  subduesSidebar(): void;
  balanceUIElements(): void;
  applyFocusStates(): void;
}
```

### 3. Component Style Manager

Handles consistent styling across UI components:

```typescript
interface ComponentStyleManager {
  applyButtonStyles(): void;
  applyInputStyles(): void;
  applyModalStyles(): void;
  applyTableStyles(): void;
  applyMenuStyles(): void;
}
```

### 4. Animation System

Manages smooth transitions and micro-interactions:

```typescript
interface AnimationSystem {
  duration: {
    fast: number;    // 150ms
    normal: number;  // 250ms
    slow: number;    // 350ms
  };
  
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  
  applyTransitions(element: string, properties: string[]): void;
  respectMotionPreferences(): boolean;
}
```

## Data Models

### Tokyo Night Color Variants

#### Night Variant (Darkest)
```typescript
const tokyoNightColors: TokyoNightColors = {
  background: {
    primary: '#1a1b26',    // Editor background
    secondary: '#16161e',   // Sidebar background (darker)
    tertiary: '#24283b',    // Modal background
  },
  text: {
    primary: '#a9b1d6',     // Main text
    secondary: '#9aa5ce',   // Secondary text
    muted: '#565f89',       // Comments
  },
  semantic: {
    red: '#f7768e',         // Keywords, errors
    orange: '#ff9e64',      // Numbers, constants
    yellow: '#e0af68',      // Functions, warnings
    green: '#9ece6a',       // Strings, success
    cyan: '#7dcfff',        // Properties, info
    blue: '#7aa2f7',        // Functions, primary
    purple: '#bb9af7',      // Keywords, special
  },
  ui: {
    border: '#292e42',      // Subtle borders
    hover: '#414868',       // Hover states
    selection: '#364a82',   // Selection background
    focus: '#7aa2f7',       // Focus indicators
  }
};
```

#### Storm Variant (Medium Dark)
```typescript
const tokyoNightStormColors: TokyoNightColors = {
  background: {
    primary: '#24283b',     // Lighter than Night
    secondary: '#1f2335',   // Sidebar background
    tertiary: '#292e42',    // Modal background
  },
  // ... similar structure with adjusted values
};
```

#### Light Variant
```typescript
const tokyoNightLightColors: TokyoNightColors = {
  background: {
    primary: '#e6e7ed',     // Light editor background
    secondary: '#d5d6db',   // Light sidebar background
    tertiary: '#ffffff',    // Light modal background
  },
  text: {
    primary: '#343b58',     // Dark text on light background
    secondary: '#40434f',   // Secondary dark text
    muted: '#6c6e75',       // Muted text
  },
  semantic: {
    red: '#8c4351',         // Adjusted for light background
    orange: '#965027',      // Adjusted for light background
    yellow: '#8f5e15',      // Adjusted for light background
    green: '#385f0d',       // Adjusted for light background
    cyan: '#0f4b6e',        // Adjusted for light background
    blue: '#2959aa',        // Adjusted for light background
    purple: '#5a3e8e',      // Adjusted for light background
  },
  ui: {
    border: '#c4c6cd',      // Light borders
    hover: '#b6b8c0',       // Light hover states
    selection: '#a8aab4',   // Light selection
    focus: '#2959aa',       // Focus indicators
  }
};
```

### Visual Hierarchy Configuration

```typescript
interface HierarchyConfig {
  editor: {
    emphasis: 'high';
    contrast: 'maximum';
    background: 'primary';
    textContrast: 4.5; // WCAG AA minimum
  };
  
  sidebar: {
    emphasis: 'low';
    opacity: 0.85;
    background: 'secondary';
    textContrast: 3.0; // Reduced but readable
  };
  
  ui: {
    emphasis: 'medium';
    subtlety: 'high';
    borderWeight: 'minimal';
    shadowDepth: 'subtle';
  };
}
```

## Implementation Strategy

### Phase 1: Color System Foundation
1. Implement the three Tokyo Night color variants
2. Create color utility functions for consistent application
3. Update existing CSS variables to use the new color system
4. Ensure proper contrast ratios across all variants

### Phase 2: Visual Hierarchy Implementation
1. Redesign sidebar with reduced visual weight
2. Enhance editor area prominence
3. Implement subtle UI element styling
4. Add proper focus management

### Phase 3: Component Refinement
1. Update button styles with subtle interactions
2. Refine input field appearances
3. Improve modal and dropdown styling
4. Enhance table and list presentations

### Phase 4: Animation and Transitions
1. Add smooth state transitions
2. Implement hover micro-interactions
3. Create gentle modal animations
4. Ensure accessibility compliance

### Phase 5: Multi-Variant Support
1. Implement variant switching mechanism
2. Add system preference detection
3. Create variant-specific optimizations
4. Test cross-variant consistency

## Technical Considerations

### Performance
- Use CSS custom properties for efficient color updates
- Minimize JavaScript execution during theme switches
- Leverage browser caching for static CSS files
- Optimize animation performance with transform and opacity

### Compatibility
- Maintain backward compatibility with existing Orca theme API
- Ensure proper fallbacks for unsupported features
- Test across different Orca versions
- Validate with various screen sizes and resolutions

### Maintainability
- Separate concerns between variants and components
- Use consistent naming conventions
- Document color usage and semantic meanings
- Provide clear upgrade paths for future improvements

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Visual Hierarchy Consistency
*For any* UI state and theme variant, the editor area should have higher visual prominence (contrast, saturation, brightness) than the sidebar, and UI elements should have lower visual weight than content areas
**Validates: Requirements 1.1, 1.3, 2.1**

### Property 2: Tokyo Night Color Authenticity
*For any* theme variant (Night, Storm, Light), all applied colors should match the official Tokyo Night color palette, with semantic colors correctly assigned to their respective UI elements
**Validates: Requirements 3.1, 3.2, 3.3, 3.5**

### Property 3: Interactive State Feedback
*For any* interactive element (buttons, sidebar items, inputs), hover and selection states should provide clear but subtle visual feedback without overwhelming the content
**Validates: Requirements 2.2, 2.3, 6.1**

### Property 4: Typography Hierarchy Consistency
*For any* text element, font weights, sizes, and contrast ratios should be appropriate for the element's hierarchical level and maintain consistency across similar components
**Validates: Requirements 4.1, 4.2, 4.4**

### Property 5: Animation Quality and Accessibility
*For any* UI transition or animation, timing should be appropriate for the interaction type, and animations should be disabled when user prefers reduced motion
**Validates: Requirements 5.1, 5.2, 5.4**

### Property 6: Component Design Consistency
*For any* UI component type, styling should be consistent across instances, with appropriate use of borders, backgrounds, and spacing that aligns with the overall theme
**Validates: Requirements 6.2, 6.3, 6.4, 6.5**

### Property 7: Cross-Variant Behavior Preservation
*For any* theme variant switch, UI layout, component functionality, and user customizations should be preserved while colors adapt to the new variant
**Validates: Requirements 7.2, 7.3, 7.5**

### Property 8: Accessibility Compliance
*For any* theme variant and UI state, contrast ratios should meet accessibility standards, focus indicators should be clearly visible, and spacing should provide adequate touch targets
**Validates: Requirements 4.1, 5.5**

### Property 9: Semantic Color Logic
*For any* UI element requiring semantic color (errors, warnings, success, info), the correct Tokyo Night semantic color should be applied according to the element's meaning and context
**Validates: Requirements 3.3, 3.5**

### Property 10: System Integration
*For any* system preference change (dark/light mode), the theme should automatically switch to the appropriate variant while maintaining all other properties
**Validates: Requirements 7.4**

## Error Handling

### Theme Loading Failures
- **Graceful Degradation**: If a theme variant fails to load, fall back to the default Night variant
- **Color Fallbacks**: If specific Tokyo Night colors are unavailable, use closest available colors from the standard palette
- **CSS Loading Errors**: If static CSS files fail to load, apply inline styles with core Tokyo Night colors

### Variant Switching Errors
- **Invalid Variant Requests**: Log warnings and maintain current variant if an invalid variant is requested
- **Partial Application Failures**: If some styles fail to apply during variant switching, retry with exponential backoff
- **State Corruption**: Implement state validation and recovery mechanisms for theme settings

### System Integration Errors
- **Preference Detection Failures**: If system preference detection fails, default to user's last selected variant
- **Animation Conflicts**: Disable problematic animations if they conflict with system accessibility settings
- **Performance Issues**: Implement performance monitoring and automatic fallback to simpler styling if needed

### User Experience Preservation
- **Settings Persistence**: Ensure user customizations are preserved even if errors occur during theme operations
- **Visual Consistency**: Maintain visual consistency even when some theme features are unavailable
- **Accessibility Compliance**: Never compromise accessibility standards, even in error conditions

## Testing Strategy

### Dual Testing Approach
The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, and error conditions
- **Property Tests**: Verify universal properties across all inputs and configurations
- Both approaches are complementary and necessary for comprehensive theme validation

### Property-Based Testing Configuration
- **Testing Library**: Use fast-check for JavaScript property-based testing
- **Test Iterations**: Minimum 100 iterations per property test to ensure thorough coverage
- **Test Tagging**: Each property test must reference its design document property using the format: **Feature: tokyo-night-theme-improvements, Property {number}: {property_text}**

### Unit Testing Focus Areas
Unit tests should concentrate on:
- **Specific Color Values**: Verify exact hex codes match Tokyo Night specifications
- **Integration Points**: Test theme switching, system preference detection, and Orca API integration
- **Edge Cases**: Test behavior with missing CSS files, invalid configurations, and system errors
- **Component Examples**: Test specific UI components with known expected styling

### Property Testing Focus Areas
Property tests should verify:
- **Universal Color Relationships**: Test that color hierarchy and relationships hold across all variants
- **Comprehensive Input Coverage**: Test theme behavior across all possible configurations and states
- **Cross-Variant Consistency**: Verify that switching between variants maintains expected behavior
- **Accessibility Properties**: Test that accessibility requirements hold for all generated color combinations

### Testing Environment Setup
- **Browser Compatibility**: Test across Chrome, Firefox, Safari, and Edge
- **Screen Sizes**: Verify responsive behavior across desktop and mobile viewports
- **Accessibility Tools**: Use automated accessibility testing tools to verify WCAG compliance
- **Performance Monitoring**: Measure theme switching performance and animation frame rates

### Continuous Integration
- **Automated Testing**: Run all tests on every commit and pull request
- **Visual Regression Testing**: Capture and compare screenshots to detect unintended visual changes
- **Performance Benchmarks**: Monitor theme loading and switching performance over time
- **Accessibility Audits**: Automated accessibility testing in CI pipeline