import Image from 'next/image'
import clsx from 'clsx/lite'
import { HOME_DIRECTORY } from 'library/constants'
import { extensionRegex, isValidImageRegex } from 'library/regex'

import FileInfo from '@/_components/ui/file-info'
import DefaultThumb from '/public/default_thumbnail.jpg'

export default function Files({ filenames }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,10rem)]">
      {filenames.map(({ path, name }) => (
        <div key={name} className="p-2">
          <div
            className={clsx(
              'grid gap-2 rounded-md border-[0.5px] border-stone-400 p-2 transition-[transform]',
              'hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200',
            )}
          >
            <div className="relative isolate h-32 select-none overflow-hidden rounded-md border-2 border-yellow-500">
              {isValidImageRegex.test(name) ? (
                <Image
                  src={`/${HOME_DIRECTORY}/${path + name}?v=${Date.now()}`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
                />
              ) : (
                <Image
                  src={DefaultThumb}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
                />
              )}
              <span className="absolute left-0 top-0 rounded-br-md bg-stone-500/50 px-1.5 py-1 text-xs text-stone-50 mix-blend-difference backdrop-blur-sm">
                {name.match(extensionRegex)[1]}
              </span>
            </div>

            <FileInfo path={path} filename={name} />
          </div>
        </div>
      ))}
    </div>
  )
}
