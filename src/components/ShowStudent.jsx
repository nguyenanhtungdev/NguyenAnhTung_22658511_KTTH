import { useState, useEffect } from 'react';
import { Search, Trash2, Edit, Save, X, PlusCircle } from 'lucide-react';

export default function StudentManagementApp() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 18 },
    { id: 2, name: 'Trần Thị B', class: '12A2', age: 17 },
    { id: 3, name: 'Lê Văn C', class: '11A1', age: 16 },
    { id: 4, name: 'Phạm Thị D', class: '11A2', age: 17 },
    { id: 5, name: 'Hoàng Văn E', class: '10A1', age: 15 },
  ]);

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterClass, setFilterClass] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });
  const [classes, setClasses] = useState([]);

  // Lấy danh sách các lớp duy nhất
  useEffect(() => {
    const uniqueClasses = [...new Set(students.map(student => student.class))];
    setClasses(uniqueClasses);
  }, [students]);

  // Lọc sinh viên theo lớp
  useEffect(() => {
    if (filterClass === '') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(student => student.class === filterClass));
    }
  }, [filterClass, students]);

  // Load dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Xử lý thêm sinh viên mới
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin sinh viên!');
      return;
    }

    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentToAdd = { 
      ...newStudent, 
      id, 
      age: parseInt(newStudent.age) 
    };
    
    setStudents([...students, studentToAdd]);
    setNewStudent({ name: '', class: '', age: '' });
  };

  // Xử lý xóa sinh viên
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Bắt đầu chỉnh sửa sinh viên
  const handleEditStart = (student) => {
    setEditingStudent({ ...student });
  };

  // Lưu thông tin sinh viên sau khi chỉnh sửa
  const handleSaveEdit = () => {
    if (!editingStudent.name || !editingStudent.class || !editingStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin sinh viên!');
      return;
    }

    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setEditingStudent(null);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Animation style cho hàng
  const rowStyle = "transition-all duration-300 hover:bg-blue-50 hover:shadow rounded";
  const rowEnterStyle = "animate-fadeIn";

  return (
    <div className="max-w-4xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Quản Lý Sinh Viên</h1>
      
      {/* Form thêm sinh viên mới */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PlusCircle className="mr-2" size={20} />
          Thêm Sinh Viên Mới
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Tên sinh viên"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Lớp"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newStudent.class}
            onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
          />
          <input
            type="number"
            placeholder="Tuổi"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          />
          <button 
            onClick={handleAddStudent}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <PlusCircle className="mr-2" size={18} />
            Thêm Sinh Viên
          </button>
        </div>
      </div>
      
      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <label className="mr-2 font-medium">Lọc theo lớp:</label>
          <select 
            value={filterClass} 
            onChange={(e) => setFilterClass(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Tất cả</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center relative">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên..."
            className="pl-10 p-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              const searchText = e.target.value.toLowerCase();
              if (searchText === '') {
                setFilteredStudents(students);
              } else {
                setFilteredStudents(students.filter(student => 
                  student.name.toLowerCase().includes(searchText) ||
                  student.class.toLowerCase().includes(searchText)
                ));
              }
            }}
          />
        </div>
      </div>
      
      {/* Bảng sinh viên */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Tên</th>
              <th className="py-3 px-4 text-left">Lớp</th>
              <th className="py-3 px-4 text-left">Tuổi</th>
              <th className="py-3 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr 
                key={student.id} 
                className={`border-b ${rowStyle} ${rowEnterStyle}`}
              >
                {editingStudent && editingStudent.id === student.id ? (
                  // Chế độ chỉnh sửa
                  <>
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={editingStudent.name}
                        onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={editingStudent.class}
                        onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={editingStudent.age}
                        onChange={(e) => setEditingStudent({ ...editingStudent, age: parseInt(e.target.value) })}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
                        >
                          <Save size={18} />
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  // Chế độ hiển thị
                  <>
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {student.class}
                      </span>
                    </td>
                    <td className="py-3 px-4">{student.age}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => handleEditStart(student)}
                          className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  Không tìm thấy sinh viên nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-right text-gray-600">
        Tổng số sinh viên: {filteredStudents.length}
      </div>
    </div>
  );
}