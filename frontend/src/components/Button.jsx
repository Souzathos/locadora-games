const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-transparent disabled:shadow-none'

const variants = {
    primary: 'bg-rose-500 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700',
    secondary: 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-700',
    danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
    ghost: 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'
}

const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm'
}

function Button({variant = 'primary', size = 'md', loading = false, disabled = false, className = '', children, ...rest}) {
  return (
    <button
        disabled={disabled || loading}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...rest}
    >
        {loading && (
            <span className='h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent' />
        )}
        {children}
    </button>
  )
}

export default Button
