"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { login, signup, verifyOTP, setToken } from '@/services/authService';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
    initialIsLogin?: boolean;
    allowToggle?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ initialIsLogin = true, allowToggle = true }) => {
    const [isLogin, setIsLogin] = useState(initialIsLogin);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        username: '',
        otp: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const data = await login({
                    email: formData.email,
                    password: formData.password,
                });
                console.log('Login Response:', data);
                
                // Store tokens if present in response
                if (data.access) {
                    setToken(data.access);
                }

                toast.success('Successfully logged in!');
                setTimeout(() => {
                    router.push('/dashboard'); 
                }, 1000);
            } else {
                const data = await signup({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                });
                toast.success('Account created! Please verify your email.');
                setIsVerifying(true); // Transition to verification
            }
        } catch (error: any) {
            console.log(error);
            const msg = error.response?.data?.detail || error.response?.data?.message || error.message || 'Authentication failed';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await verifyOTP({
                email: formData.email,
                otp: formData.otp,
            });
            toast.success('Email verified successfully! Please login.');
            setIsVerifying(false);
            setIsLogin(true);
        } catch (error: any) {
            console.log(error);
            const msg = error.response?.data?.detail || error.response?.data?.message || error.message || 'Verification failed';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#020617] min-h-screen text-[#F1F5F9] relative flex flex-col justify-center items-center px-6 overflow-hidden">

            {/* 1. Back Button - Pinned Top Left */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-10 left-6 lg:left-10"
            >
                {isVerifying ? (
                    <button 
                        onClick={() => setIsVerifying(false)}
                        className="group flex items-center gap-2 text-[#F1F5F9]/60 hover:text-[#14B8A6] transition-colors cursor-pointer"
                    >
                        <div className="p-2 rounded-full border border-[#F1F5F9]/10 group-hover:border-[#14B8A6]/40 transition-all">
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Signup</span>
                    </button>
                ) : (
                    <Link href="/" className="group flex items-center gap-2 text-[#F1F5F9]/60 hover:text-[#14B8A6] transition-colors">
                        <div className="p-2 rounded-full border border-[#F1F5F9]/10 group-hover:border-[#14B8A6]/40 transition-all">
                            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Home</span>
                    </Link>
                )}
            </motion.div>

            {/* 2. Decorative Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#14B8A6]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#1E293B]/20 blur-[100px] rounded-full" />

            {/* 3. The Form Container */}
            <motion.div
                layout
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-7">
                    <motion.h2
                        key={isVerifying ? 'verify-h2' : (isLogin ? 'login-h2' : 'signup-h2')}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#14B8A6] font-bold uppercase tracking-[0.3em] text-[10px] mb-2"
                    >
                        {isVerifying ? 'One Last Step' : (isLogin ? 'Welcome Back' : 'Create Account')}
                    </motion.h2>
                    <motion.h1
                        layout
                        className="text-4xl font-extrabold tracking-tight"
                    >
                        {isVerifying ? 'Check your ' : (isLogin ? 'Login to ' : 'Join ')}  <span className="text-[#14B8A6] ">
                        {isVerifying ? 'Inbox' : 'Konversa'}<span className="text-[#E2E8F0] ">.</span>
            </span>
                    </motion.h1>
                </div>

                {!isVerifying && (
                    <>
                        {/* Social Login Button */}
                        <button 
                        type="button"
                        className="w-full bg-[#1E293B] border border-[#F1F5F9]/10 rounded-full py-2.5 flex items-center justify-center gap-3 hover:bg-[#F1F5F9] hover:text-[#0B1120] transition-all duration-300 mb-8 cursor-pointer group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Continue with Google</span>
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-[#F1F5F9]/10" />
                            <span className="text-[10px] text-[#F1F5F9]/30 uppercase font-bold tracking-widest">Or with Email</span>
                            <div className="h-px flex-1 bg-[#F1F5F9]/10" />
                        </div>
                    </>
                )}

                {/* Main Form */}
                <form onSubmit={isVerifying ? handleVerifySubmit : handleSubmit}>
                    {isVerifying ? (
                        <div className="space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-xs text-[#F1F5F9]/60">
                                    We've sent a 6-digit code to <span className="text-[#14B8A6]">{formData.email}</span>.
                                    Enter it below to confirm your account.
                                </p>
                            </div>
                             <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40">Verification Code</label>
                                <input 
                                  type="text" 
                                  name="otp"
                                  value={formData.otp}
                                  onChange={handleChange}
                                  placeholder="123456" 
                                  maxLength={6}
                                  className="w-full text-center text-2xl tracking-[0.5em] border-b border-[#F1F5F9]/10 bg-transparent py-4 focus:outline-none focus:border-[#14B8A6] transition-all font-mono" 
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={`grid gap-x-6 gap-y-5 transition-all duration-500 ${!isLogin ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            
                            <AnimatePresence mode="popLayout">
                                {!isLogin && (
                                <>
                                    {/* Full Name */}
                                    <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-2"
                                    >
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40">Full Name</label>
                                    <input 
                                      type="text" 
                                      name="full_name"
                                      value={formData.full_name}
                                      onChange={handleChange}
                                      placeholder="John Doe" 
                                      className="w-full text-xs border-b border-[#F1F5F9]/10 bg-transparent pl-2 py-2.5 focus:outline-none focus:border-[#14B8A6] transition-all" 
                                    />
                                    </motion.div>

                                    {/* Username */}
                                    <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-2"
                                    >
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40">Username</label>
                                    <input 
                                      type="text" 
                                      name="username"
                                      value={formData.username}
                                      onChange={handleChange}
                                      placeholder="johndoe123" 
                                      className="w-full text-xs border-b border-[#F1F5F9]/10 bg-transparent pl-2 py-2.5 focus:outline-none focus:border-[#14B8A6] transition-all" 
                                    />
                                    </motion.div>
                                </>
                                )}
                            </AnimatePresence>

                            {/* Email Address */}
                            <div className={`space-y-2 ${!isLogin ? 'col-span-2' : ''}`}>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40">Email Address</label>
                                <input 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="business@gmail.com" 
                                  className="w-full text-xs border-b border-[#F1F5F9]/10 bg-transparent pl-2 py-2.5 focus:outline-none focus:border-[#14B8A6] transition-all" 
                                />
                            </div>

                            {/* Password */}
                            <div className={`space-y-2 ${!isLogin ? 'col-span-2' : ''}`}>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-[#F1F5F9]/40">Password</label>
                                <div className="relative">
                                    <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••" 
                                    className="w-full text-xs border-b border-[#F1F5F9]/10 bg-transparent pl-2 py-2.5 pr-10 focus:outline-none focus:border-[#14B8A6] transition-all" 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F1F5F9]/40 hover:text-[#14B8A6] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <motion.button
                        disabled={loading}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#14B8A6] text-[#0B1120] py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#F1F5F9] transition-all shadow-sm mt-8 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={18} />
                                <span>{isVerifying ? 'Verifying...' : (isLogin ? 'Logging in...' : 'Creating Account...')}</span>
                            </div>
                        ) : (
                            <>
                                {isVerifying ? 'Verify Code' : (isLogin ? 'Login' : 'Create Account')}
                                <ArrowRight size={16} />
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Switch UI Toggle */}
                {!isVerifying && (
                    <div className="mt-7 text-center">
                        <p className="text-xs text-[#F1F5F9]/40">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            {allowToggle ? (
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-[#14B8A6] font-bold hover:text-[#F1F5F9] transition-colors cursor-pointer"
                                >
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </button>
                            ) : (
                                <Link
                                    href={isLogin ? "/signup" : "/login"}
                                    className="text-[#14B8A6] font-bold hover:text-[#F1F5F9] transition-colors cursor-pointer"
                                >
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </Link>
                            )}
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AuthForm;
