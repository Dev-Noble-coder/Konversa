"use client";

import React, { useState, useMemo } from 'react';
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
    ArrowLeft,
    Trash2,
    MoreVertical,
    Search,
    Edit2
} from 'lucide-react';
import Layout from '@/app/components/Dashboard/layout';
import Dashboard_Header from '@/app/components/Dashboard/Dashboard_Header';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createProduct, getProducts, deleteProduct } from '@/services/productService';

const ProductsPage = () => {
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch selected store from cache
    const { data: selectedStore } = useQuery<any>({
        queryKey: ['selectedStore'],
        queryFn: () => Promise.resolve(null), 
        enabled: false,
    });

    // Fetch products with backend search and pagination
    const { data: productsData, isLoading: isLoadingProducts } = useQuery<any>({
        queryKey: ['products', selectedStore?.sqid, searchQuery],
        queryFn: () => getProducts(selectedStore?.sqid, { search: searchQuery }),
        enabled: !!selectedStore?.sqid,
    });

    const products = useMemo(() => {
        if (!productsData) return [];
        const data = Array.isArray(productsData) ? productsData 
                   : Array.isArray(productsData?.results) ? productsData.results
                   : Array.isArray(productsData?.data) ? productsData.data
                   : [];
        return data;
    }, [productsData]);

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
            toast.error("Please select a store first");
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
            toast.success("Product created successfully!");
            
            // Refresh products list
            queryClient.invalidateQueries({ queryKey: ['products', selectedStore.sqid] });

            setTimeout(() => {
                setShowSuccess(false);
                setIsUploading(false);
                setFormData({ title: '', description: '', price: '', stock: '', image: null });
            }, 1500);
        } catch (error) {
            console.error("Failed to create product:", error);
            setIsSubmitting(false);
            toast.error("Failed to create product. Please try again.");
        }
    };

    const handleDelete = async (sqid: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        
        const promise = deleteProduct(sqid);
        toast.promise(promise, {
            loading: 'Deleting product...',
            success: () => {
                queryClient.invalidateQueries({ queryKey: ['products', selectedStore?.sqid] });
                return 'Product deleted successfully';
            },
            error: 'Failed to delete product'
        });
    };

    const NairaIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
        <span className={`font-bold ${className}`} style={{ fontSize: size }}>₦</span>
    );

    return (
        <Layout>
            <main className="flex-1 p-3 md:p-5 lg:p-10 z-10 overflow-y-auto bg-slate-50/30">
                <Dashboard_Header />

                <div className="mx-auto mt-8">
                    <AnimatePresence mode="wait">
                        {isLoadingProducts ? (
                            <motion.div 
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center min-h-[60vh]"
                            >
                                <Loader2 className="w-10 h-10 text-[#14B8A6] animate-spin mb-4" />
                                <p className="text-slate-500 font-medium">Fetching your products...</p>
                            </motion.div>
                        ) : !isUploading ? (
                            products.length === 0 && !searchQuery ? (
                                <motion.div
                                    key="empty-state"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                                >
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
                                    key="product-list"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    {/* List Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900">Products</h2>
                                            <p className="text-sm text-slate-500">Manage and track your store inventory</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-1 md:w-64">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input 
                                                    type="text" 
                                                    placeholder="Search products..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
                                                />
                                            </div>
                                            <button
                                                onClick={() => setIsUploading(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#14B8A6] text-white rounded-lg font-bold hover:bg-[#0F766E] transition-all shadow-md active:scale-95 text-sm cursor-pointer"
                                            >
                                                <Plus size={18} />
                                                <span className="hidden sm:inline">Add Product</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Products Grid */}
                                    {products.length === 0 ? (
                                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                                            <p className="text-slate-500">No products match your search.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {products.map((product: any) => (
                                                <motion.div
                                                    layout
                                                    key={product.sqid}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="bg-white rounded-lg border border-slate-200 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
                                                >
                                                    {/* Image Area */}
                                                    <div className="relative h-40 bg-slate-100 overflow-hidden">
                                                        {product.image_url ? (
                                                            <img 
                                                                src={product.image_url} 
                                                                alt={product.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                <ImageIcon size={48} strokeWidth={1} />
                                                            </div>
                                                        )}
                                                        <div className="absolute top-3 right-3 flex gap-2">
                                                            <button 
                                                                onClick={() => handleDelete(product.sqid)}
                                                                className="p-2 bg-white/90 backdrop-blur-sm text-rose-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        {product.stock <= 5 && (
                                                            <div className="absolute bottom-3 left-3 px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                                                                Low Stock
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content Area */}
                                                    <div className="p-5 flex-1 flex flex-col">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-[#14B8A6] transition-colors">
                                                                {product.title}
                                                            </h3>
                                                        </div>
                                                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">
                                                            {product.description || "No description provided."}
                                                        </p>
                                                        
                                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                            <div>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Price</p>
                                                                <p className="text-lg font-black text-slate-900">
                                                                    <NairaIcon className="text-[#14B8A6]" /> {Number(product.price).toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">In Stock</p>
                                                                <p className="text-sm font-bold text-slate-700">{product.stock}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )
                        ) : (
                            <motion.div
                                key="upload-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/20"
                            >
                                {/* Form Header */}
                                <div className="p-6 lg:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setIsUploading(false)}
                                            className="p-2.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-600  border border-slate-200 cursor-pointer"
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                        <div>
                                            <h2 className="text-md sm:text-xl font-bold text-slate-900 tracking-tight">Upload New Product</h2>
                                            <p className="text-xs text-slate-500 font-medium">Adding to <span className="text-[#14B8A6] font-bold">{selectedStore?.name}</span></p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setIsUploading(false)}
                                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 lg:p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left Side: Basic Info */}
                                        <div className="space-y-8">
                                            {/* Title */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                    <FileText size={14} className="text-[#14B8A6]" /> Product Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    required
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Vintage Denim Jacket"
                                                    className="w-full px-5 py-3.5 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-[#14B8A6]/5 focus:border-[#14B8A6] transition-all text-sm font-medium"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                    <Layers size={14} className="text-[#14B8A6]" /> Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    rows={4}
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Describe your product in detail..."
                                                    className="w-full px-5 py-3.5 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-[#14B8A6]/5 focus:border-[#14B8A6] transition-all text-sm font-medium resize-none"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                {/* Price */}
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                         Price (<NairaIcon size={12} />)
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</div>
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            required
                                                            value={formData.price}
                                                            onChange={handleInputChange}
                                                            placeholder="0.00"
                                                            className="w-full pl-10 pr-5 py-3.5 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-[#14B8A6]/5 focus:border-[#14B8A6] transition-all text-sm font-bold"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Stock */}
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                        <Package size={14} className="text-[#14B8A6]" /> Stock
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="stock"
                                                        value={formData.stock}
                                                        onChange={handleInputChange}
                                                        placeholder="1"
                                                        className="w-full px-5 py-3.5 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-[#14B8A6]/5 focus:border-[#14B8A6] transition-all text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Media */}
                                        <div className="space-y-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                    <ImageIcon size={14} className="text-[#14B8A6]" /> Product Image
                                                </label>
                                                <div className="relative group">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className={`h-64 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${
                                                        formData.image 
                                                        ? 'border-[#14B8A6] bg-[#14B8A6]/5' 
                                                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                                                    }`}>
                                                        {formData.image ? (
                                                            <div className="text-center px-4">
                                                                <div className="w-16 h-16 bg-[#14B8A6] rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#14B8A6]/20">
                                                                    <CheckCircle2 size={32} />
                                                                </div>
                                                                <p className="text-sm font-bold text-slate-900 truncate max-w-[200px] mx-auto">{formData.image.name}</p>
                                                                <p className="text-[10px] text-[#14B8A6] font-bold mt-2 uppercase tracking-widest">Click to change</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-[#14B8A6] transition-colors">
                                                                    <Upload size={24} />
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="text-sm font-bold text-slate-700">Drop image or click to browse</p>
                                                                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">PNG, JPG up to 10MB</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Section */}
                                            <div className="pt-8 border-t border-slate-100">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || showSuccess}
                                                    className={`w-full py-3.5 rounded-full font-bold flex items-center justify-center gap-3 transition-all text-sm ${
                                                        showSuccess
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-[0.98]'
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
                                                            <Plus size={18} />
                                                        </>
                                                    )}
                                                </button>
                                                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-loose mt-4">
                                                    Synced automatically with your store bot
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