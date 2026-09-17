function Input({label, error, className = '', ...rest}) {
  return (
    <label className='flex w-full flex-col gap-1.5'>
        {label && (
            <span className='text-xs font-semibold tracking-wide text-slate-500 uppercase'>{label}</span>
        )}
        <input
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                error
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                    : 'border-rose-200 focus:border-rose-400 focus:ring-rose-200'
            } ${className}`}
            {...rest}
        />
        {error && <span className='text-xs text-red-500'>{error}</span>}
    </label>
  )
}

export default Input
