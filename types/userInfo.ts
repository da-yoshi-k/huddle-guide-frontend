import { LoginType } from './loginType';

export interface UserInfo {
  user: {
    id: string;
    name: string;
    email: string;
    description: string;
    avatar_url: string;
    login_type: LoginType;
  };
}
