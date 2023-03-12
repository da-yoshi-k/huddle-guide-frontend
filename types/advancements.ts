import { AdvancementType } from './advancementType';

export interface Advancements {
  advancements: [
    {
      id: number;
      content: string;
      workshop_id: string;
      user_id: string;
      advancement_type: AdvancementType;
    }
  ];
}
