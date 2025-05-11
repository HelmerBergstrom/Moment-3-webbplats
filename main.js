const list = document.getElementById("experienceList");

if(list) {
    let url = "http://127.0.0.1:3001/workexperience";
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.length === 0) {
                list.innerHTML = `<p> Inga erfarenhter finns att hämta! 
                Lägg till under fliken <a href="add.html"> LÄGG TILL </a></p>`
            }
            data.forEach(erf => {
                const article = document.createElement("article");

                article.innerHTML = `
                <h2> ${erf.companyname} </h2>
                <h2> ${erf.task} </h2>
                <p><strong> ${erf.city} </strong></p>
                <p><strong> ${erf.howlong} </strong></p>
                `

                list.appendChild(article);
            });
        })
}