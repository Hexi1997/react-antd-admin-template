import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced'
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none'
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'ChainIDE',
          title: 'ChainIDE',
          href: 'https://chainide.com',
          blankTarget: true
        },
        {
          key: 'Github',
          title: <GithubOutlined />,
          href: 'https://github.com/WhiteMatrixTech/flowmarket-front-end',
          blankTarget: true
        },
        {
          key: 'Matrix Labs',
          title: 'Matrix Labs',
          href: 'https://matrixlabs.org/',
          blankTarget: true
        }
      ]}
    />
  );
};

export default Footer;
