import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ??
      error.message ??
      '알 수 없는 오류가 발생했습니다';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
