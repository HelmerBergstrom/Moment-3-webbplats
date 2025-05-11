const list = document.getElementById("experienceList");

if(list) {
    let url = "http://127.0.0.1:3001/workexperience";
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(!data) {
                list.innerHTML = `<p> Inga erfarenhter finns att hämta! 
                Lägg till under fliken <a href="add.html"> LÄGG TILL </a></p>`
            }
            data.forEach(erf => {
                const article = document.createElement("article");

                if(erf.howlongM === 0) {
                    article.innerHTML = `
                        <h2> ${erf.companyname} </h2>
                        <h2> ${erf.task} </h2>
                        <p><strong> ${erf.city} </strong></p>
                        <p><strong> ${erf.howlongY} år </strong></p>
                        <button class="delete-btn" data-id="${erf._id}"> RADERA </button> 
                    `
                } else {
                    article.innerHTML = `
                        <h2> ${erf.companyname} </h2>
                        <h2> ${erf.task} </h2>
                        <p><strong> ${erf.city} </strong></p>
                        <p><strong> ${erf.howlongY} år och ${erf.howlongM} månader </strong></p>
                        <button class="delete-btn" data-id="${erf._id}"> RADERA </button> 
                    `
                }

                list.appendChild(article);

                const deleteButton = article.querySelector(".delete-btn");

                deleteButton.addEventListener("click", async () => {
                    const id = deleteButton.getAttribute("data-id");

                    const confirmDelete = confirm("Är du säker?");
                    if(!confirmDelete) return;

                    try {
                        const response = await fetch(`http://127.0.0.1:3001/workexperience/${id}`, {
                        method: "DELETE"    
                    });

                    const result = await response.json();
                    if(response.ok) {
                        article.remove();
                        alert(result.message);
                    } else {
                        alert(result.message);
                    }

                    } catch(error) {
                        console.log("Fel vid borttagning av erfarenhet: " + error);
                    }
                })
            });
        })
}