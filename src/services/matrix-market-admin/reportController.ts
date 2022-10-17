// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCollectionReports POST /admin/v1/report/collection/list */
export async function getCollectionReportsUsingPOST(
  body: API.ReportPageQuery,
  options?: { [key: string]: any },
) {
  return request<API.PageResultCollectionReport_>('/admin/v1/report/collection/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCollectionReportSummaries POST /admin/v1/report/collection/summaries */
export async function getCollectionReportSummariesUsingPOST(
  body: API.ReportSummaryPageQuery,
  options?: { [key: string]: any },
) {
  return request<API.PageResultCollectionReportSummary_>('/admin/v1/report/collection/summaries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** handleCollectionReports POST /admin/v1/report/collection/summary */
export async function handleCollectionReportsUsingPOST(
  body: API.CollectionReportSummary,
  options?: { [key: string]: any },
) {
  return request<boolean>('/admin/v1/report/collection/summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCollectionReportSummary GET /admin/v1/report/collection/summary/${param0} */
export async function getCollectionReportSummaryUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCollectionReportSummaryUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CollectionReportSummary>(`/admin/v1/report/collection/summary/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getItemReportList POST /admin/v1/report/item/list */
export async function getItemReportListUsingPOST(
  body: API.ReportPageQuery,
  options?: { [key: string]: any },
) {
  return request<API.PageResultItemReport_>('/admin/v1/report/item/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getItemReportSummaries POST /admin/v1/report/item/summaries */
export async function getItemReportSummariesUsingPOST(
  body: API.ReportSummaryPageQuery,
  options?: { [key: string]: any },
) {
  return request<API.PageResultItemReportSummary_>('/admin/v1/report/item/summaries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** handleItemReports POST /admin/v1/report/item/summary */
export async function handleItemReportsUsingPOST(
  body: API.ItemReportSummary,
  options?: { [key: string]: any },
) {
  return request<boolean>('/admin/v1/report/item/summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getItemReportSummary GET /admin/v1/report/item/summary/${param0} */
export async function getItemReportSummaryUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getItemReportSummaryUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ItemReportSummary>(`/admin/v1/report/item/summary/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
