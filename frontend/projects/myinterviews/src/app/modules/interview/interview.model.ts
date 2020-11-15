export interface Interview {
  id?: number;
  typeOf: string;
  feedback: string;
  notes: string;
  at: string;
  interviewerName: string;
  interviewerEmail: string;
  myApplicationId: number;
  applicationPosition?: string;
  companyName?: string;
}

export interface Application {
  id: number;
  position: string;
  company: string;
}

export enum InterviewTypeEnum {
  Talk = 'talk',
  Technical = 'technical',
}

export const InterviewTypeMapping: Record<InterviewTypeEnum, string> = {
  [InterviewTypeEnum.Talk]: 'Talk',
  [InterviewTypeEnum.Technical]: 'Technical',
};
