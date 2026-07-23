import { useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'goalSetup'
  | 'goalDetail'
  | 'activity'
  | 'splitGroup'
  | 'wealth'
type Tab = 'home' | 'activity' | 'splitGroup' | 'wealth'
type GoalStep = 1 | 2 | 3 | 4

interface Goal {
  id: number
  name: string
  categoryLabel: string
  saved: number
  target: number
}

interface Member {
  id: number
  name: string
  collegeId: string
}

interface Transaction {
  id: number
  merchant: string
  category: string
  amount: string
  date: string
  isIncome: boolean
}

// ─── Bee SVG mascot ──────────────────────────────────────────────────────────
function BeeMascot({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <ellipse cx="32" cy="44" rx="22" ry="13" fill="white" stroke="#ddd" strokeWidth="1.5" opacity="0.9" transform="rotate(-20 32 44)" />
      <ellipse cx="88" cy="44" rx="22" ry="13" fill="white" stroke="#ddd" strokeWidth="1.5" opacity="0.9" transform="rotate(20 88 44)" />
      <ellipse cx="60" cy="72" rx="26" ry="32" fill="#F5C518" />
      <path d="M34 68 Q60 64 86 68 Q86 76 60 80 Q34 76 34 68Z" fill="#1a1a1a" opacity="0.85" />
      <path d="M35 82 Q60 78 85 82 Q84 90 60 93 Q36 90 35 82Z" fill="#1a1a1a" opacity="0.85" />
      <circle cx="60" cy="42" r="24" fill="#F5C518" />
      <circle cx="50" cy="40" r="9" fill="white" />
      <circle cx="70" cy="40" r="9" fill="white" />
      <circle cx="51" cy="41" r="5" fill="#1a1a1a" />
      <circle cx="71" cy="41" r="5" fill="#1a1a1a" />
      <circle cx="53" cy="39" r="2" fill="white" />
      <circle cx="73" cy="39" r="2" fill="white" />
      <path d="M52 52 Q60 58 68 52" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M52 20 Q45 10 40 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="6" r="3.5" fill="#1a1a1a" />
      <path d="M68 20 Q75 10 80 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="6" r="3.5" fill="#1a1a1a" />
      <path d="M58 103 Q60 112 62 103" fill="#F5C518" stroke="#e0a800" strokeWidth="1" />
    </svg>
  )
}

function BeeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <ellipse cx="32" cy="44" rx="18" ry="10" fill="white" stroke="#ddd" strokeWidth="1.5" opacity="0.9" transform="rotate(-20 32 44)" />
      <ellipse cx="88" cy="44" rx="18" ry="10" fill="white" stroke="#ddd" strokeWidth="1.5" opacity="0.9" transform="rotate(20 88 44)" />
      <ellipse cx="60" cy="72" rx="26" ry="32" fill="#F5C518" />
      <path d="M34 68 Q60 64 86 68 Q86 76 60 80 Q34 76 34 68Z" fill="#1a1a1a" opacity="0.85" />
      <path d="M35 82 Q60 78 85 82 Q84 90 60 93 Q36 90 35 82Z" fill="#1a1a1a" opacity="0.85" />
      <circle cx="60" cy="42" r="24" fill="#F5C518" />
      <circle cx="50" cy="40" r="8" fill="white" />
      <circle cx="70" cy="40" r="8" fill="white" />
      <circle cx="51" cy="41" r="4.5" fill="#1a1a1a" />
      <circle cx="71" cy="41" r="4.5" fill="#1a1a1a" />
      <path d="M52 52 Q60 58 68 52" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M52 20 Q45 10 40 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="6" r="3.5" fill="#1a1a1a" />
      <path d="M68 20 Q75 10 80 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="6" r="3.5" fill="#1a1a1a" />
    </svg>
  )
}

// ─── Reusable buttons ─────────────────────────────────────────────────────────
function PrimaryButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-[#2E9E5B] text-white font-semibold py-4 px-6 rounded-2xl text-[15px] active:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full border-2 border-[#2E9E5B] text-[#2E9E5B] font-semibold py-4 px-6 rounded-2xl text-[15px] active:opacity-80 transition-all flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  )
}

// Goal category → relevant SVG icon
function GoalCategoryIcon({ category, size = 16 }: { category: string; size?: number }) {
  const stroke = '#2E9E5B'
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (category) {
    case 'Gadgets':
      return <svg {...common}><rect x="4" y="3" width="16" height="12" rx="1" /><path d="M2 17h20l-1.5 3h-17z" /></svg>
    case 'Travel':
      return <svg {...common}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
    case 'Education':
      return <svg {...common}><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></svg>
    case 'Rent':
      return <svg {...common}><path d="M3 10l9-7 9 7" /><path d="M5 9v11h14V9" /></svg>
    case 'Emergency':
      return <svg {...common}><path d="M12 2L2 7v6c0 5 4 9 10 9s10-4 10-9V7z" /><path d="M12 8v5M12 16h.01" /></svg>
    case 'Gaming':
      return <svg {...common}><rect x="2" y="7" width="20" height="10" rx="4" /><path d="M7 10v4M5 12h4" /><circle cx="16" cy="10.5" r="0.9" fill={stroke} /><circle cx="18.5" cy="13" r="0.9" fill={stroke} /></svg>
    case 'Health':
      return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" /></svg>
    case 'Books':
      return <svg {...common}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
    default:
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
  }
}

