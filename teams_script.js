
var teamId = 2021;
var leagueId = window.location.hash.slice(1);
var teamsAPI  = `http://api.football-data.org/v2/competitions/${leagueId}/standings`;

function getTeams(){
fetch(teamsAPI,{
    method: 'GET',
    headers:{
        "X-Auth-Token":"4bb7fd2245f746558d32d8f64ef87eeb"
    }
})
.then(response => response.json())
.then(data => {

    const competition = data["competition"];
    // const leagueName = document.createTextNode();
    const header = document.getElementById("teams_header");
    const p = document.createElement('p');
    p.innerText = competition.name;
    header.appendChild(p);
    
    const standings = data["standings"];

    standings[0].table.forEach(element => {
        let image = element.team.crestUrl;
        
        const teamsDiv = document.getElementById("teams");

        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'container');
        newDiv.id = "team_logo";

        const logo = document.createElement('img');
        logo.src = image;
    
        teamsDiv.appendChild(newDiv).appendChild(logo);
    });
})
.catch(err => {
    console.log(err);
})
}

getTeams();
