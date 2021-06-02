import { w3cwebsocket as W3CWebSocket } from 'websocket'

export const token = localStorage.getItem('GoGameToken')

export const client = new W3CWebSocket('ws://185.22.62.66:41239')

client.onerror = function () {}

client.onopen = function () {}

client.onclose = function () {}
