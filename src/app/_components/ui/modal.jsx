'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx/lite'

import SnippetCode from './snippet-code'
import { X } from 'lucide-react'

export default function Modal({ children, className, onClose }) {
  const codeSnippet = `
  <Modal>
     <Content />
  </Modal>`

  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  function closeHandler() {
    onClose()
  }

  return createPortal(
    <div className="fixed left-0 top-0 z-50 grid size-full place-content-center overscroll-none bg-stone-950/40">
      <div className="flex max-h-[90svh] flex-col">
        <div
          className={clsx(
            'relative mr-6 w-max rounded-tl-md rounded-tr-md bg-stone-200 p-1',
            'before:absolute before:bottom-0 before:right-full before:size-4 before:rounded-br-full before:content-[""] before:[box-shadow:4px_4px_0_4px_#e7e5e4]',
            'after:absolute after:bottom-0 after:left-full after:size-4 after:rounded-bl-full after:content-[""] after:[box-shadow:-4px_4px_0_4px_#e7e5e4]',
          )}
        >
          <button
            className={
              'relative z-10 rounded-md bg-red-300 p-2 transition-[background] hover:bg-red-200'
            }
            onClick={closeHandler}
          >
            <X className="stroke-red-950" />
          </button>
        </div>

        <div
          className={clsx(
            'flex grow items-center justify-center rounded-md bg-stone-200 p-8',
            className,
          )}
        >
          {children ? (
            children
          ) : (
            <div>
              <div className="mb-4">
                هیچ محتوایی برای نمایش تعریف نشده است. باید از Modal به صورت زیر
                استفاده نمایید:
              </div>

              <SnippetCode
                className="border-t border-stone-400 pt-2"
                code={codeSnippet}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  )
}
