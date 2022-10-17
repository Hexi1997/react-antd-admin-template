import { useIntl } from '@umijs/max';
import { useMemo } from 'react';
export function useLocale() {
  const intl = useIntl();
  const locale = useMemo(() => {
    return intl.locale.split('-').shift() || 'zh';
  }, [intl.locale]);
  const isZh = useMemo(() => locale === 'zh', [locale]);
  return { intl, locale, isZh };
}
