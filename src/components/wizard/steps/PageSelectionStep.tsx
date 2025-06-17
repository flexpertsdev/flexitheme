import { FC, useState } from 'react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { useDesignSystem } from '../../../context/DesignSystemContext';
import { pageTemplates } from '../../../data/pageTemplates';
import styles from './PageSelectionStep.module.css';

export const PageSelectionStep: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Pages' },
    { id: 'landing', name: 'Landing Pages' },
    { id: 'dashboard', name: 'Dashboards' },
    { id: 'form', name: 'Forms' },
    { id: 'list', name: 'Lists' },
    { id: 'detail', name: 'Detail Pages' },
    { id: 'auth', name: 'Authentication' },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? pageTemplates
      : pageTemplates.filter((t) => t.category === selectedCategory);

  const isPageSelected = (pageId: string) => {
    return state.selectedPages.some((p) => p.id === pageId);
  };

  const togglePage = (pageId: string) => {
    const page = pageTemplates.find((p) => p.id === pageId);
    if (!page) return;

    if (isPageSelected(pageId)) {
      dispatch({ type: 'REMOVE_PAGE_TEMPLATE', payload: pageId });
    } else {
      dispatch({ type: 'ADD_PAGE_TEMPLATE', payload: page });
    }
  };

  const handleNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 5 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
  };

  const handleSelectAll = () => {
    filteredTemplates.forEach((template) => {
      if (!isPageSelected(template.id)) {
        dispatch({ type: 'ADD_PAGE_TEMPLATE', payload: template });
      }
    });
  };

  const handleDeselectAll = () => {
    filteredTemplates.forEach((template) => {
      if (isPageSelected(template.id)) {
        dispatch({ type: 'REMOVE_PAGE_TEMPLATE', payload: template.id });
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Select Page Templates</h2>
        <p>Choose the pages you want to include in your design system.</p>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${
                selectedCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <span className={styles.count}>
                {category.id === 'all'
                  ? pageTemplates.length
                  : pageTemplates.filter((t) => t.category === category.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.bulkActions}>
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeselectAll}>
            Deselect All
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.selectedCount}>{state.selectedPages.length} pages selected</div>

        <div className={styles.pageGrid}>
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              variant={isPageSelected(template.id) ? 'elevated' : 'bordered'}
              className={`${styles.pageCard} ${isPageSelected(template.id) ? styles.selected : ''}`}
              onClick={() => togglePage(template.id)}
            >
              <div className={styles.pagePreview}>
                <div className={styles.pageIcon}>
                  {/* Simple icon representation based on category */}
                  {template.category === 'landing' && '🏠'}
                  {template.category === 'dashboard' && '📊'}
                  {template.category === 'form' && '📝'}
                  {template.category === 'list' && '📋'}
                  {template.category === 'detail' && '📄'}
                  {template.category === 'auth' && '🔐'}
                </div>
              </div>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <div className={styles.pageComponents}>
                {template.components.slice(0, 3).map((comp, idx) => (
                  <span key={idx} className={styles.componentTag}>
                    {comp}
                  </span>
                ))}
                {template.components.length > 3 && (
                  <span className={styles.componentTag}>
                    +{template.components.length - 3} more
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" onClick={handleBack} size="lg">
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={state.selectedPages.length === 0}
          size="lg"
        >
          Next: Select Components
        </Button>
      </div>
    </div>
  );
};
