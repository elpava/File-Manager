import { SEPARATOR } from './constants'

export function formatNumberToPersian(number) {
  return Intl.NumberFormat('fa').format(number)
}

export function isEmptyObject(obj) {
  for (const key in obj) {
    return false
  }
  return true
}

export function convertToShortDescription(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
}

export function isOnlyAlphabet(text) {
  return /^[a-zA-Z\u0600-\u06FF\s]+$/.test(text)
}

export function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function clamp(number, min, max) {
  return Math.min(max, Math.max(number, min))
}

export function formatPath(path = '') {
  return path.replaceAll(SEPARATOR, '/') ?? ''
}

export function returnFileSize(number) {
  if (number < 1e3) {
    return `${number} بایت`
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} کیلوبایت`
  } else {
    return `${(number / 1e6).toFixed(1)} مگابایت`
  }
}

export function delay(ms) {
  return new Promise(res => setTimeout(() => res(true), ms))
}
