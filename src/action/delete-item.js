'use server'

import { rm } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

import { ROOT, HOME_DIRECTORY } from 'library/constants'

export default async function deleteItemAction(itemPathWithNewName) {
  const fullPath = path.join(
    process.cwd(),
    ROOT,
    HOME_DIRECTORY,
    itemPathWithNewName,
  )

  try {
    await rm(fullPath, { recursive: true })
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }
}
