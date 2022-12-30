import { User } from './user';

export interface Teams {
  teams: [
    {
      id: string;
      name: string;
      description?: string;
      users: User[];
    }
  ];
}
