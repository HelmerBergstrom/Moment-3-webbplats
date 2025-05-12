const list = document.getElementById("experienceList");

if(list) {
    let url = "http://127.0.0.1:3002/workexperience";
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.length === 0) {
                list.innerHTML = `<p id="noData"> Inga erfarenhter finns att hämta! 
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
                        <button class="delete-btn"> RADERA 🗑️ </button> 
                        <button class="edit-btn"> ÄNDRA ✏️ </button>
                    `
                } else {
                    article.innerHTML = `
                        <h2> ${erf.companyname} </h2>
                        <h3> ${erf.task} </h3>
                        <p><strong> Vart: ${erf.city} </strong></p>
                        <p><strong> Tid: ${erf.howlongY} år och ${erf.howlongM} månader </strong></p>
                        <button class="delete-btn"> RADERA 🗑️ </button> 
                        <button class="edit-btn"> ÄNDRA ✏️ </button>
                    `
                }

                list.appendChild(article);
                
                const deleteButton = article.querySelector(".delete-btn");

                deleteButton.addEventListener("click", async () => {
                    const confirmDelete = confirm("Är du säker?");
                    if(!confirmDelete) return;

                    try {
                        const response = await fetch(`http://127.0.0.1:3002/workexperience/${erf._id}`, {
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
                });
                
                // ÄNDRA-knappen i varje article-element.
                const editBtn = article.querySelector(".edit-btn");

                // Händelselyssnare vid klick på knappen som tar fram formulär.
                editBtn.addEventListener("click", () => {
                    article.innerHTML = `
                        <form class="edit-form">
                            <label> Företagsnamn: <input name="companyname" value="${erf.companyname}"></label>
                            <label> Uppgift: <input name="task" value="${erf.task}"></label>
                            <label> Stad: <input name="city" value="${erf.city}"></label>
                            <label> År: <input name="howlongY" type="number" value="${erf.howlongY}"></label>
                            <label> Månader: <input name="howlongM" type="number" value="${erf.howlongM}"></label>
                            <button type="submit"> SPARA ÄNDRINGAR </button>
                        </form>
                    `;

                    // Formuläret.
                    const editForm = article.querySelector(".edit-form");

                    // Händelselyssnare för formuläret som lyssnar på submit.
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault(); // Förhindrar sidomladdning.

                        // Uppdaterade erfarenheten.
                        const updatedExp = {
                            companyname: editForm.companyname.value,
                            task: editForm.task.value,
                            city: editForm.city.value,
                            howlongY: editForm.howlongY.value,
                            howlongM: editForm.howlongM.value
                        };

                        try {
                            const response = await fetch(`http://127.0.0.1:3002/workexperience/${erf._id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(updatedExp)
                            });

                            const result = await response.json();

                            if (response.ok) {
                                console.log("Uppdaterat erfarenhet: ", result)
                                location.reload();
                            } else {
                                alert("Kunde inte uppdatera: " + result.message);
                            }
                        } catch (error) {
                            console.error("Fel vid uppdatering:", error);
                            alert("Något gick fel.");
                        }
                    });
                });
            });
        })
}

// Formuläret på LÄGG TILL-sidan.
const form = document.getElementById("expForm");
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

    // Kontroll om allt blivit ifyllt. Även år/mån då det är ifyllt 0.
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
            window.location.href = "index.html"; // skickar användaren till startsidan.
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