"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Store, ArrowRight, Loader2 } from 'lucide-react';
import { SiTelegram, SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { toast } from 'sonner';
import { createStore, getStores, connectTelegram } from '@/services/storeService';
import { useRouter } from 'next/navigation';

type OnboardingStep = 'CREATE_STORE' | 'SELECT_PLATFORM' | 'TELEGRAM_SETUP';

export default function OnboardPage() {
    const [step, setStep] = useState<OnboardingStep>('CREATE_STORE');
    const [isAddingStore, setIsAddingStore] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState<any[]>([]);
    const [storeSqid, setStoreSqid] = useState<string>('');
    const [channelUsername, setChannelUsername] = useState('');
    const router = useRouter();

    // Fetch existing stores on mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await getStores();
                const storesArray = Array.isArray(data) ? data 
                                  : Array.isArray(data?.results) ? data.results
                                  : Array.isArray(data?.data) ? data.data 
                                  : Array.isArray(data?.stores) ? data.stores 
                                  : [];
                setStores(storesArray);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
            }
        };
        fetchInitialData();
    }, []);

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
            // Save the sqid — we'll send it to the connect-telegram endpoint
            setStoreSqid(newStore.sqid || newStore.data?.sqid || '');
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

    const handleConnectTelegram = async (e: React.FormEvent) => {
        e.preventDefault();
        const username = channelUsername.trim().replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '');
        if (!username) {
            toast.error('Please enter your channel username');
            return;
        }
        setLoading(true);
        try {
            await connectTelegram(storeSqid, username);
            toast.success('Telegram channel connected!');
            setTimeout(() => router.push('/dashboard'), 1000);
        } catch (error: any) {
            const msg = error.response?.data?.detail || error.response?.data?.message || 'Failed to connect channel';
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
                                {stores.map((store, index) => (
                                    <div 
                                        key={store.sqid || store.id || store._id || index} 
                                        className="w-full md:w-64 h-48 bg-[#1E293B]/50 border-2 border-[#14B8A6]/20 rounded-lg flex flex-col items-center justify-center gap-4 transition-all"
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
                                        className="w-full md:w-64 h-48 bg-transparent border-2 border-dashed border-[#F1F5F9]/10 rounded-xl flex flex-col items-center justify-center gap-4 group transition-all cursor-pointer"
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
                                                    className="w-full border-b border-[#F1F5F9]/10 px-6 py-4 focus:outline-none focus:border-[#14B8A6] transition-all text-sm"
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsAddingStore(false)}
                                                    className="flex-1 py-4 text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40 hover:text-[#F1F5F9] transition-colors
                                                    border rounded-full
                                                    "
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    disabled={loading}
                                                    type="submit"
                                                    className="flex-3 bg-[#14B8A6] text-[#0B1120] py-4 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#F1F5F9] transition-all shadow-lg disabled:opacity-50"
                                                >
                                                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Continue'}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ) : step === 'SELECT_PLATFORM' ? (
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
                                    onClick={() => setStep('TELEGRAM_SETUP')}
                                    className="aspect-square bg-[#1E293B]/50 border-2 border-[#14B8A6]/40 rounded-lg flex flex-col items-center justify-center gap-4 group hover:bg-[#14B8A6]/5 transition-all cursor-pointer"
                                >
                                    <div className="p-4 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6]">
                                        <SiTelegram size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Telegram</span>
                                </motion.button>

                                {/* WhatsApp - Coming Soon */}
                                <div className="aspect-square bg-[#1E293B]/20 border-2 border-transparent rounded-lg flex flex-col items-center justify-center gap-4 relative overflow-hidden group grayscale opacity-50">
                                    <div className="p-4 rounded-2xl bg-[#F1F5F9]/5 text-[#F1F5F9]/20">
                                        <SiWhatsapp size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/20">WhatsApp</span>
                                    <div className="absolute top-3 right-3 bg-[#1E293B] px-2 py-1 rounded-md">
                                        <span className="text-[8px] uppercase tracking-tighter font-bold text-[#F1F5F9]/40">Soon</span>
                                    </div>
                                </div>

                                {/* Instagram - Coming Soon */}
                                <div className="aspect-square bg-[#1E293B]/20 border-2 border-transparent rounded-lg flex flex-col items-center justify-center gap-4 relative overflow-hidden group grayscale opacity-50">
                                    <div className="p-4 rounded-2xl bg-[#F1F5F9]/5 text-[#F1F5F9]/20">
                                        <SiInstagram size={32} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/20">Instagram</span>
                                    <div className="absolute top-3 right-3 bg-[#1E293B] px-2 py-1 rounded-md">
                                        <span className="text-[8px] uppercase tracking-tighter font-bold text-[#F1F5F9]/40">Soon</span>
                                    </div>
                                </div>

                                {/* TikTok - Coming Soon */}
                                <div className="aspect-square bg-[#1E293B]/20 border-2 border-transparent rounded-lg flex flex-col items-center justify-center gap-4 relative overflow-hidden group grayscale opacity-50">
                                    <div className="p-4 rounded-2xl bg-[#F1F5F9]/5 text-[#F1F5F9]/20">
                                        <SiTiktok size={32} />
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
                                Back
                            </button>
                        </motion.div>
                    ) : step === 'TELEGRAM_SETUP' ? (
                        <motion.div
                            key="telegram-setup"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-lg mx-auto py-10"
                        >
                            {/* Icon */}
                            <div className="mb-8 flex justify-center">
                                <div className="p-3 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] border-2 border-[#14B8A6]/20 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
                                    <SiTelegram size={32} />
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-center">
                                Connect your <span className="text-[#14B8A6]">Telegram Channel.</span>
                            </h1>
                            <p className="text-[#F1F5F9]/40 mb-10 text-sm text-center">
                                Follow the steps below to link your channel to Konversa.
                            </p>

                            {/* Step-by-step instructions */}
                            <ol className="space-y-4 mb-10 text-left">
                                <li className="flex gap-4 items-start">
                                    <span className="w-7 h-7 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <p className="text-sm text-[#F1F5F9]/70 leading-relaxed">
                                        Open Telegram and go to your channel.
                                    </p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="w-7 h-7 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <p className="text-sm text-[#F1F5F9]/70 leading-relaxed">
                                        Add <span className="text-[#14B8A6] font-semibold">@konversa_test_bot</span> as an <span className="text-[#F1F5F9] font-semibold">Administrator</span> of your channel.
                                    </p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="w-7 h-7 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <p className="text-sm text-[#F1F5F9]/70 leading-relaxed">
                                        Grant it <span className="text-[#F1F5F9] font-semibold">admin privileges</span> (post messages and send images).
                                    </p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="w-7 h-7 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <p className="text-sm text-[#F1F5F9]/70 leading-relaxed">
                                        Make your channel type public <span className="text-[#F1F5F9] font-semibold">then copy the link</span>.
                                    </p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="w-7 h-7 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                                    <p className="text-sm text-[#F1F5F9]/70 leading-relaxed">
                                        Enter your channel username below. For example, if your channel link is{' '}
                                        <span className="text-[#14B8A6] font-mono">t.me/my_shop</span>, enter{' '}
                                        <span className="text-[#14B8A6] font-mono">my_shop</span>.
                                    </p>
                                </li>
                            </ol>

                            {/* Channel Username Input */}
                            <form onSubmit={handleConnectTelegram} className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40 ml-2">
                                        Channel Username
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14B8A6] font-bold text-sm select-none">@</span>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={channelUsername}
                                            onChange={(e) => setChannelUsername(e.target.value)}
                                            placeholder="my_shop_channel"
                                            className="w-full border-b border-[#F1F5F9]/10 pl-8 pr-6 py-4 bg-transparent outline-none focus:border-[#14B8A6] transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <p className="text-[10px] text-[#F1F5F9]/30 ml-2 tracking-wide">
                                        You can also paste the full link: t.me/my_shop_channel
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep('SELECT_PLATFORM')}
                                        className="flex-1 py-4 text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40 hover:text-[#F1F5F9] transition-colors border border-[#F1F5F9]/10 rounded-full"
                                    >
                                        Back
                                    </button>
                                    <button
                                        disabled={loading || !channelUsername.trim()}
                                        type="submit"
                                        className="flex-[2] bg-[#14B8A6] text-[#0B1120] py-4 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#F1F5F9] transition-all shadow-[0_0_20px_rgba(20,184,166,0.2)] disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={16} /> : 'Connect Channel'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}
