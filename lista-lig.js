var authToken = "0a1d051b19754c12ac0c1e59f1b93ec5";

function fetchFromAPI(url = undefined, authToken = undefined) {
    return new Promise(resolve => {


        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        // xhttp.withCredentials = true;
        // xhttp.setRequestHeader('Content-Type', 'application/json')
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
    response.competitions.forEach(async element => {

        let divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.classList.add("m-3");

    //    element.area.name
      
        let imgCard = document.createElement("img");
        imgCard.src = "";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");

        cardTitle.innerHTML = "<a href='stronaligi.html?id=" + element.id + "'>" + element.name + "</a>";

        let cardContainer = document.getElementsByClassName("card-container")[0];
        divCard.appendChild(imgCard);
        cardBody.appendChild(cardTitle);
        divCard.appendChild(cardBody);
console.log(element.area.name);

        cardContainer.appendChild(divCard);
    });
    // console.log(response.competitions.area.name);
    // console.log(response.competitions.name);
    // console.log(response.competitions.emblemUrl);


}
fetchLeagues();