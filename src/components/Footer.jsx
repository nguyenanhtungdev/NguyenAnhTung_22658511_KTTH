export default function Footer() {
    return (
      <footer className="bg-blue-600 text-white py-4 mt-10 shadow-md">
        <div className="container mx-auto text-center text-sm">
          © {new Date().getFullYear()} EduManager — Hệ thống Quản lý Sinh viên. 
          <span className="block mt-1">
            Developed by <a href="#" className="underline hover:text-gray-200">YourName</a>
          </span>
        </div>
      </footer>
    );
  }
  