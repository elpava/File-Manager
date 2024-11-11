'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import { useSearchParams } from 'next/navigation'
import useStore from 'hook/useStore'
import copyItemAction from 'action/copy-item'
import moveItemAction from 'action/move-item'
import { formatPath } from 'library/utils'

import Modal from './modal'
import Tag from './tag'
import IconWrapper from './icon-wrapper'
import { ClipboardList } from 'lucide-react'

export default function PasteItem() {
  const dirParam = useSearchParams().get('dir') ?? ''
  const { dispatch, useStoreState } = useStore()
  const operation = useStoreState('operation')
  const { type: operationType, sourcePath } = operation
  const [showModal, setShowModal] = React.useState(false)
  const destFormattedPath = formatPath(dirParam)

  const isCopy = operationType === 'copy'
  const isMove = operationType === 'move'

  function toggleModalHandler() {
    setShowModal(prev => !prev)
    cancelOperation()
  }

  function cancelOperation() {
    dispatch({ type: 'operation', payload: { type: null, sourcePath: null } })
  }

  function replaceHandler() {
    pasteHandler(true, false)
    toggleModalHandler()
  }

  function duplicateHandler() {
    pasteHandler(false, true)
    toggleModalHandler()
  }

  async function pasteHandler(replaceConfirmation, duplicateConfirmation) {
    let result

    if (isCopy) {
      result = await copyItemAction(
        sourcePath,
        destFormattedPath,
        replaceConfirmation,
        duplicateConfirmation,
      )
    }

    if (isMove) {
      result = await moveItemAction(
        sourcePath,
        destFormattedPath,
        replaceConfirmation,
        duplicateConfirmation,
      )
    }

    if (result?.exist) {
      setShowModal(true)
    } else {
      cancelOperation()
    }
  }

  return (
    <div>
      <IconWrapper disabled={!sourcePath} onClick={() => pasteHandler()}>
        <ClipboardList />
      </IconWrapper>

      {showModal && (
        <Modal onClose={toggleModalHandler}>
          <div>
            <h3 className="mb-10">
              در مقصد یک فایل با نام <Tag>{sourcePath}</Tag> وجود دارد:
            </h3>

            <div
              className={clsx(
                'flex flex-wrap justify-between gap-2',
                '*:grow *:basis-1/5 *:rounded-md *:bg-stone-800 *:p-2 *:text-stone-100 *:transition-[background] hover:*:bg-stone-500',
              )}
            >
              <button onClick={replaceHandler}>جایگزین کردن</button>
              <button onClick={duplicateHandler}>
                {isCopy ? 'ایجاد کپی' : 'تغییر نام و انتقال'}
              </button>
              <button onClick={toggleModalHandler}>
                انصراف از {isCopy ? 'کپی' : 'انتقال'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
