import { Edit, Trash2 } from 'lucide-react';

export default function StudentItem({ student, onEdit, onDelete }) {
  // Animation style cho hàng
  const rowStyle = "transition-all duration-300 hover:bg-blue-50 hover:shadow rounded";
  const rowEnterStyle = "animate-fadeIn";

  return (
    <tr 
      className={`border-b ${rowStyle} ${rowEnterStyle}`}
    >
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
            onClick={() => onEdit(student)}
            className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition-colors"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(student.id)}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}