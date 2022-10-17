/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogoutOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import cn from 'classnames';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback } from 'react';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = () => {
  // 清除localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expireIn');
  localStorage.removeItem('tokenExpireTime');
  localStorage.removeItem('refreshToken');

  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login'
    });
  }
};

const AvatarDropdown = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        void setInitialState((s: any) => ({ ...s, currentUser: {} }));
        loginOut();
      }
      // history.push(`/account/${key}`);
    },
    [setInitialState]
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems: ItemType[] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: intl.formatMessage({ id: 'component.header.logout' })
    }
  ];

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
      items={menuItems}
    />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={cn(styles.action, styles.account)}>
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
