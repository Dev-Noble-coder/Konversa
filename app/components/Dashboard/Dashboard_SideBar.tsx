"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { logout } from '@/services/authService';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStores } from '@/services/storeService';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader2,
    LayoutDashboard,
    Settings,
    Users,
    MessageSquare,
    LogOut,
    Package,
    Map,
    DollarSign,
    Truck,
    Navigation,
    ChevronDown,
    ShoppingCart,
    Check,
    Menu,
    X,
    ChevronRight,
    CreditCard,
    Plus,
} from 'lucide-react';



import AddStoreOverlay from './AddStoreOverlay';

interface TelegramChannel {
    sqid: string;
    channel_username: string;
}

interface Store {
    sqid: string;
    name: string;
    telegram_channels?: TelegramChannel[];
}



const Dashboard_SideBar = () => {

    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);


    const { data: rawStoresData } = useQuery<any>({
        queryKey: ['stores'],
        queryFn: getStores,
    });

    const stores = useMemo<Store[]>(() => {
        if (!rawStoresData) return [];
        const data = Array.isArray(rawStoresData) ? rawStoresData
            : Array.isArray(rawStoresData?.results) ? rawStoresData.results
            : Array.isArray(rawStoresData?.data) ? rawStoresData.data
            : Array.isArray(rawStoresData?.stores) ? rawStoresData.stores
            : [];
        return data;
    }, [rawStoresData]);

    // 2. Selection State (Stored in TanStack Cache instead of Context/State)
    const { data: selectedStore } = useQuery<Store | null>({
        queryKey: ['selectedStore'],
        queryFn: () => Promise.resolve(null), 
        initialData: null,
        enabled: false, 
        staleTime: Infinity,
    });

    const setSelectedStore = (store: Store) => {
        queryClient.setQueryData(['selectedStore'], store);
    };

    // Preselect first store or handle deletion
    useEffect(() => {
        if (stores.length > 0) {
            const currentStoreInList = selectedStore && stores.find(s => s.sqid === selectedStore.sqid);
            
            if (!selectedStore || !currentStoreInList) {
                // If no selection or selected store deleted, select first
                setSelectedStore(stores[0]);
            } else {
                // Sync selectedStore with latest data from the stores list if properties changed
                if (JSON.stringify(currentStoreInList) !== JSON.stringify(selectedStore)) {
                    setSelectedStore(currentStoreInList);
                }
            }
        } else if (selectedStore) {
            // No stores left
            queryClient.setQueryData(['selectedStore'], null);
        }
    }, [stores, selectedStore]);

    // Close mobile sidebar on navigation
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const NairaIcon = ({ size = 18, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
        <div 
            style={{ width: size, height: size }} 
            className={`flex items-center justify-center font-bold leading-none ${className}`}
        >
            <span style={{ fontSize: size }}>₦</span>
        </div>
    );

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Products', icon: Package, path: '/dashboard/products' },
        { label: 'Orders', icon: ShoppingCart, badge: 12, path: '/dashboard/orders' },
        { label: 'Revenue', icon: NairaIcon, path: '/dashboard/revenue' },
        { label: 'Customers', icon: Users, path: '/dashboard/customers' },
        { label: 'Subscriptions', icon: CreditCard, path: '/dashboard/subscriptions' },
    ];

    const bottomNav = [
        { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ];


    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const SidebarContent = ({ isMobile = false }) => (
        <aside
            className={`w-64 h-full flex flex-col z-10 relative bg-[#14B8A6] ${!isMobile ? 'rounded-r-4xl' : ''}`}
        >
            {/* Decorative subtle circle bottom-right */}
            <div
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.08)', transform: 'translate(30%, 30%)' }}
            />
            <div
                className="absolute bottom-12 right-4 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.06)' }}
            />

            {/* Logo */}
            <div className="px-6 pt-8 pb-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#020617]/80 tracking-tight">
                    Konversa<span className="text-[#E2E8F0]">.</span>
                </span>
                {isMobile && (
                    <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-white/70 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Store Selector */}
            <div className="px-4 mb-6 relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex flex-col items-start gap-0.5 px-4 py-2.5 rounded-lg text-white text-xs font-semibold tracking-wide hover:bg-white/20 transition-all cursor-pointer group"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                    <div className="w-full flex items-center justify-between">
                        <span className="truncate max-w-[140px] uppercase tracking-widest">
                            {selectedStore ? selectedStore.name : 'Select Store'}
                        </span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {selectedStore?.telegram_channels && selectedStore.telegram_channels.length > 0 && (
                        <span className="text-[9px] text-white/60 font-medium truncate max-w-[160px]">
                            {selectedStore.telegram_channels[0].channel_username}
                        </span>
                    )}
                </button>

                {isDropdownOpen && (
                    <div className="absolute left-4 right-4 mt-2 py-2 bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 border border-[#E2E8F0] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#F1F5F9]">
                            <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">
                                Switch Store
                            </p>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAddStoreOpen(true);
                                    setIsDropdownOpen(false);
                                }}
                                className="p-1 rounded-md hover:bg-[#F0FAFA] text-[#14B8A6] transition-colors"
                                title="Add Store"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {stores.length > 0 ? (
                                stores.map((store: Store) => (
                                    <button
                                        key={store.sqid}
                                        onClick={() => {
                                            setSelectedStore(store);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F0FAFA] transition-colors group cursor-pointer"
                                    >
                                        <div className="flex flex-col">
                                            <span className={`text-xs font-bold ${selectedStore?.sqid === store.sqid ? 'text-[#14B8A6]' : 'text-[#1E293B]'}`}>
                                                {store.name}
                                            </span>
                                            {store.telegram_channels && store.telegram_channels.length > 0 && (
                                                <span className="text-[9px] text-[#94A3B8]">
                                                    {store.telegram_channels[0].channel_username}
                                                </span>
                                            )}
                                        </div>
                                        {selectedStore?.sqid === store.sqid && (
                                            <Check size={14} className="text-[#14B8A6]" />
                                        )}
                                    </button>
                                ))
                            ) : (
                                <p className="px-4 py-3 text-xs text-[#94A3B8]">No stores found</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Primary Nav */}
            <nav className="flex-1 pl-4 space-y-1">
                {navItems.map(({ label, icon: Icon, badge, path }) => {
                    const isActive = path === '/dashboard' ? pathname === '/dashboard' : pathname?.startsWith(path);
                    return (
                        <button
                            key={label}
                            onClick={() => {
                                router.push(path);
                            }}
                            className="w-full relative flex items-center gap-3 px-4 py-3 rounded-l-3xl text-left transition-all duration-200 cursor-pointer"
                            style={
                                isActive
                                    ? {
                                        background: '#F0FAFA',
                                        color: '#14B8A6',
                                        fontWeight: 700,
                                    }
                                    : {
                                        background: 'transparent',
                                        color: 'rgba(255,255,255,0.75)',
                                        fontWeight: 500,
                                    }
                            }
                        >
                            <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} className="relative z-10" />
                            <span className="text-xs uppercase tracking-widest flex-1 relative z-10">{label}</span>
                            {badge !== undefined && (
                                <span
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full relative z-10"
                                    style={
                                        isActive
                                            ? { background: '#14B8A6', color: '#fff' }
                                            : { background: 'rgba(255,255,255,0.25)', color: '#fff' }
                                    }
                                >
                                    {badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Nav */}
            <div className="px-4 pb-8 pt-6 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                {bottomNav.map(({ label, icon: Icon, path }) => {
                    const isActive = path ? pathname?.startsWith(path) : false;
                    return (
                        <button
                            key={label}
                            onClick={() => path && router.push(path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                                isActive 
                                ? 'bg-white/20 text-white' 
                                : 'text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <Icon size={17} strokeWidth={1.8} />
                            <span className="text-xs uppercase tracking-widest font-medium">{label}</span>
                        </button>
                    );
                })}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer text-white/50 hover:bg-white/10 hover:text-white"
                >
                    <LogOut size={17} strokeWidth={1.8} />
                    <span className="text-xs uppercase tracking-widest font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop Sidebar (lg and up) */}
            <div className="hidden lg:block h-screen sticky top-0 flex-shrink-0">
                <SidebarContent />
            </div>

            {/* Mobile/Tablet Expanding Sidebar (lg hidden) */}
            <AnimatePresence mode="popLayout">
                <motion.aside
                    key="mobile-sidebar"
                    initial={false}
                    animate={{ 
                        width: isMobileOpen ? 256 : 60,
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="lg:hidden fixed left-0 top-0 bottom-0 z-[70] bg-[#14B8A6] flex flex-col items-center py-8 border-r border-white/10 shadow-2xl overflow-hidden rounded-r-4xl"
                >
                    {/* Header / Logo Area */}
                    <div className={`w-full px-6 flex items-center mb-10 ${isMobileOpen ? 'justify-between' : 'justify-center'}`}>
                        <motion.span 
                            layout
                            className="text-2xl font-bold text-white tracking-tight"
                        >
                            {isMobileOpen ? 'Konversa.' : 'K.'}
                        </motion.span>
                        {isMobileOpen && (
                            <button 
                                onClick={() => setIsMobileOpen(false)} 
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                   
                    {/* Toggle Button */}
                    <button 
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className={`w-10 h-10 rounded-sm bg-white/20 flex items-center justify-center text-white mb-5 hover:bg-white/30 transition-all cursor-pointer ${!isMobileOpen ? '' : 'self-end mr-4'}`}
                    >
                        <ChevronRight size={20} className={`transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`} />
                    </button>

                     {/* Store Selector (Visible only when expanded) */}
                    {isMobileOpen && (
                        <div className="w-full px-4 mb-5 relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex flex-col items-start gap-0.5 px-4 py-2.5 rounded-lg text-white text-xs font-semibold tracking-wide hover:bg-white/20 transition-all cursor-pointer group"
                                style={{ background: 'rgba(255,255,255,0.15)' }}
                            >
                                <div className="w-full flex items-center justify-between">
                                    <span className="truncate max-w-[140px] uppercase tracking-widest">
                                        {selectedStore ? selectedStore.name : 'Select Store'}
                                    </span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {selectedStore?.telegram_channels && selectedStore.telegram_channels.length > 0 && (
                                    <span className="text-[9px] text-white/60 font-medium truncate max-w-[160px]">
                                        {selectedStore.telegram_channels[0].channel_username}
                                    </span>
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-4 right-4 mt-2 py-2 bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 border border-[#E2E8F0] overflow-hidden">
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-[#F1F5F9]">
                                        <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">
                                            Switch Store
                                        </p>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsAddStoreOpen(true);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="p-1 rounded-md hover:bg-[#F0FAFA] text-[#14B8A6] transition-colors"
                                            title="Add Store"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {stores.length > 0 ? (
                                            stores.map((store: Store) => (
                                                <button
                                                    key={store.sqid}
                                                    onClick={() => {
                                                        setSelectedStore(store);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F0FAFA] transition-colors group cursor-pointer"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs font-bold ${selectedStore?.sqid === store.sqid ? 'text-[#14B8A6]' : 'text-[#1E293B]'}`}>
                                                            {store.name}
                                                        </span>
                                                        {store.telegram_channels && store.telegram_channels.length > 0 && (
                                                            <span className="text-[9px] text-[#94A3B8]">
                                                                {store.telegram_channels[0].channel_username}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {selectedStore?.sqid === store.sqid && (
                                                        <Check size={14} className="text-[#14B8A6]" />
                                                    )}
                                                </button>
                                            ))
                                        ) : (
                                            <p className="px-4 py-3 text-xs text-[#94A3B8]">No stores found</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {/* Navigation Items */}
                    <nav className={`flex-1 w-full flex flex-col ${isMobileOpen ? 'px-4' : 'items-center'} gap-2`}>
                        {isMobileOpen ? (
                            /* Full Nav when expanded */
                            navItems.map(({ label, icon: Icon, badge, path }) => {
                                const isActive = path === '/dashboard' ? pathname === '/dashboard' : pathname?.startsWith(path);
                                return (
                                    <button
                                        key={label}
                                        onClick={() => {
                                            router.push(path);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer"
                                        style={
                                            isActive
                                                ? { background: '#F0FAFA', color: '#14B8A6', fontWeight: 700 }
                                                : { background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }
                                        }
                                    >
                                        <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                                        <span className="text-xs uppercase tracking-widest flex-1">{label}</span>
                                        {badge !== undefined && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                style={isActive ? { background: '#14B8A6', color: '#fff' } : { background: 'rgba(255,255,255,0.25)', color: '#fff' }}
                                            >
                                                {badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            /* Icon-only Nav when collapsed */
                            navItems.map(({ label, icon: Icon, path }) => {
                                const isActive = path === '/dashboard' ? pathname === '/dashboard' : pathname?.startsWith(path);
                                return (
                                    <button
                                        key={label}
                                        onClick={() => {
                                            router.push(path);
                                            // Optional: setIsMobileOpen(true) to show full menu on click
                                        }}
                                        className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all cursor-pointer ${
                                            isActive ? 'bg-white text-[#14B8A6] shadow-lg' : 'text-white/70 hover:bg-white/10'
                                        }`}
                                    >
                                        <Icon size={20} />
                                    </button>
                                );
                            })
                        )}
                    </nav>

                    {/* Footer / Logout */}
                    <div className={`w-full flex flex-col ${isMobileOpen ? 'px-4 gap-1' : 'items-center gap-3'} mt-auto`}>
                        {bottomNav.map(({ label, icon: Icon, path }) => {
                            const isActive = path ? pathname?.startsWith(path) : false;
                            return isMobileOpen ? (
                                <button
                                    key={label}
                                    onClick={() => path && router.push(path)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                                        isActive 
                                        ? 'bg-white/20 text-white' 
                                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <Icon size={17} strokeWidth={1.8} />
                                    <span className="text-xs uppercase tracking-widest font-medium">{label}</span>
                                </button>
                            ) : (
                                <button
                                    key={label}
                                    onClick={() => path && router.push(path)}
                                    className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all cursor-pointer ${
                                        isActive ? 'bg-white text-[#14B8A6] shadow-lg' : 'text-white/70 hover:bg-white/10'
                                    }`}
                                >
                                    <Icon size={20} />
                                </button>
                            );
                        })}

                        {isMobileOpen ? (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer text-white/50 hover:bg-white/10 hover:text-white"
                            >
                                <LogOut size={17} strokeWidth={1.8} />
                                <span className="text-xs uppercase tracking-widest font-medium">Logout</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                            >
                                <LogOut size={20} />
                            </button>
                        )}
                    </div>
                </motion.aside>

                {/* Backdrop (Only visible when expanded) */}
                {isMobileOpen && (
                    <motion.div
                        key="mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>
            
            {/* Spacer for mobile to prevent content from going under the fixed mini-sidebar */}
            <div className="lg:hidden w-[60px] flex-shrink-0" />
            
            {/* Add Store Overlay */}
            <AddStoreOverlay 
                isOpen={isAddStoreOpen} 
                onClose={() => setIsAddStoreOpen(false)} 
            />
        </>
    );
}

export default Dashboard_SideBar