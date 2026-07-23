// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { 
//   FaBars, 
//   FaTimes, 
//   FaUser, 
//   FaSignOutAlt, 
//   FaThLarge,
//   FaSun,
//   FaMoon,
//   FaBus,
//   FaTrain,
//   FaPlane
// } from "react-icons/fa";
// import Image from "next/image";
// import { authClient } from "../lib/auth-client";
// import Logo from "./Logo";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { data: session, isPending } = authClient.useSession();
  
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [theme, setTheme] = useState("dark"); 
  
//   const dropdownRef = useRef(null);

//   // Sync theme with Document element class list
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
//     const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
//     setTheme(initialTheme);
    
//     if (initialTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     if (theme === "dark") {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setTheme("light");
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setTheme("dark");
//     }
//   };

//   // Monitor scroll behavior for layout changes
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 12);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Dropdown Click-Outside Handler
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Reset Drawer State on route transition
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [pathname]);

//   const handleLogout = async () => {
//     try {
//       setIsLoggingOut(true);
//       await authClient.signOut();
//       setDropdownOpen(false);
//       router.replace("/");
//       router.refresh();
//     } catch (err) {
//       console.error("Logout failed:", err);
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   const user = session?.user;
//   const isLoggedIn = !!session;
//   const userRole = user?.role?.toLowerCase() || "user";
//   const dashboardHref = `/dashboard/${userRole}`;

//   // Premium Shimmer Loading State
//   if (isPending) {
//     return (
//       <header className="sticky top-0 z-50 w-full border-b border-slate-200/20 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 px-4 md:px-6">
//         <div className="max-w-7xl mx-auto flex items-center justify-between h-9">
//           <div className="flex items-center gap-2.5">
//             <div className="h-8 w-8 rounded-xl bg-slate-300 dark:bg-slate-800 animate-pulse" />
//             <div className="h-5 w-24 rounded-lg bg-slate-300 dark:bg-slate-800 animate-pulse" />
//           </div>
//           <div className="flex gap-2">
//             <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-800 animate-pulse" />
//             <div className="h-8 w-20 rounded-xl bg-slate-300 dark:bg-slate-800 animate-pulse" />
//           </div>
//         </div>
//       </header>
//     );
//   }

//   // Updated Dynamic Eco-system Navigation Array
//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "AC Bus", href: "/bus", icon: <FaBus className="text-[10px]" /> },
//     { label: "Train", href: "/train", icon: <FaTrain className="text-[10px]" /> },
//     { label: "Airplanes", href: "/flights", icon: <FaPlane className="text-[10px]" /> },
//   ];

//   return (
//     <>
//       <header
//         className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
//           isScrolled 
//             ? "border-slate-200/60 dark:border-white/10 bg-white/90 dark:bg-slate-950/90 shadow-xl shadow-slate-900/5 dark:shadow-black/60 backdrop-blur-xl py-3" 
//             : "border-transparent bg-white/0 dark:bg-slate-950/0 py-5"
//         } px-4 md:px-6`}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
          
//           {/* Brand Identity */}
//           <Logo />

//           {/* Desktop Navigation Link Cluster */}
//           <nav className="hidden md:flex items-center gap-1 bg-slate-200/60 dark:bg-white/5 p-1 rounded-full border border-slate-200/40 dark:border-white/5 shadow-inner backdrop-blur-md">
//             {navLinks.map((link) => {
//               const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-200 ${
//                     isActive
//                       ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-none font-bold"
//                       : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
//                   }`}
//                 >
//                   {link.icon && <span className="opacity-70">{link.icon}</span>}
//                   {link.label}
//                 </Link>
//               );
//             })}
//             {isLoggedIn && (
//               <Link
//                 href={dashboardHref}
//                 className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
//                   pathname.startsWith("/dashboard")
//                     ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-md font-bold"
//                     : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
//                 }`}
//               >
//                 Dashboard
//               </Link>
//             )}
//           </nav>

//           {/* Utility Actions Bar */}
//           <div className="flex items-center gap-3">
            
//             {/* Theme Transition Switch */}
//             <button
//               onClick={toggleTheme}
//               className="flex items-center justify-center w-9 h-9 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/40 dark:border-white/5 rounded-xl transition-all cursor-pointer outline-none"
//               aria-label="Toggle display theme"
//             >
//               {theme === "dark" ? (
//                 <FaSun className="text-base text-amber-400 transition-transform hover:rotate-45 duration-300" />
//               ) : (
//                 <FaMoon className="text-base text-indigo-600 transition-transform hover:-rotate-12 duration-300" />
//               )}
//             </button>

