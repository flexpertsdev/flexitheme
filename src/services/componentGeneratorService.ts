import { DesignSystemState, ComponentConfig } from '../types';

export class ComponentGeneratorService {
  static async generateComponents(state: DesignSystemState): Promise<Record<string, string>> {
    const components: Record<string, string> = {};

    for (const component of state.selectedComponents) {
      const componentCode = this.generateComponentCode(component, state);
      components[`${component.id}.${this.getFileExtension(state)}`] = componentCode;
    }

    return components;
  }

  private static getFileExtension(state: DesignSystemState): string {
    switch (state.projectInfo.targetFramework) {
      case 'react':
        return 'jsx';
      case 'vue':
        return 'vue';
      case 'angular':
        return 'ts';
      default:
        return 'html';
    }
  }

  private static generateComponentCode(
    component: ComponentConfig,
    state: DesignSystemState,
  ): string {
    switch (state.projectInfo.targetFramework) {
      case 'react':
        return this.generateReactComponent(component);
      case 'vue':
        return this.generateVueComponent(component);
      case 'angular':
        return this.generateAngularComponent(component);
      default:
        return this.generateVanillaComponent(component);
    }
  }

  private static generateReactComponent(component: ComponentConfig): string {
    const componentName = this.toPascalCase(component.name);

    switch (component.id) {
      case 'button':
        return this.generateReactButton(componentName);
      case 'card':
        return this.generateReactCard(componentName);
      case 'input-field':
        return this.generateReactInput(componentName);
      case 'navbar':
        return this.generateReactNavbar(componentName);
      default:
        return this.generateReactGeneric(componentName, component);
    }
  }

  private static generateReactButton(name: string): string {
    return `import React from 'react';
import './Button.css';

export const ${name} = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

${name}.displayName = '${name}';`;
  }

  private static generateReactCard(name: string): string {
    return `import React from 'react';
import './Card.css';

export const ${name} = ({ 
  title, 
  children, 
  footer, 
  variant = 'default',
  ...props 
}) => {
  return (
    <div className={\`card card-\${variant}\`} {...props}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

${name}.displayName = '${name}';`;
  }

  private static generateReactInput(name: string): string {
    return `import React from 'react';
import './Input.css';

export const ${name} = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  helperText,
  required = false,
  ...props 
}) => {
  const inputId = \`input-\${Math.random().toString(36).substr(2, 9)}\`;
  
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={\`input \${error ? 'input-error' : ''}\`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? \`\${inputId}-error\` : helperText ? \`\${inputId}-helper\` : undefined}
        {...props}
      />
      {error && (
        <span id={\`\${inputId}-error\`} className="input-error-message">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={\`\${inputId}-helper\`} className="input-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
};

${name}.displayName = '${name}';`;
  }

  private static generateReactNavbar(name: string): string {
    return `import React, { useState } from 'react';
import './Navbar.css';

export const ${name} = ({ 
  logo, 
  menuItems = [], 
  ctaButton,
  variant = 'default' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className={\`navbar navbar-\${variant}\`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          {logo}
        </div>
        
        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>
        
        <div className={\`navbar-menu \${isMenuOpen ? 'is-active' : ''}\`}>
          <ul className="navbar-nav">
            {menuItems.map((item, index) => (
              <li key={index} className="navbar-item">
                <a href={item.href} className="navbar-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {ctaButton && (
            <div className="navbar-cta">
              {ctaButton}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

${name}.displayName = '${name}';`;
  }

  private static generateReactGeneric(name: string, component: ComponentConfig): string {
    return `import React from 'react';
import './${name}.css';

export const ${name} = ({ children, ...props }) => {
  return (
    <div className="${component.id}" {...props}>
      {children}
    </div>
  );
};

${name}.displayName = '${name}';`;
  }

  private static generateVueComponent(component: ComponentConfig): string {
    const componentName = this.toPascalCase(component.name);

    switch (component.id) {
      case 'button':
        return this.generateVueButton(componentName);
      case 'card':
        return this.generateVueCard(componentName);
      default:
        return this.generateVueGeneric(componentName, component);
    }
  }

  private static generateVueButton(name: string): string {
    return `<template>
  <button
    :class="['btn', \`btn-\${variant}\`, \`btn-\${size}\`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: '${name}',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.btn {
  /* Button styles from design tokens */
}
</style>`;
  }

  private static generateVueCard(name: string): string {
    return `<template>
  <div :class="['card', \`card-\${variant}\`]">
    <div v-if="title" class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '${name}',
  props: {
    title: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style scoped>
.card {
  /* Card styles from design tokens */
}
</style>`;
  }

  private static generateVueGeneric(name: string, component: ComponentConfig): string {
    return `<template>
  <div class="${component.id}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '${name}'
}
</script>

<style scoped>
.${component.id} {
  /* Component styles from design tokens */
}
</style>`;
  }

  private static generateAngularComponent(component: ComponentConfig): string {
    const componentName = this.toPascalCase(component.name);
    const selector = this.toKebabCase(component.name);

    return `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '${selector}',
  template: \`
    <div class="${component.id}">
      <ng-content></ng-content>
    </div>
  \`,
  styleUrls: ['./${selector}.component.css']
})
export class ${componentName}Component {
  // Component implementation
}`;
  }

  private static generateVanillaComponent(component: ComponentConfig): string {
    switch (component.id) {
      case 'button':
        return this.generateVanillaButton();
      case 'card':
        return this.generateVanillaCard();
      default:
        return this.generateVanillaGeneric(component);
    }
  }

  private static generateVanillaButton(): string {
    return `<!-- Button Component -->
<button class="btn btn-primary">
  Button Text
</button>

<!-- Button Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>

<!-- Button Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Disabled State -->
<button class="btn btn-primary" disabled>Disabled</button>`;
  }

  private static generateVanillaCard(): string {
    return `<!-- Card Component -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-content">
    <p>Card content goes here. You can add any HTML content inside the card.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<!-- Card without header/footer -->
<div class="card">
  <div class="card-content">
    <p>Simple card with just content.</p>
  </div>
</div>`;
  }

  private static generateVanillaGeneric(component: ComponentConfig): string {
    return `<!-- ${component.name} Component -->
<div class="${component.id}">
  <!-- ${component.name} content -->
</div>`;
  }

  private static toPascalCase(str: string): string {
    return str
      .split(/[-_\s]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private static toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}
