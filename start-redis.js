import { createServer } from 'net';

const PORT = 6379;
const server = createServer((socket) => {
  console.log('Client connected');
  
  socket.on('data', (data) => {
    const command = data.toString().trim();
    
    if (command === 'PING') {
      socket.write('+PONG\r\n');
    } else if (command.startsWith('SET')) {
      socket.write('+OK\r\n');
    } else if (command.startsWith('GET')) {
      socket.write('$5\r\nvalue\r\n');
    } else {
      socket.write('+OK\r\n');
    }
  });
  
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`✅ Mock Redis running on port ${PORT}`);
});
