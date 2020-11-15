export enum JobApplicationStatusEnum {
  NoAnswer = 'no_answer',
  Ongoing = 'ongoing',
  Canceled = 'canceled',
  Accepted = 'accepted',
  Refused = 'refused',
  Sent = 'sent',
}

export const JobApplicationStatusMapping: Record<JobApplicationStatusEnum, string> = {
  [JobApplicationStatusEnum.NoAnswer]: 'No answer',
  [JobApplicationStatusEnum.Ongoing]: 'Ongoing',
  [JobApplicationStatusEnum.Canceled]: 'Canceled',
  [JobApplicationStatusEnum.Accepted]: 'Accepted',
  [JobApplicationStatusEnum.Refused]: 'Refused',
  [JobApplicationStatusEnum.Sent]: 'Sent',
};

export interface Interview {
  id: number;
  typeOf: string;
  feedback: string;
  time: string;
  interviewer: string;
}

export interface JobApplication {
  id?: number;
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
