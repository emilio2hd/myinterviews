import { Entity } from './entity';

export enum InterviewTypeEnum {
  Talk = 'talk',
  Technical = 'technical',
}

export interface Interview extends Entity {
  typeOf: InterviewTypeEnum;
  feedback?: string;
  notes?: string;
  at: string;
  interviewerName: string;
  interviewerEmail: string;
  myApplicationId?: number;
  applicationPosition?: string;
  companyName?: string;
}

export const InterviewTypeMapping: Record<InterviewTypeEnum, string> = {
  [InterviewTypeEnum.Talk]: 'Talk',
  [InterviewTypeEnum.Technical]: 'Technical',
};
