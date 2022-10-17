import { PageContainer } from '@ant-design/pro-components';
import cn from 'classnames';
import React from 'react';

import styles from './index.less';

interface WelcomeProps {
  className?: string;
}

const Welcome: React.FC<WelcomeProps> = (props: WelcomeProps) => {
  const { className } = props;
  return (
    <PageContainer className={cn(className, styles.Welcome)}>
      Welcome
    </PageContainer>
  );
};

export default Welcome;
