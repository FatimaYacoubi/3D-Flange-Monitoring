<template>
  <div class="line-chart">
    <svg class="chart-svg">
      <!-- X and Y axis lines -->
      <line x1="40" y1="20" x2="40" y2="280" stroke="lightblue" />
      <line x1="40" y1="280" x2="480" y2="280" stroke="lightblue" />

      <!-- Y axis labels -->
      <text x="10" y="20" class="label">80°C</text>
      <text x="10" y="80" class="label">60°C</text>
      <text x="10" y="140" class="label">40°C</text>
      <text x="10" y="200" class="label">20°C</text>
      <text x="10" y="260" class="label">0°C</text>

      <!-- X axis labels -->
      <text v-for="(time, index) in trimmedTimes"
            :key="index"
            :x="40 + index * 100"
            y="290"
            class="label">{{ time }}</text>

      <!-- Line path -->
      <path :d="linePath" fill="none" stroke="lightblue" stroke-width="2" />

      <!-- Data points -->
      <g class="data-points">
        <circle v-for="(point, index) in dataPoints"
                :key="index"
                :cx="40 + index * 100"
                :cy="280 - point.temperature * 3"
                r="4"
                fill="lightblue"
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
      const points = this.dataPoints.map((value, index) => `${40 + index * 100},${280 - value.temperature * 3}`).join(' ');
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
  fill: lightblue;
}

.data-points circle {
  transition: transform 0.3s ease-in-out;
}

.data-points circle:hover {
  transform: scale(1.5);
}
</style>
