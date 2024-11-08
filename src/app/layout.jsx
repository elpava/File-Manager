import { VAZIRMATN_FONT } from 'util/share-font'

import './globals.css'

export const metadata = {
  title: 'آپلود فایل',
  description: 'قدرت گرفته توسط Nextjs',
}

export default function RootLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"
          async
        />
      </head>
      <body className="antialiased">
        <main>{children}</main>
        <div id="modal"></div>
      </body>
    </html>
  )
}
