'use client'

import * as React from 'react'
import Link from 'next/link'
import clsx from 'clsx/lite'
import { useRouter, useSearchParams } from 'next/navigation'
import { SEPARATOR } from 'library/constants'

import { Folder } from 'lucide-react'

export default function Directories({ directories }) {
  const { push } = useRouter()
  let dirParam = useSearchParams().get('dir')
  let byAlphaParam = useSearchParams().get('byAlpha')
  const addedSeparator = dirParam ? dirParam + SEPARATOR : ''

  React.useEffect(() => {
    if (!dirParam) push(byAlphaParam ? `/?byAlpha=${byAlphaParam}` : '/')
  }, [byAlphaParam, dirParam, push])

  return (
    <div className="grid grid-cols-[repeat(auto-fit,11rem)]">
      {directories.map(({ name }) => (
        <div key={name} className="p-1">
          <Link
            className={clsx(
              'group flex min-w-40 gap-2 rounded-sm border-[0.5px] border-stone-400 bg-stone-100 px-2 py-1 transition-[transform]',
              'hover:-translate-y-0.5 hover:shadow-sm hover:shadow-stone-300',
            )}
            href={{ query: { dir: addedSeparator + name } }}
          >
            <Folder className="shrink-0 basis-5 transition-[fill,stroke] group-hover:fill-yellow-500 group-hover:stroke-yellow-800" />
            <span className="truncate">{name}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
