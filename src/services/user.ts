import {
  IChangeUserEmail,
  IDisableTwoFa,
  IResetPassword,
  IUser,
  IUserCreate,
  IUserCreateResponse
} from 'interfaces/user';

import apiService, { ApiService } from './api';

export class UserService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public getProfile() {
    return this.apiService.get<IUser>('admin/profile');
  }

  public getAllAdminUsers() {
    return this.apiService.get<IUser[]>('admin');
  }

  public create(model: IUserCreate) {
    return this.apiService.post<IUserCreateResponse>('admin/create', model);
  }

  public disableTwoFa(model: IDisableTwoFa) {
    return this.apiService.post<{ message: string }>('admin/disable-two-fa', model);
  }

  public resetPassword(model: IResetPassword) {
    return this.apiService.post<{ newPassword: string }>('admin/reset-password', model);
  }

  public changeUserEmail(model: IChangeUserEmail) {
    return this.apiService.post('admin/change-email', model);
  }
}

const userService = new UserService(apiService);
export default userService;
