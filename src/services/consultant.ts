import { IPaginateResponse } from 'interfaces/apiResponse';
import { IConsultantList, ICreateConsultant } from 'interfaces/consultant';
import { IParams } from 'interfaces/pagination';
import { ICreateProfitability, IProfitability } from 'interfaces/profitability';

import apiService, { ApiService } from './api';

export class ConsultantService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public getAll(params: IParams) {
    return this.apiService.get<IPaginateResponse<IConsultantList[]>>('admin/consultants', params);
  }

  public getProfitability(consultantId: string) {
    return this.apiService.get<IProfitability[]>(`admin/consultants/${consultantId}/profitability`);
  }

  public updateProfitability(value: number, id: string) {
    return this.apiService.patch('admin/consultants/update-profitability', { value, id });
  }

  public createProfitability(model: ICreateProfitability, consultantId: string) {
    const month = model.month.length < 2 ? `0${model.month}` : model.month;
    const date = `${model.year}-${month}-01`;

    return this.apiService.post('admin/consultants/create-profitability', {
      date,
      value: model.value,
      currency: model.currency,
      consultantId
    });
  }

  public create(model: ICreateConsultant) {
    const { phone, ...rest } = model;

    const data = {
      ...rest,
      phone: `${phone.code} ${phone.phone}`
    };

    return this.apiService.post('admin/consultants', data);
  }

  public assignConsultant(clientId: string, consultantId: string) {
    return this.apiService.post('admin/assign-consultant', { clientId, consultantId });
  }

  public changeConsultantPassword(password: string, consultantId: string) {
    return this.apiService.post('admin/consultants/change-password', { password, consultantId });
  }
}

const consultantService = new ConsultantService(apiService);
export default consultantService;
