'use server'

import { access, rename } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

import { ROOT, HOME_DIRECTORY } from 'library/constants'
import { checkItemExistance } from 'library/server/helper'

export default async function moveItemAction(
  oldPath,
  newPath,
  replaceConfirmation,
  duplicateConfirmation,
) {
  const oldFullPath = path.join(process.cwd(), ROOT, HOME_DIRECTORY, oldPath)
  let newFullPath = path.join(process.cwd(), ROOT, HOME_DIRECTORY, newPath)
  const parsedOldFullPath = path.parse(oldFullPath)
  const confirmation = replaceConfirmation || duplicateConfirmation

  if (!confirmation) {
    const newFullPathWithItemName = path.join(
      newFullPath,
      parsedOldFullPath.base,
    )

    const isItemExist = await checkItemExistance(newFullPathWithItemName)

    if (isItemExist) return { exist: true }
  }

  newFullPath = path.join(
    newFullPath,
    duplicateConfirmation
      ? `${parsedOldFullPath.name}-copy${parsedOldFullPath.ext}`
      : parsedOldFullPath.base,
  )
  try {
    await rename(oldFullPath, newFullPath)
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }

  return null
}
