'use client'

import * as React from 'react'

export default function SnippetCode({ className, code }) {
  const adjustedSnippet = code
    .split('\n')
    .filter(Boolean)
    .map(line => line)
    .join('\n')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.hljs) {
        window.hljs.highlightAll()
      }
    }
  }, [])

  return (
    <div className={className}>
      <pre
        className="rounded-md bg-slate-400 p-2 font-bold text-stone-100"
        style={{ direction: 'ltr' }}
      >
        {/* prettier-ignore-start  */}
        <code className="language-javascript whitespace-pre-wrap">
          {adjustedSnippet}
        </code>
        {/* prettier-ignore-end  */}
      </pre>
    </div>
  )
}
