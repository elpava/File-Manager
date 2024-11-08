'use server'

import { mkdir } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

import { ROOT, HOME_DIRECTORY } from 'library/constants'

export default async function createDirectoryAction(
  directoryPathWithNewDirectory,
) {
  const fullPath = path.join(
    process.cwd(),
    ROOT,
    HOME_DIRECTORY,
    directoryPathWithNewDirectory,
  )

  try {
    await mkdir(fullPath, { recursive: true })
    revalidatePath('/')
  } catch (err) {
    console.log(err)
  }
}
