
var teamId = window.location.hash.slice(1);

let footballApiTeam = `http://api.football-data.org/v2/teams/${teamId}`
let footballApiUpcoming = `https://api.football-data.org/v2/teams/${teamId}/matches?status=SCHEDULED`


  fetch(Api, {
function getPlayers(Api) {
      method: 'GET',
      headers: {
        "X-Auth-Token": "092fb61d449e428885bad32d32adc2b5"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let output = []
      let clubColors = data.clubColors.split("/")
      let numberColor = (clubColors[2] != undefined) ? clubColors[2] : "#335145"
      data.squad.forEach((player) => {
        (player.shirtNumber !== null) ? player.shirtNumber: player.shirtNumber = ""
        output +=
          `
<div class="  mt-4 col-sm-12 col-md-6 col-xl-4">
<div class="card player-card>
<div class="card-body player-card-body">
    <h4 class="player-card-title card-title text-center ">${player.name}</h4>
    <div class="d-flex justify-content-center mb-4">
        <div class="shirt-wrapper">
            <div class="left-shirt" style="background-color:${clubColors[0]};">
                <div class="left-sleeve" style="background-color:${clubColors[0]};"></div>
            </div>

            <div class="collar"></div>
            <div class="right-shirt" style="background-color:${clubColors[1]};">
                <div class="right-sleeve" style="background-color:${clubColors[1]};"></div>
            </div>
            <div class="number" style="color:${numberColor}">${player.shirtNumber}</div>
        </div>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Date of birth:${player.dateOfBirth} </li>
        <li class="list-group-item">Country of birth:${player.countryOfBirth}</li>
        <li class="list-group-item">Nationality:${player.nationality}</li>
        <li class="list-group-item">Position:${player.position}</li>
        <li class="list-group-item">Role:${player.role}</li>
        <li class="list-group-item">Shirt number:${player.shirtNumber}</li>
        <li class="list-group-item">ID:${player.id}</li>

    </ul>
</div>
</div>
</div>
`
        document.getElementById('players').innerHTML = output
      })

    })
    .catch((err) => {
      console.log(err)
    })
}
getPlayers(footballApiTeam)


function getUpcomingMatches(Api) {
  fetch(Api, {
      method: 'GET',
      headers: {
        "X-Auth-Token": "092fb61d449e428885bad32d32adc2b5"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      let tbody = document.getElementById("incomingMatchesTeam");
      data.matches.forEach((match) => {
   
        let tr = document.createElement("tr");
        let tdHome = document.createElement("td");
        let tdAway = document.createElement("td");
        let tdVS = document.createElement("td");
        let dateTr = document.createElement("tr")

       tdHome.style.transition = "background-color 2s, color 1s";
        tdAway.style.transition = "background-color 2s, color 1s";

        tdHome.style.backgroundColor = "var(--dark-tan)";
        tdAway.style.backgroundColor = "var(--slate-gray)";

        tdAway.style.color = "white"

        tdHome.style.cursor = "pointer";
        tdAway.style.cursor = "pointer";

        tdVS.innerText = "-";
        tdHome.innerText = match.homeTeam.name;
        tdAway.innerText = match.awayTeam.name;
        dateTr.innerHTML = `<td colspan="3">${match.utcDate} : ${match.group} match day:${match.matchday}</td>`

        tr.appendChild(tdHome);
        tr.appendChild(tdVS);
        tr.appendChild(tdAway);
        tbody.appendChild(dateTr)
        tbody.appendChild(tr);

        tdHome.addEventListener("click", function () {
          window.location.href = `team.html#${match.homeTeam.id}`;
          footballApiTeam = `http://api.football-data.org/v2/teams/${match.homeTeam.id}`
          getPlayers(footballApiTeam)
          footballApiUpcoming = `https://api.football-data.org/v2/teams/${match.homeTeam.id}/matches?status=SCHEDULED`
          document.getElementById('incomingMatchesTeam').innerHTML =""
          getUpcomingMatches(footballApiUpcoming)
        });
        tdAway.addEventListener("click", function () {
          window.location.href = `team.html#${match.awayTeam.id}`;
          footballApiTeam = `http://api.football-data.org/v2/teams/${match.awayTeam.id}`
          getPlayers(footballApiTeam)
          footballApiUpcoming = `https://api.football-data.org/v2/teams/${match.awayTeam.id}/matches?status=SCHEDULED`
          document.getElementById('incomingMatchesTeam').innerHTML =""
          getUpcomingMatches(footballApiUpcoming)
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


      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getUpcomingMatches(footballApiUpcoming)