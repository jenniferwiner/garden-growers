$(document).ready(() => {
  // DEMO CHART
  let ctdDemo = $('#doughnutChartDemo')
  /* eslint-disable no-undef*/
  let myDoughnutChartDemo = new Chart(ctdDemo, {
  /* eslint-enable no-undef*/
    type: 'doughnut',
    data: {

      labels: ['Dill', 'Basil', 'Apple tree', 'Sunflower'],
      datasets: [
        {
          data: [3, 5, 12, 20],
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

  // toggle to add new plant
  $('#createPlantBtnDemo').click(() => {
    $('.createForm').toggleClass('hidden')
  })

  // random quote gen
  let quoteArray = ['Flowers always make people better, happier, and more helpful; they are sunshine, food and medicine for the soul. -Luther Burbank', 'In the spring, at the end of the day, you should smell like dirt. -Margaret Atwood', 'If you have a garden and a library, you have everything you need.  -Marcus Tullius Cicero', 'Flowers are restful to look at. They have neither emotions nor conflicts. -Sigmund Freud', 'To see a world in a grain of sand and heaven in a wild flower Hold infinity in the palms of your hand and eternity in an hour.  -William Blake', 'A garden must combine the poetic and the mysterious with a feeling of serenity and joy.  -Luis Barragan', 'Show me your garden and I shall tell you what you are.  -Alfred Austin', 'Weeds are flowers too, once you get to know them.  -A. A. Milne', 'What is a weed? A plant whose virtues have never been discovered.  -Ralph Waldo Emerson']
  let randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)]
  $('.randomQuote').append(randomQuote)
})
