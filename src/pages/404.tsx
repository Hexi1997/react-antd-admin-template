import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

import { useIntl } from '@@/plugin-locale';

const NoFoundPage: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: 'pages.notfound.subtitle' })}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          {formatMessage({ id: 'pages.notfound.back_home' })}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
