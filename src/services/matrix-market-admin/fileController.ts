// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** upload file POST /admin/v1/file/upload */
export async function uploadImageUsingPOST(formData: FormData, options?: { [key: string]: any }) {
  // const formData = new FormData();

  // Object.keys(body).forEach((ele) => {
  //   const item = (body as any)[ele];

  //   if (item !== undefined && item !== null) {
  //     formData.append(
  //       ele,
  //       typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
  //     );
  //   }
  // });

  return request<API.UploadMediaResultDTO>('/admin/v1/file/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
