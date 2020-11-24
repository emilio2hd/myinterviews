import { Entity } from './entity';
import { Interview } from './interview';

export enum JobApplicationStatusEnum {
  NoAnswer = 'no_answer',
  Ongoing = 'ongoing',
  Canceled = 'canceled',
  Accepted = 'accepted',
  Refused = 'refused',
  Sent = 'sent',
}

export interface JobApplication extends Entity {
  company: string;
  position: string;
  location: string;
  beganAt?: string;
  overallFeedback?: string;
  coverLetter?: string;
  jobDescription?: string;
  status?: JobApplicationStatusEnum;
  cvUrl?: string;
  techStackList?: string[];
  interviews: { [date: string]: Interview };
}
