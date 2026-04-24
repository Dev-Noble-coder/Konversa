"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Store, ArrowRight, Loader2, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { SiTelegram, SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { toast } from 'sonner';
import { createStore, connectTelegram } from '@/services/storeService';
import { useQueryClient } from '@tanstack/react-query';

type OnboardingStep = 'CREATE_STORE' | 'SELECT_PLATFORM' | 'TELEGRAM_SETUP';

interface AddStoreOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddStoreOverlay = ({ isOpen, onClose }: AddStoreOverlayProps) => {
    const [step, setStep] = useState<OnboardingStep>('CREATE_STORE');
    const [storeName, setStoreName] = useState('');
    const [loading, setLoading] = useState(false);
    const [storeSqid, setStoreSqid] = useState<string>('');
    const [channelUsername, setChannelUsername] = useState('');
    const queryClient = useQueryClient();

    const resetAndClose = () => {
        setStep('CREATE_STORE');
        setStoreName('');
        setStoreSqid('');
        setChannelUsername('');
        onClose();
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
            setStoreSqid(newStore.sqid || newStore.data?.sqid || '');
            toast.success('Store created successfully!');
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
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            resetAndClose();
        } catch (error: any) {
            const msg = error.response?.data?.detail || error.response?.data?.message || 'Failed to connect channel';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={resetAndClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Add New Store</h2>
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3].map((i) => (
                                <div 
                                    key={i} 
                                    className={`h-1 rounded-full transition-all ${
                                        (i === 1 && step === 'CREATE_STORE') || 
                                        (i === 2 && step === 'SELECT_PLATFORM') || 
                                        (i === 3 && step === 'TELEGRAM_SETUP')
                                        ? 'w-6 bg-[#14B8A6]' 
                                        : 'w-2 bg-slate-200'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={resetAndClose}
                        className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <AnimatePresence mode="wait">
                        {step === 'CREATE_STORE' ? (
                            <motion.div
                                key="create-store"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center space-y-3">
                                    <div className="w-16 h-16 bg-[#14B8A6]/10 rounded-full flex items-center justify-center text-[#14B8A6] mx-auto">
                                        <Store size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Name your store</h3>
                                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                        Give your store a unique name to help your customers identify you.
                                    </p>
                                </div>

                                <form onSubmit={handleCreateStore} className="space-y-6 max-w-md mx-auto">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Store Name</label>
                                        <input 
                                            autoFocus
                                            type="text"
                                            value={storeName}
                                            onChange={(e) => setStoreName(e.target.value)}
                                            placeholder="e.g. Blossom Collections"
                                            className="w-full px-6 py-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all text-sm font-medium"
                                        />
                                    </div>
                                    <button 
                                        disabled={loading || !storeName.trim()}
                                        type="submit"
                                        className="w-full bg-[#14B8A6] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#0F766E] transition-all shadow-lg shadow-[#14B8A6]/20 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                            <>Continue <ChevronRight size={18} /></>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : step === 'SELECT_PLATFORM' ? (
                            <motion.div
                                key="select-platform"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="text-center space-y-3">
                                    <h3 className="text-2xl font-bold text-slate-900">Choose a platform</h3>
                                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                        Where would you like to list your products?
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                    <button
                                        onClick={() => setStep('TELEGRAM_SETUP')}
                                        className="p-6 bg-white border-2 border-[#14B8A6] rounded-lg flex flex-col items-center gap-3 hover:bg-[#14B8A6]/5 transition-all group"
                                    >
                                        <div className="p-3 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6]">
                                            <SiTelegram size={24} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">Telegram</span>
                                    </button>

                                    {/* Coming Soon Options */}
                                    {['WhatsApp', 'Instagram', 'TikTok'].map((platform) => (
                                        <div key={platform} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-lg flex flex-col items-center gap-3 opacity-50 relative overflow-hidden group">
                                            <div className="p-3 rounded-lg bg-slate-200 text-slate-400">
                                                {platform === 'WhatsApp' ? <SiWhatsapp size={24} /> : platform === 'Instagram' ? <SiInstagram size={24} /> : <SiTiktok size={24} />}
                                            </div>
                                            <span className="text-sm font-bold text-slate-400">{platform}</span>
                                            <div className="absolute top-2 right-2 bg-slate-200 px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-500">SOON</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : step === 'TELEGRAM_SETUP' ? (
                            <motion.div
                                key="telegram-setup"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="p-3 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6]">
                                        <SiTelegram size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Connect Channel</h4>
                                        <p className="text-xs text-slate-500">Linking to <span className="text-[#14B8A6] font-bold">{storeName}</span></p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { step: 1, text: "Open Telegram and go to your channel." },
                                        { step: 2, text: <>Add <span className="text-[#14B8A6] font-bold">@konversa_test_bot</span> as an Admin.</> },
                                        { step: 3, text: "Grant it post messages and send images permissions." },
                                        { step: 4, text: "Enter your public channel username below." }
                                    ].map((s) => (
                                        <div key={s.step} className="flex gap-4 items-start">
                                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{s.step}</span>
                                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{s.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleConnectTelegram} className="space-y-6 pt-4 border-t border-slate-100">
                                    <div className="">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 ">Channel Username</label>
                                        <div className="relative mt-1">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#14B8A6] font-bold text-sm">@</span>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={channelUsername}
                                                onChange={(e) => setChannelUsername(e.target.value)}
                                                placeholder="e.g. my_boutique_shop"
                                                className="w-full pl-10 pr-6 py-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            type="button"
                                            onClick={() => setStep('SELECT_PLATFORM')}
                                            className=" flex-1 px-6 py-3 rounded-full font-bold text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all border border-slate-200"
                                        >
                                            Back
                                        </button>
                                        <button 
                                            disabled={loading || !channelUsername.trim()}
                                            type="submit"
                                            className="flex-2 bg-slate-900 text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                                <>Complete Setup <CheckCircle2 size={18} /></>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default AddStoreOverlay;
