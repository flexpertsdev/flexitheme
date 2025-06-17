import { FC } from 'react';
import { StepIndicator } from './StepIndicator';
import {
  ProjectInfoStep,
  UIStyleStep,
  DesignTokensStep,
  PageSelectionStep,
  ComponentSelectionStep,
  PreviewExportStep,
} from './steps';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { WizardStep } from '../../types';
import styles from './Wizard.module.css';

const wizardSteps: WizardStep[] = [
  {
    id: 1,
    title: 'Project Info',
    description: 'Basic project details',
    component: ProjectInfoStep,
    isComplete: false,
  },
  {
    id: 2,
    title: 'UI Style',
    description: 'Choose a design style',
    component: UIStyleStep,
    isComplete: false,
  },
  {
    id: 3,
    title: 'Design Tokens',
    description: 'Customize colors and typography',
    component: DesignTokensStep,
    isComplete: false,
  },
  {
    id: 4,
    title: 'Pages',
    description: 'Select page templates',
    component: PageSelectionStep,
    isComplete: false,
  },
  {
    id: 5,
    title: 'Components',
    description: 'Choose UI components',
    component: ComponentSelectionStep,
    isComplete: false,
  },
  {
    id: 6,
    title: 'Export',
    description: 'Preview and download',
    component: PreviewExportStep,
    isComplete: false,
  },
];

export const Wizard: FC = () => {
  const { state, dispatch } = useDesignSystem();
  const currentStep = state.currentStep;

  const handleStepClick = (stepId: number) => {
    // Only allow navigation to completed steps or the next step
    if (stepId < currentStep || stepId === currentStep + 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: stepId });
    }
  };

  // Update step completion status based on state
  const stepsWithStatus = wizardSteps.map((step) => ({
    ...step,
    isComplete: step.id < currentStep,
  }));

  const CurrentStepComponent = wizardSteps.find((s) => s.id === currentStep)?.component;

  return (
    <div className={styles.wizard}>
      <div className={styles.wizardHeader}>
        <StepIndicator
          steps={stepsWithStatus.map((s) => ({
            id: s.id,
            title: s.title,
            isComplete: s.isComplete,
          }))}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      <div className={styles.wizardContent}>{CurrentStepComponent && <CurrentStepComponent />}</div>
    </div>
  );
};
