import { RightOutlined } from '@ant-design/icons';
import cn from 'classnames';
import React from 'react';

import styles from './index.less';

interface CheckMoreProps {
  className?: string;
  text: string;
  href: string;
}

export const CheckMore: React.FC<CheckMoreProps> = (props: CheckMoreProps) => {
  const { className, text, href } = props;
  return (
    <div
      className={cn(className, styles.CheckMore)}
      onClick={() => {
        window.open(href, '_blank');
      }}
    >
      <span>{text}</span>
      <RightOutlined />
    </div>
  );
};
