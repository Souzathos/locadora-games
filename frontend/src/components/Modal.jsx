import { useEffect } from 'react'

function Modal({open, title, onClose, children}) {
    useEffect(() => {
        if (!open) return

        function onKeyDown(e) {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open, onClose])

    if (!open) return null

  return (
    <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm'
        onClick={onClose}
    >
        <div
            className='w-full max-w-md rounded-2xl border border-rose-100 bg-white shadow-xl'
            onClick={(e) => e.stopPropagation()}
        >
            <div className='flex items-center justify-between border-b border-rose-100 px-5 py-4'>
                <h2 className='font-semibold text-slate-800'>{title}</h2>
                <button
                    type='button'
                    onClick={onClose}
                    aria-label='Fechar'
                    className='cursor-pointer rounded-lg px-2 text-xl leading-none text-slate-400 transition hover:bg-rose-50 hover:text-rose-600'
                >
                    &times;
                </button>
            </div>
            <div className='p-5'>{children}</div>
        </div>
    </div>
  )
}

export default Modal
