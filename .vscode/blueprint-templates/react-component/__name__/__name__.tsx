import cn from 'classnames';
import React from 'react';

import styles from './index.less';

interface {{name}}Props {
  className?: string;
}

export const {{pascalCase name}}: React.FC<{{name}}Props> = (props: {{name}}Props) => {
  const { className } = props;
  return <div className={cn(className, styles.{{pascalCase name}})}>{{pascalCase name}}</div>;
};
