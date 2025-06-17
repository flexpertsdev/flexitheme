import { FC } from 'react';
import { Input } from '../../common/Input';
import { Select } from '../../common/Select';
import { Button } from '../../common/Button';
import { useDesignSystem } from '../../../context/DesignSystemContext';
import styles from './ProjectInfoStep.module.css';

export const ProjectInfoStep: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const { projectInfo } = state;

  const handleChange =
    (field: keyof typeof projectInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch({
        type: 'SET_PROJECT_INFO',
        payload: {
          ...projectInfo,
          [field]: e.target.value,
        },
      });
    };

  const handleNext = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
  };

  const isValid = projectInfo.name && projectInfo.description && projectInfo.author;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Project Information</h2>
        <p>Let's start by setting up your design system project details.</p>
      </div>

      <div className={styles.form}>
        <Input
          label="Project Name"
          placeholder="My Design System"
          value={projectInfo.name}
          onChange={handleChange('name')}
          required
          fullWidth
        />

        <Input
          label="Description"
          placeholder="A brief description of your design system"
          value={projectInfo.description}
          onChange={handleChange('description')}
          required
          fullWidth
        />

        <Input
          label="Author"
          placeholder="Your name or organization"
          value={projectInfo.author}
          onChange={handleChange('author')}
          required
          fullWidth
        />

        <Input
          label="Version"
          placeholder="1.0.0"
          value={projectInfo.version}
          onChange={handleChange('version')}
          fullWidth
        />

        <Select
          label="Target Framework"
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'vanilla', label: 'Vanilla HTML/CSS' },
          ]}
          value={projectInfo.targetFramework}
          onChange={handleChange('targetFramework')}
          fullWidth
        />
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={handleNext} disabled={!isValid} size="lg">
          Next: Choose UI Style
        </Button>
      </div>
    </div>
  );
};
