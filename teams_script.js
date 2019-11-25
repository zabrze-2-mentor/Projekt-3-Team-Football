
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
    const header = document.getElementById("teams_header");
    const p = document.createElement('p');
    p.innerText = competition.name;
    header.appendChild(p);
    
    const standings = data["standings"];

    standings[0].table.forEach(element => {
        
        let image = element.team.crestUrl;
        let name = element.team.name;
        let id = element.team.id;

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

        //Szukanie przypadku, kiedy url loga drużyny jest już niedostępne + logika
        // function urlExists(url, callback) {
        //     fetch(url, { method: 'head' })
        //     .then(function(status) {
        //       callback(status.ok)
        //     })
        //   }
        //   urlExists(image, function(exists) {
        //     if (!exists) {
        //         logo.src = "img/favicon.ico";
        //         newH5.innerText = name;
        //         teamsDiv.appendChild(newDiv).appendChild(logo);
        //         newDiv.appendChild(newH5);
        //     } else if(image == null) {
        //         logo.src = "img/favicon.ico";
        //         newH5.innerText = name;
        //         teamsDiv.appendChild(newDiv).appendChild(logo);
        //         newDiv.appendChild(newH5);
        //     }else{
        //         logo.src = image;
        //         teamsDiv.appendChild(newDiv).appendChild(logo);
        //     }
        //   });
        
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

getTeams();
