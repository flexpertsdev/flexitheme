import { PageTemplate } from '../types';

export const pageTemplates: PageTemplate[] = [
  // Landing Pages
  {
    id: 'hero-landing',
    name: 'Hero Landing',
    description: 'Classic hero section with CTA buttons',
    category: 'landing',
    components: ['Hero', 'Navigation', 'Features', 'CTA', 'Footer'],
    layout: 'single-column',
  },
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'Product-focused landing page for SaaS applications',
    category: 'landing',
    components: ['Navigation', 'Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Footer'],
    layout: 'single-column',
  },
  {
    id: 'marketing-landing',
    name: 'Marketing Landing',
    description: 'Conversion-optimized marketing page',
    category: 'landing',
    components: ['Navigation', 'Hero', 'Benefits', 'Social Proof', 'CTA', 'Footer'],
    layout: 'single-column',
  },

  // Dashboard Pages
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Data visualization dashboard with charts and metrics',
    category: 'dashboard',
    components: ['Sidebar', 'Header', 'MetricCards', 'Charts', 'DataTable'],
    layout: 'sidebar-layout',
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard',
    description: 'Administrative control panel',
    category: 'dashboard',
    components: ['Sidebar', 'Header', 'QuickActions', 'ActivityFeed', 'UserTable'],
    layout: 'sidebar-layout',
  },
  {
    id: 'project-dashboard',
    name: 'Project Dashboard',
    description: 'Project management overview',
    category: 'dashboard',
    components: ['Sidebar', 'Header', 'ProjectCards', 'Timeline', 'TeamMembers'],
    layout: 'sidebar-layout',
  },

  // Form Pages
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Simple contact form with validation',
    category: 'form',
    components: ['Navigation', 'FormContainer', 'ContactFields', 'SubmitButton', 'Footer'],
    layout: 'centered-form',
  },
  {
    id: 'multi-step-form',
    name: 'Multi-Step Form',
    description: 'Wizard-style form with progress indicator',
    category: 'form',
    components: ['Navigation', 'StepIndicator', 'FormSteps', 'NavigationButtons', 'Footer'],
    layout: 'centered-form',
  },
  {
    id: 'settings-form',
    name: 'Settings Form',
    description: 'User settings and preferences',
    category: 'form',
    components: ['Sidebar', 'Header', 'SettingsSections', 'SaveButton'],
    layout: 'sidebar-layout',
  },

  // List Pages
  {
    id: 'product-grid',
    name: 'Product Grid',
    description: 'E-commerce style product grid',
    category: 'list',
    components: ['Navigation', 'Filters', 'ProductGrid', 'Pagination', 'Footer'],
    layout: 'two-column',
  },
  {
    id: 'blog-list',
    name: 'Blog List',
    description: 'Blog posts with sidebar',
    category: 'list',
    components: ['Navigation', 'BlogPosts', 'Sidebar', 'Pagination', 'Footer'],
    layout: 'blog-layout',
  },
  {
    id: 'data-table',
    name: 'Data Table',
    description: 'Sortable and filterable data table',
    category: 'list',
    components: ['Header', 'SearchBar', 'DataTable', 'Pagination'],
    layout: 'single-column',
  },

  // Detail Pages
  {
    id: 'product-detail',
    name: 'Product Detail',
    description: 'Product page with images and details',
    category: 'detail',
    components: ['Navigation', 'Breadcrumb', 'ProductImages', 'ProductInfo', 'Reviews', 'Footer'],
    layout: 'two-column',
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Article with rich content',
    category: 'detail',
    components: [
      'Navigation',
      'ArticleHeader',
      'ArticleContent',
      'AuthorBio',
      'Comments',
      'Footer',
    ],
    layout: 'article-layout',
  },
  {
    id: 'user-profile',
    name: 'User Profile',
    description: 'User profile with activity and stats',
    category: 'detail',
    components: ['Navigation', 'ProfileHeader', 'ProfileTabs', 'ActivityFeed', 'Footer'],
    layout: 'single-column',
  },

  // Auth Pages
  {
    id: 'login-page',
    name: 'Login Page',
    description: 'Simple login form',
    category: 'auth',
    components: ['Logo', 'LoginForm', 'SocialLogin', 'Links'],
    layout: 'centered-auth',
  },
  {
    id: 'signup-page',
    name: 'Signup Page',
    description: 'Registration form with validation',
    category: 'auth',
    components: ['Logo', 'SignupForm', 'SocialSignup', 'Terms', 'Links'],
    layout: 'centered-auth',
  },
  {
    id: 'reset-password',
    name: 'Reset Password',
    description: 'Password reset flow',
    category: 'auth',
    components: ['Logo', 'ResetForm', 'Links'],
    layout: 'centered-auth',
  },
];
