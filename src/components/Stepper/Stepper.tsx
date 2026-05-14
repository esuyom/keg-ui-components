import type { HTMLAttributes } from 'react';
import styles from './Stepper.module.css';

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  layout?: 'horizontal' | 'vertical';
  steps?: StepperStep[];
  current?: number;
  className?: string;
}

const layoutClassMap = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
};

/** Stepper는 current 기준으로 완료/진행/대기 상태를 계산하고 방향에 따라 단계를 배치해요. */
export const Stepper = ({
  layout = 'horizontal',
  steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
  current = 0,
  className = '',
  ...listProps
}: StepperProps) => {
  return (
    <ol className={[styles.stepper, layoutClassMap[layout], className].filter(Boolean).join(' ')} {...listProps}>
      {steps.map((step, index) => {
        const state = index < current ? 'complete' : index === current ? 'active' : 'pending';

        return (
          <li key={`${step.label}-${index}`} className={[styles.step, styles[state]].join(' ')}>
            <span className={styles.marker}>{index + 1}</span>
            <span className={styles.text}>
              <span className={styles.label}>{step.label}</span>
              {step.description ? <span className={styles.description}>{step.description}</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
