import clsx from 'clsx/lite'

export default function IconWrapper({
  children,
  className,
  flat,
  disabled,
  onClick,
}) {
  return (
    <button
      className={clsx(
        'rounded-md p-0.5 transition-[background,outline]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500',
        '*:*:stroke-[1.5px] *:stroke-[1.5px]',
        !flat &&
          !disabled &&
          '*:stroke-stone-950 *:transition-[stroke] hover:bg-stone-200 hover:*:stroke-stone-500',
        flat && 'cursor-default',
        disabled && '*:stroke-stone-400',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
