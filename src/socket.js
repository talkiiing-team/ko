import { w3cwebsocket as W3CWebSocket } from 'websocket'

export const token = localStorage.getItem('GoGameToken')

export let client = new W3CWebSocket('ws://185.22.62.66:41239')

client.onerror = function () {
  console.log('Socket is dead')
}

client.onopen = function () {
  console.log('Socket opened successfully')
}

client.onclose = function () {
  console.log('Socket is terminated, restarting...')
  setTimeout(() => (client = new W3CWebSocket('ws://185.22.62.66:41239')), 5000)
}
