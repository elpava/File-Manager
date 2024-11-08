'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import useStore from 'hook/useStore'
import useEscapeKey from 'hook/useEscapeKey'
import renameItemAction from 'action/rename-item'
import deleteItemAction from 'action/delete-item'
import {
  filenameRegex,
  extensionRegex,
  invalidFilenameRegex,
  ltrRegex,
} from 'library/regex'

import TextField from '@/_components/ui/text-field'
import ContextMenu from '@/_components/ui/context-menu'
import Modal from './modal'

export default function FileInfo({ path, filename }) {
  const currentFilename = filename.match(filenameRegex)[1]
  const { dispatch } = useStore()
  const formRef = React.useRef()
  const inputRef = React.useRef()
  const inputTouchedRef = React.useRef()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [renamedFilename, setRenamedFilename] = React.useState('')
  const [showModal, setShowModal] = React.useState(null)
  const pathAndFilename = path + filename

  useEscapeKey(!showModal ? cancelAllOperation : () => {})

  function cancelAllOperation() {
    resetRenameState()
    cancelOperation()
  }

  const isLtr = ltrRegex.test(
    renamedFilename ? renamedFilename : currentFilename,
  )
  const extension = filename.match(extensionRegex)[1]

  React.useEffect(() => {
    const handleClick = e => {
      if (!formRef.current?.contains(e.target)) {
        if (selectedFile) {
          resetRenameState()
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [selectedFile])

  function copyHandler() {
    operation('copy')
  }

  function moveHandler() {
    operation('move')
  }

  function operation(type) {
    dispatch({
      type: 'operation',
      payload: { type, sourcePath: pathAndFilename },
    })
  }

  function cancelOperation() {
    dispatch({ type: 'operation', payload: { type: null, sourcePath: null } })
  }

  function renameHandler() {
    setSelectedFile(filename)
  }

  function changeInputHandler(e) {
    const { value, style, scrollHeight } = e.target

    if (invalidFilenameRegex.test(value)) return

    if (value) {
      style.height = scrollHeight + 'px'
    } else {
      style.height = 'auto'
    }

    inputTouchedRef.current = true
    setRenamedFilename(value)
  }

  async function keyPressInputHandler(e) {
    const { key } = e

    if (key === 'Enter') {
      e.preventDefault()

      if (renamedFilename) {
        const oldPath = pathAndFilename
        const newPath = path + renamedFilename + `.${extension}`
        const result = await renameItemAction(oldPath, newPath)
        if (result?.exist) {
          setShowModal(true)
        }
      }
    }
  }

  function closeModalHandler() {
    setShowModal(false)
    setSelectedFile(filename)
  }

  function resetRenameState() {
    inputTouchedRef.current = false
    setSelectedFile('')
    setRenamedFilename('')
  }

  function deleteHandler() {
    const confirmDeletion = confirm(`فایل ${filename} حذف شود؟`)
    if (confirmDeletion) {
      deleteItemAction(pathAndFilename)
    }
  }

  return (
    <div className={clsx('[--height:2rem]', 'grid gap-2')}>
      {selectedFile === filename ? (
        <form ref={formRef}>
          <TextField
            ref={inputRef}
            inputClassName="min-h-[var(--height)] resize-none overflow-hidden text-sm transition-[height]"
            style={{ direction: isLtr ? 'ltr' : 'rtl' }}
            element="textarea"
            type="text"
            name="rename"
            rows={1}
            value={inputTouchedRef.current ? renamedFilename : currentFilename}
            onChange={changeInputHandler}
            onKeyPress={keyPressInputHandler}
          />
        </form>
      ) : (
        <div className="truncate text-center leading-[var(--height)]">
          {currentFilename}
        </div>
      )}

      <ContextMenu
        onCopy={copyHandler}
        onMove={moveHandler}
        onRename={renameHandler}
        onDelete={deleteHandler}
      />

      {showModal && (
        <Modal onClose={closeModalHandler}>
          <div>
            <h3 className="font-bold">تغییر نام انجام نشد</h3>

            <div className="mb-10 pr-2">
              <p>
                در مقصد یک فایل با نام{' '}
                <span className="rounded-md bg-stone-300 px-2 py-1">
                  {renamedFilename}
                </span>{' '}
                وجود دارد.
              </p>
              <p>نام دیگری را انتخاب نمایید یا نام فایل مشابه را تغییر دهید.</p>
            </div>

            <div className="text-left">
              <button
                className="rounded-md bg-stone-800 p-2 text-stone-100 transition-[background] hover:bg-stone-500"
                onClick={closeModalHandler}
              >
                بستن پیام
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
