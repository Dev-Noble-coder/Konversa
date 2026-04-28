"use client";

import React, { useState } from 'react';
import Layout from '@/app/components/Dashboard/layout';
import Dashboard_Header from '@/app/components/Dashboard/Dashboard_Header';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteStore, disconnectTelegram, connectTelegram } from '@/services/storeService';

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
    Store as StoreIcon,
    X,
    AlertCircle
} from 'lucide-react';
import { SiTelegram, SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { toast } from 'sonner';

type SettingsTab = 'store' | 'profile';

const Modal = ({ isOpen, onClose, title, children }: any) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" 
                />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-lg border border-slate-200 w-full max-w-md overflow-hidden"
                >
                    <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">{title}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('store');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    
    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDisconnectModal, setShowDisconnectModal] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [channelUsername, setChannelUsername] = useState("");

    const queryClient = useQueryClient();

    // Get selected store from cache
    const { data: selectedStore } = useQuery<Store | null>({
        queryKey: ['selectedStore'],
        enabled: false,
           queryFn: () => Promise.resolve(null), 
    });

    const handleDeleteStore = async () => {
        if (!selectedStore) return;
        setIsDeleting(true);
        try {
            await deleteStore(selectedStore.sqid);
            toast.success("Store deleted successfully");
            queryClient.setQueryData(['selectedStore'], null); 
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            setShowDeleteModal(false);
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to delete store");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDisconnectBot = async () => {
        if (!selectedStore) return;
        setIsDisconnecting(true);
        try {
            await disconnectTelegram(selectedStore.sqid);
            toast.success("Bot disconnected successfully");
            
            // Manually update selectedStore in cache for immediate UI update
            if (selectedStore) {
                const updatedStore = { ...selectedStore, telegram_channels: [] };
                queryClient.setQueryData(['selectedStore'], updatedStore);
            }

            queryClient.invalidateQueries({ queryKey: ['stores'] });
            setShowDisconnectModal(false);
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to disconnect bot");
        } finally {
            setIsDisconnecting(false);
        }
    };

    const handleConnectBot = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStore || !channelUsername) return;
        setIsConnecting(true);
        try {
            const cleanUsername = channelUsername.startsWith('@') ? channelUsername.slice(1) : channelUsername;
            await connectTelegram(selectedStore.sqid, cleanUsername);
            toast.success("Bot connected successfully");
            
            // Manually update selectedStore in cache for immediate UI update
            if (selectedStore) {
                const updatedStore = { 
                    ...selectedStore, 
                    telegram_channels: [{ channel_username: cleanUsername }] 
                };
                queryClient.setQueryData(['selectedStore'], updatedStore);
            }

            queryClient.invalidateQueries({ queryKey: ['stores'] });
            setShowConnectModal(false);
            setChannelUsername("");
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to connect bot");
        } finally {
            setIsConnecting(false);
        }
    };


    const tabs = [
        { id: 'store', label: 'Store Settings', icon: StoreIcon },
        { id: 'profile', label: 'Profile Settings', icon: User },
    ];

    const isBotConnected = selectedStore?.telegram_channels && selectedStore.telegram_channels.length > 0;

    return (
        <Layout>
            <div className="flex-1 p-3 md:p-5 lg:p-10 overflow-y-scroll  bg-slate-50/30">
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
                                            {/* Telegram */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-100 gap-5 sm:gap-0">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-lg text-[#14B8A6] border border-slate-200">
                                                        <SiTelegram size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-slate-900">Telegram Bot</h3>
                                                            {isBotConnected ? (
                                                                <span className="px-2 py-0.5 bg-[#14B8A6]/10 text-[#14B8A6] text-[10px] font-bold rounded-full flex items-center gap-1">
                                                                    <CheckCircle2 size={10} /> Connected
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-full">
                                                                    Not Connected
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {isBotConnected 
                                                                ? `${selectedStore?.telegram_username || selectedStore?.telegram_channels?.[0]?.channel_username}`
                                                                : "Enable automated selling on Telegram"}
                                                        </p>
                                                    </div>
                                                </div>
                                                {isBotConnected ? (
                                                    <button 
                                                        onClick={() => setShowDisconnectModal(true)}
                                                        className="px-6 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-full transition-all flex items-center gap-2 border border-red-100 cursor-pointer"
                                                    >
                                                        <LogOut size={14} />
                                                        Disconnect Bot
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => setShowConnectModal(true)}
                                                        className="px-6 py-2 text-xs font-bold text-[#14B8A6] hover:bg-[#14B8A6]/5 rounded-full transition-all flex items-center gap-2 border border-[#14B8A6] cursor-pointer"
                                                    >
                                                        <SiTelegram size={14} />
                                                        Connect Telegram
                                                    </button>
                                                )}
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
                                                            <div className={`p-2 bg-white rounded-lg border border-slate-200 ${social.color}`}>
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
                                                onClick={() => setShowDeleteModal(true)}
                                                className="w-full mt-4 bg-red-500 text-white py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-600 transition-all border border-red-600 cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                                Delete Store Permanently
                                            </button>
                                        </div>
                                    </section>

                                    {/* Quick Info */}
                                    <section className="bg-[#14B8A6] rounded-lg p-6 text-white border border-[#14B8A6] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                            <Globe size={80} />
                                        </div>
                                        <h3 className="font-bold text-lg relative z-10">Need help?</h3>
                                        <p className="text-white/80 text-xs mt-2 relative z-10 leading-relaxed">
                                            If you're having trouble connecting your channels, check our documentation or contact support.
                                        </p>
                                        <button className="mt-6 flex items-center gap-2 text-xs font-bold bg-white text-[#14B8A6] px-4 py-2 rounded-full border border-white hover:bg-white/90 transition-all relative z-10">
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

                    {/* Modals */}
                    <Modal 
                        isOpen={showConnectModal} 
                        onClose={() => setShowConnectModal(false)} 
                        title="Connect Telegram Bot"
                    >
                        <form onSubmit={handleConnectBot} className="space-y-6">
                            <div className="p-4 bg-[#14B8A6]/5 rounded-xl border border-[#14B8A6]/10 flex items-start gap-3">
                                <AlertCircle className="text-[#14B8A6] mt-0.5" size={18} />
                                <p className="text-xs text-[#14B8A6]/80 leading-relaxed">
                                    To connect, ensure you have added your bot to your Telegram channel as an administrator.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Channel Username</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                    <input 
                                        type="text" 
                                        placeholder="your_channel_name"
                                        value={channelUsername}
                                        onChange={(e) => setChannelUsername(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#14B8A6] text-sm font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit"
                                disabled={isConnecting}
                                className="w-full py-3 bg-[#14B8A6] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0F766E] transition-all disabled:opacity-50 border border-[#14B8A6] cursor-pointer"
                            >
                                {isConnecting ? <Loader2 size={18} className="animate-spin" /> : "Connect Channel"}
                            </button>
                        </form>
                    </Modal>

                    <Modal 
                        isOpen={showDisconnectModal} 
                        onClose={() => setShowDisconnectModal(false)} 
                        title="Disconnect Bot"
                    >
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto border border-red-100">
                                <LogOut size={32} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Are you sure you want to disconnect the bot from <span className="font-bold text-slate-900">{selectedStore?.name}</span>?
                                </p>
                                <p className="text-xs text-slate-400 mt-2 italic">
                                    Users won't be able to shop via Telegram until you reconnect.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleDisconnectBot}
                                    disabled={isDisconnecting}
                                    className="w-full py-3 bg-red-500 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-all border border-red-600 cursor-pointer"
                                >
                                    {isDisconnecting ? <Loader2 size={18} className="animate-spin" /> : "Disconnect Anyway"}
                                </button>
                                <button 
                                    onClick={() => setShowDisconnectModal(false)}
                                    className="w-full py-3 bg-slate-100 text-slate-600 rounded-full font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal 
                        isOpen={showDeleteModal} 
                        onClose={() => setShowDeleteModal(false)} 
                        title="Delete Store Permanently"
                    >
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto border border-red-100">
                                <Trash2 size={32} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    This will permanently delete <span className="font-bold text-slate-900">{selectedStore?.name}</span> and all associated data.
                                </p>
                                <p className="text-xs font-bold text-red-500 mt-2 uppercase tracking-widest">
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleDeleteStore}
                                    disabled={isDeleting}
                                    className="w-full py-3 bg-red-500 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-all border border-red-600 cursor-pointer"
                                >
                                    {isDeleting ? <Loader2 size={18} className="animate-spin" /> : "Yes, Delete Store"}
                                </button>
                                <button 
                                    onClick={() => setShowDeleteModal(false)}
                                    className="w-full py-3 bg-slate-100 text-slate-600 rounded-full font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                </main>
            </div>
        </Layout>
    );
}
