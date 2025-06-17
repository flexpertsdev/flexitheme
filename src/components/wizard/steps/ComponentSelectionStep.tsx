import { FC, useState } from 'react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { Input } from '../../common/Input';
import { useDesignSystem } from '../../../context/DesignSystemContext';
import { componentLibrary } from '../../../data/componentLibrary';
import styles from './ComponentSelectionStep.module.css';

export const ComponentSelectionStep: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'content', name: 'Content' },
    { id: 'forms', name: 'Forms' },
    { id: 'data-display', name: 'Data Display' },
    { id: 'interactive', name: 'Interactive' },
    { id: 'layout', name: 'Layout' },
  ];

  const filteredComponents = componentLibrary.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isComponentSelected = (componentId: string) => {
    return state.selectedComponents.some((c) => c.id === componentId);
  };

  const toggleComponent = (componentId: string) => {
    const component = componentLibrary.find((c) => c.id === componentId);
    if (!component) return;

    if (isComponentSelected(componentId)) {
      dispatch({ type: 'REMOVE_COMPONENT', payload: componentId });
    } else {
      dispatch({ type: 'ADD_COMPONENT', payload: component });
    }
  };

  const handleNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 6 });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 4 });
  };

  const getRecommendedComponents = () => {
    const recommendedIds = new Set<string>();

    state.selectedPages.forEach((page) => {
      page.components.forEach((compName) => {
        const component = componentLibrary.find((c) =>
          c.name.toLowerCase().includes(compName.toLowerCase()),
        );
        if (component) {
          recommendedIds.add(component.id);
        }
      });
    });

    return Array.from(recommendedIds);
  };

  const recommendedComponents = getRecommendedComponents();

  const handleSelectRecommended = () => {
    recommendedComponents.forEach((compId) => {
      const component = componentLibrary.find((c) => c.id === compId);
      if (component && !isComponentSelected(compId)) {
        dispatch({ type: 'ADD_COMPONENT', payload: component });
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Select Components</h2>
        <p>Choose the UI components to include in your design system.</p>
      </div>

      <div className={styles.controls}>
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.selectedCount}>
          {state.selectedComponents.length} components selected
        </div>
      </div>

      {recommendedComponents.length > 0 && (
        <Card className={styles.recommendedCard}>
          <h3>Recommended Components</h3>
          <p>Based on your selected pages, we recommend these components:</p>
          <div className={styles.recommendedList}>
            {recommendedComponents.slice(0, 5).map((compId) => {
              const component = componentLibrary.find((c) => c.id === compId);
              return component ? (
                <span key={compId} className={styles.recommendedTag}>
                  {component.name}
                </span>
              ) : null;
            })}
            {recommendedComponents.length > 5 && (
              <span className={styles.recommendedTag}>
                +{recommendedComponents.length - 5} more
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleSelectRecommended}>
            Add Recommended Components
          </Button>
        </Card>
      )}

      <div className={styles.mainContent}>
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
                    ? componentLibrary.length
                    : componentLibrary.filter((c) => c.category === category.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.componentGrid}>
          {filteredComponents.map((component) => (
            <Card
              key={component.id}
              variant={isComponentSelected(component.id) ? 'elevated' : 'bordered'}
              className={`${styles.componentCard} ${
                isComponentSelected(component.id) ? styles.selected : ''
              }`}
              onClick={() => toggleComponent(component.id)}
            >
              <div className={styles.componentPreview}>
                {/* Simple component preview mockup */}
                <div className={styles.previewElement} />
              </div>
              <h3>{component.name}</h3>
              <div className={styles.componentMeta}>
                <span className={styles.category}>{component.category}</span>
                <span className={styles.variants}>{component.variants.length} variants</span>
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
          disabled={state.selectedComponents.length === 0}
          size="lg"
        >
          Next: Preview & Export
        </Button>
      </div>
    </div>
  );
};
