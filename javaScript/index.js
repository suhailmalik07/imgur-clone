const client_id = 'xJRFQYaPCDLzwTOkWOlZ7c6zKoM7YSxPbPmivYgYmNc'
let i = 0
let page = 1
const loading = document.getElementById('loading')

window.onload = async () => {
  try {
    const data = await getData(page++)
    renderDOM(data)
  } catch (error) {
    console.log(error.message)
  }
}

window.onscroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 1) {
    const data = await getData(page++)
    renderDOM(data)
  }
}

const getData = async (page = 1) => {
  loading.style.display = 'flex'
  return (await fetch(`https://api.unsplash.com/photos?client_id=${client_id}&page=${page}&per_page=20`)).json()
}

const renderDOM = data => {
  const roots = [document.getElementById('res1'), document.getElementById('res2'), document.getElementById('res3'), document.getElementById('res4')]
  const frags = [document.createDocumentFragment(), document.createDocumentFragment(), document.createDocumentFragment(), document.createDocumentFragment()]

  data.forEach((item) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = createCard(item)
    frags[i % 4].append(card)
    i++
  })
  loading.style.display = 'none'
  roots.map((root, indx) => root.append(frags[indx]))
}

const createCard = (item) => {
  const imgUrl = item.urls.thumb
  const likes = item.likes
  const description = item.description || item.alt_description || ""
  const userUsername = item.user.username

  const t = `<div>
      <img src="${imgUrl}" alt="${description}" class="imgTop">
    </div>
    <div class="imgBottom">
      <h4>${description}</h4>
      <div>
        <div>
          <img src="https://www.flaticon.com/svg/static/icons/svg/626/626075.svg" alt="upvoteButton">
          <span>${likes}</span>
        </div>
        <div>
          <img src="https://www.flaticon.com/svg/static/icons/svg/626/626013.svg" alt="downVoteButton">
          <span>1.4k</span>
        </div>
        <div>
          <img src="https://www.flaticon.com/svg/static/icons/svg/1380/1380338.svg" alt="messageButton">
          <span>1.4k</span>
        </div>
        <div>
          <img src="https://www.flaticon.com/svg/static/icons/svg/565/565654.svg" alt="viewCount">
          <span>1.4k</span>
        </div>
      </div>
    </div>`

  return t
}
