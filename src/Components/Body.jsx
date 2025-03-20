import { Outlet, Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#001D3D] text-white w-[20%] p-6 flex flex-col shadow-md">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Mini-Me</h1>
        <nav className="flex flex-col gap-6">
          <Link to="/" className="px-4 py-2 rounded-md hover:bg-[#FFD60A] hover:text-[#001D3D] transition">Home</Link>
          <Link to="/notes" className="px-4 py-2 rounded-md hover:bg-[#FFD60A] hover:text-[#001D3D] transition">Notes</Link>
          <Link to="/practice" className="px-4 py-2 rounded-md hover:bg-[#FFD60A] hover:text-[#001D3D] transition">Practice</Link>
          <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-[#FFD60A] hover:text-[#001D3D] transition">Profile</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-[#F5F5F5] shadow-inner">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
