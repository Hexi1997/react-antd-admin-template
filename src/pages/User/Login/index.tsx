import type { AxiosError } from '@umijs/max';
import { SelectLang, useIntl } from '@umijs/max';
import { Button, notification } from 'antd';
import { useBoolean, useMount, useSearchParam } from 'react-use';
import { history } from 'umi';

import Footer from '@/components/Footer';
import service from '@/services/matrix-market-admin';

import styles from './index.less';

const Login: React.FC = () => {
  const intl = useIntl();
  const platform = useSearchParam('platform');
  const [loading, toggleLoading] = useBoolean(false);

  useMount(() => {
    const githubCode = /&code=(.*)/.exec(window.location.href);
    if (platform === 'github' && githubCode) {
      // 执行登录
      toggleLoading(true);
      service.userController
        .loginUsingPOST({ code: githubCode[1], clientId: GITHUB_CLIENT_ID })
        .then((v) => {
          console.log(v);
          if (v.accessToken) {
            localStorage.setItem('accessToken', v.accessToken);
          }
          if (v.expiresIn) {
            localStorage.setItem('expireIn', v.expiresIn.toString());
            // 设置过期时间
            const tokenExpireTime = Date.now() + Number(v.expiresIn) * 1000;
            localStorage.setItem('tokenExpireTime', tokenExpireTime.toString());
          }
          if (v.refreshToken) {
            localStorage.setItem('refreshToken', v.refreshToken);
          }
          window.location.href = `${window.location.origin}/welcome`;
        })
        .catch((e: AxiosError) => {
          console.error(e);
          if (e.message) {
            notification.error({
              message: intl.formatMessage({
                id: 'tip.login_github_no_whitematrix_org'
              }),
              description: e.message
            });
          }
          history.replace('/user/login');
        })
        .finally(toggleLoading);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang={true}>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.titleLine}>
          <img src="/logo.svg" />
          <span>ChainIDE Admin</span>
        </div>
        <p className={styles.descLine}>
          {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
        </p>
        <Button
          onClick={() => {
            toggleLoading(true);
            window.location.href = `https://github.com/login/oauth/authorize?response_type=code&client_id=${GITHUB_CLIENT_ID}&redirect_uri=${window.location.protocol}//${window.location.host}/user/login?platform=github&scope=read%3Aorg%20repo%20user`;
          }}
          className={styles.loginButton}
          type="primary"
          loading={loading}
        >
          {intl.formatMessage({ id: 'pages.login.github_login' })}
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
