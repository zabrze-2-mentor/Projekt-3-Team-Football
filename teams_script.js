
var teamId = 2021;
var leagueId = window.location.hash.slice(1);
var teamsAPI  = `http://api.football-data.org/v2/competitions/${leagueId}/teams`;
var standingsAPI  = `http://api.football-data.org/v2/competitions/${leagueId}/standings`;

function getTeams(){
fetch(teamsAPI,{
    method: 'GET',
    headers:{
        "X-Auth-Token":"4bb7fd2245f746558d32d8f64ef87eeb"
    }
})
.then(response => response.json())
.then(data => {

    const teams = data["teams"];
    const competition = data["competition"];
    const header = document.getElementById("teams_header");
    const p = document.createElement('p');
    p.innerText = competition.name;
    header.appendChild(p);

    teams.forEach(element => {
        
        let image = element.crestUrl;
        let name = element.name;
        let id = element.id;

        const teamsDiv = document.getElementById("teams");

        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'container');
        newDiv.id = "team_logo";

        const newH5 = document.createElement('h5');

        const logo = document.createElement('img');
        logo.setAttribute("onerror", "this.onerror=null;this.src='img/favicon.ico'")

        logo.addEventListener("click", function () {
            window.location.href = `team.html#${id}`;
        });

        
        if(image == null){
            logo.src = "img/favicon.ico";
            newH5.innerText = name;
            teamsDiv.appendChild(newDiv).appendChild(logo);
            newDiv.appendChild(newH5);

        }else{
            logo.src = image;
            newH5.innerText = name;
            teamsDiv.appendChild(newDiv).appendChild(logo);
            newDiv.appendChild(newH5);
        }
        
    });
})
.catch(err => {
    console.log(err);
})
}

function getStandings(){
fetch(standingsAPI,{
    method: 'GET',
    headers:{
        "X-Auth-Token":"4bb7fd2245f746558d32d8f64ef87eeb"
    }
})
.then(response => response.json())
.then(data => {

    const standings = data["standings"];
    const array = standings[0].table;
    var i = 0;
    array.forEach(element => {

	const table = document.getElementById("table");
	const newTr = document.createElement("tr");
	newTr.setAttribute("class", "newTr");
        
        let id = element.team.id;
        let name = element.team.name;
        let position = element.position;
        let games = element.playedGames;
	    let points = element.points;
        let won = element.won;
        let draw = element.draw;
        let lost = element.lost;

	//console.log(name+" pozycja: " + position);
	
	table.appendChild(newTr).innerHTML = `<td>${position}</td><td class="team_name">${name}</td><td>${games}</td><td>${points}</td><td>${won}</td><td>${draw}</td><td>${lost}</td>`;
    
    
    const teamName = document.getElementsByClassName("team_name");
    teamName[i].addEventListener("click", function() {window.location.href = `team.html#${id}`});
    i++;
  
    });

})
.catch(err => {
    console.log(err);
})
}

getTeams();
getStandings();