//             {/* Authentication Router Conditions */}
//             {!isLoggedIn ? (
//               <div className="hidden sm:flex items-center gap-2">
//                 <Link
//                   href="/signIn"
//                   className="inline-flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white h-9 px-4 rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/5 transition duration-200"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signUp"
//                   className="inline-flex items-center justify-center font-bold text-xs bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition duration-200 h-9 px-4 rounded-xl"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             ) : (
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   aria-expanded={dropdownOpen}
//                   className="flex items-center rounded-full p-0.5 border border-slate-200 dark:border-white/10 hover:border-pink-500/50 transition-all hover:scale-105 duration-200 outline-none cursor-pointer"
//                 >
//                   <Image
//                     src={user?.image || "/default-user.png"}
//                     alt={user?.name || "Profile Custom Avatar"}
//                     width={34}
//                     height={34}
//                     className="rounded-full object-cover bg-slate-800"
//                     unoptimized
//                   />
//                 </button>

//                 {/* Profile Glass Dropdown Overlay */}
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl py-2 z-50 origin-top-right transition-transform duration-200 animate-in fade-in slide-in-from-top-2">
//                     <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-1 cursor-default">
//                       <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
//                         {user?.role ?? "User"} Mode
//                       </span>
//                       <p className="font-bold text-slate-900 dark:text-white text-sm mt-1.5 truncate">{user?.name}</p>
//                       <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">{user?.email}</p>
//                     </div>

//                     <div className="px-1.5 space-y-0.5">
//                       <Link
//                         href={dashboardHref}
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition"
//                       >
//                         <FaThLarge className="text-slate-400 text-sm shrink-0" />
//                         <span>My Management Panel</span>
//                       </Link>

//                       <Link
//                         href={`${dashboardHref}/settings`}
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition"
//                       >
//                         <FaUser className="text-slate-400 text-sm shrink-0" />
//                         <span>Account Settings</span>
//                       </Link>
//                     </div>

//                     <div className="border-t border-slate-100 dark:border-white/5 my-1.5 mx-1.5" />

//                     <div className="px-1.5">
//                       <button
//                         onClick={handleLogout}
//                         disabled={isLoggingOut}
//                         className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-bold text-red-500 dark:text-red-400 hover:bg-red-500/10 transition disabled:opacity-50 cursor-pointer"
//                       >
//                         <FaSignOutAlt className="text-sm shrink-0 animate-pulse" />
//                         <span>{isLoggingOut ? "Ending Session..." : "Secure Log Out"}</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Mobile Drawer Trigger */}
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className="flex md:hidden items-center justify-center w-9 h-9 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/40 dark:border-white/5 rounded-xl transition-all"
//               aria-label="Open directory panel"
//             >
//               <FaBars className="text-base" />
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* Mobile Right Drawer Panel */}
//       <div className={`fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
//         <div 
//           className={`absolute inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
//           onClick={() => setMobileMenuOpen(false)}
//         />

//         <div className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
//           <div>
//             <div className="flex items-center justify-between mb-8">
//               <span className="font-bold text-sm text-slate-900 dark:text-white tracking-wider uppercase opacity-80">Navigation</span>
//               <button
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <nav className="flex flex-col gap-2">
//               {navLinks.map((link) => {
//                 const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
//                 return (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`flex items-center gap-3 h-11 px-4 rounded-xl text-xs font-bold transition-all ${
//                       isActive
//                         ? "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 shadow-sm"
//                         : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
//                     }`}
//                   >
//                     {link.icon && <span className="text-sm opacity-80">{link.icon}</span>}
//                     <span>{link.label}</span>
//                   </Link>
//                 );
//               })}
//               {isLoggedIn && (
//                 <Link
//                   href={dashboardHref}
//                   className={`flex items-center h-11 px-4 rounded-xl text-xs font-bold transition-all ${
//                     pathname.startsWith("/dashboard")
//                       ? "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20"
//                       : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//               )}
//             </nav>
//           </div>

