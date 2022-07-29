    let page = 1
    const first = document.querySelector('.first')
    const second = document.querySelector('.second')
    const currentPage = document.querySelector('#page')
    let result = document.querySelector('#root')


        const getData = async (url) => {
            try{
                const data = await fetch(url)
                return await data.json()
            } catch{
                console.log('Klaida: nepavyko prisijungti prie serverio')
            }
        }

        const showData = async () => {
            const data = await getData('https://www.omdbapi.com/?apikey=5c5ed944&s=Batman&page=' + page)
            const info = data.Search
            const totalResults = data.totalResults
            console.log(data)
            console.log(info)
    
            result.innerHTML = ''
                    for(let i = 0; i < info.length; i++) {
                    result.innerHTML += `<div class="">
                                            <div class="movie">
                                                <div class="image">
                                                    <img src="${info[i].Poster}" alt="${info[i].Title}">
                                                </div>
                                                <div class="movieInfo text-center">
                                                    <span class="pt-1">${info[i].Title}</span>
                                                    <span>${info[i].Year}</span>
                                                    <span>Type: ${info[i].Type}</span>
                                                </div>
                                            </div>
                                        </div>`
                }
                currentPage.textContent = `Current page: ${page}`
        }
 
        showData()

        first.addEventListener('click', () => {
            if(page > 1) {
                page--
                showData()
             } 
             if (page === 1) {
                first.classList.remove('btn-primary')
                first.disabled = true
            }
        })
        
        second.addEventListener('click', () => {
            page++
            showData()
            
            if(page > 1) {
                first.disabled = false
                first.classList.add('btn-primary')
            }
            if(page === 52) {
                second.disabled = true
                second.classList.remove('btn-primary')
            }
        })
