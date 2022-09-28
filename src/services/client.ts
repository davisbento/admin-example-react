import { IPaginateResponse } from 'interfaces/apiResponse';
import { eType, IAddress, IClientCreate, IClientList } from 'interfaces/client';
import { IParams } from 'interfaces/pagination';

import apiService, { ApiService } from './api';

export class ClientService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public resetPassword(clientId: string) {
    return this.apiService.post<{ newPassword: string }>('admin/clients/reset-password', { clientId });
  }

  public getAll(params: IParams) {
    return this.apiService.get<IPaginateResponse<IClientList[]>>('admin/clients', params);
  }

  public getDetails(clientId: string) {
    return this.apiService.get<{ address: IAddress }>(`admin/clients/${clientId}`);
  }

  public changeOcel(clientId: string, isOcel: boolean) {
    return this.apiService.patch(`admin/clients/${clientId}/change-ocel`, { isOcel });
  }

  public changeObservation(clientId: string, observation: string) {
    return this.apiService.post('admin/clients/add-observation', { clientId, observation });
  }

  public getAllUploads(clientId: string) {
    return this.apiService.get<{ id: string; url: string; type: string }[]>(`admin/clients/${clientId}/upload`);
  }

  public changeAddress(clientId: string, model: IAddress) {
    return this.apiService.patch(`admin/clients/${clientId}/change-address`, model);
  }

  public create(model: IClientCreate) {
    const { phone, ...rest } = model;

    const data = {
      ...rest,
      phone: `${phone.code} ${phone.phone}`
    };

    return this.apiService.post('admin/clients', data);
  }

  public uploadFile(clientId: string, file: File, type: eType) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.apiService.post<string>(`admin/clients/${clientId}/upload-file`, formData);
  }
}

const clientService = new ClientService(apiService);
export default clientService;
