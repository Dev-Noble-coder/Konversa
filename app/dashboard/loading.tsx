import React from 'react';
import Layout from '@/app/components/Dashboard/layout';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <Layout>
            <main className="flex-1 min-h-[50vh] p-10 z-10 w-full overflow-y-auto flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-[#14B8A6]" size={40} />
                <p className="text-xs text-[#94A3B8] tracking-widest uppercase mt-4">Loading Data...</p>
            </main>
        </Layout>
    );
}
