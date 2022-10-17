import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import cn from 'classnames';
import React from 'react';

import styles from './index.less';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => <Dropdown overlayClassName={cn(styles.container, cls)} {...restProps} />;

export default HeaderDropdown;
