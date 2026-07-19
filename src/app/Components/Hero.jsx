"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaBus, FaTrain, FaPlane, FaUserShield } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Simulated Better-Auth React Hook 
// (Replace this with your real auth client hook: const { data: session } = useSession();)
const useSession = () => { 
  return { data: { user: { name: "Alex" } }, isPending: false }; 
};

// Transport Slides Data Config
const SLIDES = [
  {
    icon: <FaBus />,
    glowColor: "from-cyan-500/30 to-blue-500/0",
    iconTextColor: "text-cyan-400",
    tag: "Premium AC Bus Services",
    title: "Travel in Style with Luxury ",
    titleGradient: "AC Buses",
    titleEnd: " Across Cities",
    description: "Experience ultimate highway comfort. Ergonomic recliners, hi-speed Wi-Fi, constant climate control, and certified on-time schedules.",
    cta1Text: "Book AC Bus",
    cta1Href: "/bus",
  },
  {
    icon: <FaTrain />,
    glowColor: "from-emerald-500/30 to-teal-500/0",
    iconTextColor: "text-emerald-400",
    tag: "Express Rail Booking",
    title: "Smooth Journeys via Modern ",
    titleGradient: "High-Speed Trains",
    titleEnd: " Daily",
    description: "Skip the traffic completely. Reserve sleeper berths, business class suites, or standard commuter cabins instantly with seamless seat mapping.",
    cta1Text: "Reserve Train Ticket",
    cta1Href: "/train",
  },
  {
    icon: <FaPlane />,
    glowColor: "from-indigo-500/30 to-purple-500/0",
    iconTextColor: "text-indigo-400",
    tag: "Domestic & International Flights",
    title: "Fly High with Premium ",
    titleGradient: "Airplane Deals",
    titleEnd: " Nationwide",
    description: "Connect globally or travel locally in record time. Compare elite airlines, manage baggage check-ins, and secure the lowest available airfares.",
    cta1Text: "Search Flights",
    cta1Href: "/flights",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: session } = useSession(); // Better-Auth connection

  // Auto-play interval (switches slides every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 bg-slate-950">
      
      {/* Gravity Ambient Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10" />
      <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/10 via-purple-500/5 to-indigo-500/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse" />

      <div className="max-w-5xl text-center relative w-full min-h-[480px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Gravity-Style Floating Glowing Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-semibold uppercase tracking-wider shadow-xl shadow-black/40 group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${SLIDES[currentSlide].glowColor} opacity-50 transition-all duration-500`} />
              
              <span className={`relative z-10 text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] ${SLIDES[currentSlide].iconTextColor}`}>
                {SLIDES[currentSlide].icon}
              </span> 
              <span className="relative z-10">{SLIDES[currentSlide].tag}</span>
            </div>

            {/* Typography */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.15]">
              {SLIDES[currentSlide].title}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                {SLIDES[currentSlide].titleGradient}
              </span>
              {SLIDES[currentSlide].titleEnd}
            </h1>

            <p className="text-slate-400/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
              {SLIDES[currentSlide].description}
            </p>

            {/* Better-Auth Conditioned UX Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link href={SLIDES[currentSlide].cta1Href} className="w-full sm:w-auto">
                <Button
                  className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold h-14 px-10 text-md shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full"
                  radius="full"
                >
                  {SLIDES[currentSlide].cta1Text}
                </Button>
              </Link>
              
              {session ? (
                /* User is Authenticated */
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="bordered"
                    className="border-white/10 hover:bg-white/5 hover:border-white/20 text-slate-200 font-semibold h-14 px-8 text-md border-2 w-full backdrop-blur-sm gap-2"
                    radius="full"
                  >
                    <FaUserShield className="text-purple-400" /> Dashboard ({session.user.name})
                  </Button>
                </Link>
              ) : (
                /* User is Guest */
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    variant="bordered"
                    className="border-white/10 hover:bg-white/5 hover:border-white/20 text-slate-200 font-semibold h-14 px-8 text-md border-2 w-full backdrop-blur-sm"
                    radius="full"
                  >
                    Sign In / Register
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gravity Navigation Pill Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-white/5 backdrop-blur-md px-3 py-2 rounded-full border border-white/5 shadow-inner shadow-white/5">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              currentSlide === index 
                ? "w-8 bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]" 
                : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Switch to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

