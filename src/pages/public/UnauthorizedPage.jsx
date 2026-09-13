import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function UnauthorizedPage() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 text-center space-y-6 relative z-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mx-auto text-rose-400 shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            HTTP 403 FORBIDDEN &bull; RBAC RESTRICTION
          </span>
          <h1 className="text-2xl font-extrabold text-white">Truy cập Bị từ chối</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tài khoản hiện tại của bạn là <strong className="text-indigo-300">{currentUser?.name}</strong> (
            <span className="font-mono text-purple-300">{currentUser?.roleLabel}</span>) không có quyền truy cập vào phân hệ màn hình này theo Ma trận Phân quyền <strong>ROLE.md</strong>.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-left text-xs space-y-1">
          <div className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">Trang chủ mặc định được phép:</div>
          <div className="font-mono font-bold text-indigo-400">{currentUser?.defaultRoute}</div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(currentUser?.defaultRoute || '/')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
          >
            <Home className="w-4 h-4" /> Về Màn hình Được phép
          </button>
        </div>
      </div>
    </div>
  )
}
