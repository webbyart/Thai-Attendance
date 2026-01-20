
import React, { useState, useMemo } from 'react';
import { ViewMode, Employee, THAI_MONTHS } from './types';
import { MOCK_EMPLOYEES } from './mockData';
import { Search, Calendar, FileText, Printer, CheckCircle, AlertCircle, LayoutDashboard, UserCheck, ChevronRight, Download } from 'lucide-react';

// Sub-components
import OfficialReport from './components/OfficialReport';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [searchQuery, setSearchQuery] = useState('');
  const [startMonth, setStartMonth] = useState(THAI_MONTHS[0]);
  const [endMonth, setEndMonth] = useState(THAI_MONTHS[THAI_MONTHS.length - 1]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredEmployees = useMemo(() => {
    return MOCK_EMPLOYEES.filter(emp => 
      emp.firstName.includes(searchQuery) || 
      emp.lastName.includes(searchQuery) || 
      emp.id.includes(searchQuery)
    );
  }, [searchQuery]);

  const toggleSelectEmployee = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handlePrint = () => {
    if (selectedIds.length === 0) {
      alert('กรุณาเลือกรายชื่ออย่างน้อย 1 รายการเพื่อพิมพ์รายงาน');
      return;
    }
    setViewMode(ViewMode.REPORT);
    setTimeout(() => window.print(), 500);
  };

  const getFilteredAttendance = (emp: Employee) => {
    const startIndex = THAI_MONTHS.indexOf(startMonth);
    const endIndex = THAI_MONTHS.indexOf(endMonth);
    return emp.attendanceData.slice(startIndex, endIndex + 1);
  };

  const calculateTotalLeave = (emp: Employee) => {
    const data = getFilteredAttendance(emp);
    return data.reduce((acc, curr) => ({
      sick: acc.sick + curr.sick,
      personal: acc.personal + curr.personal,
      absent: acc.absent + curr.absent,
      hours: acc.hours + curr.hours,
    }), { sick: 0, personal: 0, absent: 0, hours: 0 });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation - Hidden on Print */}
      <nav className="no-print bg-indigo-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <FileText className="text-indigo-900 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">ระบบรายงานผลการฝึกอบรมเฉพาะบุคคล</h1>
              <p className="text-xs text-indigo-200 mt-1">สถาบันวิชาการป้องกันประเทศ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode(ViewMode.DASHBOARD)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${viewMode === ViewMode.DASHBOARD ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
            >
              <LayoutDashboard size={18} /> สรุปหน้า (Dashboard)
            </button>
            <button 
              onClick={() => setViewMode(ViewMode.REPORT)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${viewMode === ViewMode.REPORT ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
            >
              <FileText size={18} /> รายงานทางการ (Back)
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        
        {/* Filter Section - Hidden on Print */}
        <div className="no-print bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">ค้นหารายชื่อหรือเลขประจำตัว</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="พิมพ์ ชื่อ-นามสกุล หรือ เลข 4 หลัก..."
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ตั้งแต่เดือน</label>
              <select 
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="w-full border rounded-lg p-2.5 bg-gray-50 outline-none"
              >
                {THAI_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ถึงเดือน</label>
              <select 
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                className="w-full border rounded-lg p-2.5 bg-gray-50 outline-none"
              >
                {THAI_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4 items-center justify-between border-t pt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <UserCheck size={18} />
              <span>เลือกแล้ว {selectedIds.length} รายการ</span>
              {selectedIds.length > 0 && (
                <button onClick={() => setSelectedIds([])} className="text-indigo-600 hover:underline font-medium">ล้างทั้งหมด</button>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedIds(filteredEmployees.map(e => e.id))}
                className="text-sm border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50"
              >
                เลือกทั้งหมดหน้าปัจจุบัน
              </button>
              <button 
                onClick={handlePrint}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 shadow-md transition"
              >
                <Printer size={18} /> พิมพ์รายงาน (A4)
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard View */}
        {viewMode === ViewMode.DASHBOARD && (
          <div className="no-print">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
               {/* Summary Cards Logic would normally go here based on selection, 
                   but let's show overall list instead */}
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 w-12 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.length === filteredEmployees.length && filteredEmployees.length > 0}
                        onChange={() => {
                          if (selectedIds.length === filteredEmployees.length) setSelectedIds([]);
                          else setSelectedIds(filteredEmployees.map(e => e.id));
                        }}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">เลขประจำตัว</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">ยศ-ชื่อ-สกุล</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700">ตำแหน่ง/สังกัด</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">ลาสะสม (ครั้ง)</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">การมาทำงาน (%)</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredEmployees.map(emp => {
                    const totals = calculateTotalLeave(emp);
                    const totalDaysPossible = 22 * (THAI_MONTHS.indexOf(endMonth) - THAI_MONTHS.indexOf(startMonth) + 1);
                    const absentTotal = totals.sick + totals.personal + totals.absent;
                    const attendanceRate = ((totalDaysPossible - absentTotal) / totalDaysPossible * 100).toFixed(2);

                    return (
                      <tr key={emp.id} className={`hover:bg-indigo-50/30 transition cursor-pointer ${selectedIds.includes(emp.id) ? 'bg-indigo-50' : ''}`} onClick={() => toggleSelectEmployee(emp.id)}>
                        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={selectedIds.includes(emp.id)} 
                            onChange={() => toggleSelectEmployee(emp.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-600">{emp.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{emp.rank} {emp.firstName} {emp.lastName}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div>{emp.position}</div>
                          <div className="text-xs text-gray-400">{emp.unit}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${absentTotal > 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {absentTotal}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="text-sm font-bold text-indigo-600">{attendanceRate}%</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedIds([emp.id]); setViewMode(ViewMode.REPORT); }}
                            className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm flex items-center justify-end gap-1 ml-auto"
                          >
                            ดูรายงาน <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredEmployees.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <AlertCircle className="mx-auto mb-4 text-gray-300" size={48} />
                  <p>ไม่พบข้อมูลที่ตรงกับการค้นหา</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Report View */}
        {viewMode === ViewMode.REPORT && (
          <div>
            <div className="no-print mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="text-yellow-600" />
              <p className="text-sm text-yellow-800">
                คุณกำลังอยู่ในโหมดรายงาน (Print View) รายงานจะแสดงผลแยกตามรายชื่อที่เลือก ({selectedIds.length} ท่าน) โดยใช้รูปแบบมาตรฐานราชการ A4
              </p>
            </div>
            
            <div className="space-y-12">
              {selectedIds.length > 0 ? (
                MOCK_EMPLOYEES
                  .filter(emp => selectedIds.includes(emp.id))
                  .map(emp => (
                    <OfficialReport 
                      key={emp.id} 
                      employee={emp} 
                      attendance={getFilteredAttendance(emp)}
                      totals={calculateTotalLeave(emp)}
                    />
                  ))
              ) : (
                <div className="no-print p-12 text-center text-gray-500 bg-white rounded-xl border border-dashed">
                  <FileText className="mx-auto mb-4 text-gray-300" size={48} />
                  <p>กรุณาเลือกรายชื่อจากหน้า Dashboard เพื่อแสดงรายงาน</p>
                  <button 
                    onClick={() => setViewMode(ViewMode.DASHBOARD)}
                    className="mt-4 text-indigo-600 font-bold hover:underline"
                  >
                    กลับไปยัง Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Footer - Hidden on Print */}
      <footer className="no-print mt-auto p-8 border-t bg-gray-50">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} สถาบันวิชาการป้องกันประเทศ - ระบบจัดการรายงานผลการฝึกอบรมแบบบูรณาการ
        </div>
      </footer>
    </div>
  );
};

export default App;
