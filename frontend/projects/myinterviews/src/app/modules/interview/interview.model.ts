import { InterviewTypeEnum } from '@core/models';

export { InterviewTypeEnum, Interview, JobApplication } from '@core/models';

export const InterviewTypeMapping: Record<InterviewTypeEnum, string> = {
  [InterviewTypeEnum.Talk]: 'Talk',
  [InterviewTypeEnum.Technical]: 'Technical',
};
