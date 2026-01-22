"use client";
import { useAuth } from '@/app/context/AuthContext';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#050505] pt-32 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">
                    My <span className="text-yellow-500">Profile</span>
                </h1>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Full Name</label>
                            <div className="text-white font-medium text-lg">{user.name}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Email Address</label>
                            <div className="text-white font-medium text-lg">{user.email}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Member Since</label>
                            <div className="text-white font-medium text-lg">2024</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Role</label>
                            <div className="text-yellow-500 font-bold text-lg">{user.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
