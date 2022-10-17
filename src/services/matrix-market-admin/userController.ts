// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Github Oauth Login POST /admin/v1/user/github/login */
export async function loginUsingPOST(
  body: API.GithubLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.TokenPairRestResponse>('/admin/v1/user/github/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** get Github Oauth Url POST /admin/v1/user/github/oauthUrl */
export async function getGithubOauthUrlUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGithubOauthUrlUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/admin/v1/user/github/oauthUrl', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** User Refresh Token POST /admin/v1/user/refresh */
export async function refreshTokenUsingPOST(
  body: API.RefreshTokenRequest,
  options?: { [key: string]: any },
) {
  return request<API.TokenPairRestResponse>('/admin/v1/user/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
