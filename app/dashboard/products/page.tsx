"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, 
    Plus, 
    Upload, 
    Image as ImageIcon, 
    X, 
    DollarSign, 
    Layers, 
    FileText,
    Loader2,
    CheckCircle2,
    ArrowLeft
} from 'lucide-react';
import Layout from '@/app/components/Dashboard/layout';
import Dashboard_Header from '@/app/components/Dashboard/Dashboard_Header';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createProduct } from '@/services/productService';

const ProductsPage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Fetch selected store from cache
    const { data: selectedStore } = useQuery<any>({
        queryKey: ['selectedStore'],
        enabled: false,
        queryFn: () => Promise.resolve(null), 
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        image: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStore?.sqid) {
            alert("Please select a store first");
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('stock', formData.stock || '0');
            data.append('store', selectedStore.sqid);
            if (formData.image) {
                data.append('image', formData.image);
            }

            await createProduct(data);
            
            setIsSubmitting(false);
            setShowSuccess(true);
            toast.success("Product (s) created succussfully !");
            setTimeout(() => {
                setShowSuccess(false);
                setIsUploading(false);
                setFormData({ title: '', description: '', price: '', stock: '', image: null });
            }, 2000);
        } catch (error) {
            console.error("Failed to create product:", error);
            setIsSubmitting(false);
            toast.error("Failed to create product. Please try again.");
        }
    };

    return (
        <Layout>
            <main className="flex-1 p-3 md:p-5 lg:p-10 z-10 overflow-y-scroll  bg-slate-50/30">
                <Dashboard_Header />

                <div className=" mx-auto mt-8">
                    <AnimatePresence mode="wait">
                        {!isUploading ? (
                            <motion.div
                                key="empty-state"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                            >
                                {/* Illustration / SVG Placeholder */}
                                <div className="relative mb-8">
                                    <div className="w-32 h-32 bg-[#14B8A6]/10 rounded-full flex items-center justify-center text-[#14B8A6]">
                                        <Package size={64} strokeWidth={1.5} />
                                    </div>
                                    <motion.div 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute -top-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#14B8A6] border border-slate-100"
                                    >
                                        <Plus size={20} />
                                    </motion.div>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 mb-3">No products yet</h2>
                                <p className="text-slate-500 max-w-sm mb-8 leading-relaxed text-sm">
                                    Your storefront is empty. Upload your first product to start selling across your socials.
                                </p>

                                <button
                                    onClick={() => setIsUploading(true)}
                                    className="flex items-center gap-2 px-8 py-2.5 bg-[#14B8A6] text-white rounded-full font-bold hover:bg-[#0F766E] transition-all shadow-lg shadow-[#14B8A6]/20 active:scale-95 text-sm cursor-pointer" 
                                >
                                    <Upload size={20} />
                                    Upload First Product
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="upload-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-lg border border-slate-200  overflow-hidden"
                            >
                                {/* Form Header */}
                                <div className="p-3 lg:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-1 lg:gap-4">
                                        <button 
                                            onClick={() => setIsUploading(false)}
                                            className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>
                                        <div>
                                            <h2 className="text-md lg:text-xl font-bold text-slate-900">Upload New Product</h2>
                                            <p className="text-xs text-slate-500 font-medium">Store: <span className="text-[#14B8A6]">{selectedStore?.name || 'Loading...'}</span></p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setIsUploading(false)}
                                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-5 lg:p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left Side: Basic Info */}
                                        <div className="space-y-8">
                                            {/* Title */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <FileText size={16} className="text-slate-400" /> Product Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    required
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Vintage Denim Jacket"
                                                    className="w-full px-5 py-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all text-sm"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <Layers size={16} className="text-slate-400" /> Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    rows={4}
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Describe your product in detail..."
                                                    className="w-full px-5 py-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all text-sm resize-none"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                {/* Price */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                         Price (₦)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        required
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        placeholder="0.00"
                                                        className="w-full px-5 py-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all text-sm"
                                                    />
                                                </div>

                                                {/* Stock */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                        <Package size={16} className="text-slate-400" /> Stock Quantity
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="stock"
                                                        value={formData.stock}
                                                        onChange={handleInputChange}
                                                        placeholder="1"
                                                        className="w-full px-5 py-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Media */}
                                        <div className="space-y-8">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <ImageIcon size={16} className="text-slate-400" /> Product Image
                                                </label>
                                                <div className="relative group">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className={`h-64 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${
                                                        formData.image 
                                                        ? 'border-[#14B8A6] bg-[#14B8A6]/5' 
                                                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                                                    }`}>
                                                        {formData.image ? (
                                                            <div className="text-center">
                                                                <CheckCircle2 size={40} className="text-[#14B8A6] mx-auto mb-2" />
                                                                <p className="text-xs font-bold text-[#14B8A6] truncate px-4">{formData.image.name}</p>
                                                                <p className="text-[10px] text-[#14B8A6]/60 mt-1 uppercase tracking-widest">Click to change</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="w-16 h-16 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-300">
                                                                    <Upload size={24} />
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="text-sm font-bold text-slate-700">Drop image or click to browse</p>
                                                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Section */}
                                            <div className="pt-5 lg:pt-8 border-t border-slate-100 flex flex-col gap-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || showSuccess}
                                                    className={`w-full py-3 rounded-full font-bold flex items-center justify-center gap-3 transition-all  text-sm ${
                                                        showSuccess
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10'
                                                    } disabled:opacity-70`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 size={20} className="animate-spin" />
                                                            Creating Product...
                                                        </>
                                                    ) : showSuccess ? (
                                                        <>
                                                            <CheckCircle2 size={20} />
                                                            Product Created!
                                                        </>
                                                    ) : (
                                                        <>
                                                            Create Product
                                                            <ArrowLeft size={18} className="rotate-180" />
                                                        </>
                                                    )}
                                                </button>
                                                <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest leading-loose">
                                                    Once created, this product will be automatically <br/> synced with your bot.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </Layout>
    );
};

export default ProductsPage;