function msgSend() {
  var msg = document.getElementById('chatBox').value;
  var c = net.createConnection(3000, 'localhost');
  c.on("connect", function() {
    // connected to TCP server.
    c.write(msg);
  });
  
}
