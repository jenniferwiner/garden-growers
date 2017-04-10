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

var ctx = $("#myChartDemo")
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Norfolk Island Pine", "Grape Ivy", "Basil", "Green Beans", "Spanich", "Orange Tree"],
        datasets: [{
            label: '# of Votes',
            data: [1, 2, 3, 5, 2, 3],
            backgroundColor: [
               "rgba(126, 101, 81, 0.5)",
               "rgba(164, 175, 105, 0.5)",
               "rgba(251, 255, 185, 0.5)",
               "rgba(224, 205, 121, 0.5)",
               "rgba(224, 222, 114, 0.5)",
               "rgba(75, 80, 48, 0.5)"
             ],
             borderColor: [
               "#7E6551",
               "#A4AF69",
               "#f4fa8e",
               '#E1CE7A',
               '#E0DE72',
               '#4B5030'
             ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
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

var ctx = $("#myChartHome")
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ["Norfolk Island Pine", "Grape Ivy", "Basil", "Green Beans", "Spanich", "Orange Tree"],
      datasets: [{
          label: '# of Votes',
          data: [1, 2, 3, 5, 2, 3],
          backgroundColor: [
             "rgba(126, 101, 81, 0.5)",
             "rgba(164, 175, 105, 0.5)",
             "rgba(251, 255, 185, 0.5)",
             "rgba(224, 205, 121, 0.5)",
             "rgba(224, 222, 114, 0.5)",
             "rgba(75, 80, 48, 0.5)"
           ],
           borderColor: [
             "#7E6551",
             "#A4AF69",
             "#FBFFB9",
             '#E1CE7A',
             '#E0DE72',
             '#4B5030'
           ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
});
})
