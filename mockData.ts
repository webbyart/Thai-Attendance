
import { Employee, THAI_MONTHS } from './types';

const generateMockLeave = () => THAI_MONTHS.map(m => ({
  month: m,
  sick: Math.floor(Math.random() * 3),
  personal: Math.floor(Math.random() * 2),
  absent: Math.random() > 0.9 ? 1 : 0,
  hours: Math.floor(Math.random() * 8)
}));

const mockSubjects = [
  { name: 'วิชาการวางแผนทางทหาร', weight: 3.5, score: 85, grade: 'A' },
  { name: 'วิชาความมั่นคงแห่งชาติ', weight: 2.0, score: 78, grade: 'B+' },
  { name: 'วิชาผู้นำและการบริหาร', weight: 2.5, score: 92, grade: 'A' },
  { name: 'วิชาเทคโนโลยีสารสนเทศทหาร', weight: 1.5, score: 80, grade: 'B+' },
  { name: 'การฝึกภาคสนาม (Ex-Cobra)', weight: 4.0, score: 88, grade: 'A' }
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "4254",
    rank: "พ.อ.",
    firstName: "กรกช",
    lastName: "ทองทรัพย์",
    position: "รอง ผอ.สวพ.ทสส.",
    unit: "สถาบันวิชาการป้องกันประเทศ",
    attendanceData: generateMockLeave(),
    subjects: mockSubjects,
    leadershipScore: 94.5,
    trainingResult: 'ผ่าน',
    superiorComment: "มีความมุ่งมั่นในการเรียนรู้ มีลักษณะผู้นำที่โดดเด่น และสามารถประยุกต์ใช้ความรู้ทางทหารได้อย่างดีเยี่ยม"
  },
  {
    id: "4255",
    rank: "พ.อ.",
    firstName: "กริด",
    lastName: "กล่อมชุ่ม",
    position: "ผอ.กองนโยบายและแผน",
    unit: "หน่วยบัญชาการทหารพัฒนา",
    attendanceData: generateMockLeave(),
    subjects: mockSubjects,
    leadershipScore: 88.0,
    trainingResult: 'ผ่าน',
    superiorComment: "มีความรับผิดชอบสูง เข้าร่วมกิจกรรมสม่ำเสมอ เป็นแบบอย่างที่ดีให้กับเพื่อนร่วมรุ่น"
  },
  {
    id: "4256",
    rank: "พ.อ.",
    firstName: "กฤชพล",
    lastName: "เศวตนันทน์",
    position: "รอง ผบ.พล.ร.9",
    unit: "กองทัพบก",
    attendanceData: generateMockLeave(),
    subjects: mockSubjects,
    leadershipScore: 91.2,
    trainingResult: 'ผ่าน',
    superiorComment: "มีวิสัยทัศน์กว้างไกล มีความคิดริเริ่มสร้างสรรค์ในการแก้ปัญหาโจทย์ทางยุทธวิธี"
  },
  {
    id: "4257",
    rank: "พ.อ.",
    firstName: "กฤษฎา",
    lastName: "พงศ์เลิศโกศล",
    position: "ผช.ทูตทหาร",
    unit: "กรมข่าวทหาร",
    attendanceData: generateMockLeave(),
    subjects: mockSubjects,
    leadershipScore: 85.5,
    trainingResult: 'ผ่าน',
    superiorComment: "ปฏิบัติหน้าที่ด้วยความละเอียดรอบคอบ มีความสามารถในการสื่อสารประสานงานที่ดี"
  }
];
