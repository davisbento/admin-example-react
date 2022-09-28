export interface IConsultantList {
  id: string;
  fullName: string;
  username: string;
  email: string;
  displayName: string;
}

export interface ICreateConsultant {
  name: string;
  displayName: string;
  email: string;
  username: string;
  phone: {
    phone: string;
    code: number;
  };
  password: string;
}
