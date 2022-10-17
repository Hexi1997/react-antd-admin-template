// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Query collection. GET /admin/v1/collection/${param0} */
export async function queryUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUsingGETParams,
  options?: { [key: string]: any },
) {
  const { contractAddress: param0, ...queryParams } = params;
  return request<API.MatrixMarketCollection>(`/admin/v1/collection/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Edit collection. POST /admin/v1/collection/${param0} */
export async function editUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editUsingPOSTParams,
  body: API.MatrixMarketCollectionEditDTO,
  options?: { [key: string]: any },
) {
  const { contractAddress: param0, ...queryParams } = params;
  return request<string>(`/admin/v1/collection/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Add tag. PUT /admin/v1/collection/${param0}/tag */
export async function addTagUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addTagUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { contractAddress: param0, ...queryParams } = params;
  return request<string>(`/admin/v1/collection/${param0}/tag`, {
    method: 'PUT',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Delete tag. DELETE /admin/v1/collection/${param0}/tag */
export async function deleteTagUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTagUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { contractAddress: param0, ...queryParams } = params;
  return request<string>(`/admin/v1/collection/${param0}/tag`, {
    method: 'DELETE',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Query collections. GET /admin/v1/collection/collections */
export async function queryUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.PageResultListMatrixMarketCollection_>('/admin/v1/collection/collections', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Tag options. GET /admin/v1/collection/tagOptions */
export async function tagOptionsUsingGET(options?: { [key: string]: any }) {
  return request<string[]>('/admin/v1/collection/tagOptions', {
    method: 'GET',
    ...(options || {}),
  });
}
