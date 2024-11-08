'use server'

import { access, rename } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

import { ROOT, HOME_DIRECTORY } from 'library/constants'

export default async function renameItemAction(oldPath, newPath) {
  const oldFullPath = path.join(process.cwd(), ROOT, HOME_DIRECTORY, oldPath)
  const newFullPath = path.join(process.cwd(), ROOT, HOME_DIRECTORY, newPath)
  const parsedNewFullPath = path.parse(newFullPath)
  const newFullPathWithItemName = path.join(
    parsedNewFullPath.dir,
    parsedNewFullPath.base,
  )

  const itemExistance = await access(newFullPathWithItemName)
    .then(() => true)
    .catch(() => false)
  if (itemExistance) return { exist: true }

  try {
    await rename(oldFullPath, newFullPath)
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }
}
