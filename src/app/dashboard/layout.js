
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="border-b border-white/5 bg-slate-950/90 py-4 w-full bg-white shadow">
      <DashboardNavbar/>
      </div>

      {/* Main Layout */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="border w-40 min-h-screen bg-gray-200">
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-200">
          {children}
        </main>

      </div>

    </div>
  );
}