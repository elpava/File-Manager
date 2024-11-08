'use client'

import * as React from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import uploadFileAction from 'action/upload-file'
import { formatPath } from 'library/helper-functions'

import { LoaderCircle, Check } from 'lucide-react'

export default function Upload() {
  const searchParams = useSearchParams()
  const dirParam = searchParams.get('dir') ?? ''
  const formattedDirParam = formatPath(dirParam)
  const [state, action] = useFormState(uploadFileAction, { status: '' })
  const inputRef = React.useRef(null)
  const [uploadStatus, setUploadStatus] = React.useState('idle')

  const isSuccessful = uploadStatus === 'success'

  React.useEffect(() => {
    let timeout
    if (state.status === 'success') {
      inputRef.current.value = ''
      setUploadStatus('success')

      timeout = setTimeout(() => {
        setUploadStatus('idle')
      }, 3000)
    }

    return () => clearTimeout(timeout)
  }, [state])

  return (
    <div className="relative w-max rounded-md bg-stone-200 p-4">
      <form action={action}>
        <input ref={inputRef} type="file" name="file" />
        <input type="hidden" name="directoryPath" value={formattedDirParam} />
        <SubmitButton isSuccessful={isSuccessful} />
      </form>
    </div>
  )
}

function SubmitButton({ isSuccessful }) {
  let { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-10 w-28 rounded-md bg-green-400 p-2 disabled:bg-gray-300"
    >
      {isSuccessful ? (
        <Check className="w-full" />
      ) : pending ? (
        <LoaderCircle className="w-full animate-spin" />
      ) : (
        'بارگزاری'
      )}
    </button>
  )
}
