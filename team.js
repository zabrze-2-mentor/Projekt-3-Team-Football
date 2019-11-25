
var leagueId = window.location.hash.slice(1);
const footballApiTeam = `http://api.football-data.org/v2/teams/${leagueId}`
const footballApiUpcoming = `https://api.football-data.org/v2/teams/${leagueId}/matches?status=SCHEDULED`

console.log(leagueId)

function getPlayers() {
  fetch(footballApiTeam, {
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
<div class="card player-card  col-sm-12 col-md-6 col-xl-4">
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
`
document.getElementById('players').innerHTML =output
      })

    })
    .catch((err) => {
      console.log(err)
    })
}
getPlayers()

/* do przerobienia na wyświetlanie w formie tabeli by utrzymać styl ze strony głównej
function getUpcomingMatches() {
  fetch(footballApiUpcoming, {
      method: 'GET',
      headers: {
        "X-Auth-Token": "092fb61d449e428885bad32d32adc2b5"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let output = []


      data.matches.forEach((match) => {
        output +=

          `
      <div class="card col-sm-12 text-center mb-4">
      <div class="card-header">
          <h3> ${match.competition.name}</h3>
          <p>${match.utcDate} : ${match.group} match day:${match.matchday}</p>
      </div>
      <div class="card-body d-flex flex-wrap">
         <div class="col-5">
          <h6> gospodarze:</h6>
        <p> ${match.homeTeam.name}</p>
        
         </div>
        <div class="col-2">vs</div>
        
         <div class="col-5">
         <h6> goście</h6>
         <p>${match.awayTeam.name}</p>
         </div>
      </div>

  </div>

      `
        document.getElementById('upcomingMatches').innerHTML = output
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getUpcomingMatches()*/