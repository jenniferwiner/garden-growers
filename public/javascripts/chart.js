$(document).ready(() => {
  // DEMO CHARTS START
  var ctdDemo = $('#doughnutChartDemo')
  var myDoughnutChartDemo = new Chart(ctdDemo, {
    type: 'doughnut',
    data: {
      labels: ["Evergreen", "Fruit", "Veggies"],
      datasets: [
      {
        data: [1, 1, 15],
        backgroundColor: [
          "#7E6551",
          "#A4AF69",
          "#FBFFB9",
          "#666534"
        ],
        hoverBackgroundColor: [
          "#7E6551",
          "#A4AF69",
          "#FBFFB9",
          "#666534"
        ]
      }]
    }
  });

  $.ajax({
    method: 'GET',
    url: '/home/labelsAndData',
    success: function(data) {
      let chartData = data.data;
      let chartLabels = data.labels;

      var ctd = $('#doughnutChartHome')
      var myDoughnutChart = new Chart(ctd, {
        type: 'doughnut',
        data: {
          labels: chartLabels,
          datasets: [
          {
            data: chartData,
            backgroundColor: [
              "#7E6551",
              "#A4AF69",
              "#FBFFB9",
              "#666534"
            ],
            hoverBackgroundColor: [
              "#7E6551",
              "#A4AF69",
              "#FBFFB9",
              "#666534"
            ]
          }]
        }
      });
    },
    error: function(err) {
      console.log("Error: ", err);
    }
  });
})
