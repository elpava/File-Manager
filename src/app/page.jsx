import { readdir, stat } from 'fs/promises'
import path from 'path'
import { formatPath } from 'library/helper-functions'
import { ROOT, HOME_DIRECTORY, SEPARATOR } from 'library/constants'

import Upload from '@/_components/upload'
import Toolbar from '@/_components/ui/toolbar'
import Breadcrumb from '@/_components/ui/breadcrumb'
import PreveiwSections from '@/_components/preview-sections'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
  const { dir = '', byAlpha = '' } = searchParams
  let directoriesData
  const formatteddirParam = formatPath(dir)
  const fullPath = path.join(
    process.cwd(),
    ROOT,
    HOME_DIRECTORY,
    formatteddirParam,
  )
  const paths = [HOME_DIRECTORY, ...dir.split(SEPARATOR)].filter(Boolean)

  let isSort = Boolean(byAlpha)

  let directories = await readdir(fullPath, { withFileTypes: true })
  const serializedDirectories = directories.map(item => {
    let _stat

    return {
      name: item.name,
      path: item.path.endsWith(HOME_DIRECTORY)
        ? ''
        : item.path.replaceAll('\\', '/').match(`/${HOME_DIRECTORY}/(.*)?`)[1] +
          '/',
      parsedName: path.parse(path.join(item.path, item.name)),
      get stat() {
        return (
          _stat ||
          stat(
            path.join(
              process.cwd(),
              ROOT,
              HOME_DIRECTORY,
              this.path,
              this.name,
            ),
          )
        )
      },
      set stat(value) {
        _stat = value
      },
      isDirectory: item.isDirectory(),
    }
  })

  const statsPromises = serializedDirectories.map(({ stat }) => stat)
  const statsPromisesResult = await Promise.all(statsPromises)
  serializedDirectories.forEach((item, i) => {
    item.parsedName.root = item.parsedName.root.replaceAll('\\', '/')
    item.parsedName.dir = item.parsedName.dir.replaceAll('\\', '/')
    item.stat = { ...statsPromisesResult[i] }
  })

  if (isSort) {
    const clonedSerializedDirectories = JSON.parse(
      JSON.stringify(serializedDirectories),
    )
    directoriesData = clonedSerializedDirectories.sort(() => {
      if (byAlpha === 'desc') return -1
      if (byAlpha === 'asc') return 1
      return 0
    })
  } else {
    directoriesData = serializedDirectories
  }

  return (
    <section className="flex h-svh flex-col gap-4">
      <div className="p-2">
        <Upload />
      </div>

      <div className="flex grow flex-col bg-stone-100">
        <div className="flex items-center border-b border-t border-stone-400 [&>*+*]:border-r [&>*+*]:border-stone-400">
          <Toolbar />
          <Breadcrumb path={paths} />
        </div>

        <PreveiwSections directories={directoriesData} />
      </div>
    </section>
  )
}
