import { User } from './user';
import { Member } from './member';

export interface TeamInfo {
  team: {
    id: string;
    name: string;
    description: string;
    users?: User[] | null;
    members?: Member[];
  };
}
