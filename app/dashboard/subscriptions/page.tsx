"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, Zap, ShieldCheck, ArrowRight, History } from 'lucide-react';
import Layout from '../../components/Dashboard/layout';
import Dashboard_Header from '../../components/Dashboard/Dashboard_Header';

const SubscriptionsPage = () => {
    const activePlan = {
        name: "Starter Plan",
        price: "₦5,000",
        billing: "Monthly",
        nextBilling: "May 24, 2026",
        status: "Active",
        features: [
            "AI Auto-replies",
            "Full Order Management",
            "Telegram & WhatsApp Sync",
            "Standard Logistics Support",
        ]
    };

    const history = [
        { id: "INV-001", date: "Apr 24, 2026", amount: "₦5,000", status: "Paid" },
        { id: "INV-002", date: "Mar 24, 2026", amount: "₦5,000", status: "Paid" },
    ];

    return (
        <Layout>
            <main className="flex-1 p-3 md:p-5 lg:p-10  z-10 overflow-y-scroll">
                <Dashboard_Header />
                
                <div className="max-w-6xl mx-auto space-y-10 mt-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Subscription & Billing</h1>
                        <p className="text-slate-500 mt-2 text-sm">Manage your plan, billing information, and payment history.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Active Plan Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg border border-slate-200 overflow-hidden "
                            >
                                <div className="p-8 border-b border-slate-100 flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center text-[#14B8A6]">
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">{activePlan.name}</h2>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mt-1">
                                                <CheckCircle2 size={12} /> {activePlan.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-slate-900">{activePlan.price}</div>
                                        <div className="text-sm text-slate-500">{activePlan.billing} billing</div>
                                    </div>
                                </div>

                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Plan Features</h3>
                                        <ul className="space-y-3">
                                            {activePlan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                                    <ShieldCheck size={16} className="text-[#14B8A6]" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Next Payment</h3>
                                            <p className="text-lg font-bold text-slate-900">{activePlan.nextBilling}</p>
                                        </div>
                                        <button className="mt-6 w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                            Manage Subscription <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment Method */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-lg border border-slate-200 p-8 "
                            >
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <CreditCard size={20} className="text-slate-400" /> Payment Method
                                </h2>
                                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Visa ending in 4242</p>
                                            <p className="text-xs text-slate-500">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <button className="text-sm font-bold text-[#14B8A6] hover:underline">Update</button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Billing History */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg border border-slate-200 p-8 flex flex-col"
                        >
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <History size={20} className="text-slate-400" /> Billing History
                            </h2>
                            <div className="space-y-4 flex-1">
                                {history.map((inv) => (
                                    <div key={inv.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{inv.id}</p>
                                            <p className="text-xs text-slate-500">{inv.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900">{inv.amount}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase">{inv.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                                Download all invoices
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default SubscriptionsPage;
