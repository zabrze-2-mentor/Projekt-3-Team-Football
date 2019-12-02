function addnavbar () {
    // Dane które powinny być przekazywane ale nie są więc tu dla przykładu
        const LeagueId = ['2013','2016','2021','2018','2001','2015','2002','2019','2003','2017','2014','2000'];
        const LeagueName = ['Série A','England','Championship','Premier League','European Championship','UEFA Champions League','Ligue 1','Bundesliga','Serie A','Eredivisie','Primeira Liga','Primera Division','FIFA World Cup'];
        const TeamId = ['Team1','Team2','Team3','Team4','Team5','Team6','Team7','Team8','Team9','Team10','Team11','Team12'];
        const TeamName = ['Team1','Team2','Team3','Team4','Team5','Team6','Team7','Team8','Team9','Team10','Team11','Team12'];
    // Bootstrap navbar   
        const navbar = document.createElement('nav');
        navbar.setAttribute('class','navbar navbar-expand-lg navbar-dark');
        navbar.setAttribute('style','background-color:#1E352F')
        navbar.setAttribute('id','navbar');
        document.body.insertBefore(navbar, document.body.firstChild);
    
    // Bootstrap menu button
        const button = document.createElement('button');
        button.setAttribute('class','navbar-toggler');
        button.setAttribute('type','button');
        button.setAttribute('data-toggle','collapse');
        button.setAttribute('data-target','#navbarSupportedContent');
        button.setAttribute('aria-controls','navbarSupportedContent');
        button.setAttribute('aria-expanded','false');
        button.setAttribute('aria-label','Toggle navigation');
        navbar.appendChild(button);
        button.innerHTML = '<span class="navbar-toggler-icon"></span>';
    
    // Bootstrap menu options  
        const divContainer = document.createElement('div');
        divContainer.setAttribute('class','collapse navbar-collapse');
        divContainer.setAttribute('id','navbarSupportedContent');
        navbar.appendChild(divContainer);
    
    // Bootstrap navbar list
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'navbar-nav mr-auto');
        divContainer.appendChild(ul);
    
    // Bootstrap league list elements
        const liLeague = document.createElement('li');
        liLeague.setAttribute('class','nav-item dropright');
        liLeague.setAttribute('style','background-color:#335145');
        liLeague.innerHTML = '<a class="nav-link dropdown-toggle" href="index.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Lista Lig </a>';
        ul.appendChild(liLeague);
    
        const divLeague = document.createElement('div');
        divLeague.setAttribute('class','collapse dropdown-menu');
        divLeague.setAttribute('style','background-color:#828C51');
        divLeague.setAttribute('aria-labelledby','navbarDropdown');
    
        for(i=0;i<LeagueId.length;i++) {
        // League links
            const league = document.createElement('li'); 
            league.innerHTML = `<a class="dropdown-item dropdown-toggle" href="stronaligi.html${LeagueId[i]}" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${LeagueName[i]}</a>`;
            divLeague.appendChild(league);
    
            const divTeam = document.createElement('div');
            divTeam.setAttribute('class',' dropright');
            divTeam.setAttribute('aria-labelledby','navbarDropdown');
            divTeam.setAttribute('style','background-color:#A6C36F');
            league.appendChild(divTeam);
        // Team links 
            for(j=0;j<TeamId.length;j++) {
                const team = document.createElement('li');
                team.innerHTML = `<a class="dropdown-item" href="team.html${TeamId[j]}" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${TeamName[j]}</a>`;
                divTeam.appendChild(team);
            }
        }
        ul.firstChild.appendChild(divLeague);
    }
    addnavbar();