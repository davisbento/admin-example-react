export interface ILogin {
  username: string;
  password: string;
  otpCode: string;
}

export interface ILoginAsSupport {
  password: string;
  pin: string;
  userIdentificator?: string;
}
