$(document).ready(() => {
  // DEMO CHARTS START
  var ctd = $('#doughnutChartDemo')
  var myDoughnutChart = new Chart(ctd, {
      type: 'doughnut',
      data: {
        labels: [
            "Evergreen",
            "Fruit",
            "Veggies",
        ],
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

// DEMO CHARTS END

// /HOME CHARTS START
var ctd = $('#doughnutChartHome')
var myDoughnutChart = new Chart(ctd, {
    type: 'doughnut',
    data: {
      labels: [
          "Evergreen",
          "Fruit",
          "Veggies",
      ],
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
})
