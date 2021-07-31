document.addEventListener('DOMContentLoaded', function() {
    const heroes_div = document.getElementById("heroes_div")
    var HeroesList = new Array()

    fetch('http://localhost:8080/', {
        method: "GET",
    }).then(response => response.json()).then(heroes => {
        HeroesList = heroes

        HeroesList.forEach(hero => {

            const hero_link = document.createElement("a")
            hero_link.href = "../Pages/hero.html"
            hero_link.addEventListener("click", function() {
                window.localStorage.setItem("hero", hero["name"])
            })

            const hero_div = document.createElement("div")
            hero_div.classList = "hero"

            const hero_img = document.createElement("img")

            var name = hero["name"]
            name = name.replaceAll(" ","_")

            hero_img.setAttribute('src', '../Pictures/Heroes/' + name + ".jpg")

            hero_div.appendChild(hero_img)
            hero_link.appendChild(hero_div)
            heroes_div.appendChild(hero_link)
            
            const hero_name = document.createElement("label")
            hero_name.innerHTML = hero["name"]
            hero_name.classList = "hero-name"
            hero_div.appendChild(hero_name)
        })
    })
}, false)