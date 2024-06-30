<template>
  <div>
      <AppNavbar />

    <div class="dock">
            <p>Time</p>

      <h2>{{ data.timestamp }}</h2>
            <p>Temperature</p>

      <h2>{{ data.temperature }} °C</h2>
                  <p>Pressure</p>

      <h2>{{ data.pressure }} kPa</h2>
    </div>

    <div class="dock1" v-if="data.temperature !== ''">
      <h3>Temperature</h3>
      <LineChart :data-points="temperatureData" />
    </div>

    <div class="dock2" v-if="data.pressure !== ''">
      <h3>Pressure</h3>
      <LineChart2 :data-points="pressureData" />
    </div>

    <div class="dock3">
      <iframe
        width="500"
        height="300"
        src="https://www.youtube.com/embed/r0A16XtTeFQ?playlist=r0A16XtTeFQ&autoplay=1&loop=1&mute=1&controls=0&title=0"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import LineChart from './LineChart';
import LineChart2 from './LineChart2';
import AppNavbar from '@/components/navbar/AppNavbar.vue';  // Adjust @ to the correct alias if applicable


export default {
  components: {
    LineChart,
    LineChart2, AppNavbar
  },
  data() {
    return {
      data: {
        timestamp: '',
        temperature: '',
        pressure: '',
      },
      socket: null,
      temperatureData: [],
      pressureData: [],
    };
  },
  methods: {
    connectSocket() {
      this.socket = io('http://localhost:3000');

      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      this.socket.on('data', (data) => {
        console.log('Received data:', data);
        this.data = data;

        this.temperatureData.push({
          temperature: parseFloat(data.temperature),
          timestamp: data.timestamp,
        });
        this.pressureData.push({
          pressure: parseFloat(data.pressure),
          timestamp: data.timestamp,
        });

        if (this.temperatureData.length > 5) {
          this.temperatureData.shift();
        }
        if (this.pressureData.length > 5) {
          this.pressureData.shift();
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    },
  },
  mounted() {
    this.connectSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
}
.dock {
  background: rgba(173, 216, 230, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-family:'Montserrat', sans-serif;
  font-weight: 100;
  height: 300px;
  width: 500px;
  z-index: 2;
  position: absolute;
  top: 100px;
  left: 50px;
  color: #ffffff;
  padding:20px;
}

.dock1 {
  background: rgba(173, 216, 230, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 350px;
  width: 500px;
  z-index: 2;
   font-family:'Montserrat', sans-serif;
  font-weight: 100;
  position: absolute;
  top: 500px;
  left: 50px;
  color: #ffffff;
  padding:20px;
}

.dock2 {
  background: rgba(173, 216, 230, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 350px;
  width: 500px;
  z-index: 2;
  position: absolute;
   font-family:'Montserrat', sans-serif;
  font-weight: 100;
  top: 500px;
  right: 50px;
  color: #ffffff;
  padding:20px;
}

.dock3 {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 300px;
  width: 520px;
  z-index: 2;
  position: absolute;
   font-family:'Montserrat', sans-serif;
  font-weight: 100;
  top: 100px;
  right: 50px;
  color: #ffffff;
    padding: 10px;

}
</style>
