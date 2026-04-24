"use client";
import React from 'react';
import {
    Loader2,
    Users,
    MessageSquare,
    Package,
    Banknote,
    ChevronDown,
    ShoppingCart,
    Map,
} from 'lucide-react';
import Layout from '../components/Dashboard/layout';
import Dashboard_Header from '../components/Dashboard/Dashboard_Header';
import { refreshToken } from '@/services/authService';
import { useQuery } from '@tanstack/react-query';
import { getStores } from '@/services/storeService';
import { useMemo } from 'react';



export default function DashboardPage() {
    const { data: rawStoresData, isLoading } = useQuery({
        queryKey: ['stores'],
        queryFn: getStores,
    });

    const stores = useMemo(() => {
        if (!rawStoresData) return [];
        return Array.isArray(rawStoresData) ? rawStoresData
            : Array.isArray(rawStoresData?.results) ? rawStoresData.results
            : Array.isArray(rawStoresData?.data) ? rawStoresData.data
            : Array.isArray(rawStoresData?.stores) ? rawStoresData.stores
            : [];
    }, [rawStoresData]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F0FAFA] flex items-center justify-center w-full">
                <Loader2 className="animate-spin text-[#14B8A6]" size={40} />
            </div>
        );
    }

    return (
        < >

            <Layout>
                <main className="flex-1 p-3 md:p-5 lg:p-10  z-10 overflow-y-scroll">
                    <Dashboard_Header />

                    {/* Analytic Overview Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-[#1E293B] flex items-center gap-2">
                            Analytic Overview
                           
                        </h2>
                        {/* <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">This Year</span>
                            <ChevronDown size={12} className="text-[#94A3B8]" />
                        </div> */}
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2  lg:grid-cols-4 gap-3 lg:gap-6 mb-10">
                        {/* Total Revenue */}
                        <div className="bg-[#FF6B93] border border-[#FF4D7E] rounded-lg p-3 md:p-4 lg:p-6 flex flex-col justify-between min-h-[140px] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Total Revenue</h3>
                                <p className="text-3xl font-bold tracking-tight">₦ 0.00</p>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-4">
                                <p className="text-[10px] font-medium opacity-80 uppercase tracking-wide">All time <br /> total</p>
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity hidden lg:block">
                                <span className="text-5xl font-bold opacity-80 group-hover:opacity-40 transition-opacity select-none">₦</span>
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity lg:hidden">
                                <span className="text-3xl font-bold opacity-80 group-hover:opacity-40 transition-opacity select-none">₦</span>
                            </div>
                        </div>

                        {/* Total Stores */}
                        <div className="bg-[#B186FF] border border-[#9457FF] rounded-lg p-3 md:p-4 lg:p-6 flex flex-col justify-between min-h-[140px] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Total Stores</h3>
                                <p className="text-3xl font-bold tracking-tight">{stores.length}</p>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-4">
                                <p className="text-[10px] font-medium opacity-80 uppercase tracking-wide ">Connected <br /> channels</p>
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity hidden lg:block">
                                <Users size={48} />
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity lg:hidden">
                                <Users size={30} />
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="bg-[#65D4B0] border border-[#4ABFA0] rounded-lg p-3 md:p-4 lg:p-6 flex flex-col justify-between min-h-[140px] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Total Orders</h3>
                                <p className="text-3xl font-bold tracking-tight">0</p>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-4">
                                <p className="text-[10px] font-medium opacity-80 uppercase tracking-wide">Last 30 <br /> days</p>
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity hidden lg:block ">
                                <ShoppingCart size={48} />
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity lg:hidden">
                                <ShoppingCart size={30} />
                            </div>
                        </div>

                        {/* Total Products */}
                        <div className="bg-[#FFD460] border border-[#F2C446] rounded-lg p-3 md:p-4 lg:p-6 flex flex-col justify-between min-h-[140px] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Total Products</h3>
                                <p className="text-3xl font-bold tracking-tight">0</p>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-4">
                                <p className="text-[10px] font-medium opacity-80 uppercase tracking-wide">Active <br /> listings</p>
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity hidden lg:block">
                                <Package size={48} />
                            </div>
                            <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-40 transition-opacity lg:hidden">
                                <Package size={30} />
                            </div>
                        </div>
                    </div>

                    {/* Messages Panel */}
                    <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 min-h-[380px] flex items-center justify-center flex-col text-center ">
                        <div
                            className="p-4 rounded-full mb-4"
                            style={{ background: '#F0FAFA' }}
                        >
                            <MessageSquare size={32} color="#14B8A6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#1E293B]">No messages yet</h3>
                        <p className="text-sm text-[#94A3B8] max-w-md">
                            Your bot is active. When customers contact your storefront, their messages will appear right here.
                        </p>
                    </div>
                </main>
            </Layout>
        </>
    );
}
