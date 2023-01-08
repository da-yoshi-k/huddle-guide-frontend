import { User } from './user';

export interface TeamInfo {
  team: {
    id: string;
    name: string;
    description: string;
    users?: User[] | null;
  };
}
