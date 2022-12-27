import { User } from './user';
import { Team } from './team';
import { Work } from './work';
import { WorkStep } from './workStep';

export interface Workshop {
  workshop: {
    id: string;
    team_id: string;
    work_id: number;
    work_step_id: number;
    facilitator: string;
    presenter: string | null;
    work: Work;
    work_step: WorkStep;
    users: [User];
    team: Team;
  };
}
