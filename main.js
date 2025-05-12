const list = document.getElementById("experienceList");

if(list) {
    let url = "http://127.0.0.1:3002/workexperience";
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Data från servern:", data);
            if(!data) {
                list.innerHTML = `<p> Inga erfarenhter finns att hämta! 
                Lägg till under fliken <a href="add.html"> LÄGG TILL </a></p>`
            }
            data.forEach(erf => {
                const article = document.createElement("article");

                if(erf.howlongM === 0) {
                    article.innerHTML = `
                        <h2> ${erf.companyname} </h2>
                        <h3> ${erf.task} </h3>
                        <p><strong> Vart: ${erf.city} </strong></p>
                        <p><strong> Tid: ${erf.howlongY} år </strong></p>
                        <button class="delete-btn" data-id="${erf._id}"> RADERA 🗑️ </button> 
                    `
                } else {
                    article.innerHTML = `
                        <h2> ${erf.companyname} </h2>
                        <h3> ${erf.task} </h3>
                        <p><strong> Vart: ${erf.city} </strong></p>
                        <p><strong> Tid: ${erf.howlongY} år och ${erf.howlongM} månader </strong></p>
                        <button class="delete-btn" data-id="${erf._id}"> RADERA 🗑️ </button> 

                    `
                }

                list.appendChild(article);

                const deleteButton = article.querySelector(".delete-btn");

                deleteButton.addEventListener("click", async () => {
                    

                    const confirmDelete = confirm("Är du säker?");
                    if(!confirmDelete) return;

                    const id = deleteButton.getAttribute("data-id");

                    try {
                        const response = await fetch(`http://127.0.0.1:3002/workexperience/${id}`, {
                        method: "DELETE"    
                    });

                    const result = await response.json();
                    if(response.ok) {
                        article.remove();
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

const form = document.getElementById("expForm");
const submitBtn = document.getElementById("submit");
const confirmMessage = document.getElementById("confirm");

if(form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
    
    const newExp = {
        companyname: form.companyname.value,
        task: form.task.value,
        city: form.city.value,
        howlongY: form.howlongY.value,
        howlongM: form.howlongM.value
    };

    if (!newExp.companyname || !newExp.task || !newExp.city || !newExp.howlongY || !newExp.howlongM) {
        alert("Fyll i alla obligatoriska fält!");
        return;
    };

    try {
        const response = await fetch("http://127.0.0.1:3002/workexperience", {
            method: "POST",
            headers: {
                "Content-type": "application/json" 
            },
            body: JSON.stringify(newExp)
        });

        const result = await response.json();
        if(response.ok) {
            confirmMessage.textContent = result.message;
            window.location.href = "index.html";
        } else {
            alert("Fel! Försök igen senare.")
            console.log(result)
        }
    } catch(error) {
        console.error("Fel vid postning av erfarenhet:", error);
        alert("Något gick fel vid inmatning, försök igen.");
    }
    })
}