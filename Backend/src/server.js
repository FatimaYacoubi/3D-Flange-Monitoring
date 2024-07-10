const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const { generateRandomData } = require('./services/dataService');
const server = http.createServer(app);
const path = require('path');
const fs = require('fs').promises; // Using fs.promises for async file operations
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: '*', // Allow your Vue.js application's origin
  methods: ['GET'], // Allow only specific methods if needed
  allowedHeaders: ['Content-Type'],
};

const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors(corsOptions));

const filePath = path.join(__dirname, 'data.json');

const initializeDataFile = async () => {
  try {
    await fs.access(filePath);
  } catch (err) {
    await fs.writeFile(filePath, '[]');
  }
};

const readDataFromFile = async () => {
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading data.json', err);
    return []; 
  }
};

const writeDataToFile = async (data) => {
  try {
    const jsonDataString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonDataString);
  } catch (err) {
    console.error('Failed to save data', err);
  }
};

io.on('connection', async (socket) => {
  console.log('Client connected');

  await initializeDataFile();

  const sendRandomData = async () => {
    const data = generateRandomData();

    socket.emit('data', data);

    try {
      let jsonData = await readDataFromFile();

      jsonData.push(data);

      const maxEntries = 10;
      if (jsonData.length > maxEntries) {
        jsonData = jsonData.slice(jsonData.length - maxEntries);
      }

      await writeDataToFile(jsonData);

      const lastFive = jsonData.slice(-5);
      socket.emit('lastFive', lastFive);
    } catch (err) {
      console.error('Error in sendRandomData', err);
    }
  };

  sendRandomData();

  const interval = setInterval(sendRandomData, 5000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
