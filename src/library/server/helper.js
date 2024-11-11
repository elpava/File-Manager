import { access } from 'fs/promises'

export async function checkItemExistance(path) {
  return await access(path)
    .then(() => true)
    .catch(() => false)
}
