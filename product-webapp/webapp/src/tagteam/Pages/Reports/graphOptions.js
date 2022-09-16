export const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    }
  }
}

export const interviewsPerWeekOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      // text: 'Interviews Per Wek',
    },
  },
  scales: {
    xAxes: {
      categorySpacing: 0,
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        font: {
          size: 10,
        }
      }
    },
  }
}
