'use server'

import { writeFile } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

import { ROOT, HOME_DIRECTORY } from 'library/constants'

export default async function uploadFileAction(state, formData) {
  const file = formData.get('file')
  const directoryPath = formData.get('directoryPath')
  // const filename = file.name.replaceAll(' ', '_')
  const filename = file.name
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  // const buffer = Buffer.from(arrayBuffer)
  const fullPath = path.join(
    process.cwd(),
    ROOT,
    HOME_DIRECTORY,
    directoryPath,
    filename,
  )

  await delay(1300)

  try {
    await writeFile(fullPath, buffer)
    revalidatePath('/')
    return { status: 'success' }
  } catch (err) {
    console.log(err)
  }
}

const delay = ms => new Promise(res => setTimeout(() => res(true), ms))
