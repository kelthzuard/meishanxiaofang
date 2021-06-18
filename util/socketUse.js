var socket_io = require('socket.io');
var EventEmitter = require('events').EventEmitter; 
var socketioJwt = require('socketio-jwt')

var io 
var socketEvent = new EventEmitter()
var mapping = new Map()

const socketOn = (server) => {
  io = socket_io.listen(server)
  io.sockets.on('connection',  socketioJwt.authorize({
    secret: 'mes_qdhd_mobile_xhykjyxgs',
    timeout: 15000 // 15 seconds to send the authentication message
  }))
  .on('authenticated', function(socket) {
    console.log(mapping)
    mapping.set(socket.decoded_token.name, socket.id)
  })
  .on('disconnect', function(socket) {
    mapping.delete(socket.decoded_token.name, socket.id)
  })
} 

socketEvent.on('location', (msg) => {
  const socketId = mapping.get(msg.user)
  const socket = io.to(socketId)
  socket.emit('map', { msg })
})

module.exports = {
  socketOn,
  socketEvent
}

