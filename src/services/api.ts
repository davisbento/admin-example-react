import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { formatErrorMessage } from 'facades/errorFormater';
import { getToken } from 'facades/localStorage';

export class ApiService {
  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.request('GET', url, params);
    return response.data;
  }

  public async del<T>(url: string, params?: any): Promise<T> {
    const response = await this.request('DELETE', url, params);
    return response.data;
  }

  public async post<T>(url: string, body: any): Promise<T> {
    const response = await this.request('POST', url, body);
    return response.data;
  }

  public async put<T>(url: string, body: any): Promise<T> {
    const response = await this.request('PUT', url, body);
    return response.data;
  }

  public async patch<T>(url: string, body: any): Promise<T> {
    const response = await this.request('PATCH', url, body);
    return response.data;
  }

  private async request<T = any>(method: Method, url: string, data: any = null): Promise<AxiosResponse<T>> {
    try {
      const response = await axios.request({
        baseURL: process.env.REACT_APP_API_URL,
        url,
        method,
        timeout: 30000,
        headers: {
          'Content-type': 'application/json',
          'authorization': `Bearer ${getToken()}`
        },
        params: method === 'GET' ? data : null,
        data: method !== 'GET' ? data : null
      });

      return response;
    } catch (err) {
      const error: AxiosError = err;
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
      throw formatErrorMessage(error);
    }
  }
}

const apiService = new ApiService();
export default apiService;
