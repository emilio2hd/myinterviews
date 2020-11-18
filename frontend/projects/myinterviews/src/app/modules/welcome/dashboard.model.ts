export interface Application {
  id: number;
  company: string;
  position: string;
  status: string;
  beganAt: string;
}

export interface Interview {
  id: number;
  at: string;
  interviewerName: string;
}

export interface DasboardData {
  applications: Application[];
  interviews: Interview[];
}