//           <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
//             {!isLoggedIn ? (
//               <div className="flex flex-col gap-2">
//                 <Link
//                   href="/login"
//                   className="flex items-center justify-center h-11 w-full rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signUp"
//                   className="flex items-center justify-center h-11 w-full rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-pink-500/15"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/60 dark:border-white/5">
//                 <Image
//                   src={user?.image || "/default-user.png"}
//                   alt={user?.name || "User Avatar Mini"}
//                   width={36}
//                   height={36}
//                   className="rounded-full object-cover bg-slate-800"
//                   unoptimized
//                 />
//                 <div className="min-w-0 flex-1">
//                   <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
//                   <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{user?.email}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  FaTicketAlt, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaThLarge,
  FaSun,
  FaMoon 
} from "react-icons/fa";
import Image from "next/image";
import { authClient } from "../lib/auth-client";
import Logo from "./Logo";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [theme, setTheme] = useState("dark"); 
  
  const dropdownRef = useRef(null);

  // Synchronize theme state with document class list
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  // Monitors scroll depth to toggle glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Closes dropdown when clicking outside (Fixed: TypeScript casting removed)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Closes mobile menu drawer on route transitions
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      setDropdownOpen(false);
      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const user = session?.user;
  const isLoggedIn = !!session;
  const userRole = user?.role?.toLowerCase() || "user";
  const pathName = usePathname();
  if(pathName.includes("/dashboard")){
    return null;

  }
  const dashboardHref = `/dashboard/${userRole}`;

  if (isPending) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-9">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-pink-500/20 animate-pulse" />
            <div className="h-5 w-24 rounded bg-slate-800 animate-pulse" />
          </div>
          <div className="h-8 w-20 rounded-lg bg-slate-800 animate-pulse" />
        </div>
      </header>
    );
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Ticket", href: "/ticket" },
    { label: "Tricket", href: "/tricket" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled 
            ? "border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-slate-950/90 shadow-xl shadow-black/5 dark:shadow-black/50 backdrop-blur-xl py-3" 
            : "border-slate-200/30 dark:border-white/5 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md py-4.5"
        } px-4 md:px-6`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Logo/>
          {/* <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white shadow-md shadow-pink-500/20 transition-transform duration-300 group-hover:scale-105">
              <FaTicketAlt className="text-lg rotate-[-12deg] group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              TicketHub<span className="text-pink-500 font-extrabold">.</span>
            </span>
          </Link> */}

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-200/50 dark:bg-white/5 p-1 rounded-full border border-slate-200/30 dark:border-white/5">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-inner"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isLoggedIn && (
              <Link
                href={dashboardHref}
                className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                  pathname.startsWith("/dashboard")
                    ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm dark:shadow-inner"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* ACTIONS, THEME TOGGLE & PROFILE */}
          <div className="flex items-center gap-3">
            
            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/30 dark:border-white/5 rounded-xl transition-all cursor-pointer outline-none focus:outline-none"
              aria-label="Toggle dark/light mode"
            >
              {theme === "dark" ? (
                <FaSun className="text-base text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <FaMoon className="text-base text-indigo-600 transition-transform hover:-rotate-12" />
              )}
            </button>

            {!isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link
                  href="/signIn"
                  className="inline-flex items-center justify-center font-semibold text-xs text-slate-600 dark:text-slate-300 hover:text-white h-9 px-4.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/5 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signUp"
                  className="inline-flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md shadow-pink-500/10 hover:shadow-pink-500/30 hover:scale-[1.02] transition active:scale-[0.98] duration-200 h-9 px-4.5 rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  className="flex items-center rounded-full p-0.5 border border-slate-200 dark:border-white/10 hover:border-pink-500/50 transition-all hover:scale-105 duration-200 outline-none focus:outline-none cursor-pointer"
                >
                  <Image
                    src={user?.image || "/default-user.png"}
                    alt={user?.name || "Profile"}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </button>

                {/* USER DROPDOWN */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-950/95 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl py-2 z-50 origin-top-right transition-transform duration-200 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-1 cursor-default">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-pink-500/10 text-pink-500 dark:text-pink-400 border border-pink-500/20">
                        {user?.role ?? "User"} Account
                      </span>
                      <p className="font-bold text-slate-900 dark:text-white text-sm mt-1.5 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.email}</p>
                    </div>

                    <div className="px-1.5 space-y-0.5">
                      <Link
                        href={dashboardHref}
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition"
                      >
                        <FaThLarge className="text-slate-400 text-sm shrink-0" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        href={`${dashboardHref}/settings`}
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition"
                      >
                        <FaUser className="text-slate-400 text-sm shrink-0" />
                        <span>Profile Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-white/5 my-1.5 mx-1.5" />

                    <div className="px-1.5">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-red-500 dark:text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
                      >
                        <FaSignOutAlt className="text-sm shrink-0" />
                        <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU TRIGGER */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center w-9 h-9 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all"
              aria-label="Open mobile menu"
            >
              <FaBars className="text-base" />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div 
          className={`absolute inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div 
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-base text-slate-900 dark:text-white">Menu Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center h-11 px-4 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {isLoggedIn && (
                <Link
                  href={dashboardHref}
                  className={`flex items-center h-11 px-4 rounded-xl text-sm font-semibold transition-all ${
                    pathname.startsWith("/dashboard")
                      ? "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/signIn"
                  className="flex items-center justify-center h-11 w-full rounded-xl border border-slate-200 dark:border-white/15 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signUp"
                  className="flex items-center justify-center h-11 w-full rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-pink-500/10"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3.5 bg-slate-100 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-white/5">
                <Image
                  src={user?.image || "/default-user.png"}
                  alt={user?.name || "Profile"}
                  width={38}
                  height={38}
                  className="rounded-full object-cover"
                 
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}