import { Interview, JobApplication } from '@core/models';

export interface DasboardData {
  applications: JobApplication[];
  interviews: Interview[];
}
