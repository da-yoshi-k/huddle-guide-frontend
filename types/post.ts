import { Level } from './level';

export interface Post {
  id: number;
  content: string;
  workshop_id: string;
  user_id: string;
  level: Level;
}
