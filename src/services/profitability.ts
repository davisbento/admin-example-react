import { ICreateProfitability, IProfitability } from 'interfaces/profitability';

import apiService, { ApiService } from './api';

export class ProfitabilityService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  public getAllProfitability() {
    return this.apiService.get<IProfitability[]>('admin/profitability');
  }

  public updateProfitability(id: string, model: { monthlyReturn: number }) {
    return this.apiService.patch(`admin/profitability/${id}`, { ...model });
  }

  public createProfitability(model: ICreateProfitability) {
    const month = model.month.length < 2 ? `0${model.month}` : model.month;
    const date = `${model.year}-${month}-01`;

    return this.apiService.post('admin/profitability/', { date, value: model.value, currency: model.currency });
  }
}

const profitabilityService = new ProfitabilityService(apiService);
export default profitabilityService;
