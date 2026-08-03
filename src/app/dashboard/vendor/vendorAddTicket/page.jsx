"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { authClient } from '@/app/lib/auth-client';

// Icons - Fixed imports
import { BiPlusCircle, BiUpload, BiCheck, BiTrash, BiInfoCircle } from 'react-icons/bi';
import { FaDollarSign, FaUserTie } from 'react-icons/fa';
import { RiLoader2Fill } from 'react-icons/ri';
import { MdDirectionsBus, MdLocalOffer, MdOutlineDateRange } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';


const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

const PERKS_LIST = [
    "AC",
    "Non AC",
    "WiFi",
    "Charging Port",
    "Blanket",
    "Water Bottle",
    "Snacks",
    "TV",
    "Washroom"
];

const VendorAddTicketPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const minDateTime = new Date().toISOString().slice(0, 16);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                e.target.value = '';
                return;
            }
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const removeImage = () => {
        setPreview(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
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
  {
    method: "POST",
    body: formData,
  }
);

const imgData = await imgRes.json();

           if (imgData.success) {
               const imageUrl = imgData.data.display_url;

               const ticketData = {
  title: data.title,
  from: data.from,
  to: data.to,
  transportType: data.transportType,
  price: Number(data.price),
  quantity: Number(data.quantity),
  departureDateTime: data.departureDateTime,
  perks: data.perks || [],
  image: imageUrl,

  vendorName: user?.name,
  vendorEmail: user?.email,
  vendorImage: user?.image || "",

  status: "Pending",
  booked: 0,
  available: Number(data.quantity),
  createdAt: new Date(),
};

const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/tickets`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  }
);

const result = await response.json();

if (response.ok) {
  toast.success("Ticket Added Successfully");
  reset();
  setPreview(null);
} else {
  toast.error(result.message);
}
                
                toast.success("Ticket added successfully! Waiting for Admin Approval.");
                reset();
                setPreview(null);
            }
        } catch (error) {
            console.error('Error adding ticket:', error);
            toast.error("Failed to upload ticket. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl bg-gradient-to from-primary/ bg-gray-800 text-white rounded-2xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Professional Header Section */}
            <div className=" relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-primary/10 via-base-400 to-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm">
                <div className="space-y-1 z-10">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <BiPlusCircle className="w-5 h-5" /> Listing Management
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                        Create Ticket Listing
                    </h1>
                    <p className="text-sm opacity-70 max-w-md">
                        Publish route schedules and seat inventories to launch bookings across your transport network.
                    </p>
                </div>
                
                <div className="z-10">
                    <span className="badge badge-warning gap-2 p-3 font-semibold text-xs uppercase tracking-wider shadow-sm">
                        Status: Pending Approval
                    </span>
                </div>
            </div>

            {/* Main Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* 1. Basic Ticket Info */}
                <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl hover:border-base-300 transition-all">
                    <div className="flex items-center gap-3 border-b border-base-200 pb-4 mb-6">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <MdDirectionsBus className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">General Information</h2>
                            <p className="text-xs opacity-60">Route naming and terminal locations</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2 form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Ticket Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Green Line Paribahan - Non-Stop AC Scania"
                                {...register('title', { required: 'Ticket title is required' })}
                                className={`input input-bordered w-full rounded-xl transition-all focus:input-primary ${errors.title ? 'input-error' : ''}`}
                            />
                            {errors.title && <span className="text-error text-xs mt-1.5 flex items-center gap-1"><BiInfoCircle />{errors.title.message}</span>}
                        </div>

                        {/* From Location */}
                        <div className="form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Origin (From)
                            </label>
                            <div className="relative">
                                <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500 w-4 h-4 z-10" />
                                <input
                                    type="text"
                                    placeholder="e.g. Dhaka (Gabtoli)"
                                    {...register('from', { required: 'Origin location is required' })}
                                    className={`input input-bordered w-full pl-10 rounded-xl focus:input-primary ${errors.from ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.from && <span className="text-error text-xs mt-1.5">{errors.from.message}</span>}
                        </div>

                        {/* To Location */}
                        <div className="form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Destination (To)
                            </label>
                            <div className="relative">
                                <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500 w-4 h-4 z-10" />
                                <input
                                    type="text"
                                    placeholder="e.g. Cox's Bazar"
                                    {...register('to', { required: 'Destination location is required' })}
                                    className={`input input-bordered w-full pl-10 rounded-xl focus:input-primary ${errors.to ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.to && <span className="text-error text-xs mt-1.5">{errors.to.message}</span>}
                        </div>
                    </div>
                </div>

                {/* 2. Schedule & Pricing */}
                <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl">
                    <div className="flex items-center gap-3 border-b border-base-200 pb-4 mb-6">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <FaDollarSign className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">Pricing & Logistics</h2>
                            <p className="text-xs opacity-60">Fares, capacity, and departure timing</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Transport Type */}
                        <div className="form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Transport Type
                            </label>
                            <select
                                {...register('transportType', { required: 'Transport type is required' })}
                                className={`select select-bordered w-full rounded-xl focus:select-primary ${errors.transportType ? 'select-error' : ''}`}
                            >
                                <option value="">Select Vehicle Type</option>
                                {TRANSPORT_TYPES.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.transportType && <span className="text-error text-xs mt-1.5">{errors.transportType.message}</span>}
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Unit Price ($)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 font-bold">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="50.00"
                                    {...register('price', { required: 'Price is required', min: 1 })}
                                    className={`input input-bordered w-full pl-8 rounded-xl focus:input-primary ${errors.price ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.price && <span className="text-error text-xs mt-1.5">{errors.price.message}</span>}
                        </div>

                        {/* Total Quantity */}
                        <div className="form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Total Seat Inventory
                            </label>
                            <input
                                type="number"
                                placeholder="40"
                                {...register('quantity', { required: 'Quantity is required', min: 1 })}
                                className={`input input-bordered w-full rounded-xl focus:input-primary ${errors.quantity ? 'input-error' : ''}`}
                            />
                            {errors.quantity && <span className="text-error text-xs mt-1.5">{errors.quantity.message}</span>}
                        </div>

                        {/* Departure Date & Time */}
                        <div className="form-control">
                            <label className="label font-medium text-xs uppercase tracking-wider text-base-content/80">
                                Departure Date & Time
                            </label>
                            <div className="relative">
                                <MdOutlineDateRange className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5 pointer-events-none" />
                                <input
                                    type="datetime-local"
                                    min={minDateTime}
                                    {...register('departureDateTime', { required: 'Departure date & time is required' })}
                                    className={`input input-bordered w-full rounded-xl focus:input-primary ${errors.departureDateTime ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.departureDateTime && <span className="text-error text-xs mt-1.5">{errors.departureDateTime.message}</span>}
                        </div>
                    </div>
                </div>

                {/* 3. Perks & Amenities */}
                <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl">
                    <div className="flex items-center gap-3 border-b border-base-200 pb-4 mb-6">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <MdLocalOffer className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">Included Perks & Amenities</h2>
                            <p className="text-xs opacity-60">Highlight services available for passengers</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {PERKS_LIST.map((item) => (
                            <label 
                                key={item} 
                                className="label cursor-pointer justify-start gap-3 p-3.5 bg-base-200/40 hover:bg-base-200/80 rounded-xl transition-all border border-base-200 hover:border-primary/30"
                            >
                                <input
                                    type="checkbox"
                                    value={item}
                                    {...register('perks')}
                                    className="checkbox checkbox-primary checkbox-sm rounded-md"
                                />
                                <span className="label-text font-semibold text-sm text-base-content/90">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 4. Professional Upload Area */}
                <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl">
                    <h2 className="text-lg font-bold mb-1">Ticket Banner Image</h2>
                    <p className="text-xs opacity-60 mb-4">High resolution banner showcasing your vehicle or service</p>
                    
                    <div className="form-control">
                        {!preview ? (
                            <label className="border-2 border-dashed border-base-300 hover:border-primary/50 bg-base-200/30 hover:bg-base-200/60 transition-all rounded-2xl p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3 group">
                                <div className="p-4 bg-base-100 rounded-full shadow-sm text-primary group-hover:scale-110 transition-transform">
                                    <BiUpload className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Click to upload banner</p>
                                    <p className="text-xs opacity-50 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('image', {
                                        required: 'Banner image is required',
                                        onChange: handleImageChange
                                    })}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative rounded-2xl overflow-hidden border border-base-300 group">
                                <img
                                    src={preview}
                                    alt="Ticket Banner Preview"
                                    className="h-64 w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="btn btn-error btn-sm text-white gap-2 shadow-lg"
                                    >
                                        <BiTrash className="w-4 h-4" /> Remove Image
                                    </button>
                                </div>
                            </div>
                        )}
                        {errors.image && !preview && (
                            <span className="text-error text-xs mt-2">{errors.image.message}</span>
                        )}
                    </div>
                </div>

                {/* 5. Readonly Metadata Box */}
                <div className="bg-base-200/40 border border-base-300 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <FaUserTie className="text-base-content/50 w-4 h-4" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                            Verified Vendor Context
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label text-xs font-medium opacity-60 pb-1">Publisher Name</label>
                            <input
                                type="text"
                                value={user?.name || ""}
                                readOnly
                                className="input input-sm bg-base-100/80 border-base-300 rounded-lg cursor-not-allowed text-xs font-semibold"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label text-xs font-medium opacity-60 pb-1">Publisher Email</label>
                            <input
                                type="text"
                                value={user?.email || ""}
                                readOnly
                                className="input input-sm bg-base-100/80 border-base-300 rounded-lg cursor-not-allowed text-xs font-semibold"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full btn-lg font-bold text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all rounded-2xl"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <RiLoader2Fill className="w-5 h-5 animate-spin" />
                            <span>Processing Request...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <BiCheck className="w-6 h-6" />
                            <span>Submit Ticket Listing</span>
                        </div>
                    )}
                </button>

            </form>
        </div>
    );
};

export default VendorAddTicketPage;