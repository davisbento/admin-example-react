import { ILogin, ILoginAsSupport } from 'interfaces/auth';

import apiService, { ApiService } from './api';

export class AuthService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public async login(model: ILogin) {
    const response = await this.apiService.post<{ token: string; roles: any[] }>('auth/login-admin', model);
    return response;
  }

  public loginAsSupport(model: ILoginAsSupport) {
    return this.apiService.post<{ token: string }>('admin/login-as-support', model);
  }
}

const authService = new AuthService(apiService);
export default authService;
