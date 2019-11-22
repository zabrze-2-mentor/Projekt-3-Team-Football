function fetchFromAPI(url=undefined, authToken=undefined){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.body.innerHTML = xhttp.responseText;
            //document.body.innerHTML = xhttp.headers;
            let response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-Auth-Token", authToken);
    xhttp.send();   
}
function fetchLeagues(plan = "TIER_ONE") {
}
fetchFromAPI("http://api.football-data.org/v2/competitions?plan=TIER_ONE", "0a1d051b19754c12ac0c1e59f1b93ec5");