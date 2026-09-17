const tones = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200'
}

function Badge({tone = 'slate', className = '', children}) {
  return (
    <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${tones[tone]} ${className}`}
    >
        {children}
    </span>
  )
}

export default Badge
