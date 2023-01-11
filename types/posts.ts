import { Level } from './level';
import { User } from './user';

export interface Posts {
  posts: [
    {
      id: number;
      content: string;
      workshop_id: string;
      user_id: string;
      level: Level;
      sameUsers?: User[];
    }
  ];
}
