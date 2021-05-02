import { w3cwebsocket as W3CWebSocket } from 'websocket'

export const token = localStorage.getItem('GoGameToken')

export const client = new W3CWebSocket('ws://172.104.137.176:41239')

client.onerror = function () {}

client.onopen = function () {}

client.onclose = function () {}
