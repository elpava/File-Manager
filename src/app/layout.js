import { VAZIRMATN_FONT } from 'util/share-font'

import './globals.css'

export const metadata = {
  title: 'آپلود فایل',
  description: 'قدرت گرفته توسط Nextjs',
}

export default function RootLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
