var authToken = "0a1d051b19754c12ac0c1e59f1b93ec5";

function fetchFromAPI(url = undefined, authToken = undefined) {
    return new Promise(resolve => {


        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        if (authToken != undefined) {
            xhttp.setRequestHeader("X-Auth-Token", authToken);
        }

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(xhttp.responseText);
            }
        }
        xhttp.send();

    });

}

async function fetchLeagues(plan = "TIER_ONE") {
    let response = await fetchFromAPI("http://api.football-data.org/v2/competitions?plan=" + plan, authToken);
    response = JSON.parse(response);
    let counter = 1;
    let divRow;
    response.competitions.forEach(async element => {
        let cardContainer = document.getElementsByClassName("card-container")[0];
        if (counter == 1) {
            counter = 5;
            divRow = document.createElement("div");
            divRow.classList.add("row");
            cardContainer.appendChild(divRow);
        }

        let divCol = document.createElement("div");
        divCol.classList.add("col-lg-3");


        let divCard = document.createElement("div");
        divCard.classList.add("card");


        let imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top");
        imgCard.src = "img/card flag/" + element.area.name + ".png";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");


        cardTitle.innerHTML = "<a href='stronaligi.html?id=" + element.id + "'>" + element.name + "</a>";


        divRow.appendChild(divCol);
        divCol.appendChild(divCard);
        divCard.appendChild(imgCard);
        cardBody.appendChild(cardTitle);
        divCard.appendChild(cardBody);

        counter--;
    });



}
fetchLeagues();