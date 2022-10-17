import type { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';

interface JwtPayloadProps extends JwtPayload {
  appId: string;
  userId: string;
  email: string;
}

export interface CurrentUser {
  name?: string;
  userId?: string;
  email?: string;
  aud?: string;
}

export async function getUserInfo() {
  const accessToken = localStorage.getItem('accessToken') || '';
  const decodeData = jwtDecode<JwtPayloadProps>(accessToken);
  const name = decodeData.userId.replace('GITHUB_', '');
  const res: CurrentUser = {
    name,
    userId: decodeData.userId,
    email: decodeData.email,
    aud: decodeData.aud as string
  };
  return Promise.resolve(res);
}
