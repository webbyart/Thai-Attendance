
import React from 'react';
import { Employee, MonthlyLeave } from '../types';
import { QRCodeSVG } from 'qrcode.react'; // Not actually using external lib for simplicity in this demo, let's use a mock placeholder

interface Props {
  employee: Employee;
  attendance: MonthlyLeave[];
  totals: { sick: number; personal: number; absent: number; hours: number };
}

const OfficialReport: React.FC<Props> = ({ employee, attendance, totals }) => {
  // GPA Calculation
  const totalWeight = employee.subjects.reduce((sum, s) => sum + s.weight, 0);
  const totalScore = employee.subjects.reduce((sum, s) => sum + (s.score * s.weight), 0);
  const gpa = (totalScore / (totalWeight * 100) * 4).toFixed(2);

  return (
    <div className="bg-white p-[20mm] shadow-lg border mx-auto max-w-[210mm] min-h-[297mm] text-[#000] page-break print:shadow-none print:border-none print:p-0">
      
      {/* Header Area */}
      <div className="flex justify-between items-start mb-6">
        <div className="text-left">
          <p className="text-xs">เลขหนังสือ: รร.สปท. {Math.floor(Math.random() * 1000)}/2567</p>
        </div>
        <div className="text-center flex-1">
          <img src="https://picsum.photos/seed/thai-emblem/60/60" alt="ตราครุฑ" className="mx-auto mb-2 opacity-80" />
          <h1 className="text-xl font-bold">แบบรายงานผลการฝึกอบรมเฉพาะบุคคล</h1>
          <p className="text-sm font-semibold">หลักสูตรพลาธิการทหาร (รหัส 42-123) ประจำปีการศึกษา 2567</p>
        </div>
        <div className="text-right">
           <div className="border p-1 bg-gray-50">
             {/* QR Placeholder */}
             <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-[8px] text-center">QR VERIFY</div>
           </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-8 border-b pb-4">
        <div>
          <p><span className="font-bold">ยศ-ชื่อ-สกุล:</span> {employee.rank} {employee.firstName} {employee.lastName}</p>
          <p><span className="font-bold">เลขประจำตัว:</span> {employee.id}</p>
        </div>
        <div>
          <p><span className="font-bold">ตำแหน่ง:</span> {employee.position}</p>
          <p><span className="font-bold">สังกัด:</span> {employee.unit}</p>
        </div>
      </div>

      {/* Part 1: Attendance */}
      <div className="mb-6">
        <h2 className="text-md font-bold bg-gray-100 p-1 mb-2">ตอนที่ 1 : เวลาการฝึกอบรม (สรุปจากระบบ Attendance)</h2>
        <table className="w-full border-collapse border border-black text-xs text-center">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-black p-1 row-span-2">เดือน</th>
              <th className="border border-black p-1" colSpan={4}>สถิติการลา (ครั้ง/วัน)</th>
              <th className="border border-black p-1">หมายเหตุ</th>
            </tr>
            <tr>
              <th className="border border-black p-1">ลาป่วย</th>
              <th className="border border-black p-1">ลากิจ</th>
              <th className="border border-black p-1">ขาด</th>
              <th className="border border-black p-1">ชม.ลา</th>
              <th className="border border-black p-1">-</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((m, idx) => (
              <tr key={idx}>
                <td className="border border-black p-1 text-left px-2">{m.month}</td>
                <td className="border border-black p-1">{m.sick || '-'}</td>
                <td className="border border-black p-1">{m.personal || '-'}</td>
                <td className="border border-black p-1">{m.absent || '-'}</td>
                <td className="border border-black p-1">{m.hours || '-'}</td>
                <td className="border border-black p-1">ปกติ</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-50">
              <td className="border border-black p-1 text-left px-2">รวมยอดทั้งสิ้น</td>
              <td className="border border-black p-1">{totals.sick}</td>
              <td className="border border-black p-1">{totals.personal}</td>
              <td className="border border-black p-1">{totals.absent}</td>
              <td className="border border-black p-1">{totals.hours}</td>
              <td className="border border-black p-1">เรียบร้อย</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Part 2: Evaluation */}
      <div className="mb-6">
        <h2 className="text-md font-bold bg-gray-100 p-1 mb-2">ตอนที่ 2 : ผลการประเมินความรู้และความสามารถ</h2>
        <table className="w-full border-collapse border border-black text-xs">
          <thead className="bg-gray-50 text-center">
            <tr>
              <th className="border border-black p-1 w-12">ลำดับ</th>
              <th className="border border-black p-1">รายวิชา</th>
              <th className="border border-black p-1 w-16">น้ำหนัก</th>
              <th className="border border-black p-1 w-20">คะแนน</th>
              <th className="border border-black p-1 w-16">ระดับ</th>
            </tr>
          </thead>
          <tbody>
            {employee.subjects.map((s, idx) => (
              <tr key={idx}>
                <td className="border border-black p-1 text-center">{idx + 1}</td>
                <td className="border border-black p-1 px-2">{s.name}</td>
                <td className="border border-black p-1 text-center">{s.weight.toFixed(1)}</td>
                <td className="border border-black p-1 text-center">{s.score}</td>
                <td className="border border-black p-1 text-center font-bold">{s.grade}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-50">
              <td className="border border-black p-1 text-center" colSpan={2}>คะแนนเฉลี่ยสะสม (GPA)</td>
              <td className="border border-black p-1 text-center" colSpan={3}>{gpa}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Part 3 & 4 Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Part 3 */}
        <div>
          <h2 className="text-md font-bold bg-gray-100 p-1 mb-2 text-xs">ตอนที่ 3 : คุณลักษณะผู้นำ</h2>
          <div className="border border-black p-4 text-xs h-24">
            <p>คิดเป็นร้อยละ : <span className="font-bold">{employee.leadershipScore.toFixed(2)} %</span></p>
            <p className="mt-2 italic">แปลผล: ดีมาก (Excellent)</p>
          </div>
        </div>
        {/* Part 4 */}
        <div>
          <h2 className="text-md font-bold bg-gray-100 p-1 mb-2 text-xs">ตอนที่ 4 : ผลการฝึกอบรม</h2>
          <div className="border border-black p-4 text-xs h-24 space-y-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={employee.trainingResult === 'ผ่าน'} readOnly className="border-black" />
              <span>สำเร็จการศึกษาตามหลักสูตร</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={employee.trainingResult !== 'ผ่าน'} readOnly className="border-black" />
              <span>ไม่สำเร็จการศึกษา</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 5: Superior's Comments */}
      <div className="mb-8">
        <h2 className="text-md font-bold bg-gray-100 p-1 mb-2">ตอนที่ 5 : ความเห็นผู้บังคับบัญชา</h2>
        <div className="border border-black p-4 text-xs min-h-[100px] leading-relaxed">
          {employee.superiorComment}
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-12 flex justify-end">
        <div className="text-center text-sm">
          <p className="mb-12">ตรวจถูกต้อง</p>
          <div className="relative">
             <p className="border-b border-black w-48 mx-auto pb-1 italic font-serif">พล.อ. วีรชน สุขโข</p>
             <p className="mt-1">( วีรชน สุขโข )</p>
             <p>ตำแหน่ง ผอ.สถาบันวิชาการป้องกันประเทศ</p>
             <p className="text-xs text-gray-500 mt-1">วันที่ {new Date().toLocaleDateString('th-TH')}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OfficialReport;
