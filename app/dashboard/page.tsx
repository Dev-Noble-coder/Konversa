"use client";
import React, { useState, useEffect } from 'react';
import { getStores } from '@/services/storeService';
import { useRouter } from 'next/navigation';
import { Loader2, LayoutDashboard, Settings, Users, MessageSquare, LogOut } from 'lucide-react';
import { Store } from 'lucide-react';
import { logout } from '@/services/authService';


export default function DashboardPage() {
    const [stores, setStores] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

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
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#14B8A6]" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-[#F1F5F9] flex relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#14B8A6]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-64 border-r border-[#F1F5F9]/10 p-6 flex flex-col z-10">
                <div className="mb-12">
                    <h1 className="text-xl font-bold tracking-widest text-[#F1F5F9]">
                        KON<span className="text-[#14B8A6]">VERSA</span>.
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] font-bold text-xs uppercase tracking-widest transition-all">
                        <LayoutDashboard size={18} /> Overview
                    </a>
                    <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#F1F5F9]/40 hover:text-[#F1F5F9] hover:bg-[#F1F5F9]/5 font-bold text-xs uppercase tracking-widest transition-all">
                        <Store size={18} /> My Stores
                    </a>
                    <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#F1F5F9]/40 hover:text-[#F1F5F9] hover:bg-[#F1F5F9]/5 font-bold text-xs uppercase tracking-widest transition-all">
                        <MessageSquare size={18} /> Conversations
                    </a>
                    <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#F1F5F9]/40 hover:text-[#F1F5F9] hover:bg-[#F1F5F9]/5 font-bold text-xs uppercase tracking-widest transition-all">
                        <Users size={18} /> Customers
                    </a>
                </nav>

                <div className="mt-auto pt-6 border-t border-[#F1F5F9]/10 space-y-2">
                    <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#F1F5F9]/40 hover:text-[#F1F5F9] hover:bg-[#F1F5F9]/5 font-bold text-xs uppercase tracking-widest transition-all">
                        <Settings size={18} /> Settings
                    </a>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 z-10">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight">Overview</h2>
                        <p className="text-xs text-[#F1F5F9]/40 tracking-widest uppercase mt-1">Here is what is happening today.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Stat Cards */}
                    <div className="bg-[#1E293B]/50 border border-[#F1F5F9]/10 rounded-2xl p-6">
                        <h3 className="text-[10px] text-[#F1F5F9]/40 font-bold uppercase tracking-widest mb-4">Total Revenue</h3>
                        <p className="text-3xl font-extrabold"><span className="text-[#14B8A6]">$</span>0.00</p>
                    </div>
                    <div className="bg-[#1E293B]/50 border border-[#F1F5F9]/10 rounded-2xl p-6">
                        <h3 className="text-[10px] text-[#F1F5F9]/40 font-bold uppercase tracking-widest mb-4">Active Customers</h3>
                        <p className="text-3xl font-extrabold">0</p>
                    </div>
                    <div className="bg-[#1E293B]/50 border border-[#F1F5F9]/10 rounded-2xl p-6">
                        <h3 className="text-[10px] text-[#F1F5F9]/40 font-bold uppercase tracking-widest mb-4">Active Stores</h3>
                        <p className="text-3xl font-extrabold">{stores.length}</p>
                    </div>
                </div>

                {/* Main panel area */}
                <div className="bg-[#1E293B]/30 border border-[#F1F5F9]/10 rounded-3xl p-8 min-h-[400px] flex items-center justify-center flex-col text-center">
                    <div className="p-4 rounded-full bg-[#14B8A6]/10 text-[#14B8A6] mb-4">
                        <MessageSquare size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No messages yet</h3>
                    <p className="text-sm text-[#F1F5F9]/40 max-w-md">Your bot is active. When customers contact your storefront, their messages will appear right here.</p>
                </div>
            </main>
        </div>
    );
}
