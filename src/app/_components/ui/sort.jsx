'use client'

import * as React from 'react'
import clsx from 'clsx/lite'
import { useRouter, useSearchParams } from 'next/navigation'

import IconWrapper from './icon-wrapper'
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'

const oppositeSortValues = { asc: 'desc', desc: 'asc' }

export default function Sort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  let dirParam = searchParams.get('dir')
  let byAlphaParam = searchParams.get('byAlpha') || 'asc'
  let queryString

  const isAlphabetDesc = byAlphaParam === 'desc'

  dirParam = dirParam && `dir=${dirParam}`
  byAlphaParam = `byAlpha=${oppositeSortValues[byAlphaParam]}`

  queryString = [dirParam, byAlphaParam].filter(Boolean).join('&')
  queryString = queryString ? `/?${queryString}` : ''

  function clickSortHandler() {
    router.push(queryString)
  }

  return (
    <div>
      <IconWrapper
        className={clsx(isAlphabetDesc && 'outline outline-2 outline-blue-700')}
        onClick={clickSortHandler}
      >
        {isAlphabetDesc ? <ArrowUpAZ /> : <ArrowDownAZ />}
      </IconWrapper>
    </div>
  )
}
