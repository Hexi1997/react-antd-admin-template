// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Query homepage recommends. GET /admin/v1/recommends/homepage */
export async function queryUsingGET2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUsingGET2Params,
  options?: { [key: string]: any },
) {
  return request<API.HomepageRecommend[]>('/admin/v1/recommends/homepage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Batch save homepage recommends. POST /admin/v1/recommends/homepage */
export async function batchSaveUsingPOST(
  body: API.HomepageRecommend[],
  options?: { [key: string]: any },
) {
  return request<string>('/admin/v1/recommends/homepage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Batch delete homepage recommends. DELETE /admin/v1/recommends/homepage */
export async function batchDeleteUsingDELETE(
  body: API.HomepageRecommendIdentity[],
  options?: { [key: string]: any },
) {
  return request<string>('/admin/v1/recommends/homepage', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
