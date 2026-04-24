"use client";

import React from 'react';
import Layout from '@/app/components/Dashboard/layout';
import Dashboard_Header from '@/app/components/Dashboard/Dashboard_Header';

const CustomersPage = () => {
    return (
        <Layout>
            <main className="flex-1 p-3 md:p-5 lg:p-10  z-10">
                <Dashboard_Header />
                <div className="mb-8">
                    <h2 className="text-2xl font-extrabold tracking-tight text-[#1E293B]">Customers</h2>
                    <p className="text-xs text-[#94A3B8] tracking-widest uppercase mt-1">Review your active user base.</p>
                </div>
                
                <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 min-h-[380px] flex items-center justify-center flex-col text-center ">
                    <h3 className="text-xl font-bold mb-2 text-[#1E293B]">No customer data</h3>
                    <p className="text-sm text-[#94A3B8] max-w-md">
                        Once users interact with your storefront, they will be listed here.
                    </p>
                </div>
            </main>
        </Layout>
    );
};

export default CustomersPage;
