import { Line } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import moment from 'moment';
import RcResizeObserver from 'rc-resize-observer';
import React, { useMemo, useState } from 'react';
import { useMount } from 'react-use';

import { CheckMore } from '@/components/CheckMore';
import { useAccountBalance } from '@/hooks/useAccountBalance';
import { usePastOneMonthPVData } from '@/hooks/usePastOneMonthPVData';
import { useRoyaltyAccountTxs } from '@/hooks/useRoyaltyAccountTxs';
import service from '@/services/matrix-market-admin';
import { getPastDays, isLocalHost } from '@/utils/common';

const Welcome: React.FC = () => {
  const { formatMessage } = useIntl();
  const { pvData, isFetchingPVData } = usePastOneMonthPVData();
  const [responsive, setResponsive] = useState(false);
  const { isFetchingAccountBalance, royaltyAccountBalance } =
    useAccountBalance();
  const {
    isFetchingTxs,
    txData,
    txTotalCount,
    txCountOneDay,
    totalFlowTokenOneDay
  } = useRoyaltyAccountTxs();
  console.log(
    pvData,
    isFetchingPVData,
    isFetchingAccountBalance,
    royaltyAccountBalance,
    isFetchingTxs,
    txData,
    txTotalCount,
    txCountOneDay,
    totalFlowTokenOneDay
  );

  useMount(() => {
    // 做一次带access token的请求，判断token和refresh token状态，是否过期，否则重定向到登录页面
    // service.reportController
    //   .getCollectionReportSummariesUsingPOST({ pageNo: 1, pageSize: 1 })
    //   .catch(console.error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void service.collectionController.tagOptionsUsingGET();
  });

  const lineData = useMemo(() => {
    if (!pvData.length) {
      return [];
    }
    const funnelData = pvData[0].dayFunnels;
    return funnelData.xValues.map((item, index) => ({
      date: item,
      count: funnelData.series[index][0]
    }));
  }, [pvData]);

  const config = {
    data: lineData,
    xField: 'date',
    yField: 'count',
    xAxis: {
      tickCount: 6
    }
  };

  return (
    <div>
      <h2>
        {formatMessage({ id: 'pages.welcome.greeting_prefix' })}{' '}
        <span
          style={{
            color: '#1677ff'
          }}
        >
          {getPastDays()}
        </span>{' '}
        {formatMessage({ id: 'pages.welcome.greeting_suffix' })}
      </h2>
      <br />
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title={
            <CheckMore
              text={formatMessage({ id: 'pages.welcome.statistics.title' })}
              href="https://flowscan.org/account/0x120607265b6f416a/transfers"
            />
          }
          extra={moment().format('YYYY-MM-DD dddd')}
          headerBordered={true}
          bordered={true}
          style={
            isLocalHost
              ? {}
              : {
                  width: `calc(100% - 80px)`
                }
          }
        >
          <ProCard split={responsive ? 'horizontal' : 'horizontal'}>
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
              <StatisticCard
                loading={isFetchingAccountBalance}
                statistic={{
                  title: formatMessage({
                    id: 'pages.welcome.statistics.total_volume'
                  }),
                  value:
                    royaltyAccountBalance === undefined
                      ? 'NULL'
                      : (royaltyAccountBalance / 0.015).toFixed(2)
                }}
              />
              <StatisticCard
                loading={isFetchingTxs}
                statistic={{
                  title: formatMessage({
                    id: 'pages.welcome.statistics.tx_count'
                  }),
                  value: txTotalCount
                }}
              />
              <StatisticCard
                loading={isFetchingAccountBalance}
                statistic={{
                  title: formatMessage({
                    id: 'pages.welcome.statistics.royalty'
                  }),
                  value:
                    royaltyAccountBalance === undefined
                      ? 'NULL'
                      : royaltyAccountBalance.toFixed(2)
                }}
              />
            </ProCard>
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
              <StatisticCard
                loading={isFetchingTxs}
                statistic={{
                  title: formatMessage({
                    id: 'pages.welcome.statistics.24hour_volume'
                  }),
                  value:
                    totalFlowTokenOneDay === undefined
                      ? 'NULL'
                      : (totalFlowTokenOneDay / 0.015).toFixed(2)
                }}
              />
              <StatisticCard
                loading={isFetchingTxs}
                statistic={{
                  title: formatMessage({
                    id: 'pages.welcome.statistics.24hour_tx_count'
                  }),
                  value: txCountOneDay || 'NULL'
                }}
              />
              <StatisticCard
                loading={isFetchingTxs}
                statistic={{
                  title: formatMessage({
                    id: 'pages.welcome.statistics.royalty_24hour'
                  }),
                  value:
                    totalFlowTokenOneDay === undefined
                      ? 'NULL'
                      : totalFlowTokenOneDay.toFixed(2)
                }}
              />
            </ProCard>
          </ProCard>
        </ProCard>
        <br />
        <ProCard
          title={
            <CheckMore
              text={formatMessage({ id: 'pages.welcome.statistics.pv' })}
              href="https://analytics.amplitude.com/white-matrix/home"
            />
          }
          headerBordered={true}
          bordered={true}
          style={
            isLocalHost
              ? {}
              : {
                  width: `calc(100% - 80px)`
                }
          }
        >
          <Line loading={isFetchingPVData} {...config} />
        </ProCard>
      </RcResizeObserver>
    </div>
  );
};

export default Welcome;
