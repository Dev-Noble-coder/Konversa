"use client";

import React, { useState } from 'react';
import Layout from '@/app/components/Dashboard/layout';
import Dashboard_Header from '@/app/components/Dashboard/Dashboard_Header';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteStore, disconnectTelegram } from '@/services/storeService';

interface Store {
    sqid: string;
    name: string;
    telegram_username?: string;
    telegram_channels?: { channel_username: string }[];
}
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Settings, 
    User, 
    Shield, 
    Bell, 
    Globe, 
    Trash2, 
    Link2, 
    Smartphone, 
    AlertTriangle,
    CheckCircle2,
    Loader2,
    LogOut,
    ChevronRight,
    ExternalLink,
    Store
} from 'lucide-react';
import { SiTelegram, SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { toast } from 'sonner';

type SettingsTab = 'store' | 'profile';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('store');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const queryClient = useQueryClient();

    // Get selected store from cache
    const { data: selectedStore } = useQuery<Store | null>({
        queryKey: ['selectedStore'],
        enabled: false,
           queryFn: () => Promise.resolve(null), 
    });

    const handleDeleteStore = async () => {
        if (!selectedStore) return;
        if (!confirm(`Are you sure you want to delete "${selectedStore.name}"? This action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            await deleteStore(selectedStore.sqid);
            toast.success("Store deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            // The sidebar will handle re-selection once stores are refetched
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to delete store");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDisconnectBot = async () => {
        if (!selectedStore) return;
        if (!confirm(`Disconnect Konversa Bot from "${selectedStore.name}"?`)) return;

        setIsDisconnecting(true);
        try {
            await disconnectTelegram(selectedStore.sqid);
            toast.success("Bot disconnected successfully");
            queryClient.invalidateQueries({ queryKey: ['stores'] });
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to disconnect bot");
        } finally {
            setIsDisconnecting(false);
        }
    };

    const tabs = [
        { id: 'store', label: 'Store Settings', icon: Store },
        { id: 'profile', label: 'Profile Settings', icon: User },
    ];

    return (
        <Layout>
            <div className="flex-1 p-3 md:p-5 lg:p-10  z-10 overflow-y-scroll  bg-slate-50/30">
                <Dashboard_Header />
                
                <main className="flex-1 mx-auto overflow-y-auto  space-y-8">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
                        <p className="text-slate-500 text-sm">Manage your store preferences and account settings.</p>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex gap-2 p-1 bg-slate-200/50 rounded-full w-fit">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full  text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer ${
                                        isActive 
                                        ? 'bg-white text-[#14B8A6] border' 
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'store' ? (
                            <motion.div
                                key="store-settings"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            >
                                {/* Left Column: Store Details & Socials */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* General Section */}
                                    <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
                                        <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <Settings size={20} />
                                            </div>
                                            <h2 className="font-bold text-slate-900">General Information</h2>
                                        </div>

                                        <div className="space-y-4 max-w-md">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Store Name</label>
                                                <input 
                                                    type="text" 
                                                    value={selectedStore?.name || ''} 
                                                    readOnly
                                                    className="w-full px-6 py-3 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none text-sm font-medium text-slate-500"
                                                />
                                                <p className="text-[10px] text-slate-400 ml-1 italic">Store name is currently managed during creation.</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Socials Section */}
                                    <section className="bg-white rounded-lg border border-slate-200 p-6  space-y-6">
                                        <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                            <div className="p-2 bg-[#14B8A6]/10 rounded-lg text-[#14B8A6]">
                                                <Globe size={20} />
                                            </div>
                                            <h2 className="font-bold text-slate-900">Connected Socials</h2>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Telegram (Active) */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-100 gap-5 sm:gap-0">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-lg text-[#14B8A6] border border-slate-200">
                                                        <SiTelegram size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-slate-900">Telegram Channel</h3>
                                                            <span className="px-2 py-0.5 bg-[#14B8A6]/10 text-[#14B8A6] text-[10px] font-bold rounded-full flex items-center gap-1">
                                                                <CheckCircle2 size={10} /> Connected
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            @{selectedStore?.telegram_username || selectedStore?.telegram_channels?.[0]?.channel_username || 'connected_channel'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button 
                                                    disabled={isDisconnecting}
                                                    onClick={handleDisconnectBot}
                                                    className="px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-full transition-all flex items-center gap-2 border border-red-100"
                                                >
                                                    {isDisconnecting ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
                                                    Disconnect Bot
                                                </button>
                                            </div>

                                            {/* Others (Coming Soon) */}
                                            <div className="space-y-3">
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Coming Soon</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {[
                                                        { name: 'WhatsApp', icon: SiWhatsapp, color: 'text-green-500' },
                                                        { name: 'Instagram', icon: SiInstagram, color: 'text-pink-500' },
                                                        { name: 'TikTok', icon: SiTiktok, color: 'text-slate-900' },
                                                    ].map((social) => (
                                                        <div key={social.name} className="flex items-center gap-3 p-3 bg-slate-50/30 border border-slate-100 rounded-lg grayscale opacity-60">
                                                            <div className={`p-2 bg-white rounded-lg  border shadow border-slate-200 ${social.color}`}>
                                                                <social.icon size={18} />
                                                            </div>
                                                            <span className="text-sm font-bold text-slate-400">{social.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Danger Zone & Info */}
                                <div className="space-y-6">
                                    {/* Danger Zone */}
                                    <section className="bg-white rounded-lg border border-red-200 p-4 sm:p-6 space-y-6">
                                        <div className="flex items-center gap-3 text-red-500">
                                            <AlertTriangle size={20} />
                                            <h2 className="font-bold">Danger Zone</h2>
                                        </div>
                                        <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                                            <h3 className="text-sm font-bold text-red-900">Delete Store</h3>
                                            <p className="text-xs text-red-700/70 mt-1 leading-relaxed">
                                                Deleting this store will permanently remove all products, orders, and configuration. This action is irreversible.
                                            </p>
                                            <button 
                                                disabled={isDeleting}
                                                onClick={handleDeleteStore}
                                                className="w-full mt-4 bg-red-500 text-white py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg shadow-red-500/10 disabled:opacity-50 cursor-pointer"
                                            >
                                                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                Delete Store Permanently
                                            </button>
                                        </div>
                                    </section>

                                    {/* Quick Info */}
                                    <section className="bg-[#14B8A6] rounded-lg p-6 text-white shadow-lg shadow-[#14B8A6]/20 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                            <Globe size={80} />
                                        </div>
                                        <h3 className="font-bold text-lg relative z-10">Need help?</h3>
                                        <p className="text-white/80 text-xs mt-2 relative z-10 leading-relaxed">
                                            If you're having trouble connecting your channels, check our documentation or contact support.
                                        </p>
                                        <button className="mt-6 flex items-center gap-2 text-xs font-bold bg-white text-[#14B8A6] px-4 py-2 rounded-full hover:shadow-xl transition-all relative z-10">
                                            View Guides <ExternalLink size={12} />
                                        </button>
                                    </section>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="profile-settings"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-lg border border-slate-200 p-12 text-center "
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                                    <User size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Profile Settings</h3>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">
                                    Manage your personal information, security preferences, and notification settings here. Coming soon.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </Layout>
    );
}
