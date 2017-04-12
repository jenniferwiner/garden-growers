$(document).ready(() => {
  // DEMO CHARTS START
  let ctdDemo = $('#doughnutChartDemo')
  /* eslint-disable no-undef*/
  let myDoughnutChartDemo = new Chart(ctdDemo, {
  /* eslint-enable no-undef*/
    type: 'doughnut',
    data: {

      labels: ['Evergreen', 'Fruit', 'Veggies'],
      datasets: [
        {
          data: [1, 1, 15],
          backgroundColor: [
            '#7E6551',
            '#A4AF69',
            '#FBFFB9',
            '#666534'
          ],
          hoverBackgroundColor: [
            '#7E6551',
            '#A4AF69',
            '#FBFFB9',
            '#666534'
          ]
        }]
    }
  })
  $.ajax({
    method: 'GET',
    url: '/home/labelsAndData',
    success: function(data) {
      let chartData = data.data
      let chartLabels = data.labels

      let ctd = $('#doughnutChartHome')
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
