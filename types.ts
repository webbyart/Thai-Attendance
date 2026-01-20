
export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  REPORT = 'REPORT'
}

export interface MonthlyLeave {
  month: string;
  sick: number;
  personal: number;
  absent: number;
  hours: number;
}

export interface Subject {
  name: string;
  weight: number;
  score: number;
  grade: string;
}

export interface Employee {
  id: string;
  rank: string;
  firstName: string;
  lastName: string;
  position: string;
  unit: string;
  attendanceData: MonthlyLeave[];
  subjects: Subject[];
  leadershipScore: number;
  trainingResult: 'ผ่าน' | 'ไม่ผ่าน';
  superiorComment: string;
}

export const THAI_MONTHS = [
  'ต.ค.66', 'พ.ย.66', 'ธ.ค.66', 'ม.ค.67', 'ก.พ.67', 'มี.ค.67', 
  'เม.ย.67', 'พ.ค.67', 'มิ.ย.67', 'ก.ค.67', 'ส.ค.67'
];
