$(document).ready(() => {
  // get chart data and render
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

  // delete plant ajax call
  $('.delete').click(() => {
    let id = $(event.target).attr('data-id')
    $.ajax({
      method: 'DELETE',
      url: '/home',
      data: {
        id: id
      },
      success: (data) => {
        if (data) {
          location.reload()
        }
      },
      error: (err) => {
        console.log('Error: ', err)
      }
    })
  })

  // create plant btn
  $('#createPlantBtn').click(() => {
    $('.createForm').toggleClass('hidden')
  })

  // random qutoe gen
  let quoteArray = ['Flowers always make people better, happier, and more helpful; they are sunshine, food and medicine for the soul. -Luther Burbank', 'In the spring, at the end of the day, you should smell like dirt. -Margaret Atwood', 'If you have a garden and a library, you have everything you need.  -Marcus Tullius Cicero', 'Flowers are restful to look at. They have neither emotions nor conflicts. -Sigmund Freud', 'To see a world in a grain of sand and heaven in a wild flower Hold infinity in the palms of your hand and eternity in an hour.  -William Blake', 'A garden must combine the poetic and the mysterious with a feeling of serenity and joy.  -Luis Barragan', 'Show me your garden and I shall tell you what you are.  -Alfred Austin', 'Weeds are flowers too, once you get to know them.  -A. A. Milne', 'What is a weed? A plant whose virtues have never been discovered.  -Ralph Waldo Emerson']
  let randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)]
  $('.randomQuote').append(randomQuote)

  // Get weather!
  $.ajax({
    method: 'GET',
    // WU KEY      155ad056960470aa
    url: `https://api.wunderground.com/api/155ad056960470aa/conditions/q/${userZipCode}.json`,
    datatype: 'json',
    success: function(data) {
      let weatherInfo = data
      // Filling the weather object
      let weatherObj = {
        temp: {}
      }
      let obs = weatherInfo.current_observation
      weatherObj.temp.us = obs.temp_f

      function us() {
        $('#temp').append('<h4>' + weatherObj.temp.us + ' \u00B0f</h4>')
      }
      us()
    }
  })

  // toggle edit plant
  $('.editBtn').click(() => {
    let editId = $(event.target).attr('id')
    $(`#form_${editId}`).toggleClass('hidden')
    $(`#panel_${editId}`).toggleClass('panelheight')

    $(`#submit_${editId}`).click(() => {
      let user_plant_id = $(event.target).attr('data-id')
      let description = $(`#description_${editId}`).val()
      let plant_count = $(`#plant_count_${editId}`).val()
      let photo = $(`#photo_${editId}`).val()

      $.ajax({
        method: 'PATCH',
        url: '/home',
        data: {
          user_plant_id,
          description,
          plant_count,
          photo
        },
        success: (data) => {
          if (data) {
            location.reload()
          }
        },
        error: (err) => {
          console.log('Error: ', err)
        }
      })
    })
  })
})
