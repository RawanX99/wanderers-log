try {
    
  const data = await fetch("/api")
  const response = await data.json()
  renderCards(response)
} catch (err) {
  console.log(err)
}

function renderCards(cardsData) {
  const container = document.querySelector(".cards-container")
  let cardsHTML = ""

  cardsData.forEach((card, i) => {

    cardsHTML += `
<article class="story-card" aria-labelledby="story-title-${i}">
  <p class="card-details">${card.timeStamp}, ${card.location}</p>
  <h3 id="story-title-${i}">${card.title}</h3>
  <div class="story-text-wrapper">
    <p class="story-text">${card.text}</p>
  </div>
  <button class="read-more-btn" aria-expanded="false">Read in full</button>
</article>
  `
  })

  container.innerHTML = cardsHTML
}

// handle card expand

document.querySelector(".cards-container").addEventListener("click", (e) => {
  if (!e.target.classList.contains("read-more-btn")) return 
  const button = e.target
  const storyCard = button.closest(".story-card")
  const isExpanded = storyCard.classList.toggle("expanded")
    
  button.setAttribute("aria-expanded", isExpanded ? "true" : "false")
  button.textContent = isExpanded ? "Show less" : "Read in full"
})
