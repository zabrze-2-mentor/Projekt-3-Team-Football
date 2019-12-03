function addnavbar() {
    window.onload = function () {
        // Dane które powinny być przekazywane ale nie są więc tu dla przykładu
        const LeagueId = [];
        const LeagueName = [];
        const TeamId = [];
        const TeamName = [];
        // Bootstrap navbar   
        const navbar = document.createElement('nav');
        navbar.setAttribute('class', 'navbar navbar-expand-lg navbar-dark');
        navbar.setAttribute('id', 'navbar');
        document.body.insertBefore(navbar, document.body.childNodes[0]);

        // Bootstrap menu button
        const button = document.createElement('button');
        button.setAttribute('class', 'navbar-toggler');
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', '#navbarSupportedContent');
        button.setAttribute('aria-controls', 'navbarSupportedContent');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Toggle navigation');
        navbar.appendChild(button);
        button.innerHTML = '<span class="navbar-toggler-icon"></span>';

        // Bootstrap menu options  
        const divContainer = document.createElement('div');
        divContainer.setAttribute('class', 'collapse navbar-collapse');
        divContainer.setAttribute('id', 'navbarSupportedContent');
        navbar.appendChild(divContainer);

        // Bootstrap navbar list
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'navbar-nav mr-auto');
        divContainer.appendChild(ul);

        //League API

        function getLeagueNameAndId(leagueId, leagueName) {
            fetch('http://api.football-data.org/v2/competitions?plan=TIER_ONE', {
                    method: 'GET',
                    headers: {
                        "X-Auth-Token": 'f3e6d2495f604ee8b170b4282c503d9a'
                    }
                })
                .then(res => res.json())
                .then(data => {

                    for (i = 0; i < data.competitions.length; i++) {
                        leagueId[i] = data.competitions[i].id;
                        leagueName[i] = data.competitions[i].name;
                    }
                    return leagueId, leagueName;
                })
                .catch(err => console.log(err))
        }
        getLeagueNameAndId(LeagueId, LeagueName);

        console.log(LeagueId, LeagueName);

        // Team API


        function getTeamNameAndId(teamId, teamName) {
            const leagueId = window.location.hash.slice(1);

            fetch(`http://api.football-data.org/v2/competitions/${leagueId}/teams`, {
                    method: 'GET',
                    headers: {
                        "X-Auth-Token": 'f3e6d2495f604ee8b170b4282c503d9a'
                    }
                })
                .then(res => res.json())
                .then(data => {

                    for (j = 0; j < data.teams.length; j++) {
                        teamId[j] = data.teams[j].id;
                        teamName[j] = data.teams[j].name;
                    }
                    return teamId, teamName;
                })
                .catch(err => console.log(err))
        }
        getTeamNameAndId(TeamId, TeamName);

        console.log(TeamId);
        console.log(TeamName);


        if (window.location.href.split('?')[0].includes('index.html')) {
            // Bootstrap league list elements

            const liLeague = document.createElement('li');
            liLeague.setAttribute('class', 'nav-item dropdown');
            liLeague.setAttribute('style', 'background-color:rgb(30, 53, 47)');
            liLeague.innerHTML = '<a class="nav-link dropdown-toggle" href="index.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Leagues List </a>';
            ul.appendChild(liLeague);

            // Bootstrap menu div
            setTimeout(function menuDivL() {
                const divLeague = document.createElement('div');
                divLeague.setAttribute('class', 'collapse dropdown-menu');
                divLeague.setAttribute('style', 'background-color:rgb(130, 140, 81)');
                divLeague.setAttribute('aria-labelledby', 'navbarDropdown');
                liLeague.appendChild(divLeague);

                for (i = 0; i < LeagueId.length; i++) {
                    // League links
                    let tmpLeagueId = LeagueId[i];
                    console.log(LeagueId[i]);

                    const league = document.createElement('li');
                    league.setAttribute('class', 'dropdown-item');
                    league.innerHTML = `<a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${LeagueName[i]}</a>`;
                    league.addEventListener('click', function () {
                        window.location.replace("stronaligi.html#" + tmpLeagueId)


                    });
                    divLeague.appendChild(league);
                }
                ul.firstChild.appendChild(divLeague);
            }, 750);
            menuDivL();
        }

        if (window.location.href.split('?')[0].includes('stronaligi.html')) {
            // Bootstrap Team list elements

            const liTeam = document.createElement('li');
            liTeam.setAttribute('class', 'nav-item dropdown');
            liTeam.setAttribute('style', 'background-color:rgb(30, 53, 47)');
            liTeam.innerHTML = '<a class="nav-link dropdown-toggle" href="index.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Teams List </a>';
            ul.appendChild(liTeam);

            // Bootstrap menu div
            setTimeout(function menuDivT() {
                const divTeam = document.createElement('div');
                divTeam.setAttribute('class', 'collapse dropdown-menu');
                divTeam.setAttribute('style', 'background-color:rgb(130, 140, 81)');
                divTeam.setAttribute('aria-labelledby', 'navbarDropdown');
                liTeam.appendChild(divTeam);

                for (j = 0; j < TeamId.length; j++) {
                    // Team links
                    let tmpTeamId = TeamId[j];


                    const team = document.createElement('li');
                    team.setAttribute('class', 'dropdown-item');
                    team.innerHTML = `<a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${TeamName[j]}</a>`;
                    divTeam.appendChild(team);
                    team.addEventListener('click', function () {
                        window.location.href = `team.html#${tmpTeamId}`;
                    });
                }
                ul.firstChild.appendChild(divTeam);
            }, 750);
        }

        // Bootstrap home
        if (!window.location.href.split('?')[0].includes('index.html')) {
            const liHome = document.createElement('li');
            liHome.setAttribute('class', 'nav-item');
            liHome.setAttribute('style', 'background-color:rgb(30, 53, 47)');
            liHome.innerHTML = '<a class="nav-link" href="index.html"> Home <span class="sr-only">(current)</span></a>';
            ul.appendChild(liHome);
        }
    }
}
addnavbar();