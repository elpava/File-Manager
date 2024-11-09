import Link from 'next/link'
import { HOME_DIRECTORY, SEPARATOR } from 'library/constants'

import IconWrapper from './icon-wrapper'
import { Home, ArrowUp } from 'lucide-react'

export default function Breadcrumb({ path = [] }) {
  const clonedPath = [...path]
  let trackPath = ''

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

      {clonedPath.map(directory => {
        const isRoot = directory === HOME_DIRECTORY
        if (!isRoot) {
          if (!trackPath) {
            trackPath = directory
          } else {
            trackPath += SEPARATOR + directory
          }
        }

        return (
          <div key={directory} className="flex gap-1">
            <Link href={{ query: { dir: trackPath } }}>{directory}</Link>
            <div>/</div>
          </div>
        )
      })}
    </div>
  )
}
