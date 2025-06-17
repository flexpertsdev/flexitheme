import { DesignTokens } from '../types';

export class TokenService {
  static mergeTokens(baseTokens: DesignTokens, styleTokens?: Partial<DesignTokens>): DesignTokens {
    if (!styleTokens) return baseTokens;

    return {
      colors: { ...baseTokens.colors, ...styleTokens.colors },
      typography: { ...baseTokens.typography, ...styleTokens.typography },
      spacing: { ...baseTokens.spacing, ...styleTokens.spacing },
      borderRadius: { ...baseTokens.borderRadius, ...styleTokens.borderRadius },
      shadows: { ...baseTokens.shadows, ...styleTokens.shadows },
      transitions: { ...baseTokens.transitions, ...styleTokens.transitions },
    };
  }

  static generateCSSVariables(tokens: DesignTokens): string {
    const lines: string[] = [':root {'];

    // Colors
    Object.entries(tokens.colors).forEach(([colorName, scale]) => {
      Object.entries(scale).forEach(([shade, value]) => {
        lines.push(`  --color-${colorName}-${shade}: ${value};`);
      });
    });

    // Typography
    Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
      lines.push(`  --font-${name}: ${value};`);
    });

    Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
      lines.push(`  --text-${size}: ${value};`);
    });

    Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
      lines.push(`  --font-weight-${weight}: ${value};`);
    });

    Object.entries(tokens.typography.lineHeight).forEach(([height, value]) => {
      lines.push(`  --leading-${height}: ${value};`);
    });

    // Spacing
    Object.entries(tokens.spacing).forEach(([size, value]) => {
      lines.push(`  --space-${size}: ${value};`);
    });

    // Border Radius
    Object.entries(tokens.borderRadius).forEach(([size, value]) => {
      lines.push(`  --radius-${size}: ${value};`);
    });

    // Shadows
    Object.entries(tokens.shadows).forEach(([size, value]) => {
      lines.push(`  --shadow-${size}: ${value};`);
    });

    // Transitions
    Object.entries(tokens.transitions).forEach(([speed, value]) => {
      lines.push(`  --transition-${speed}: ${value};`);
    });

    lines.push('}');
    return lines.join('\n');
  }

  static generateSCSSVariables(tokens: DesignTokens): string {
    const lines: string[] = [];

    // Colors
    Object.entries(tokens.colors).forEach(([colorName, scale]) => {
      lines.push(`// ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} colors`);
      Object.entries(scale).forEach(([shade, value]) => {
        lines.push(`$color-${colorName}-${shade}: ${value};`);
      });
      lines.push('');
    });

    // Typography
    lines.push('// Typography');
    Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
      lines.push(`$font-${name}: ${value};`);
    });
    lines.push('');

    Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
      lines.push(`$text-${size}: ${value};`);
    });
    lines.push('');

    Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
      lines.push(`$font-weight-${weight}: ${value};`);
    });
    lines.push('');

    // Spacing
    lines.push('// Spacing');
    Object.entries(tokens.spacing).forEach(([size, value]) => {
      lines.push(`$space-${size}: ${value};`);
    });
    lines.push('');

    // Border Radius
    lines.push('// Border Radius');
    Object.entries(tokens.borderRadius).forEach(([size, value]) => {
      lines.push(`$radius-${size}: ${value};`);
    });
    lines.push('');

    // Shadows
    lines.push('// Shadows');
    Object.entries(tokens.shadows).forEach(([size, value]) => {
      lines.push(`$shadow-${size}: ${value};`);
    });
    lines.push('');

    // Transitions
    lines.push('// Transitions');
    Object.entries(tokens.transitions).forEach(([speed, value]) => {
      lines.push(`$transition-${speed}: ${value};`);
    });

    return lines.join('\n');
  }

  static generateTailwindConfig(tokens: DesignTokens): string {
    const config = {
      theme: {
        extend: {
          colors: {},
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.fontSize,
          fontWeight: tokens.typography.fontWeight,
          lineHeight: tokens.typography.lineHeight,
          spacing: tokens.spacing,
          borderRadius: tokens.borderRadius,
          boxShadow: tokens.shadows,
          transitionDuration: {
            fast: '150ms',
            base: '250ms',
            slow: '350ms',
          },
        },
      },
    };

    // Convert color scales to Tailwind format
    Object.entries(tokens.colors).forEach(([colorName, scale]) => {
      (config.theme.extend.colors as any)[colorName] = scale;
    });

    return `module.exports = ${JSON.stringify(config, null, 2)}`;
  }

  static generateStyledComponentsTheme(tokens: DesignTokens): string {
    const theme = {
      colors: tokens.colors,
      fonts: tokens.typography.fontFamily,
      fontSizes: tokens.typography.fontSize,
      fontWeights: tokens.typography.fontWeight,
      lineHeights: tokens.typography.lineHeight,
      space: tokens.spacing,
      radii: tokens.borderRadius,
      shadows: tokens.shadows,
      transitions: tokens.transitions,
    };

    return `export const theme = ${JSON.stringify(theme, null, 2)};`;
  }

  static generateJSONTokens(tokens: DesignTokens): string {
    return JSON.stringify(tokens, null, 2);
  }

  static interpolateColor(color1: string, color2: string, factor: number): string {
    const hex2rgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb2hex = (r: number, g: number, b: number) => {
      return (
        '#' +
        [r, g, b]
          .map((x) => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          })
          .join('')
      );
    };

    const c1 = hex2rgb(color1);
    const c2 = hex2rgb(color2);

    const r = c1.r + (c2.r - c1.r) * factor;
    const g = c1.g + (c2.g - c1.g) * factor;
    const b = c1.b + (c2.b - c1.b) * factor;

    return rgb2hex(r, g, b);
  }

  static generateColorScale(baseColor: string): Record<string, string> {
    // This is a simplified color scale generator
    // In production, you'd want a more sophisticated algorithm
    return {
      50: this.adjustColorLightness(baseColor, 0.95),
      100: this.adjustColorLightness(baseColor, 0.9),
      200: this.adjustColorLightness(baseColor, 0.8),
      300: this.adjustColorLightness(baseColor, 0.7),
      400: this.adjustColorLightness(baseColor, 0.6),
      500: baseColor,
      600: this.adjustColorLightness(baseColor, -0.1),
      700: this.adjustColorLightness(baseColor, -0.2),
      800: this.adjustColorLightness(baseColor, -0.3),
      900: this.adjustColorLightness(baseColor, -0.4),
    };
  }

  private static adjustColorLightness(color: string, factor: number): string {
    const hex2hsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }

      return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const hsl2hex = (h: number, s: number, l: number) => {
      h /= 360;
      s /= 100;
      l /= 100;

      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return (
        '#' +
        [r, g, b]
          .map((x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          })
          .join('')
      );
    };

    const hsl = hex2hsl(color);
    const newL = factor > 0 ? hsl.l + (100 - hsl.l) * factor : hsl.l + hsl.l * factor;

    return hsl2hex(hsl.h, hsl.s, Math.max(0, Math.min(100, newL)));
  }
}
