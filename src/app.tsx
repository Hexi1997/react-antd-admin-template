/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { notification } from 'antd';

import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import service from '@/services/matrix-market-admin';

import defaultSettings from '../config/defaultSettings';
import type { RequestOptions } from './.umi/plugin-request/request';
import type { CurrentUser } from './services/github';
import { getUserInfo } from './services/github';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await getUserInfo();
    } catch (error: any) {
      console.log(error);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (
        !initialState?.currentUser &&
        window.location.pathname !== loginPath
      ) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px'
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px'
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px'
      }
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <div>{children}</div>;
    },
    ...initialState?.settings
  };
};

const tokenExcludeApiArr = [
  '/admin/v1/user/github/login',
  '/admin/v1/user/refresh'
]; // 不需要token的路由白名单
let reqQueue = [] as any[]; // 需要token才可请求的请求列表
let hasRefreshToken = false; // 是否已经在刷新token

const getToken = () => {
  return new Promise((resolve) => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const currentTime = Date.now();
    const tokenExpireTime =
      Number(localStorage.getItem('tokenExpireTime')) || 0;
    // 拦截登录的逻辑在其他地方，这里只判断refresh逻辑
    // token有效时长：20min
    if (accessToken && currentTime - tokenExpireTime >= 0) {
      if (!hasRefreshToken) {
        setTimeout(() => {
          service.userController
            .refreshTokenUsingPOST({ refreshToken })
            .then((refreshTokenRes) => {
              localStorage.setItem(
                'accessToken',
                refreshTokenRes.accessToken || ''
              );
              localStorage.setItem(
                'expireIn',
                refreshTokenRes.expiresIn?.toString() || ''
              );
              localStorage.setItem(
                'tokenExpireTime',
                (
                  Date.now() +
                  Number(refreshTokenRes.expiresIn) * 1000
                ).toString()
              );
              localStorage.setItem(
                'refreshToken',
                refreshTokenRes.refreshToken || ''
              );
              localStorage.setItem('refreshTokenError', 'true');
              setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/ban-types
                reqQueue.forEach((req: Function) => {
                  req();
                });
                reqQueue = [];
              }, 300);
            })
            .catch((err) => {
              console.error(err);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('expireIn');
              localStorage.removeItem('tokenExpireTime');
              localStorage.removeItem('refreshToken');
              localStorage.setItem('refreshTokenError', 'false');
              notification.error({ message: '请重新登录' });
              window.location.href = `${window.location.origin}/user/login`;
            });
        }, 10);
      }
      hasRefreshToken = true;
      reqQueue.push(resolve);
    } else {
      resolve('');
      hasRefreshToken = false;
    }
  });
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  timeout: 10000,
  baseURL: BASE_URL,
  // 请求拦截器，添加access token
  requestInterceptors: [
    async (config: RequestOptions) => {
      // 不需要token的接口直接放行
      if (tokenExcludeApiArr.includes(config.url || '')) {
        return config;
      } else {
        // 需要token的接口，先判断token是否有效
        await getToken();
        const accessToken = localStorage.getItem('accessToken') || '';
        if (accessToken) {
          (config.headers as any).Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    }
  ]
};
