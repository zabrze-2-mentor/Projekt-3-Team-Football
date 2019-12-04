var authToken = "0a1d051b19754c12ac0c1e59f1b93ec5";

function fetchFromAPI(url = undefined, authToken = undefined) {
    let response = fetch(url, {
        method: 'GET',
        headers: new Headers({
            'X-Auth-Token': authToken
        }),

    }).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        return responseJson;
    });
    return response;
}

async function fetchLeagues(plan = "TIER_ONE") {
    let response = await fetchFromAPI("http://api.football-data.org/v2/competitions?plan=" + plan, authToken);
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
        divCard.style.cursor = "pointer";

        let imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top");
        imgCard.src = "img/card flag/" + element.area.name + ".png";

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");


        cardTitle.innerText = `${element.name}`;


        divRow.appendChild(divCol);
        divCol.appendChild(divCard);
        divCard.appendChild(imgCard);
        cardBody.appendChild(cardTitle);
        divCard.appendChild(cardBody);
        divCard.addEventListener("click", function (e) {
            window.location.href = `stronaligi.html#${element.id}`;
        });
        divCard.addEventListener("mouseover", function (e) {
            cardTitle.style.textDecoration = "underline";

        });
        divCard.addEventListener("mouseleave", function (e) {
            cardTitle.style.textDecoration = "none";
        });
        
        counter--;
    });
}

async function fetchIncomingMatches(plan = "TIER_ONE") {
    let howMany = 10;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + ( "0" + tomorrow.getDate()).slice(-2);
    let response = await fetchFromAPI(`http://api.football-data.org/v2/matches?dateFrom=${tomorrow}&dateTo=${tomorrow}&status=SCHEDULED`,authToken);
    document.getElementById("tblData").innerText = tomorrow;
    let tbody = document.getElementById("incomingMatchesFP");
    let responseMatch = response.matches;
    for (let i = 0; i < ((response.count < howMany) ? response.count : howMany); i++) {
        element = responseMatch[i];

        let tr = document.createElement("tr");
        let tdHome = document.createElement("td");
        let tdAway = document.createElement("td");
        let tdVS = document.createElement("td");

        tdHome.style.transition = "background-color 2s, color 1s";
        tdAway.style.transition = "background-color 2s, color 1s";

        tdHome.style.backgroundColor = "var(--dark-tan)";
        tdAway.style.backgroundColor = "var(--slate-gray)";

        tdAway.style.color = "white"

        tdHome.style.cursor = "pointer";
        tdAway.style.cursor = "pointer";

        tdVS.innerText = "-";
        tdHome.innerText = element.homeTeam.name;
        tdAway.innerText = element.awayTeam.name;

        tr.appendChild(tdHome);
        tr.appendChild(tdVS);
        tr.appendChild(tdAway);
        tbody.appendChild(tr);

        tdHome.addEventListener("click", function () {
            window.location.href = `team.html#${element.homeTeam.id}`;
        });
        tdAway.addEventListener("click", function () {
            window.location.href = `team.html#${element.awayTeam.id}`;
        });

        tdAway.addEventListener("mouseover", function () {
            tdAway.style.backgroundColor = "var(--dark-tan)";
            tdAway.style.color = "black"
        });
        tdAway.addEventListener("mouseleave", function () {
            tdAway.style.backgroundColor = "var(--slate-gray)";
            tdAway.style.color = "white"
        });

        tdHome.addEventListener("mouseover", function () {
            tdHome.style.backgroundColor = "var(--slate-gray)";
            tdHome.style.color = "white"
        });
        tdHome.addEventListener("mouseleave", function () {
            tdHome.style.backgroundColor = "var(--dark-tan)";
            tdHome.style.color = "black"
        });
    }



}
fetchLeagues();
fetchIncomingMatches();