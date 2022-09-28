import { IPaginationResponse } from './pagination';

export interface IPaginateResponse<T> {
  data: T;
  pagination: IPaginationResponse;
}
