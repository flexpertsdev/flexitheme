import { DesignSystemState } from '../types';

export class ConfigGeneratorService {
  static generatePackageJson(state: DesignSystemState): string {
    const packageName = state.projectInfo.name.toLowerCase().replace(/\s+/g, '-');

    return JSON.stringify(
      {
        name: packageName,
        version: state.projectInfo.version,
        description: state.projectInfo.description,
        author: state.projectInfo.author,
        license: 'MIT',
        main: 'index.js',
        scripts: {
          build: 'npm run build:css && npm run build:components',
          'build:css': 'postcss src/styles/*.css -d dist/styles',
          'build:components': 'babel src/components -d dist/components',
          watch: 'npm run build:css -- --watch',
          serve: 'http-server -p 8080',
        },
        devDependencies: {
          postcss: '^8.4.31',
          'postcss-cli': '^10.1.0',
          autoprefixer: '^10.4.16',
          'http-server': '^14.1.1',
        },
        ...(state.projectInfo.targetFramework === 'react' && {
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
          },
          devDependencies: {
            '@babel/core': '^7.23.0',
            '@babel/preset-react': '^7.22.0',
            '@babel/cli': '^7.23.0',
            postcss: '^8.4.31',
            'postcss-cli': '^10.1.0',
            autoprefixer: '^10.4.16',
            'http-server': '^14.1.1',
          },
        }),
      },
      null,
      2,
    );
  }

  static generatePostCSSConfig(): string {
    return `module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};`;
  }

  static generateBabelConfig(framework: string): string {
    if (framework !== 'react') return '';

    return JSON.stringify(
      {
        presets: [
          '@babel/preset-react',
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
        ],
      },
      null,
      2,
    );
  }

  static generateTsConfig(framework: string): string {
    if (framework === 'vanilla') return '';

    return JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'node',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: framework === 'react' ? 'react-jsx' : 'preserve',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true,
        },
        include: ['src'],
        exclude: ['node_modules'],
      },
      null,
      2,
    );
  }

  static generateViteConfig(state: DesignSystemState): string {
    if (state.projectInfo.targetFramework === 'vanilla') return '';

    const framework = state.projectInfo.targetFramework;

    return `import { defineConfig } from 'vite';
${framework === 'react' ? "import react from '@vitejs/plugin-react';" : ''}
${framework === 'vue' ? "import vue from '@vitejs/plugin-vue';" : ''}

export default defineConfig({
  plugins: [${framework === 'react' ? 'react()' : framework === 'vue' ? 'vue()' : ''}],
  build: {
    lib: {
      entry: 'src/index.${framework === 'react' ? 'ts' : 'js'}',
      name: '${state.projectInfo.name.replace(/\s+/g, '')}',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ${framework === 'react' ? "['react', 'react-dom']" : framework === 'vue' ? "['vue']" : '[]'},
      output: {
        globals: ${framework === 'react' ? "{ react: 'React', 'react-dom': 'ReactDOM' }" : framework === 'vue' ? "{ vue: 'Vue' }" : '{}'}
      }
    }
  }
});`;
  }

  static generateGitignore(): string {
    return `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
.env.*.local

# Test coverage
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
.cache/`;
  }

  static generateEslintConfig(framework: string): string {
    const baseConfig = {
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: ['eslint:recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        indent: ['error', 2],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
      },
    };

    if (framework === 'react') {
      baseConfig.extends.push('plugin:react/recommended');
      (baseConfig as any).plugins = ['react'];
      (baseConfig.parserOptions as any).ecmaFeatures = { jsx: true };
      (baseConfig as any).settings = {
        react: { version: 'detect' },
      };
    }

    if (framework === 'vue') {
      baseConfig.extends.push('plugin:vue/vue3-recommended');
      (baseConfig as any).parser = 'vue-eslint-parser';
    }

    return JSON.stringify(baseConfig, null, 2);
  }

  static generatePrettierConfig(): string {
    return JSON.stringify(
      {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'lf',
      },
      null,
      2,
    );
  }

  static generateCICDWorkflow(_state: DesignSystemState): string {
    return `name: Design System CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build design system
      run: npm run build
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: design-system-dist
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download artifacts
      uses: actions/download-artifact@v3
      with:
        name: design-system-dist
        path: dist/
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
`;
  }
}
