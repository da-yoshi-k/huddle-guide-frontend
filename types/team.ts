import { User } from './user';

export interface Team {
  id: string;
  name: string;
  description: string;
  users?: User[] | null;
}
