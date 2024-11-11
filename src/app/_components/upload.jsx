'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import { useFormStatus, useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import uploadFileAction from 'action/upload-file'
import { formatPath, returnFileSize } from 'library/utils'
import { fileTypeRegex } from 'library/regex'

import Tag from '@/_components/ui/tag'
import {
  Upload as UploadIcon,
  File,
  RefreshCw,
  ArrowUpFromLine,
  X,
  LoaderCircle,
  Check,
} from 'lucide-react'

const initilaState = { status: '' }

export default function Upload() {
  const searchParams = useSearchParams()
  const dirParam = searchParams.get('dir') ?? ''
  const formattedDirParam = formatPath(dirParam)
  const [state, action] = useFormState(uploadFileAction, initilaState)
  const [uploadFile, setUploadFile] = React.useState(null)
  const [uploadStatus, setUploadStatus] = React.useState('idle')
  const filename = uploadFile && uploadFile.length && uploadFile[0].name

  const isEmptyUpload = !uploadFile
  const isSuccessful = uploadStatus === 'success'

  React.useEffect(() => {
    let timeout
    if (state?.status === 'success') {
      setUploadStatus('success')

      timeout = setTimeout(() => {
        setUploadStatus('idle')
        setUploadFile(null)
      }, 3000)
    }

    return () => clearTimeout(timeout)
  }, [state])

  function changeInputHandler(e) {
    const files = e.target.files

    if (files.length) {
      setUploadFile(files)
    } else {
      setUploadFile(null)
    }
  }

  function resetInputHandler() {
    setUploadFile(null)
    setUploadStatus('idle')
  }

  return (
    <div className="rounded-md p-2 shadow-sm shadow-slate-500 transition-[box-shadow]">
      <form
        action={action}
        className={clsx(
          'relative grid gap-6 rounded-md text-center transition-[padding]',
          isEmptyUpload && 'px-4 py-6',
          !isEmptyUpload && 'p-8',
        )}
      >
        {isEmptyUpload && (
          <div>
            <div className="space-y-4">
              <div className="grid place-items-center">
                <File
                  size={64}
                  className="col-start-1 row-start-1"
                  absoluteStrokeWidth
                />
                <UploadIcon className="col-start-1 row-start-1 mt-2" />
              </div>
              <div>از اینجا می‌توانید فایل خود را بارگذاری نمایید</div>
            </div>
          </div>
        )}

        <label
          className={clsx(
            'rounded-md border-dashed transition-[inset,border-color,padding] duration-[850ms]',
            isEmptyUpload &&
              'size-full border-4 border-blue-400 position-center',
            !isEmptyUpload &&
              'relative mx-auto w-max border-2 border-emerald-400 px-4 py-2',
          )}
          htmlFor="file"
        >
          <input
            id="file"
            type="file"
            name="file"
            className="size-full cursor-pointer opacity-0 position-center"
            disabled={isSuccessful}
            onChange={changeInputHandler}
          />
          {!isEmptyUpload && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>حجم فایل</div>
                <div>{returnFileSize(uploadFile[0]?.size)}</div>
                <div>نوع فایل</div>
                <div>{uploadFile[0]?.type.match(fileTypeRegex)[1]}.</div>
              </div>

              {!isSuccessful && (
                <div className="flex items-center rounded-md bg-stone-200 p-2">
                  <div>بارگذاری مجدد</div>
                  <RefreshCw className="mx-auto" />
                </div>
              )}
            </div>
          )}
        </label>
        <input type="hidden" name="directoryPath" value={formattedDirParam} />

        {!isEmptyUpload && (
          <div className="space-y-4">
            <div>
              فایل <Tag>{filename}</Tag> مجاز است
            </div>
            <div className="space-x-2 space-x-reverse">
              <SubmitButton isSuccessful={isSuccessful} />
              <Button
                type="reset"
                title="انصراف"
                renderIcon={<X />}
                onClick={resetInputHandler}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

function SubmitButton({ isSuccessful }) {
  let { pending } = useFormStatus()
  const title = isSuccessful
    ? 'بارگذاری شد'
    : pending
      ? 'در حال بارگذاری'
      : 'بارگذاری'

  const icon = isSuccessful ? (
    <Check />
  ) : pending ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <ArrowUpFromLine />
  )

  return (
    <Button type="submit" title={title} renderIcon={icon} disabled={pending} />
  )
}

function Button({ className, type, title, disabled, renderIcon, onClick }) {
  const isSubmit = type === 'submit'
  const isReset = type === 'reset'

  return (
    <button
      className={clsx(
        'group inline-flex h-max min-w-32 rounded-md text-stone-100 transition-[background] disabled:bg-stone-300',
        '*:p-1.5',
        isSubmit && 'bg-blue-500 hover:bg-blue-600',
        isReset && 'bg-red-500 hover:bg-red-600',
        className,
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="grow">{title}</span>
      <span
        className={clsx(
          'mr-auto aspect-square rounded-md border-r border-r-transparent transition-[box-shadow,scale]',
          'group-hover:scale-[1.1] group-hover:border-r',
          '',
          disabled &&
            'bg-stone-600 [box-shadow:2px_0px_0px_0px_#78716c] group-hover:border-r-stone-800',
          isSubmit &&
            'bg-blue-600 group-hover:border-r-blue-800 group-hover:[box-shadow:2px_0px_0px_0px_#3b82f6]',
          isReset &&
            'bg-red-600 group-hover:border-r-red-800 group-hover:[box-shadow:2px_0px_0px_0px_#ef4444]',
        )}
      >
        {renderIcon}
      </span>
    </button>
  )
}
