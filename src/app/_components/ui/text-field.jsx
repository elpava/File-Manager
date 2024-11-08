import * as React from 'react'
import clsx from 'clsx/lite'
import { DIR_MAX_LEN } from 'library/constants'

export default React.forwardRef(function TextField(
  {
    className,
    inputClassName,
    style,
    id,
    name,
    type = 'text',
    value,
    element = 'input',
    maxLength = DIR_MAX_LEN,
    minLength = 1,
    rows,
    disabled,
    onFocus,
    onBlur,
    onChange,
    onKeyPress,
  },
  ref,
) {
  const internalRef = React.useRef()
  const Element = element
  const remainChars = value ? DIR_MAX_LEN - value.length : undefined

  React.useImperativeHandle(ref, () => ({
    focus() {
      internalRef.current.focus()
    },
    blur() {
      internalRef.current.blur()
    },
    select() {
      internalRef.current.select()
    },
    scrollTo() {
      internalRef.current.scrollIntoView()
    },
  }))

  React.useEffect(() => {
    const input = internalRef.current
    if (input && element === 'textarea') {
      input.select()
    }
  }, [element])

  return (
    <div className={clsx('relative', className)}>
      <Element
        ref={internalRef}
        className={clsx(
          'block h-full w-full rounded-md border border-indigo-300 px-2 py-1 caret-indigo-500 transition-[outline]',
          'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500',
          inputClassName,
        )}
        style={style}
        id={id}
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        rows={rows}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />

      {remainChars < DIR_MAX_LEN && (
        <span className="absolute -bottom-2.5 left-1.5 rounded-md border-[0.5px] border-stone-700 bg-stone-100/20 px-1 text-xs text-stone-700 backdrop-blur-sm">
          {remainChars}
        </span>
      )}
    </div>
  )
})
