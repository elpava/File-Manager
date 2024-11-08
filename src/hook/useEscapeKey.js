'use client'

import * as React from 'react'

export default function useEscapeKey(onKeydown) {
  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        onKeydown()
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => document.removeEventListener('keydown', handleKeydown)
  }, [onKeydown])
}
