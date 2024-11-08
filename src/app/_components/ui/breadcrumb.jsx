import Link from 'next/link'
import { SEPARATOR } from 'library/constants'

import IconWrapper from './icon-wrapper'
import { Home, ArrowUp } from 'lucide-react'

export default function Breadcrumb({ path = [] }) {
  const clonedPath = [...path]
  const isMultiDir = clonedPath.length > 1

  const removedLastItemFromPath = clonedPath.slice(1, -1).join(SEPARATOR)

  const query = { ...(isMultiDir && { dir: removedLastItemFromPath }) }

  return (
    <div className="flex items-end gap-1 p-2 text-lg">
      {isMultiDir ? (
        <IconWrapper>
          <Link href={{ query }}>
            <ArrowUp />
          </Link>
        </IconWrapper>
      ) : (
        <IconWrapper flat={true}>
          <Home />
        </IconWrapper>
      )}

      {clonedPath.map(directory => (
        <div key={directory} className="flex gap-1">
          <Link href="#">{directory}</Link>
          <div>/</div>
        </div>
      ))}
    </div>
  )
}
