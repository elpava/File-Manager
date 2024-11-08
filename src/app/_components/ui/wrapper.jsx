import clsx from 'clsx/lite'

export default function Wrapper({ children, className, title }) {
  return (
    <section className={clsx('flex flex-col p-4', className)}>
      <h3 className="font-bold">{title}</h3>

      {children}
    </section>
  )
}
