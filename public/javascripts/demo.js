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
})
