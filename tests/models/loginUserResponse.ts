export interface LoginUserResponse {
  success: boolean;
  status: number;
  message: string;
  data: LoginUserResponseData;
}

interface LoginUserResponseData {
  id: string;
  email: string;
  name: string;
  token: string;
}
