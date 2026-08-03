
import {
  FaTicketAlt,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaPlusCircle,
  FaClipboardList,
  FaSearch,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

// Mock datasets for timeframe toggling
const timeframeData = {
  "7d": {
    stats: [
      { title: "Total Tickets", value: "120", change: "+8%", isUp: true, icon: <FaTicketAlt />, color: "from-blue-600 to-cyan-500" },
      { title: "Bookings", value: "340", change: "+12%", isUp: true, icon: <FaUsers />, color: "from-purple-600 to-pink-500" },
      { title: "Revenue", value: "$12,450", change: "+18%", isUp: true, icon: <FaMoneyBillWave />, color: "from-emerald-500 to-teal-600" },
      { title: "Growth Rate", value: "24.5%", change: "-2%", isUp: false, icon: <FaChartLine />, color: "from-orange-500 to-amber-500" },
    ],
    chartPoints: [20, 45, 30, 70, 60, 95, 80],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  "30d": {
    stats: [
      { title: "Total Tickets", value: "540", change: "+15%", isUp: true, icon: <FaTicketAlt />, color: "from-blue-600 to-cyan-500" },
      { title: "Bookings", value: "1,280", change: "+22%", isUp: true, icon: <FaUsers />, color: "from-purple-600 to-pink-500" },
      { title: "Revenue", value: "$48,900", change: "+25%", isUp: true, icon: <FaMoneyBillWave />, color: "from-emerald-500 to-teal-600" },
      { title: "Growth Rate", value: "28.1%", change: "+4.2%", isUp: true, icon: <FaChartLine />, color: "from-orange-500 to-amber-500" },
    ],
    chartPoints: [30, 40, 55, 50, 75, 85, 100],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
  },
  "1y": {
    stats: [
      { title: "Total Tickets", value: "6,200", change: "+40%", isUp: true, icon: <FaTicketAlt />, color: "from-blue-600 to-cyan-500" },
      { title: "Bookings", value: "14,500", change: "+35%", isUp: true, icon: <FaUsers />, color: "from-purple-600 to-pink-500" },
      { title: "Revenue", value: "$540,000", change: "+48%", isUp: true, icon: <FaMoneyBillWave />, color: "from-emerald-500 to-teal-600" },
      { title: "Growth Rate", value: "32.0%", change: "+8.5%", isUp: true, icon: <FaChartLine />, color: "from-orange-500 to-amber-500" },
    ],
    chartPoints: [10, 25, 40, 35, 60, 80, 110],
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
  },
};

const initialActivities = [
  { id: 1, text: "New VIP concert ticket added", time: "10 mins ago", status: "Success", type: "ticket" },
  { id: 2, text: "15 new seat bookings completed", time: "25 mins ago", status: "Completed", type: "booking" },
  { id: 3, text: "Payout process for $2,400 initiated", time: "1 hour ago", status: "Pending", type: "revenue" },
  { id: 4, text: "Admin approved 3 pending ticket requests", time: "3 hours ago", status: "Approved", type: "admin" },
];

const DashboardHomePage = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const [activities, setActivities] = useState(initialActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketPrice, setNewTicketPrice] = useState("");

  const currentData = timeframeData[timeframe];

  // Handle Dynamic Ticket Creation
  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const newActivity = {
      id: Date.now(),
      text: `Created ticket: "${newTicketTitle}" ($${newTicketPrice || "0"})`,
      time: "Just now",
      status: "Success",
      type: "ticket",
    };

    setActivities([newActivity, ...activities]);
    setNewTicketTitle("");
    setNewTicketPrice("");
    setIsModalOpen(false);
  };

  // Filter activities
  const filteredActivities = activities.filter((act) =>
    act.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-200/60 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar / Header */}
        <header className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-3xl text-white p-6 sm:p-10 shadow-2xl">
          {/* Subtle Background Glow Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md mb-3 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Welcome Back 👋
              </h1>
              <p className="mt-2 text-white/80 max-w-xl text-sm sm:text-base">
                Here's what's happening with your tickets and revenue performance today.
              </p>
            </div>

            {/* Timeframe Selector Controls */}
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
              {[
                { label: "7 Days", key: "7d" },
                { label: "30 Days", key: "30d" },
                { label: "1 Year", key: "1y" },
              ].map((tf) => (
                <button
                  key={tf.key}
                  onClick={() => setTimeframe(tf.key)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
                    timeframe === tf.key
                      ? "bg-white text-gray-900 shadow-md font-bold scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Dynamic Statistics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentData.stats.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${item.color} text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold opacity-80">{item.title}</p>
                  <h2 className="text-3xl font-black mt-2 tracking-tight">{item.value}</h2>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Dynamic Trend Indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
                  item.isUp ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/30" : "bg-rose-400/20 text-rose-200 border border-rose-400/30"
                }`}>
                  {item.isUp ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
                  {item.change}
                </span>
                <span className="opacity-70">vs previous period</span>
              </div>
            </div>
          ))}
        </section>

        {/* Main Interactive Chart & Quick Actions Section */}
        <section className="grid lg:grid-cols-3 gap-6">
          
          {/* Dynamic SVG Area Chart */}
          <div className="lg:col-span-2 bg-base-100 rounded-3xl shadow-xl p-6 sm:p-8 border border-base-300/50 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-base-content">
                  Revenue Analytics
                </h2>
                <p className="text-xs text-base-content/60 mt-1">Real-time dynamic breakdown for {timeframe}</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-primary font-semibold">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block" /> Revenue
                </span>
              </div>
            </div>

            {/* Custom Interactive Dynamic SVG Line/Area Graph */}
            <div className="relative h-64 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" className="text-primary" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" className="text-primary" />
                  </linearGradient>
                </defs>

                {/* Dynamic SVG Gridlines */}
                {[0, 50, 100, 150].map((y) => (
                  <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="currentColor" strokeDasharray="4 4" className="text-base-content/10" />
                ))}

                {/* Calculate Area and Line Paths dynamically */}
                {(() => {
                  const points = currentData.chartPoints;
                  const maxX = 500;
                  const maxY = 160;
                  const stepX = maxX / (points.length - 1);
                  const maxVal = Math.max(...points, 1);

                  const coords = points.map((val, idx) => ({
                    x: idx * stepX,
                    y: maxY - (val / maxVal) * 120,
                    val,
                  }));

                  const pathD = coords.reduce(
                    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
                    ""
                  );

                  const areaD = `${pathD} L 500 180 L 0 180 Z`;

                  return (
                    <>
                      <path d={areaD} fill="url(#chartGradient)" />
                      <path d={pathD} fill="none" stroke="currentColor" strokeWidth="3" className="text-primary stroke-round" />
                      
                      {/* Interactive Data Nodes */}
                      {coords.map((pt, i) => (
                        <g key={i} className="cursor-pointer group/node" onMouseEnter={() => setHoveredPoint({ ...pt, label: currentData.labels[i] })} onMouseLeave={() => setHoveredPoint(null)}>
                          <circle cx={pt.x} cy={pt.y} r="6" className="fill-base-100 stroke-primary stroke-[3] group-hover/node:r-8 transition-all" />
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* Dynamic Hover Tooltip */}
              {hoveredPoint && (
                <div
                  className="absolute bg-neutral text-neutral-content px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full"
                  style={{ left: `${(hoveredPoint.x / 500) * 100}%`, top: `${(hoveredPoint.y / 200) * 100}%` }}
                >
                  {hoveredPoint.label}: ${hoveredPoint.val * 120}
                </div>
              )}
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between items-center text-xs text-base-content/60 mt-4 px-1">
              {currentData.labels.map((lbl, idx) => (
                <span key={idx}>{lbl}</span>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-base-100 rounded-3xl shadow-xl p-6 sm:p-8 border border-base-300/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold tracking-tight text-base-content">
                  Quick Actions
                </h2>
                <span className="badge badge-primary badge-sm">Shortcuts</span>
              </div>

              <div className="space-y-3.5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full btn btn-primary border-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-lg shadow-indigo-500/20 justify-start gap-3 h-14"
                >
                  <FaPlusCircle className="text-lg" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Add New Ticket</div>
                    <div className="text-[10px] opacity-80 font-normal">Create and issue custom tickets</div>
                  </div>
                </button>

                <button 
                  onClick={() => setSearchQuery("booking")}
                  className="w-full btn btn-outline btn-secondary rounded-2xl justify-start gap-3 h-14 border-2 hover:bg-secondary/10"
                >
                  <FaClipboardList className="text-lg" />
                  <div className="text-left">
                    <div className="font-bold text-sm">View Bookings</div>
                    <div className="text-[10px] text-base-content/60 font-normal">Filter activity by bookings</div>
                  </div>
                </button>

                <button 
                  onClick={() => setTimeframe("1y")}
                  className="w-full btn btn-ghost bg-base-200/60 hover:bg-base-200 rounded-2xl justify-start gap-3 h-14 text-base-content"
                >
                  <FaChartLine className="text-lg text-emerald-500" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Annual Revenue Report</div>
                    <div className="text-[10px] text-base-content/60 font-normal">Switch view to 1-Year summary</div>
                  </div>
                </button>
              </div>
            </div>

            {/* System Status Indicator */}
            <div className="mt-6 pt-4 border-t border-base-200 flex items-center justify-between text-xs text-base-content/60">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" /> All services operational
              </span>
              <span>v2.4.0</span>
            </div>
          </div>
        </section>

        {/* Dynamic Recent Activity Feed */}
        <section className="bg-base-100 rounded-3xl shadow-xl p-6 sm:p-8 border border-base-300/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-base-content">
                Recent Activity
              </h2>
              <p className="text-xs text-base-content/60 mt-1">Live audit trail of user and system events</p>
            </div>

            {/* Activity Search Input */}
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-xs" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-sm input-bordered pl-9 w-full rounded-xl text-xs focus:outline-primary"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-base-content/50">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-3">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between bg-base-200/50 hover:bg-base-200 rounded-2xl p-4 transition-all duration-200 border border-base-200/60"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                      <FaBell />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-base-content">{act.text}</p>
                      <p className="text-[11px] text-base-content/50 mt-0.5">{act.time}</p>
                    </div>
                  </div>

                  <span
                    className={`badge badge-sm font-semibold py-2 px-3 rounded-lg border-0 ${
                      act.status === "Success"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : act.status === "Pending"
                        ? "bg-amber-500/15 text-amber-600"
                        : "bg-blue-500/15 text-blue-600"
                    }`}
                  >
                    {act.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-base-content/50 text-sm">
                No recent activity matching "{searchQuery}"
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Interactive Modal: Add New Ticket */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-base-100 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-base-300 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl font-bold mb-1 text-base-content">Add New Ticket</h3>
            <p className="text-xs text-base-content/60 mb-6">Fill in details to register a new event ticket dynamically.</p>

            <form onSubmit={handleAddTicket} className="space-y-4">
              <div>
                <label className="label text-xs font-semibold text-base-content/70">Ticket Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Music Festival VIP"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm focus:outline-primary"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-base-content/70">Price ($)</label>
                <input
                  type="number"
                  placeholder="99.00"
                  value={newTicketPrice}
                  onChange={(e) => setNewTicketPrice(e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm focus:outline-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary rounded-xl text-sm px-6">
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHomePage;