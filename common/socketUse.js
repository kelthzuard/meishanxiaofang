
function socketUse(server){
  this.server = server;
  this.init = function(){
    this.io = socket_io.listen(server);
  }
}

module.exports = socketUse;

