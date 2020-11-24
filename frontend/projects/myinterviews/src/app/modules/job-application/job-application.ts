import { JobApplicationStatusEnum } from '@core/models';

export { JobApplicationStatusEnum, JobApplication } from '@core/models';

export const JobApplicationStatusMapping: Record<JobApplicationStatusEnum, string> = {
  [JobApplicationStatusEnum.NoAnswer]: 'No answer',
  [JobApplicationStatusEnum.Ongoing]: 'Ongoing',
  [JobApplicationStatusEnum.Canceled]: 'Canceled',
  [JobApplicationStatusEnum.Accepted]: 'Accepted',
  [JobApplicationStatusEnum.Refused]: 'Refused',
  [JobApplicationStatusEnum.Sent]: 'Sent',
};
