import { AdvancementType } from './advancementType';

export interface Advancement {
  id: number;
  content: string;
  workshop_id: string;
  user_id: string;
  advancement_type: AdvancementType;
}
