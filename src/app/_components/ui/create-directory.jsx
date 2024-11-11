'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import createDirectoryAction from 'action/create-dir'
import { formatPath } from 'library/utils'

import Modal from './modal'
import TextField from './text-field'
import IconWrapper from './icon-wrapper'
import { FolderPlus, Plus } from 'lucide-react'

export default function CreateDirectory() {
  const dirParam = useSearchParams().get('dir') ?? ''
  const [showModal, setShowModal] = React.useState(false)
  const inputRef = React.useRef(null)

  const formatteddirParam = formatPath(dirParam)

  React.useEffect(() => {
    if (showModal) {
      inputRef.current.focus()
    }
  }, [showModal])

  function toggleModalHandler() {
    setShowModal(prev => !prev)
  }

  async function submitFormHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const directoryName = formData.get('directoryName')

    const pathWithDirectoryName = `${formatteddirParam}/${directoryName}`

    await createDirectoryAction(pathWithDirectoryName)

    toggleModalHandler()
  }

  return (
    <div>
      <IconWrapper onClick={toggleModalHandler}>
        <FolderPlus />
      </IconWrapper>

      {showModal && (
        <Modal onClose={toggleModalHandler}>
          <form className="flex flex-col gap-4" onSubmit={submitFormHandler}>
            <label htmlFor="directoryName">نام فولدر جدید</label>

            <div className="flex flex-wrap gap-2">
              <TextField
                ref={inputRef}
                className="grow"
                id="directoryName"
                name="directoryName"
                type="text"
              />
              <button
                className="rounded-md bg-green-300 p-2 transition-[background] hover:bg-green-200"
                type="submit"
              >
                <Plus />
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
