$(document).ready(() => {
    // delete ajax call
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
            error: () => {}
        })
    })
    // toggle edit plant
    $('.editBtn').click(() => {
      $('.editForm').toggleClass('hidden')
    })
    // toggle to add new plant
    $('#createPlantBtnDemo').click(() => {
        $('.createForm').toggleClass('hidden')
    })
    $('#createPlantBtn').click(() => {
        $('.createForm').toggleClass('hidden')
    })
    // random qutoe gen
    let quoteArray = ["Flowers always make people better, happier, and more helpful; they are sunshine, food and medicine for the soul. -Luther Burbank", "In the spring, at the end of the day, you should smell like dirt. -Margaret Atwood", "If you have a garden and a library, you have everything you need.  -Marcus Tullius Cicero", "Flowers are restful to look at. They have neither emotions nor conflicts. -Sigmund Freud", "To see a world in a grain of sand and heaven in a wild flower Hold infinity in the palms of your hand and eternity in an hour.  -William Blake", "A garden must combine the poetic and the mysterious with a feeling of serenity and joy.  -Luis Barragan", "Show me your garden and I shall tell you what you are.  -Alfred Austin", "Weeds are flowers too, once you get to know them.  -A. A. Milne", "What is a weed? A plant whose virtues have never been discovered.  -Ralph Waldo Emerson"]
    var randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)]
    $('.randomQuote').append(randomQuote)
})
