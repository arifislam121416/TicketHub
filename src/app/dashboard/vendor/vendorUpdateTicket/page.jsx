"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';

// Icons
import { 
  BiEditAlt, 
  BiUpload, 
  BiCheck, 
  BiTrash, 
  BiInfoCircle, 
  BiArrowBack,
  BiPlusCircle 
} from 'react-icons/bi';
import { FaDollarSign, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import { RiLoader2Fill } from 'react-icons/ri';
import { 
  MdDirectionsBus, 
  MdLocalOffer, 
  MdOutlineDateRange,
  MdVerified,
  MdOutlineTimer 
} from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

const PERKS_LIST = [
  { name: "AC", icon: "❄️" },
  { name: "Non AC", icon: "🌤️" },
  { name: "WiFi", icon: "📶" },
  { name: "Charging Port", icon: "🔋" },
  { name: "Blanket", icon: "🛏️" },
  { name: "Water Bottle", icon: "💧" },
  { name: "Snacks", icon: "🍿" },
  { name: "TV", icon: "📺" },
  { name: "Washroom", icon: "🚻" }
];

// ===== WAVE ANIMATION COMPONENT =====
const WaveBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.originX = this.x;
        this.originY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.02 + 0.01;
      }

      update(mouseX, mouseY) {
        this.angle += this.frequency;
        this.x = this.originX + Math.sin(this.angle) * this.amplitude;
        this.y = this.originY + Math.cos(this.angle * 0.7) * this.amplitude * 0.5;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }

        this.x += (this.originX - this.x) * 0.01;
        this.y += (this.originY - this.y) * 0.01;
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(this.angle) * 0.2})`;
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 12000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
      setMouseY(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      setMouseX(-1000);
      setMouseY(-1000);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />
      {children}
    </div>
  );
};

// ===== FLOATING PARTICLES FOR CARDS =====
const FloatingParticles = ({ children, color = "amber" }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const colorMap = {
    amber: 'from-amber-400/30 to-amber-600/20',
    blue: 'from-blue-400/30 to-blue-600/20',
    indigo: 'from-indigo-400/30 to-indigo-600/20',
    purple: 'from-purple-400/30 to-purple-600/20',
  };

  return (
    <div className="relative overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full bg-gradient-to-r ${colorMap[color] || colorMap.amber}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatAnim ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      {children}
      <style jsx>{`
        @keyframes floatAnim {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(10px, -15px) scale(1.3); opacity: 0.6; }
          50% { transform: translate(-5px, -25px) scale(0.8); opacity: 0.4; }
          75% { transform: translate(15px, -10px) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

const VendorUpdateTicket = () => {
  const router = useRouter();
  const params = useParams();
  const ticketId = params?.id;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preview, setPreview] = useState(null);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [activeStep, setActiveStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const minDateTime = new Date().toISOString().slice(0, 16);
  const watchTransport = watch('transportType');

  // Fetch ticket details
  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!ticketId) return;
      
      try {
        setFetching(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticketId}`);
        
        if (!response.ok) throw new Error('Failed to fetch ticket');
        
        const data = await response.json();

        if (data) {
          setValue('title', data.title || '');
          setValue('from', data.from || '');
          setValue('to', data.to || '');
          setValue('transportType', data.transportType || '');
          setValue('price', data.price || '');
          setValue('quantity', data.quantity || '');
          setValue('departureDateTime', data.departureDateTime || '');
          
          // Set perks
          if (data.perks && Array.isArray(data.perks)) {
            setSelectedPerks(data.perks);
          }

          if (data.image) {
            setPreview(data.image);
          }
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        toast.error("Failed to load ticket details");
      } finally {
        setFetching(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        e.target.value = '';
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreview(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const togglePerk = (perkName) => {
    setSelectedPerks(prev => {
      const newPerks = prev.includes(perkName)
        ? prev.filter(p => p !== perkName)
        : [...prev, perkName];
      return newPerks;
    });
  };

  const scrollToStep = (step) => {
    setActiveStep(step);
    const element = document.getElementById(`step-${step}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = preview;

      // Upload new image if selected
      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!imgbbApiKey) {
          toast.error("ImgBB API Key not found");
          setLoading(false);
          return;
        }

        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          { method: "POST", body: formData }
        );

        const imgData = await imgRes.json();

        if (imgData.success) {
          imageUrl = imgData.data.display_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const updatedTicketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: Number(data.price),
        quantity: Number(data.quantity),
        departureDateTime: data.departureDateTime,
        perks: selectedPerks,
        image: imageUrl,
        available: Number(data.quantity),
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticketId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTicketData)
        }
      );

      if (!response.ok) throw new Error('Failed to update ticket');

      toast.success("✅ Ticket updated successfully!");
      router.push('/dashboard/vendor/vendorMyTicket');
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error("Failed to update ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: 'Basic Info', icon: MdDirectionsBus, color: 'amber' },
    { id: 2, label: 'Pricing', icon: FaDollarSign, color: 'amber' },
    { id: 3, label: 'Perks', icon: MdLocalOffer, color: 'amber' },
    { id: 4, label: 'Media', icon: BiUpload, color: 'amber' }
  ];

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-32 bg-gradient-to-r from-amber-200/50 to-amber-100/50 animate-pulse rounded-3xl"></div>
          <div className="h-64 bg-slate-200/50 animate-pulse rounded-3xl"></div>
          <div className="h-48 bg-slate-200/50 animate-pulse rounded-3xl"></div>
          <div className="h-40 bg-slate-200/50 animate-pulse rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all mb-6 group"
        >
          <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-all group-hover:scale-110">
            <BiArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-sm font-medium">Back to My Tickets</span>
        </button>

        {/* Header with Wave Background */}
        <WaveBackground>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-8 md:p-10 shadow-2xl shadow-amber-500/20 mb-8">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20">
                    <BiEditAlt className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                      Update Ticket
                    </h1>
                    <p className="text-amber-100 text-sm mt-1 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Modify ticket details and update listings
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                <FaShieldAlt className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">Ticket ID:</span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                  #{ticketId?.slice(-6) || 'N/A'}
                </span>
              </div>
            </div>

            {/* Step Progress */}
            <div className="relative mt-8 flex items-center justify-between gap-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => scrollToStep(step.id)}
                    className="flex flex-col items-center gap-1.5 group relative z-10"
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${activeStep >= step.id 
                        ? 'bg-white text-amber-600 shadow-lg shadow-white/20 scale-105 ring-4 ring-white/30' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30 hover:text-white'
                      }
                    `}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`
                      text-[10px] font-medium transition-colors duration-200
                      ${activeStep >= step.id ? 'text-white' : 'text-white/50'}
                    `}>
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-white/20 relative">
                      <div 
                        className="absolute inset-0 bg-white transition-all duration-700"
                        style={{ width: activeStep > step.id ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </WaveBackground>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Step 1: Basic Info */}
          <div id="step-1" className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 md:p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1">
            <FloatingParticles color="amber">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                    <MdDirectionsBus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">General Information</h2>
                    <p className="text-sm text-slate-400">Route details and ticket title</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-semibold">Step 1 of 4</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ticket Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Green Line Paribahan - Non-Stop AC Scania"
                    {...register('title', { required: 'Ticket title is required' })}
                    className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 focus:bg-white focus:scale-[1.01] ${
                      errors.title 
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-200 focus:border-amber-500'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <BiInfoCircle className="w-3 h-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4 text-emerald-500" />
                      Origin <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="e.g. Dhaka (Gabtoli)"
                      {...register('from', { required: 'Origin location is required' })}
                      className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 focus:bg-white focus:scale-[1.01] ${
                        errors.from 
                          ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                          : 'border-slate-200 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.from && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.from.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4 text-rose-500" />
                      Destination <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="e.g. Cox's Bazar"
                      {...register('to', { required: 'Destination location is required' })}
                      className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 focus:bg-white focus:scale-[1.01] ${
                        errors.to 
                          ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                          : 'border-slate-200 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.to && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.to.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToStep(2)}
                  className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold text-sm hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  Next Step <BiArrowBack className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </FloatingParticles>
          </div>

          {/* Step 2: Pricing */}
          <div id="step-2" className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 md:p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1">
            <FloatingParticles color="amber">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                    <FaDollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Pricing & Logistics</h2>
                    <p className="text-sm text-slate-400">Fares, capacity, and schedule updates</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-semibold">Step 2 of 4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Transport Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('transportType', { required: 'Transport type is required' })}
                    className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 appearance-none focus:bg-white focus:scale-[1.01] ${
                      errors.transportType 
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-200 focus:border-amber-500'
                    }`}
                  >
                    <option value="">Select Vehicle Type</option>
                    {TRANSPORT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.transportType && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.transportType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <FaDollarSign className="w-4 h-4" />
                      Unit Price <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="50.00"
                      {...register('price', { required: 'Price is required', min: 1 })}
                      className={`w-full pl-8 pr-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 focus:bg-white focus:scale-[1.01] ${
                        errors.price 
                          ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                          : 'border-slate-200 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <BiPlusCircle className="w-4 h-4" />
                      Total Seat Capacity <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="40"
                    {...register('quantity', { required: 'Quantity is required', min: 1 })}
                    className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 focus:bg-white focus:scale-[1.01] ${
                      errors.quantity 
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-200 focus:border-amber-500'
                    }`}
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.quantity.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <MdOutlineTimer className="w-4 h-4" />
                      Departure Date & Time <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    min={minDateTime}
                    {...register('departureDateTime', { required: 'Departure timing is required' })}
                    className={`w-full px-4 py-3.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-200 focus:bg-white focus:scale-[1.01] ${
                      errors.departureDateTime 
                        ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                        : 'border-slate-200 focus:border-amber-500'
                    }`}
                  />
                  {errors.departureDateTime && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.departureDateTime.message}</p>
                  )}
                </div>
              </div>

              {watchTransport && (
                <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <MdDirectionsBus className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Selected: <span className="text-amber-600 font-bold">{watchTransport}</span>
                    </p>
                    <p className="text-xs text-slate-500">Transport type confirmed</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => scrollToStep(1)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <BiArrowBack className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => scrollToStep(3)}
                  className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold text-sm hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  Next Step <BiArrowBack className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </FloatingParticles>
          </div>

          {/* Step 3: Perks */}
          <div id="step-3" className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 md:p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1">
            <FloatingParticles color="amber">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                    <MdLocalOffer className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Perks & Amenities</h2>
                    <p className="text-sm text-slate-400">Select services available for passengers</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-semibold">Step 3 of 4</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PERKS_LIST.map(({ name, icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => togglePerk(name)}
                    className={`
                      flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all duration-300
                      ${selectedPerks.includes(name) 
                        ? 'border-amber-500 bg-amber-50 shadow-md shadow-amber-100 scale-[1.02]' 
                        : 'border-slate-200 bg-slate-50 hover:border-amber-200 hover:bg-amber-50/50'
                      }
                    `}
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium text-slate-700 flex-1 text-left">{name}</span>
                    {selectedPerks.includes(name) && (
                      <BiCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {selectedPerks.length > 0 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-700">
                    {selectedPerks.length} perk{selectedPerks.length > 1 ? 's' : ''} selected
                  </span>
                  <span className="text-xs bg-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    {selectedPerks.join(', ')}
                  </span>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => scrollToStep(2)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <BiArrowBack className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => scrollToStep(4)}
                  className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold text-sm hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  Next Step <BiArrowBack className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </FloatingParticles>
          </div>

          {/* Step 4: Media Upload */}
          <div id="step-4" className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-6 md:p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1">
            <FloatingParticles color="amber">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                    <BiUpload className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Ticket Banner Image</h2>
                    <p className="text-sm text-slate-400">Keep existing image or upload a new one</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-semibold">Step 4 of 4</span>
              </div>

              <div>
                {!preview ? (
                  <label className="relative block w-full border-3 border-dashed border-slate-300 hover:border-amber-400 bg-slate-50/50 hover:bg-slate-50 transition-all rounded-2xl p-12 text-center cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      {...register('image', { onChange: handleImageChange })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-white rounded-full shadow-md text-amber-600 group-hover:scale-110 transition-transform">
                        <BiUpload className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Click to upload new banner</p>
                        <p className="text-sm text-slate-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 group">
                    <img
                      src={preview}
                      alt="Ticket Banner Preview"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                      <div className="text-white">
                        <p className="font-bold text-lg">Current Image</p>
                        <p className="text-sm opacity-80">Upload new to replace</p>
                      </div>
                      <div className="flex gap-2">
                        <label className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2">
                          <BiUpload className="w-4 h-4" /> Change
                          <input
                            type="file"
                            accept="image/*"
                            {...register('image', { onChange: handleImageChange })}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center gap-2"
                        >
                          <BiTrash className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => scrollToStep(3)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <BiArrowBack className="w-4 h-4" /> Back
                </button>
              </div>
            </FloatingParticles>
          </div>

          {/* Vendor Info */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-3xl border border-slate-200/60 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-200/50 rounded-xl">
                <FaUserTie className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  Verified Vendor Information
                </h3>
                <p className="text-xs text-slate-400">This information is auto-filled from your account</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                  Vendor Name
                </label>
                <div className="px-4 py-3 bg-white rounded-2xl border border-slate-200 text-slate-700 font-medium flex items-center gap-2">
                  <MdVerified className="w-4 h-4 text-amber-500" />
                  {user?.name || "Not available"}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                  Vendor Email
                </label>
                <div className="px-4 py-3 bg-white rounded-2xl border border-slate-200 text-slate-700 font-medium">
                  {user?.email || "Not available"}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full py-4 px-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold text-lg rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <RiLoader2Fill className="w-6 h-6 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <BiCheck className="w-6 h-6" />
                  <span>Save & Update Ticket</span>
                </>
              )}
            </span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default VendorUpdateTicket;