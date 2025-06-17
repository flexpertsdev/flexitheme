# CLAUDE.md - FlexiTheme Project Guide

## Project Overview
FlexiTheme is a comprehensive design system generator that helps users create custom design systems through an interactive wizard interface. The application features real-time previews, responsive wireframes, and exports to multiple formats.

## Project Structure
```
flexitheme/
├── src/
│   ├── components/        # Reusable UI components
│   ├── services/          # Business logic and utilities
│   ├── hooks/             # Custom React-like hooks
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # CSS modules and themes
│   ├── data/              # Mock data and configurations
│   └── pages/             # Page components
├── public/                # Static assets
├── tests/                 # Test files
└── dist/                  # Build output
```

## Key Commands
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks
npm run test             # Run tests

# Code Quality
npm run format           # Format code with Prettier
npm run lint:fix         # Fix linting issues
```

## Architecture Decisions

### State Management
- Custom reactive state system with TypeScript
- LocalStorage for session persistence
- No external state management libraries

### Styling
- CSS Modules for component isolation
- CSS Custom Properties for theming
- No CSS-in-JS libraries

### Build System
- Vite for fast development and optimized builds
- ESBuild for TypeScript compilation
- Module federation for code splitting

## Development Guidelines

### Component Structure
```typescript
// components/Button/Button.tsx
export interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  // Implementation
}
```

### Service Pattern
```typescript
// services/ThemeService.ts
export class ThemeService {
  private static instance: ThemeService;
  
  static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }
  
  // Service methods
}
```

### Custom Hooks
```typescript
// hooks/useTheme.ts
export function useTheme(themeId: string) {
  // Hook implementation
  return { theme, tokens, isGenerating };
}
```

## Wizard Flow
1. **Style Selection**: Choose base theme (Minimal, Modern, etc.)
2. **Page Selection**: Pick required page types
3. **Navigation Config**: Set mobile/desktop navigation patterns
4. **Auth States**: Configure authentication requirements
5. **Design Customization**: Adjust colors, typography, spacing
6. **Export**: Generate and download design system

## Key Features to Implement

### Phase 1: Core Infrastructure
- [ ] Project setup with Vite and TypeScript
- [ ] Base component library
- [ ] CSS architecture with theme system
- [ ] Routing setup

### Phase 2: Wizard Implementation
- [ ] Step indicator component
- [ ] Form validation system
- [ ] Progress persistence
- [ ] Navigation guards

### Phase 3: Theme Engine
- [ ] Design token generation
- [ ] Color system utilities
- [ ] Typography scale calculator
- [ ] Spacing system generator

### Phase 4: Wireframe System
- [ ] Interactive wireframe renderer
- [ ] Device frame components
- [ ] Responsive behavior simulator
- [ ] Animation system

### Phase 5: Export System
- [ ] Markdown generator
- [ ] HTML export with embedded styles
- [ ] JSON schema export
- [ ] ZIP bundle creation

## Testing Strategy
- Unit tests for utilities and services
- Component testing with Testing Library
- E2E tests for wizard flow
- Visual regression tests for themes

## Performance Targets
- Initial load: < 3 seconds
- Step navigation: < 100ms
- Preview updates: < 200ms
- Export generation: < 5 seconds

## Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS 14+, Android 8+

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support
- Focus management in wizard
- Reduced motion support

## Common Issues & Solutions

### Issue: Slow preview updates
**Solution**: Implement debouncing and memoization for wireframe generation

### Issue: Large export files
**Solution**: Use compression and lazy loading for embedded assets

### Issue: Theme conflicts
**Solution**: Use CSS custom properties with proper scoping

## Resources
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Contact & Support
- GitHub Issues: Report bugs and feature requests
- Documentation: See PROJECT.md for detailed specifications
- Design System Examples: See CONTEXT/ui-style-catalogue.html