// ─── Goal Progress Card ───────────────────────────────────────────────────────
function GoalCard({ goal, onViewGoal }: { goal: Goal; onViewGoal: (g: Goal) => void }) {
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100))
  return (
    <div className="bg-[#DFF5E1] rounded-2xl p-4 mb-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <GoalCategoryIcon category={goal.categoryLabel} />
          </div>
          <span className="font-semibold text-[14px] text-gray-800">{goal.name}</span>
        </div>
        <span className="text-[12px] font-bold text-[#2E9E5B]">{pct}%</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-gray-900">Rs.{goal.saved.toLocaleString('en-IN')}</span>
        <span className="text-[11px] text-gray-500">/ Rs.{goal.target.toLocaleString('en-IN')}</span>
      </div>
      <div className="w-full bg-white rounded-full h-2.5 mb-3">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-[#2E9E5B] to-[#F5C518] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-500 mb-2">
        Rs.{(goal.target - goal.saved).toLocaleString('en-IN')} remaining to goal
      </p>
      <button
        onClick={() => onViewGoal(goal)}
        className="text-[12px] font-semibold text-[#2E9E5B] underline underline-offset-2"
      >
        View Goal
      </button>
    </div>
  )
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────
function formatTxnDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Category → emoji glyph (Paytm-style classifier icons)
const categoryEmoji: Record<string, string> = {
  Groceries: '🛒',
  'Food & Dining': '🍽️',
  Education: '📚',
  Salary: '💼',
  Transport: '🚌',
  Utilities: '💡',
}

// Category → small SVG icon (used as a merchant-type avatar, Paytm-style)
function CategoryAvatarIcon({ category }: { category: string }) {
  const stroke = '#2E9E5B'
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (category) {
    case 'Groceries':
      return <svg {...common}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
    case 'Food & Dining':
      return <svg {...common}><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>
    case 'Education':
      return <svg {...common}><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></svg>
    case 'Salary':
      return <svg {...common}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><circle cx="12" cy="14" r="2" /></svg>
    case 'Transport':
      return <svg {...common}><rect x="3" y="5" width="18" height="12" rx="2" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="16.5" cy="19" r="1.5" /><path d="M3 11h18" /></svg>
    case 'Utilities':
      return <svg {...common}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>
    default:
      return <svg {...common}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
  }
}

// ─── Transaction Row ──────────────────────────────────────────────────────────
function TransactionRow({ txn }: { txn: Transaction }) {
  const categoryColors: Record<string, string> = {
    Groceries: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
    'Food & Dining': 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
    Education: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
    Salary: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    Transport: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
    Utilities: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  }
  const colorClass = categoryColors[txn.category] || 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200'
  const emoji = categoryEmoji[txn.category] || '💳'
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-10 h-10 rounded-full bg-[#DFF5E1] flex items-center justify-center shrink-0">
        <CategoryAvatarIcon category={txn.category} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-800 truncate">{txn.merchant}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[9.5px] font-semibold px-2 py-[3px] rounded-md tracking-wide flex items-center gap-1 ${colorClass}`}><span className="text-[10px]">{emoji}</span>{txn.category}</span>
          <span className="text-[10px] text-gray-400 font-medium">{formatTxnDate(txn.date)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[13px] font-bold ${txn.isIncome ? 'text-[#2E9E5B]' : 'text-[#E53935]'}`}>
          {txn.isIncome ? '+' : '-'}Rs.{txn.amount}
        </span>
        <button className="text-gray-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: GoalStep }) {
  const steps = [
    { n: 1, label: 'Details' },
    { n: 2, label: 'Amount' },
    { n: 3, label: 'Timeline' },
    { n: 4, label: 'Confirm' },
  ]
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border-2 transition-all ${
              s.n === currentStep
                ? 'bg-[#2E9E5B] border-[#2E9E5B] text-white shadow-md'
                : s.n < currentStep
                ? 'bg-[#DFF5E1] border-[#2E9E5B] text-[#2E9E5B]'
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {s.n < currentStep ? (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#2E9E5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : s.n}
            </div>
            <span className={`text-[9px] mt-1 font-medium ${s.n === currentStep ? 'text-[#2E9E5B]' : 'text-gray-400'}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 mb-4 transition-all ${s.n < currentStep ? 'bg-[#2E9E5B]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
function BottomTabBar({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home', label: 'Dashboard',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 'activity', label: 'Transactions',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 11V9a4 4 0 014-4h14" strokeLinecap="round" />
          <path d="M7 23l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 13v2a4 4 0 01-4 4H3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'splitGroup', label: 'Groups',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'wealth', label: 'Invest',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="16 7 22 7 22 13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex px-2 pb-4 pt-2 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onTabChange(t.id)}
          className={`flex-1 flex flex-col items-center gap-0.5 pt-1 transition-all ${activeTab === t.id ? 'text-[#2E9E5B]' : 'text-gray-400'}`}
        >
          {t.icon}
          <span className="text-[9px] font-semibold mt-0.5">{t.label}</span>
          {activeTab === t.id && <div className="w-1 h-1 rounded-full bg-[#2E9E5B] mt-0.5" />}
        </button>
      ))}
    </div>
  )
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? 'white' : '#1a1a1a'
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1">
      <span className="text-[12px] font-bold" style={{ color: c }}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}>
          <rect x="0" y="6" width="3" height="6" rx="0.5" /><rect x="4.5" y="4" width="3" height="8" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" /><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}>
          <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 4C13.6 2 11 0.9 8 0.9C5 0.9 2.4 2 0.5 4L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5Z" />
          <path d="M8 5.5C9.7 5.5 11.2 6.2 12.3 7.3L13.6 6C12.1 4.6 10.1 3.7 8 3.7C5.9 3.7 3.9 4.6 2.4 6L3.7 7.3C4.8 6.2 6.3 5.5 8 5.5Z" />
          <circle cx="8" cy="10" r="1.8" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 border rounded-sm flex items-center px-0.5" style={{ borderColor: c }}>
            <div className="w-4 h-2 rounded-sm" style={{ background: c }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────
function DonutChart() {
  const slices = [
    { label: 'Stocks', value: 45, color: '#2E9E5B' },
    { label: 'Bonds', value: 25, color: '#F5C518' },
    { label: 'Real Estate', value: 18, color: '#20B2AA' },
    { label: 'Alternatives', value: 12, color: '#A8D8A8' },
  ]
  const cx = 60, cy = 60, r = 48, ir = 30
  let cumAngle = -Math.PI / 2
  const total = slices.reduce((s, x) => s + x.value, 0)

  function arc(start: number, end: number) {
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end)
    const ix1 = cx + ir * Math.cos(end), iy1 = cy + ir * Math.sin(end)
    const ix2 = cx + ir * Math.cos(start), iy2 = cy + ir * Math.sin(start)
    const large = end - start > Math.PI ? 1 : 0
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${large} 0 ${ix2} ${iy2} Z`
  }

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {slices.map(s => {
          const angle = (s.value / total) * 2 * Math.PI
          const path = arc(cumAngle, cumAngle + angle - 0.04)
          cumAngle += angle
          return <path key={s.label} d={path} fill={s.color} />
        })}
        <circle cx={cx} cy={cy} r={ir - 2} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a1a1a">Rs.1.2L</text>
        <text x={cx} y={cy + 9} textAnchor="middle" fontSize="7" fill="#666">Portfolio</text>
      </svg>
      <div className="flex flex-col gap-2">
        {slices.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[11px] text-gray-600 font-medium">{s.label}</span>
            <span className="text-[11px] font-bold text-gray-800 ml-auto pl-2">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Modal overlay ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-t-3xl p-6 max-h-[80%] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — SPLASH
// ═══════════════════════════════════════════════════════════════════════════════

function SplashScreen({ onSignup, onLogin }: { onSignup: () => void; onLogin: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <div className="flex flex-col items-center gap-4">
          <BeeMascot size={110} />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-[36px] font-extrabold text-[#2E9E5B] tracking-tight leading-none">BudgetBee</h1>
            <p className="text-[13px] text-gray-500 font-medium italic text-center leading-snug">
              So Money doesn't hassle in<br />your side hustle!!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          {[
            { label: 'Track', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
            { label: 'Save', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>) },
            { label: 'Split', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" /></svg>) },
            { label: 'Grow', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
          ].map(f => (
            <div key={f.label} className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 bg-[#DFF5E1] rounded-full flex items-center justify-center shadow-sm">
                {f.icon}
              </div>
              <span className="text-[10px] font-semibold text-gray-600">{f.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-gray-400 text-center">
          Smart budgeting built for Indian students
        </p>
      </div>

      <div className="px-6 pb-10 flex flex-col gap-3">
        <PrimaryButton onClick={onSignup}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 10-16 0" />
          </svg>
          Create New Account
        </PrimaryButton>
        <SecondaryButton onClick={onLogin}>
          I Already Have an Account
        </SecondaryButton>
        <p className="text-[10px] text-gray-400 text-center mt-1">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — ONBOARDING
// ═══════════════════════════════════════════════════════════════════════════════

function OnboardingScreen({ onContinue }: { onContinue: () => void }) {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center px-6 pt-6 overflow-y-auto pb-4">
        <div className="w-full flex justify-center mb-6">
          <div className="relative">
            <BeeMascot size={80} />
            <div className="absolute -right-10 top-4 bg-[#DFF5E1] rounded-xl p-2.5 shadow-md border border-[#2E9E5B]/20">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                <rect width="32" height="24" rx="3" fill="#2E9E5B" opacity="0.15" />
                <rect width="32" height="24" rx="3" stroke="#2E9E5B" strokeWidth="1.5" />
                <path d="M2 3L16 13L30 3" stroke="#2E9E5B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute -left-8 top-8 bg-[#FFF8DC] rounded-lg p-2 shadow-sm">
              <span className="text-[10px] font-bold text-[#E6A800]">SMS</span>
            </div>
          </div>
        </div>

        <h2 className="text-[22px] font-extrabold text-gray-900 text-center mb-3">Allow SMS Parsing</h2>
        <p className="text-[13px] text-gray-500 text-center leading-relaxed mb-6">
          BudgetBee analyzes your financial SMS messages to automatically track transactions, making budgeting effortless. Your data is always{' '}
          <span className="font-semibold text-[#2E9E5B]">private and secure</span>.
        </p>

        {[
          {
            label: 'Auto-categorize expenses',
            sub: 'Expenses are sorted by category automatically',
            icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
          },
          {
            label: 'End-to-end encrypted data',
            sub: 'Your SMS data never leaves your device',
            icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>),
          },
          {
            label: 'AI-powered SMS parsing',
            sub: 'Smart detection of bank and UPI messages',
            icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round" /><path d="M12 17h.01" strokeLinecap="round" /></svg>),
          },
        ].map(f => (
          <div key={f.label} className="flex items-start gap-3 w-full bg-[#F8FFF9] rounded-xl px-4 py-3 mb-2.5 border border-[#DFF5E1]">
            <div className="w-8 h-8 bg-[#DFF5E1] rounded-lg flex items-center justify-center shrink-0 mt-0.5">{f.icon}</div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">{f.label}</p>
              <p className="text-[11px] text-gray-500">{f.sub}</p>
            </div>
          </div>
        ))}

        <div
          className="flex items-start gap-3 w-full mt-4 cursor-pointer"
          onClick={() => setChecked(!checked)}
        >
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked ? 'bg-[#2E9E5B] border-[#2E9E5B]' : 'border-gray-300 bg-white'}`}>
            {checked && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            I agree to allow BudgetBee to access my SMS messages for automatic transaction tracking
          </p>
        </div>
      </div>

      <div className="px-6 pb-10 pt-2">
        <PrimaryButton onClick={onContinue}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Allow and Continue
        </PrimaryButton>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — HOME DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

function HomeScreen({
  onCreateGoal,
  goals,
  transactions,
  onTabChange,
  onViewGoal,
}: {
  onCreateGoal: () => void
  goals: Goal[]
  transactions: Transaction[]
  onTabChange: (t: Tab) => void
  onViewGoal: (g: Goal) => void
}) {
  const [showProfile, setShowProfile] = useState(false)
  const [showBalanceInfo, setShowBalanceInfo] = useState(false)

  return (
    <div className="flex flex-col h-full bg-[#F8FFF9] relative">
      <div className="bg-white">
        <StatusBar />
        <div className="px-6 pt-2 pb-4 flex items-center justify-between">
          <div>
            <p className="text-[12px] text-gray-500 font-medium">Good morning</p>
            <h2 className="text-[17px] font-bold text-gray-900">Parth's Dashboard</h2>
          </div>
          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 bg-[#2E9E5B] rounded-full flex items-center justify-center text-white font-bold text-[14px]"
          >
            PG
          </button>
        </div>

        {/* Balance Card */}
        <div className="mx-4 mb-4 bg-gradient-to-br from-[#2E9E5B] to-[#1E7A42] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[12px] text-white/70 font-medium">Wallet Balance</p>
            <button onClick={() => setShowBalanceInfo(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="text-[32px] font-extrabold text-white leading-none mb-2">Rs.1,25,000.75</p>
          <p className="text-[11px] text-white/70 font-medium">Current balance</p>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="bg-white/20 rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 2L19 9H5L12 2Z" /></svg>
              <span className="text-[11px] font-bold text-white">+Rs.250.50 Daily Change</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Quick Actions */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-1.5 mb-3">
            <BeeIcon size={16} />
            <h3 className="text-[14px] font-bold text-gray-800">Quick Actions</h3>
          </div>
          <div className="flex gap-3">
            {[
              {
                label: 'Add\nTransaction',
                action: () => onTabChange('activity'),
                icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>),
              },
              {
                label: 'Create\nGoal',
                action: onCreateGoal,
                icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
              },
              {
                label: 'View\nGroups',
                action: () => onTabChange('splitGroup'),
                icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" /></svg>),
              },
            ].map(q => (
              <button
                key={q.label}
                onClick={q.action}
                className="flex-1 bg-[#2E9E5B] text-white rounded-2xl py-3 flex flex-col items-center gap-1.5 shadow-md active:opacity-90 transition-all"
              >
                {q.icon}
                <span className="text-[9px] font-semibold whitespace-pre-line text-center leading-tight">{q.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Savings Goals */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <BeeIcon size={16} />
              <h3 className="text-[14px] font-bold text-gray-800">Savings Goals</h3>
            </div>
            <button onClick={onCreateGoal} className="text-[11px] font-semibold text-[#2E9E5B]">+ New Goal</button>
          </div>
          {goals.length === 0 && (
            <div className="bg-[#DFF5E1] rounded-2xl p-6 text-center">
              <p className="text-[13px] text-gray-500 mb-2">No goals yet</p>
              <button onClick={onCreateGoal} className="text-[13px] font-semibold text-[#2E9E5B]">Create your first goal</button>
            </div>
          )}
          {goals.map(g => <GoalCard key={g.id} goal={g} onViewGoal={onViewGoal} />)}
        </div>

        {/* Recent Activity */}
        <div className="px-6 mt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <BeeIcon size={16} />
              <h3 className="text-[14px] font-bold text-gray-800">Recent Activity</h3>
            </div>
            <button onClick={() => onTabChange('activity')} className="text-[11px] font-semibold text-[#2E9E5B]">See all</button>
          </div>
          <div className="bg-white rounded-2xl px-4 py-1 shadow-sm">
            {transactions.slice(0, 3).map(t => <TransactionRow key={t.id} txn={t} />)}
          </div>
        </div>
      </div>

      <BottomTabBar activeTab="home" onTabChange={onTabChange} />

      {/* Profile modal */}
      {showProfile && (
        <Modal title="Profile" onClose={() => setShowProfile(false)}>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-[#2E9E5B] rounded-full flex items-center justify-center text-white font-bold text-[18px]">PG</div>
            <div>
              <p className="text-[16px] font-bold text-gray-900">Parth Goyal</p>
              <p className="text-[12px] text-gray-500">parth.goyal@college.edu</p>
              <span className="text-[10px] font-bold bg-[#DFF5E1] text-[#2E9E5B] px-2 py-0.5 rounded-full">Student Plan</span>
            </div>
          </div>
          {[
            { label: 'Monthly Allowance', value: 'Rs.8,000' },
            { label: 'College', value: 'Netaji Subhas University of Technology, Delhi' },
            { label: 'Member since', value: 'July 2024' },
            { label: 'Total Saved', value: 'Rs.33,500' },
          ].map(r => (
            <div key={r.label} className="flex justify-between items-start gap-4 py-3 border-b border-gray-100 last:border-0">
              <span className="text-[13px] text-gray-500 shrink-0">{r.label}</span>
              <span className="text-[13px] font-semibold text-gray-900 text-right max-w-[60%]">{r.value}</span>
            </div>
          ))}
          <div className="mt-4">
            <SecondaryButton onClick={() => setShowProfile(false)}>Close Profile</SecondaryButton>
          </div>
        </Modal>
      )}

      {/* Balance info modal */}
      {showBalanceInfo && (
        <Modal title="Wallet Balance Info" onClose={() => setShowBalanceInfo(false)}>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            Your wallet balance reflects the total available funds tracked across your linked accounts. BudgetBee aggregates your SMS-parsed transactions to keep this updated in real time.
          </p>
          {[
            { label: 'Opening Balance (Jul 1)', value: 'Rs.1,20,000.00' },
            { label: 'Total Income (Jul)', value: '+Rs.10,000.00' },
            { label: 'Total Expenses (Jul)', value: '-Rs.5,249.25' },
            { label: 'Current Balance', value: 'Rs.1,25,000.75', bold: true },
          ].map(r => (
            <div key={r.label} className={`flex justify-between py-3 border-b border-gray-100 last:border-0 ${r.bold ? 'font-bold' : ''}`}>
              <span className="text-[13px] text-gray-500">{r.label}</span>
              <span className={`text-[13px] ${r.bold ? 'text-[#2E9E5B] font-bold' : 'font-semibold text-gray-900'}`}>{r.value}</span>
            </div>
          ))}
        </Modal>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 4 — GOAL SETUP
// ═══════════════════════════════════════════════════════════════════════════════

function GoalSetupScreen({ onBack, onComplete }: {
  onBack: () => void
  onComplete: (goal: { name: string; categoryLabel: string; target: number }) => void
}) {
  const [step, setStep] = useState<GoalStep>(1)
  const [goalName, setGoalName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Gadgets')
  const [amount, setAmount] = useState('')
  const [timeline, setTimeline] = useState<string | null>(null)

  const categories = ['Gadgets', 'Travel', 'Education', 'Rent', 'Emergency', 'Gaming', 'Health', 'Books']
  const timelines = ['3 Months', '6 Months', '1 Year', 'Custom Date']

  const parsedAmount = parseInt(amount.replace(/,/g, '')) || 0
  const months = timeline === '3 Months' ? 3 : timeline === '1 Year' ? 12 : 6
  const monthly = parsedAmount > 0 ? Math.round(parsedAmount / months).toLocaleString('en-IN') : '0'

  function nextStep() {
    if (step < 4) {
      setStep((step + 1) as GoalStep)
    } else {
      onComplete({
        name: goalName.trim() || 'Savings Goal',
        categoryLabel: selectedCategory,
        target: parsedAmount || 85000,
      })
    }
  }

  function prevStep() {
    if (step > 1) setStep((step - 1) as GoalStep)
    else onBack()
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="px-6 pt-2 pb-4 flex items-center gap-3">
        <button onClick={prevStep} className="w-9 h-9 bg-[#DFF5E1] rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-[17px] font-bold text-gray-900">Create Savings Goal</h2>
      </div>

      <div className="px-6">
        <StepIndicator currentStep={step} />
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-6">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Goal Name</label>
              <input
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[14px] font-medium outline-none focus:border-[#2E9E5B] transition-all bg-[#F8FFF9] placeholder:text-gray-400"
                placeholder="e.g., New Laptop, Dream Vacation"
                value={goalName}
                onChange={e => setGoalName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Goal Category</label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`py-2.5 px-1 rounded-xl border-2 text-[10px] font-semibold transition-all ${
                      selectedCategory === c
                        ? 'bg-[#DFF5E1] border-[#2E9E5B] text-[#2E9E5B]'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Target Amount (Rs.)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[16px]">Rs.</span>
                <input
                  className="w-full border-2 border-gray-200 rounded-2xl pl-10 pr-4 py-3.5 text-[20px] font-bold outline-none focus:border-[#2E9E5B] transition-all bg-[#F8FFF9] placeholder:text-gray-300"
                  placeholder="85,000"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  inputMode="numeric"
                />
              </div>
            </div>
            {parsedAmount > 0 && (
              <div className="bg-[#DFF5E1] rounded-2xl p-4">
                <p className="text-[12px] font-semibold text-[#2E9E5B] mb-1">Monthly savings needed</p>
                <p className="text-[22px] font-extrabold text-gray-900">Rs.{monthly}</p>
                <p className="text-[11px] text-gray-500">Based on 6-month timeline (adjusts in step 3)</p>
              </div>
            )}
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Initial Deposit (Optional)</label>
              <input
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[14px] font-medium outline-none focus:border-[#2E9E5B] transition-all bg-[#F8FFF9] placeholder:text-gray-400"
                placeholder="e.g., 5,000"
                inputMode="numeric"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-3 block">Target Timeline</label>
              <div className="grid grid-cols-2 gap-2.5">
                {timelines.map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`py-3.5 px-4 rounded-2xl border-2 text-[13px] font-semibold transition-all ${
                      timeline === t ? 'bg-[#2E9E5B] border-[#2E9E5B] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {timeline === 'Custom Date' && (
              <div>
                <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Pick a Date</label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[14px] font-medium outline-none focus:border-[#2E9E5B] transition-all bg-[#F8FFF9]"
                />
              </div>
            )}
            {timeline && parsedAmount > 0 && (
              <div className="bg-[#DFF5E1] rounded-2xl p-4">
                <p className="text-[12px] font-semibold text-[#2E9E5B] mb-1">Updated monthly savings</p>
                <p className="text-[22px] font-extrabold text-gray-900">Rs.{monthly}</p>
                <p className="text-[11px] text-gray-500">For {timeline} plan</p>
              </div>
            )}
            <div className="bg-[#FFF8DC] rounded-2xl p-4 border border-[#F5C518]/40">
              <div className="flex items-center gap-2 mb-1">
                <BeeIcon size={16} />
                <p className="text-[12px] font-bold text-gray-800">BudgetBee Tip</p>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                A 6-month goal gives you the best balance of motivation and reachability. Small consistent deposits add up fast.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#DFF5E1] rounded-2xl p-5 border border-[#2E9E5B]/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <GoalCategoryIcon category={selectedCategory} size={20} />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-gray-900">{goalName || 'Savings Goal'}</h3>
                  <p className="text-[11px] text-gray-500">{selectedCategory} — {timeline || '6 Months'}</p>
                </div>
              </div>
              {[
                { label: 'Target Amount', value: `Rs.${parsedAmount > 0 ? parsedAmount.toLocaleString('en-IN') : '85,000'}` },
                { label: 'Timeline', value: timeline || '6 Months' },
                { label: 'Monthly Savings', value: `Rs.${monthly}` },
                { label: 'Reminders', value: 'Weekly' },
              ].map(r => (
                <div key={r.label} className="flex justify-between items-center py-2.5 border-b border-[#2E9E5B]/15 last:border-0">
                  <span className="text-[12px] text-gray-500 font-medium">{r.label}</span>
                  <span className="text-[13px] font-bold text-gray-900">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-[#F8FFF9] rounded-xl p-3 border border-[#DFF5E1]">
              <input type="checkbox" defaultChecked className="accent-[#2E9E5B] w-4 h-4" />
              <p className="text-[11px] text-gray-600">Enable weekly savings reminders from BudgetBee</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-10 pt-3">
        <PrimaryButton onClick={nextStep}>
          {step < 4 ? (
            <>
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Create Goal
            </>
          )}
        </PrimaryButton>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN — GOAL DETAIL
// ═══════════════════════════════════════════════════════════════════════════════

function GoalDetailScreen({ goal, onBack }: { goal: Goal; onBack: () => void }) {
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100))
  return (
    <div className="flex flex-col h-full bg-[#F8FFF9]">
      <div className="bg-white">
        <StatusBar />
        <div className="px-6 pt-2 pb-4 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 bg-[#DFF5E1] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="text-[17px] font-bold text-gray-900">Goal Details</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
        {/* Summary card */}
        <div className="bg-gradient-to-br from-[#2E9E5B] to-[#1E7A42] rounded-2xl p-5 mb-4 shadow-lg">
          <p className="text-[12px] text-white/70 mb-1">{goal.categoryLabel}</p>
          <h3 className="text-[22px] font-extrabold text-white mb-4">{goal.name}</h3>
          <div className="flex justify-between mb-2">
            <span className="text-[12px] text-white/70">Saved</span>
            <span className="text-[12px] text-white/70">Target</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-[18px] font-extrabold text-white">Rs.{goal.saved.toLocaleString('en-IN')}</span>
            <span className="text-[18px] font-extrabold text-white/80">Rs.{goal.target.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="h-3 rounded-full bg-[#F5C518]" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[11px] text-white/70 mt-2">{pct}% complete — Rs.{(goal.target - goal.saved).toLocaleString('en-IN')} remaining</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Monthly Target', value: 'Rs.' + Math.round(goal.target / 6).toLocaleString('en-IN') },
            { label: 'Est. Completion', value: 'Jan 2025' },
            { label: 'Days Active', value: '28 days' },
            { label: 'Streak', value: '4 weeks' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-[10px] text-gray-500 font-medium mb-1">{s.label}</p>
              <p className="text-[15px] font-extrabold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Contribution history */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center gap-1.5 mb-3">
            <BeeIcon size={14} />
            <p className="text-[13px] font-bold text-gray-800">Contribution History</p>
          </div>
          {[
            { date: 'Jul 20', amount: 'Rs.5,000', note: 'Manual deposit' },
            { date: 'Jul 10', amount: 'Rs.3,500', note: 'Auto-save' },
            { date: 'Jun 28', amount: 'Rs.8,000', note: 'Manual deposit' },
            { date: 'Jun 15', amount: 'Rs.2,500', note: 'Auto-save' },
          ].map(c => (
            <div key={c.date} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-[12px] font-semibold text-gray-800">{c.note}</p>
                <p className="text-[10px] text-gray-400">{c.date}</p>
              </div>
              <span className="text-[13px] font-bold text-[#2E9E5B]">{c.amount}</span>
            </div>
          ))}
        </div>

        <PrimaryButton>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Deposit
        </PrimaryButton>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 5 — ACTIVITY
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityScreen({
  transactions,
  onAddTransaction,
  onTabChange,
}: {
  transactions: Transaction[]
  onAddTransaction: (t: Transaction) => void
  onTabChange: (t: Tab) => void
}) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState({ merchant: '', category: 'Groceries', amount: '', isIncome: false })
  const filters = ['All', 'Expenses', 'Income', 'Groceries']

  const filtered = transactions.filter(t => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Income') return t.isIncome
    if (activeFilter === 'Expenses') return !t.isIncome
    if (activeFilter === 'Groceries') return t.category === 'Groceries'
    return true
  })

  function submitTransaction() {
    if (!form.merchant || !form.amount) return
    onAddTransaction({
      id: Date.now(),
      merchant: form.merchant,
      category: form.category,
      amount: parseFloat(form.amount).toLocaleString('en-IN'),
      date: 'Jul 23',
      isIncome: form.isIncome,
    })
    setForm({ merchant: '', category: 'Groceries', amount: '', isIncome: false })
    setShowAddModal(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FFF9] relative">
      <div className="bg-white">
        <StatusBar />
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <BeeIcon size={20} />
            <h2 className="text-[20px] font-extrabold text-gray-900">Activity</h2>
          </div>
          <p className="text-[11px] text-gray-500">Transactions parsed automatically from SMS</p>
        </div>
        <div className="px-6 pb-4 flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                activeFilter === f ? 'bg-[#2E9E5B] text-white shadow-sm' : 'bg-[#DFF5E1] text-[#2E9E5B]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-36 px-4 pt-3">
        <div className="bg-white rounded-2xl px-4 py-1 shadow-sm">
          {filtered.map(t => <TransactionRow key={t.id} txn={t} />)}
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-[13px]">No transactions in this category</p>
          )}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#2E9E5B] text-white font-semibold px-6 py-3.5 rounded-full shadow-xl text-[13px] flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add New Transaction
        </button>
      </div>

      <BottomTabBar activeTab="activity" onTabChange={onTabChange} />

      {showAddModal && (
        <Modal title="Add Transaction" onClose={() => setShowAddModal(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Merchant / Description</label>
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#2E9E5B] bg-[#F8FFF9]"
                placeholder="e.g., Campus Cafe"
                value={form.merchant}
                onChange={e => setForm({ ...form, merchant: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Category</label>
              <select
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#2E9E5B] bg-[#F8FFF9]"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                {['Groceries', 'Food & Dining', 'Education', 'Salary', 'Transport', 'Utilities'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Amount (Rs.)</label>
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#2E9E5B] bg-[#F8FFF9]"
                placeholder="e.g., 250"
                inputMode="numeric"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setForm({ ...form, isIncome: false })}
                className={`flex-1 py-2.5 rounded-xl border-2 text-[13px] font-semibold transition-all ${!form.isIncome ? 'bg-red-50 border-red-400 text-red-600' : 'border-gray-200 text-gray-500'}`}
              >
                Expense
              </button>
              <button
                onClick={() => setForm({ ...form, isIncome: true })}
                className={`flex-1 py-2.5 rounded-xl border-2 text-[13px] font-semibold transition-all ${form.isIncome ? 'bg-[#DFF5E1] border-[#2E9E5B] text-[#2E9E5B]' : 'border-gray-200 text-gray-500'}`}
              >
                Income
              </button>
            </div>
            <PrimaryButton onClick={submitTransaction}>Save Transaction</PrimaryButton>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 6 — SPLITGROUP
// ═══════════════════════════════════════════════════════════════════════════════

function SplitGroupScreen({ onTabChange }: { onTabChange: (t: Tab) => void }) {
  const [view, setView] = useState<'list' | 'create' | 'created'>('list')
  const [groupName, setGroupName] = useState('Study Budgeters')
  const [groupDesc, setGroupDesc] = useState('Managing shared expenses for our study group')
  const [idInput, setIdInput] = useState('')
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Parth Goyal', collegeId: 'CSE2023001' },
    { id: 2, name: 'Priya Verma', collegeId: 'CSE2023042' },
  ])
  const [showQr, setShowQr] = useState(false)

  const presetMembers: Record<string, string> = {
    CSE2023003: 'Ankit Gupta',
    CSE2023010: 'Sneha Patel',
    CSE2023055: 'Mohit Rao',
    CSE2023022: 'Kavya Singh',
  }

  function addMemberById() {
    const trimmed = idInput.trim().toUpperCase()
    if (!trimmed) return
    if (members.find(m => m.collegeId === trimmed)) {
      setIdInput('')
      return
    }
    const name = presetMembers[trimmed] || `Student (${trimmed})`
    setMembers([...members, { id: Date.now(), name, collegeId: trimmed }])
    setIdInput('')
  }

  function removeMember(id: number) {
    setMembers(members.filter(m => m.id !== id))
  }

  const groups = [
    { id: 1, name: 'Study Budgeters', members: 4, total: 'Rs.3,200', pending: 'Rs.800', color: '#2E9E5B', bg: '#DFF5E1' },
    { id: 2, name: 'Hostel Room Split', members: 3, total: 'Rs.12,000', pending: 'Rs.4,000', color: '#1976D2', bg: '#E8F4FD' },
    { id: 3, name: 'College Fest Funds', members: 8, total: 'Rs.25,000', pending: 'Rs.0', color: '#E6A800', bg: '#FFF8DC' },
  ]

  function GroupIcon({ id, color }: { id: number; color: string }) {
    const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    if (id === 1) return <svg {...common}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
    if (id === 2) return <svg {...common}><path d="M3 10l9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>
    return <svg {...common}><path d="M12 2l2.4 6.8L21 9l-5.5 4.5L17 21l-5-3.8L7 21l1.5-7.5L3 9l6.6-.2z" /></svg>
  }

  if (view === 'created') {
    return (
      <div className="flex flex-col h-full bg-[#F8FFF9]">
        <StatusBar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 bg-[#DFF5E1] rounded-full flex items-center justify-center mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-[22px] font-extrabold text-gray-900 mb-2">Group Created!</h3>
          <p className="text-[13px] text-gray-500 mb-6">"{groupName}" has been created with {members.length} members.</p>
          <div className="bg-white rounded-2xl p-4 w-full mb-6 shadow-sm">
            {members.map(m => (
              <div key={m.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 bg-[#DFF5E1] rounded-full flex items-center justify-center text-[#2E9E5B] font-bold text-[12px]">
                  {m.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-800">{m.name}</p>
                  <p className="text-[10px] text-gray-400">{m.collegeId}</p>
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton onClick={() => setView('list')}>Back to Groups</PrimaryButton>
        </div>
        <BottomTabBar activeTab="splitGroup" onTabChange={onTabChange} />
      </div>
    )
  }

  if (view === 'create') {
    return (
      <div className="flex flex-col h-full bg-white relative">
        <StatusBar />
        <div className="px-6 pt-2 pb-4 flex items-center gap-3">
          <button onClick={() => setView('list')} className="w-9 h-9 bg-[#DFF5E1] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            <BeeIcon size={18} />
            <h2 className="text-[17px] font-bold text-gray-900">Group Details</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="mb-4">
            <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Group Name</label>
            <input
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[14px] font-medium outline-none focus:border-[#2E9E5B] transition-all bg-[#F8FFF9]"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="text-[12px] font-semibold text-gray-600 mb-1.5 block">Description (Optional)</label>
            <textarea
              rows={2}
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-[13px] font-medium outline-none focus:border-[#2E9E5B] transition-all bg-[#F8FFF9] resize-none"
              value={groupDesc}
              onChange={e => setGroupDesc(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <BeeIcon size={16} />
              <h3 className="text-[14px] font-bold text-gray-800">Add Members</h3>
            </div>

            {/* College ID */}
            <div className="bg-[#F8FFF9] border-2 border-[#DFF5E1] rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#DFF5E1] rounded-xl flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" />
                    <path d="M12 10h6M12 14h4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-800">College ID</p>
                  <p className="text-[11px] text-gray-500">Try: CSE2023003, CSE2023010</p>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <input
                  placeholder="Enter college ID"
                  className="min-w-0 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] outline-none focus:border-[#2E9E5B] bg-white"
                  value={idInput}
                  onChange={e => setIdInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addMemberById()}
                />
                <button
                  onClick={addMemberById}
                  className="bg-[#2E9E5B] text-white text-[11px] font-semibold px-3 py-2.5 rounded-xl shrink-0"
                >
                  Add
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-[#F8FFF9] border-2 border-[#DFF5E1] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#DFF5E1] rounded-xl flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2">
                    <rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" />
                    <rect x="2" y="14" width="8" height="8" rx="1" /><rect x="5" y="5" width="2" height="2" fill="#2E9E5B" />
                    <rect x="17" y="5" width="2" height="2" fill="#2E9E5B" /><rect x="5" y="17" width="2" height="2" fill="#2E9E5B" />
                    <path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2h-2M22 18v2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-800">QR Code Scan</p>
                  <p className="text-[11px] text-gray-500">Scan a QR code to add members instantly</p>
                </div>
              </div>
              <button
                onClick={() => setShowQr(true)}
                className="w-full border-2 border-[#2E9E5B] text-[#2E9E5B] text-[12px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Scan QR
              </button>
            </div>
          </div>

          {/* Members list */}
          {members.length > 0 && (
            <div>
              <p className="text-[12px] font-semibold text-gray-500 mb-2">Members ({members.length})</p>
              <div className="bg-white rounded-2xl px-4 shadow-sm">
                {members.map(m => (
                  <div key={m.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 bg-[#DFF5E1] rounded-full flex items-center justify-center text-[#2E9E5B] font-bold text-[12px] shrink-0">
                      {m.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-800">{m.name}</p>
                      <p className="text-[10px] text-gray-500">{m.collegeId}</p>
                    </div>
                    <button onClick={() => removeMember(m.id)} className="text-red-400 shrink-0 p-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-10 pt-2">
          <PrimaryButton onClick={() => setView('created')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Next: Add Expenses
          </PrimaryButton>
        </div>

        {/* QR modal */}
        {showQr && (
          <Modal title="Scan QR Code" onClose={() => setShowQr(false)}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <p className="text-[12px] text-gray-400 mt-2">Camera viewfinder</p>
              </div>
              <p className="text-[12px] text-gray-500 text-center">
                Point your camera at a BudgetBee QR code shared by another student to add them instantly.
              </p>
              <button
                onClick={() => {
                  setMembers([...members, { id: Date.now(), name: 'Ankit Gupta', collegeId: 'CSE2023003' }])
                  setShowQr(false)
                }}
                className="w-full bg-[#2E9E5B] text-white font-semibold py-3.5 rounded-2xl text-[14px]"
              >
                Simulate Scan (Add Ankit Gupta)
              </button>
            </div>
          </Modal>
        )}
      </div>
    )
  }

  // Group list view
  return (
    <div className="flex flex-col h-full bg-[#F8FFF9]">
      <div className="bg-white">
        <StatusBar />
        <div className="px-6 pt-2 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BeeIcon size={20} />
            <h2 className="text-[20px] font-extrabold text-gray-900">Groups</h2>
          </div>
          <button
            onClick={() => setView('create')}
            className="bg-[#2E9E5B] text-white text-[12px] font-semibold px-4 py-2 rounded-full flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Create Group
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {groups.map(g => (
          <button
            key={g.id}
            onClick={() => setView('create')}
            className="w-full bg-white rounded-2xl p-4 mb-3 shadow-sm text-left flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: g.bg }}>
              <GroupIcon id={g.id} color={g.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-gray-900">{g.name}</p>
              <p className="text-[11px] text-gray-500">{g.members} members — Total: {g.total}</p>
            </div>
            <div className="text-right shrink-0">
              {g.pending !== 'Rs.0' && (
                <span className="text-[11px] font-bold text-[#E53935]">{g.pending} pending</span>
              )}
              {g.pending === 'Rs.0' && (
                <span className="text-[11px] font-bold text-[#2E9E5B]">Settled</span>
              )}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" className="ml-auto mt-1">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <BottomTabBar activeTab="splitGroup" onTabChange={onTabChange} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 7 — WEALTH
// ═══════════════════════════════════════════════════════════════════════════════

function WealthScreen({ onTabChange }: { onTabChange: (t: Tab) => void }) {
  const [showExplore, setShowExplore] = useState(false)
  const [expandedRec, setExpandedRec] = useState<number | null>(null)

  const recommendations = [
    {
      id: 0,
      name: 'EcoWealth Partners',
      desc: 'Start SIP from Rs.100/month. Low-risk green bonds perfect for students.',
      detail: 'EcoWealth Partners offers ESG-focused green bonds with an average annual return of 7.2%. Minimum SIP is Rs.100/month with zero exit load. Your investment is SEBI-regulated and insured up to Rs.5 lakhs.',
      tag: 'Low Risk',
      tagColor: '#2E9E5B',
      tagBg: '#DFF5E1',
      minSip: 'Rs.100/mo',
      returns: '7.2% p.a.',
      icon: (color: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 3c1 5.5-1.4 12.5-6.4 15.5" /><path d="M11 20c-2.5 0-6-1.5-7-6" /></svg>,
    },
    {
      id: 1,
      name: 'Groww Student Plan',
      desc: 'Index funds with zero exit load. Ideal for long-term campus savings.',
      detail: "Groww's Student Plan gives you access to Nifty 50 index funds with no exit load and an average 10-year return of 12.4%. Best suited for goals 1+ year away. KYC takes 5 minutes.",
      tag: 'Popular',
      tagColor: '#E6A800',
      tagBg: '#FFF8DC',
      minSip: 'Rs.500/mo',
      returns: '12.4% p.a.',
      icon: (color: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>,
    },
    {
      id: 2,
      name: 'Jar Micro-savings',
      desc: 'Round-up spare change into 24K digital gold automatically.',
      detail: 'Jar rounds up every UPI payment to the nearest Rs.10 and invests the difference into 24K digital gold. Fully automated and can be withdrawn anytime. Average student saves Rs.800/month passively.',
      tag: 'Automated',
      tagColor: '#1976D2',
      tagBg: '#E8F4FD',
      minSip: 'Auto',
      returns: 'Linked to gold',
      icon: (color: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3h8l1 4H7l1-4z" /><path d="M6 7h12l-1 13a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7z" /><path d="M10 12h4" /></svg>,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-[#F8FFF9] relative">
      <div className="bg-white">
        <StatusBar />
        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center gap-1.5">
            <BeeIcon size={20} />
            <h2 className="text-[20px] font-extrabold text-gray-900">Wealth</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero banner */}
        <div className="mx-4 mt-4 bg-gradient-to-br from-[#1E7A42] via-[#2E9E5B] to-[#3DB870] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h3 className="text-[17px] font-extrabold text-white leading-snug mb-2">
                Smart Investments<br />for Students
              </h3>
              <p className="text-[11px] text-white/80 leading-relaxed mb-4">
                Unlock your financial future. Discover personalized recommendations and learn the basics of investing to make your money grow.
              </p>
              <button
                onClick={() => setShowExplore(true)}
                className="bg-white text-[#2E9E5B] font-bold text-[12px] px-5 py-2.5 rounded-full shadow-md"
              >
                Explore Investments
              </button>
            </div>
            <div className="shrink-0">
              <BeeMascot size={72} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mx-4 mt-4">
          {[
            { label: 'Total Invested', value: 'Rs.12,500', sub: 'across 3 plans', positive: false },
            { label: 'Total Returns', value: '+Rs.847', sub: '+6.77% overall', positive: true },
          ].map(s => (
            <div key={s.label} className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s.positive ? '#2E9E5B' : '#6B7280'} strokeWidth="2" className="mb-2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={`text-[16px] font-extrabold ${s.positive ? 'text-[#2E9E5B]' : 'text-gray-900'}`}>{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
              <p className="text-[10px] text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Donut chart */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-1.5 mb-4">
            <BeeIcon size={16} />
            <h3 className="text-[14px] font-bold text-gray-800">Your Portfolio Allocation</h3>
          </div>
          <DonutChart />
        </div>

        {/* Recommendations */}
        <div className="mx-4 mt-4">
          <div className="flex items-center gap-1.5 mb-3">
            <BeeIcon size={16} />
            <h3 className="text-[14px] font-bold text-gray-800">Top Recommendations</h3>
          </div>

          {recommendations.map(r => (
            <div key={r.id} className="bg-white rounded-2xl mb-3 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-4 text-left"
                onClick={() => setExpandedRec(expandedRec === r.id ? null : r.id)}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: r.tagBg }}>
                  {r.icon(r.tagColor)}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[13px] font-bold text-gray-800">{r.name}</p>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: r.tagBg, color: r.tagColor }}>{r.tag}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">{r.desc}</p>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform ${expandedRec === r.id ? 'rotate-90 bg-[#DFF5E1]' : 'bg-gray-100'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={expandedRec === r.id ? '#2E9E5B' : '#666'} strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
              {expandedRec === r.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-[12px] text-gray-600 leading-relaxed mt-3 mb-3">{r.detail}</p>
                  <div className="flex gap-3 mb-3">
                    {[{ label: 'Min SIP', value: r.minSip }, { label: 'Avg Returns', value: r.returns }].map(s => (
                      <div key={s.label} className="flex-1 bg-[#F8FFF9] rounded-xl p-3 border border-[#DFF5E1]">
                        <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
                        <p className="text-[13px] font-bold text-[#2E9E5B]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#2E9E5B] text-white font-semibold py-3 rounded-xl text-[13px]">
                    Start Investing
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomTabBar activeTab="wealth" onTabChange={onTabChange} />

      {/* Explore investments modal */}
      {showExplore && (
        <Modal title="Explore Investments" onClose={() => setShowExplore(false)}>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            BudgetBee partners with SEBI-registered investment platforms to offer you curated, student-friendly options. Start with as little as Rs.100/month.
          </p>
          {[
            { category: 'Mutual Funds', desc: 'Diversified market exposure', risk: 'Medium', ret: '10-14%' },
            { category: 'Digital Gold', desc: 'Inflation hedge, liquid', risk: 'Low-Med', ret: 'Linked to gold' },
            { category: 'Fixed Deposits', desc: 'Guaranteed, safe returns', risk: 'Very Low', ret: '6.5-7.5%' },
            { category: 'US Stocks', desc: 'Global portfolio from Rs.1', risk: 'High', ret: '12-18%' },
          ].map(i => (
            <div key={i.category} className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-[13px] font-bold text-gray-900">{i.category}</p>
                <p className="text-[11px] text-gray-500">{i.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-[#2E9E5B]">{i.ret}</p>
                <p className="text-[10px] text-gray-400">{i.risk} risk</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <PrimaryButton onClick={() => setShowExplore(false)}>Get Started</PrimaryButton>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════

const initialGoals: Goal[] = [
  { id: 1, name: 'New Laptop', categoryLabel: 'Gadgets', saved: 25000, target: 60000 },
  { id: 2, name: 'Study Abroad Fund', categoryLabel: 'Travel', saved: 8500, target: 50000 },
]

const initialTransactions: Transaction[] = [
  { id: 1, merchant: 'QuickMart Supermart', category: 'Groceries', amount: '1,250.00', date: '2024-07-28', isIncome: false },
  { id: 2, merchant: 'Campus Cafe', category: 'Food & Dining', amount: '180.00', date: '2024-07-27', isIncome: false },
  { id: 3, merchant: 'University Bookstore', category: 'Education', amount: '899.50', date: '2024-07-26', isIncome: false },
  { id: 4, merchant: 'Part-time Job', category: 'Salary', amount: '5,000.00', date: '2024-07-25', isIncome: true },
  { id: 5, merchant: 'City Bus Services', category: 'Transport', amount: '50.00', date: '2024-07-24', isIncome: false },
  { id: 6, merchant: 'Electricity Bill', category: 'Utilities', amount: '700.00', date: '2024-07-23', isIncome: false },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)

  function handleTabChange(tab: Tab) {
    setActiveTab(tab)
    if (tab === 'home') setScreen('home')
    else if (tab === 'activity') setScreen('activity')
    else if (tab === 'splitGroup') setScreen('splitGroup')
    else if (tab === 'wealth') setScreen('wealth')
  }

  function handleGoalComplete(newGoal: { name: string; categoryLabel: string; target: number }) {
    setGoals(prev => [
      ...prev,
      { id: Date.now(), name: newGoal.name, categoryLabel: newGoal.categoryLabel, saved: 0, target: newGoal.target },
    ])
    setScreen('home')
    setActiveTab('home')
  }

  function handleViewGoal(goal: Goal) {
    setSelectedGoal(goal)
    setScreen('goalDetail')
  }

  function handleAddTransaction(t: Transaction) {
    setTransactions(prev => [t, ...prev])
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)' }}>
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{ width: 375, height: 812, borderRadius: 44, border: '10px solid #1a1a1a', boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px #333, inset 0 0 0 1px #555' }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1a1a1a] rounded-b-2xl z-50" />

        <div className="w-full h-full overflow-hidden" style={{ borderRadius: 34 }}>
          {screen === 'splash' && (
            <SplashScreen onSignup={() => setScreen('onboarding')} onLogin={() => { setScreen('home'); setActiveTab('home') }} />
          )}
          {screen === 'onboarding' && (
            <OnboardingScreen onContinue={() => { setScreen('home'); setActiveTab('home') }} />
          )}
          {screen === 'home' && (
            <HomeScreen onCreateGoal={() => setScreen('goalSetup')} goals={goals} transactions={transactions} onTabChange={handleTabChange} onViewGoal={handleViewGoal} />
          )}
          {screen === 'goalSetup' && (
            <GoalSetupScreen onBack={() => { setScreen('home'); setActiveTab('home') }} onComplete={handleGoalComplete} />
          )}
          {screen === 'goalDetail' && selectedGoal && (
            <GoalDetailScreen goal={selectedGoal} onBack={() => setScreen('home')} />
          )}
          {screen === 'activity' && (
            <ActivityScreen transactions={transactions} onAddTransaction={handleAddTransaction} onTabChange={handleTabChange} />
          )}
          {screen === 'splitGroup' && (
            <SplitGroupScreen onTabChange={handleTabChange} />
          )}
          {screen === 'wealth' && (
            <WealthScreen onTabChange={handleTabChange} />
          )}
        </div>
      </div>
    </div>
  )
}
