"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Store, MessageCircle, Camera, Video, Send, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createStore, getStores } from '@/services/storeService';
import { useRouter } from 'next/navigation';

type OnboardingStep = 'CREATE_STORE' | 'SELECT_PLATFORM';

export default function DashboardPage() {
    const [step, setStep] = useState<OnboardingStep>('CREATE_STORE');
    const [isAddingStore, setIsAddingStore] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState<any[]>([]);
    const router = useRouter();

    // Fetch existing stores on mount
    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         try {
    //             const data = await getStores();
    //             setStores(data || []);
    //         } catch (error) {
    //             console.error('Failed to fetch stores:', error);
    //         }
    //     };
    //     fetchInitialData();
    // }, []);

    const handleAddStoreClick = () => {
        if (stores.length > 0) {
            toast.error('Please subscribe to create more stores!', {
                description: 'You have reached the limit for the free tier.',
                action: {
                    label: 'See Plans',
                    onClick: () => router.push('/pricing')
                }
            });
            return;
        }
        setIsAddingStore(true);
    };

    const handleCreateStore = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!storeName.trim()) {
            toast.error('Please enter a store name');
            return;
        }

        setLoading(true);
        try {
            const newStore = await createStore({ name: storeName });
            setStores([...stores, newStore]);
            toast.success('Store created successfully!');
            setIsAddingStore(false);
            setStep('SELECT_PLATFORM');
        } catch (error: any) {
            const msg = error.response?.data?.detail || error.response?.data?.message || 'Failed to create store';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#020617] min-h-screen text-[#F1F5F9] flex flex-col items-center justify-center px-6 overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#14B8A6]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#1E293B]/20 blur-[100px] rounded-full" />

            <div className="w-full max-w-2xl z-10">
                <AnimatePresence mode="wait">
                    {step === 'CREATE_STORE' ? (
                        <motion.div
                            key="create-store"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                                Get started with your <span className="text-[#14B8A6]">store.</span>
                            </h1>
                            <p className="text-[#F1F5F9]/40 mb-12 text-sm max-w-md mx-auto">
                                Every great journey begins with a single step. Let's name your first store to begin.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                {stores.map((store) => (
                                    <div 
                                        key={store.id} 
                                        className="w-full md:w-64 h-48 bg-[#1E293B]/50 border-2 border-[#14B8A6]/20 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all"
                                    >
                                        <div className="p-4 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                            <Store size={32} />
                                        </div>
                                        <p className="font-bold tracking-wide">{store.name}</p>
                                        <button 
                                            onClick={() => setStep('SELECT_PLATFORM')}
                                            className="text-[10px] uppercase tracking-widest text-[#14B8A6] font-bold hover:text-[#F1F5F9] transition-colors flex items-center gap-2"
                                        >
                                            Continue Setup <ArrowRight size={12} />
                                        </button>
                                    </div>
                                ))}

                                {(!isAddingStore || stores.length > 0) && (
                                    <motion.button
                                        whileHover={{ scale: 1.02, borderColor: 'rgba(20, 184, 166, 0.4)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddStoreClick}
                                        className="w-full md:w-64 h-48 bg-transparent border-2 border-dashed border-[#F1F5F9]/10 rounded-3xl flex flex-col items-center justify-center gap-4 group transition-all cursor-pointer"
                                    >
                                        <div className="p-4 rounded-full bg-[#1E293B] text-[#F1F5F9]/20 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6] transition-all">
                                            <Plus size={40} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/20 group-hover:text-[#14B8A6]">Add a store</span>
                                    </motion.button>
                                )}

                                {isAddingStore && stores.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full max-w-md"
                                    >
                                        <form onSubmit={handleCreateStore} className="space-y-6">
                                            <div className="space-y-2 text-left">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40 ml-2">Store Name</label>
                                                <input 
                                                    autoFocus
                                                    type="text"
                                                    value={storeName}
                                                    onChange={(e) => setStoreName(e.target.value)}
                                                    placeholder="E.g. My Premium Boutique"
                                                    className="w-full bg-[#1E293B]/50 border border-[#F1F5F9]/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#14B8A6] transition-all text-sm"
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsAddingStore(false)}
                                                    className="flex-1 py-4 text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40 hover:text-[#F1F5F9] transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    disabled={loading}
                                                    type="submit"
                                                    className="flex-3 bg-[#14B8A6] text-[#0B1120] py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#F1F5F9] transition-all shadow-lg disabled:opacity-50"
                                                >
                                                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Continue'}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="select-platform"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                                Pick a <span className="text-[#14B8A6]">platform.</span>
                            </h1>
                            <p className="text-[#F1F5F9]/40 mb-12 text-sm max-w-md mx-auto">
                                Select where you'd like to reach your customers. We're launching with Telegram first.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Telegram - Active */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toast.info('Telegram setup coming next!')}
                                    className="aspect-square bg-[#1E293B]/50 border-2 border-[#14B8A6]/40 rounded-3xl flex flex-col items-center justify-center gap-4 group hover:bg-[#14B8A6]/5 transition-all cursor-pointer"
                                >
                                    <div className="p-4 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                        <Send size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Telegram</span>
                                </motion.button>

                                {/* WhatsApp - Coming Soon */}
                                <div className="aspect-square bg-[#1E293B]/20 border-2 border-transparent rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden group grayscale opacity-50">
                                    <div className="p-4 rounded-2xl bg-[#F1F5F9]/5 text-[#F1F5F9]/20">
                                        <MessageCircle size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/20">WhatsApp</span>
                                    <div className="absolute top-3 right-3 bg-[#1E293B] px-2 py-1 rounded-md">
                                        <span className="text-[8px] uppercase tracking-tighter font-bold text-[#F1F5F9]/40">Soon</span>
                                    </div>
                                </div>

                                {/* Instagram - Coming Soon */}
                                <div className="aspect-square bg-[#1E293B]/20 border-2 border-transparent rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden group grayscale opacity-50">
                                    <div className="p-4 rounded-2xl bg-[#F1F5F9]/5 text-[#F1F5F9]/20">
                                        <Camera size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/20">Instagram</span>
                                    <div className="absolute top-3 right-3 bg-[#1E293B] px-2 py-1 rounded-md">
                                        <span className="text-[8px] uppercase tracking-tighter font-bold text-[#F1F5F9]/40">Soon</span>
                                    </div>
                                </div>

                                {/* TikTok - Coming Soon */}
                                <div className="aspect-square bg-[#1E293B]/20 border-2 border-transparent rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden group grayscale opacity-50">
                                    <div className="p-4 rounded-2xl bg-[#F1F5F9]/5 text-[#F1F5F9]/20">
                                        <Video size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/20">TikTok</span>
                                    <div className="absolute top-3 right-3 bg-[#1E293B] px-2 py-1 rounded-md">
                                        <span className="text-[8px] uppercase tracking-tighter font-bold text-[#F1F5F9]/40">Soon</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setStep('CREATE_STORE')}
                                className="mt-12 text-[10px] uppercase tracking-widest text-[#F1F5F9]/40 hover:text-[#14B8A6] font-bold transition-all"
                            >
                                Back to stores
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
