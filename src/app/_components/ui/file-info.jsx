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
import Tag from './tag'
import { Ellipsis } from 'lucide-react'

export default function FileInfo({ path, filename }) {
  const currentFilename = filename.match(filenameRegex)[1]
  const { dispatch } = useStore()
  const formRef = React.useRef()
  const menuRef = React.useRef()
  const inputRef = React.useRef()
  const inputTouchedRef = React.useRef()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [renamedFilename, setRenamedFilename] = React.useState('')
  const [renamedFilenameError, setRenamedFilenameError] = React.useState('')
  const [showMenu, setShowMenu] = React.useState(null)
  const [showModal, setShowModal] = React.useState(null)
  const pathAndFilename = path + filename

  useEscapeKey(!showModal ? cancelAllOperation : () => {})

  const extension = filename.match(extensionRegex)[1]

  const isLtr = ltrRegex.test(
    renamedFilename ? renamedFilename : currentFilename,
  )
  const isInvalidFilenameError = renamedFilenameError === 'invalid'

  React.useEffect(() => {
    const handleClick = e => {
      if (!formRef.current?.contains(e.target)) {
        if (selectedFile) {
          resetRenameState()
        }
      }

      if (!menuRef.current?.contains(e.target)) {
        if (showMenu) {
          setShowMenu(false)
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [showMenu, selectedFile])

  function cancelAllOperation() {
    resetRenameState()
    cancelOperation()
  }

  function toggleMenuHandler() {
    setShowMenu(prev => !prev)
  }

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
    dispatch({ type: 'operation', payload: { type: '', sourcePath: '' } })
  }

  function renameHandler() {
    setSelectedFile(filename)
  }

  function changeInputHandler(e) {
    const { value, style, scrollHeight } = e.target

    if (invalidFilenameRegex.test(value)) {
      setRenamedFilenameError('invalid')
      return
    }

    if (isInvalidFilenameError) {
      setRenamedFilenameError('')
    }

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
    <div
      className={clsx(
        '[--height:2rem]',
        'relative isolate grid border-inherit',
      )}
    >
      {selectedFile === filename ? (
        <form ref={formRef} className="z-[1]">
          <TextField
            ref={inputRef}
            inputClassName="min-h-[var(--height)] resize-none overflow-hidden text-sm transition-[height]"
            style={{ direction: isLtr ? 'ltr' : 'rtl' }}
            element="textarea"
            type="text"
            name="rename"
            rows={1}
            value={inputTouchedRef.current ? renamedFilename : currentFilename}
            isError={isInvalidFilenameError}
            onChange={changeInputHandler}
            onKeyPress={keyPressInputHandler}
          />
        </form>
      ) : (
        <div className="z-[-1] truncate text-center leading-[var(--height)]">
          {currentFilename}
        </div>
      )}

      <div
        ref={menuRef}
        className={clsx(
          'relative z-[0] -mb-4 cursor-pointer rounded-md border-[0.5px] transition-[background,border-color,shadow] hover:shadow-md hover:shadow-stone-200',
          showMenu && 'border-slate-500 bg-slate-500 hover:bg-slate-400',
          !showMenu &&
            'border-inherit bg-stone-100 hover:border-slate-600 hover:bg-stone-200',
        )}
        onClick={toggleMenuHandler}
      >
        <Ellipsis size={16} className="mx-auto" />

        {showMenu && (
          <ContextMenu
            className="absolute bottom-full left-1/2 -translate-x-1/2 rounded-tl-md rounded-tr-md border-[1.5px] border-b-[0px] border-inherit bg-slate-300 p-1"
            onCopy={copyHandler}
            onMove={moveHandler}
            onRename={renameHandler}
            onDelete={deleteHandler}
          />
        )}
      </div>

      {showModal && (
        <Modal onClose={closeModalHandler}>
          <div>
            <h3 className="font-bold">تغییر نام انجام نشد</h3>

            <div className="mb-10 pr-2">
              <p>
                در مقصد یک فایل با نام <Tag>{renamedFilename}</Tag> وجود دارد.
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
