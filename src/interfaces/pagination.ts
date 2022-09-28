export interface IPaginationRequest {
  page: number;
  pageSize: number;
}

export interface IPaginationResponse {
  page: number;
  pageSize: number;
  total: number;
}

export interface IParams {
  page: number;
  pageSize: number;
  term?: string;
}
