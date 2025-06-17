import { ComponentConfig } from '../types';

export const componentLibrary: ComponentConfig[] = [
  // Navigation Components
  {
    id: 'navbar',
    name: 'Navigation Bar',
    category: 'navigation',
    variants: ['default', 'sticky', 'transparent', 'centered'],
    props: {
      logo: true,
      menuItems: ['Home', 'About', 'Services', 'Contact'],
      ctaButton: true,
    },
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'navigation',
    variants: ['default', 'collapsible', 'mini'],
    props: {
      menuItems: [],
      showHeader: true,
      showFooter: false,
    },
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    variants: ['default', 'chevron', 'slash'],
    props: {
      items: ['Home', 'Category', 'Current Page'],
    },
  },

  // Content Components
  {
    id: 'hero',
    name: 'Hero Section',
    category: 'content',
    variants: ['centered', 'left-aligned', 'split', 'background-image'],
    props: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing things with our tools',
      ctaButtons: 2,
      showImage: true,
    },
  },
  {
    id: 'features',
    name: 'Features Grid',
    category: 'content',
    variants: ['grid-3', 'grid-4', 'list', 'alternating'],
    props: {
      features: 6,
      showIcons: true,
      showDescriptions: true,
    },
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    category: 'content',
    variants: ['carousel', 'grid', 'single'],
    props: {
      testimonials: 3,
      showRatings: true,
      showImages: true,
    },
  },

  // Form Components
  {
    id: 'input-field',
    name: 'Input Field',
    category: 'forms',
    variants: ['default', 'outlined', 'filled', 'borderless'],
    props: {
      label: 'Label',
      placeholder: 'Placeholder',
      required: false,
      helperText: '',
    },
  },
  {
    id: 'select-dropdown',
    name: 'Select Dropdown',
    category: 'forms',
    variants: ['default', 'searchable', 'multi-select'],
    props: {
      label: 'Select Option',
      options: ['Option 1', 'Option 2', 'Option 3'],
      placeholder: 'Choose...',
    },
  },
  {
    id: 'checkbox-group',
    name: 'Checkbox Group',
    category: 'forms',
    variants: ['default', 'inline', 'switch'],
    props: {
      label: 'Select Options',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
  },

  // Data Display Components
  {
    id: 'data-table',
    name: 'Data Table',
    category: 'data-display',
    variants: ['default', 'striped', 'bordered', 'compact'],
    props: {
      columns: 5,
      rows: 10,
      sortable: true,
      pagination: true,
    },
  },
  {
    id: 'card-grid',
    name: 'Card Grid',
    category: 'data-display',
    variants: ['default', 'horizontal', 'overlay', 'minimal'],
    props: {
      cards: 6,
      showImages: true,
      showActions: true,
    },
  },
  {
    id: 'metric-card',
    name: 'Metric Card',
    category: 'data-display',
    variants: ['default', 'trend', 'comparison', 'minimal'],
    props: {
      title: 'Total Sales',
      value: '$12,345',
      change: '+12%',
      icon: true,
    },
  },

  // Interactive Components
  {
    id: 'modal',
    name: 'Modal Dialog',
    category: 'interactive',
    variants: ['default', 'fullscreen', 'slide-in', 'minimal'],
    props: {
      title: 'Modal Title',
      showCloseButton: true,
      footer: true,
    },
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'interactive',
    variants: ['default', 'pills', 'underline', 'vertical'],
    props: {
      tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
      defaultActive: 0,
    },
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'interactive',
    variants: ['default', 'flush', 'bordered', 'separated'],
    props: {
      items: 3,
      allowMultiple: false,
      defaultOpen: 0,
    },
  },

  // Layout Components
  {
    id: 'container',
    name: 'Container',
    category: 'layout',
    variants: ['default', 'fluid', 'narrow', 'wide'],
    props: {
      maxWidth: '1200px',
      padding: 'md',
    },
  },
  {
    id: 'grid',
    name: 'Grid Layout',
    category: 'layout',
    variants: ['default', 'responsive', 'masonry'],
    props: {
      columns: 3,
      gap: 'md',
      responsive: true,
    },
  },
  {
    id: 'section',
    name: 'Section',
    category: 'layout',
    variants: ['default', 'full-width', 'alternating', 'hero'],
    props: {
      background: 'default',
      padding: 'lg',
    },
  },
];
