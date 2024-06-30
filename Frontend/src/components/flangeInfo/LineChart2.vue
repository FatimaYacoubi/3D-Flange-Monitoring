<template>
  <div class="line-chart">
    <svg class="chart-svg">
      <!-- X and Y axis lines -->
      <line x1="40" y1="20" x2="40" y2="280" stroke="#D8BFD8" />
      <line x1="40" y1="280" x2="480" y2="280" stroke="#D8BFD8" />

      <!-- Y axis labels -->
      <text x="10" y="280" class="label">0 kPa</text>
      <text x="10" y="230" class="label">2 kPa</text>
      <text x="10" y="180" class="label">4 kPa</text>
      <text x="10" y="130" class="label">6 kPa</text>
      <text x="10" y="80" class="label">8 kPa</text>
            <text x="10" y="30" class="label">10 kPa</text>


      <!-- X axis labels -->
      <text v-for="(time, index) in trimmedTimes"
            :key="index"
            :x="40 + index * 100"
            y="290"
            class="label">{{ time }}</text>

      <!-- Line path -->
      <path :d="linePath" fill="none" stroke="#D8BFD8" stroke-width="2" />

      <!-- Data points -->
      <g class="data-points">
        <circle v-for="(point, index) in dataPoints"
                :key="index"
                :cx="40 + index * 100"
                :cy="280 - point.pressure * 25"
                r="4"
                fill="#D8BFD8"
                stroke="white"
                stroke-width="2" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    dataPoints: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // Computed property to generate the path for the line
    linePath() {
      if (this.dataPoints.length === 0) return '';
      const points = this.dataPoints.map((value, index) => `${40 + index * 100},${280 - value.pressure * 25}`).join(' ');
      return `M ${points}`;
    },
    // Computed property to trim time to hours:minutes:seconds
    trimmedTimes() {
      return this.dataPoints.map(point => {
        const time = new Date(point.timestamp);
        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      });
    }
  }
};
</script>

<style scoped>
.line-chart {
  width: 500px;
  height: 300px;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.label {
  font-size: 12px;
  fill: #D8BFD8;
}

.data-points circle {
  transition: transform 0.3s ease-in-out;
}

.data-points circle:hover {
  transform: scale(1.5);
}
</style>
