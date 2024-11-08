import clsx from 'clsx/lite'

export default function EmptyFolderMessage({ className, message }) {
  return (
    <div
      className={clsx(
        'grid h-full place-items-center rounded-md bg-yellow-200 p-4',
        className,
      )}
    >
      {message}
    </div>
  )
}
