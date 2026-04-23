import React from 'react';
import { Search, ChevronDown, Bell, MoreVertical } from 'lucide-react';

const Dashboard_Header = () => {
    return (
        <header className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mb-8 w-full">
            {/* Left Box: Search Bar */}
            <div className="flex items-center bg-white rounded-full px-4 md:px-5 py-2.5 md:py-3 border border-[#E2E8F0] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] w-full md:max-w-[400px] lg:max-w-[500px]">
                <button className="hidden sm:flex items-center gap-2 text-[11px] text-[#64748B] font-semibold tracking-wide outline-none hover:text-[#1E293B] transition shrink-0">
                    All Category <ChevronDown size={14} />
                </button>
                <div className="hidden sm:block w-[1px] h-4 bg-[#E2E8F0] mx-4 shrink-0"></div>
                <input 
                    type="text" 
                    placeholder="Search here..." 
                    className="flex-1 bg-transparent text-xs font-medium outline-none text-[#1E293B] placeholder:text-[#94A3B8] w-full"
                />
                <button className="text-[#94A3B8] hover:text-[#1E293B] transition pl-2 shrink-0">
                    <Search size={16} strokeWidth={2} />
                </button>
            </div>

            {/* Right Box: Controls & Profile */}
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto px-2 md:px-0">
                {/* Mobile Title (visible only on mobile if search is full width) */}
                <div className="md:hidden">
                     {/* You can add a small mobile logo or page title here if needed */}
                </div>

                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                    {/* Notification Bell */}
                    <button className="relative text-[#64748B] hover:text-[#1E293B] transition p-1">
                        <Bell size={22} strokeWidth={1.5} />
                        <span className="absolute top-1 right-1 w-[8px] h-[8px] bg-[#8B5CF6] rounded-full border-2 border-white"></span>
                    </button>
                    
                    {/* User Profile */}
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-sm overflow-hidden bg-[#8B5CF6] flex items-center justify-center shadow-sm shrink-0">
                            <img 
                                src="https://i.pravatar.cc/150?img=11" 
                                alt="User avatar" 
                                className="w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:opacity-100 transition" 
                            />
                        </div>
                        <button className="text-[#94A3B8] hover:text-[#1E293B] transition shrink-0">
                            <MoreVertical size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Dashboard_Header;