$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/feed/:id/labelsAndData',
    success: function(data) {
      let chartData = data.data
      let chartLabels = data.labels

      let ctd = $('#doughnutChartUser')
      /* eslint-disable no-undef*/
      let myDoughnutChart = new Chart(ctd, {
      /* eslint-enable no-undef*/
        type: 'doughnut',
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              backgroundColor: [
                '#7E6551',
                '#A4AF69',
                '#FBFFB9',
                '#666534',
                '#58381f',
                '#394012',
                '#37390d',
                '#86855e'
              ],
              hoverBackgroundColor: [
                '#7E6551',
                '#A4AF69',
                '#FBFFB9',
                '#666534',
                '#58381f',
                '#394012',
                '#37390d',
                '#86855e'
              ]
            }]
        }
      })
    },
    error: function(err) {
      console.log('Error: ', err)
    }
  })
})
