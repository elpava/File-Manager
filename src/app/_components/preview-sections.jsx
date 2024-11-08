import clsx from 'clsx/lite'

import Wrapper from '@/_components/ui/wrapper'
import Files from './files'
import Directories from './directories'
import EmptyFolderMessage from './ui/empty-folder-message'
import { FolderPlus } from 'lucide-react'

export default function PreveiwSections({ directories }) {
  const directoriesFilename = []
  const filesFilename = []

  let isDirectory = false
  let isFile = false

  directories.forEach(item =>
    item.name && item.isDirectory
      ? directoriesFilename.push(item)
      : filesFilename.push(item),
  )

  isDirectory = directoriesFilename.length > 0
  isFile = filesFilename.length > 0

  return (
    <div className="flex h-full flex-col">
      <Wrapper title="فولدرها">
        {isDirectory ? (
          <Directories directories={directoriesFilename} />
        ) : (
          <EmptyFolderMessage
            message={
              <span>
                فولدری برای نمایش وجود ندارد. می‌توانید با استفاده از ساخت فولدر
                ( <FolderPlus className="inline-block" /> ) یک فولدر بسازید.
              </span>
            }
          />
        )}
      </Wrapper>

      <hr className="border-b border-dashed border-b-orange-500" />

      <Wrapper title="فایل‌ها" className={clsx(!isFile && 'h-full')}>
        {isFile ? (
          <Files filenames={filesFilename} />
        ) : (
          <EmptyFolderMessage
            message={
              'فایلی برای نمایش وجود ندارد. می‌توانید از بخش آپلود فایل خود را بارگزاری نمایید.'
            }
          />
        )}
      </Wrapper>
    </div>
  )
}
