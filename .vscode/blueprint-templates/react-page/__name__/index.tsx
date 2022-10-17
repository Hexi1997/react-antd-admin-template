import { PageContainer } from '@ant-design/pro-components';
import cn from 'classnames';
import React from 'react';

import styles from './index.less';

interface {{name}}Props {
  className?: string;
}

const {{pascalCase name}}: React.FC<{{name}}Props> = (props: {{name}}Props) => {
  const { className } = props;
  return <PageContainer className={cn(className, styles.{{pascalCase name}})}>{{pascalCase name}}</PageContainer>;
};

export default {{pascalCase name}};
