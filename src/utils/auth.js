import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const img_url = 'img_url'
const account = 'account'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAvatar() {
  return Cookies.get(img_url)
}

export function setAvatar(url) {
  return Cookies.set(img_url, url)
}

export function removeAvatar() {
  return Cookies.remove(img_url)
}

export function getName() {
  return Cookies.get(account)
}

export function setName(name) {
  return Cookies.set(account, name)
}

export function removeName() {
  return Cookies.remove(name)
}

