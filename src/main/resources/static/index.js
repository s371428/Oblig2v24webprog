//Oppretter et Array for å lagre billetter
let billettRegister = [];

//Funksjon for å validere valgt film
function valideringSjekkFilm(film){
    if(!film){
        document.getElementById("validering film").innerText="Må velge en film"; //Viser feilmelding hvis det ikke ble valgt en film (dette er ikke nødvendig å ha med i forhold til oppgaven, men kan være greit å gjøre brukeren obs på at det ikke ble valgt en film)
        return false;
    } else {
        document.getElementById("validering film").innerText = ""; //Hvis det ble valgt en film, vil evt. tidligere feilmeldinger fjernes
    }
    return true;
}

//Funksjon for validering av antall billetter
function valideringSjekkAntall(antall){
    if(!antall){
        document.getElementById("validering antall").innerText="Må skrive inn noe inn i antall"; //Viser beskjed om å skrive inn tall hvis det ikke ble skrevet inn noe tall
        return false;
    }
    else if(isNaN(antall)){
        document.getElementById("validering antall").innerText="Ugyldig verdi - Vennligst skriv inn antall billetter"; //Viser feilmesling hvis det ble skrevet inn noe annet enn tall
        return false;
    }
    else if(parseInt(antall) < 1 || parseInt(antall) > 99){
        document.getElementById("validering antall").innerText="Vennligst velg antall billetter mellom 1 og 99"; //Viser feilmelding hvis det ble skrevet inn et antall mindre enn 1 eller større enn 99
        return false;
    } else {
        document.getElementById("validering antall").innerText = ""; //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av fornavn
function valideringSjekkFornavn(fornavn){
    if(!fornavn){
        document.getElementById("validering fornavn").innerText="Må skrive inn noe inn i fornavnet"; //Gir beskjed om å skrive inn fornavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-zA-Z]/.test(fornavn)){ //Tester om fornavn inneholder noe annet enn bokstavene a-z og A-Z
        document.getElementById("validering fornavn").innerText="Ugyldig verdi - Vennligst skriv inn fornavn"; //Viser feilmelding hvis fornavn inneholder andre symboler, selv om det er bokstaver i fornavnet
        return false;
    } else {
        document.getElementById("validering fornavn").innerText = ""; //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av etternavn
function valideringSjekkEtternavn(etternavn){
    if(!etternavn){
        document.getElementById("validering etternavn").innerText="Må skrive inn noe inn i etternavnet"; //Gir beskjed om å skrive inn noe i etternavn hvis det ikke ble skrevet inn noe i input feltet
        return false;
    }
    else if(/[^a-zA-Z]/.test(etternavn)){ //Tester om etternavn inneholder noe annet enn bokstavene a-z og A-Z
        document.getElementById("validering etternavn").innerText="Ugyldig verdi - Vennligst skriv inn etternavn"; //Viser feilmelding hvis etternavn inneholder andre symboler, selv om det er bokstaver i etternavnet
        return false;
    } else {
        document.getElementById("validering etternavn").innerText = ""; //Fjerner tidligere feilmeldinger hvis skrevet inn verdi er gydlig
    }
    return true;
}

//Funksjon for validering av telefonnummer
function valideringSjekkTelefonnr(telefonnr){
    if(!telefonnr){
        document.getElementById("validering telefonnr").innerText="Må skrive inn noe inn i telefonnr";
        return false;
    }
    else if(isNaN(telefonnr) || telefonnr.length !== 8){ //Viser feilmelding hvis telefonnummer inneholder andre symboler enn tall og om nummeret ikke består av 8 siffere
        document.getElementById("validering telefonnr").innerText="Ugyldig verdi - Telefonnummer må bestå av 8 siffer";
        return false;
    } else {
        document.getElementById("validering telefonnr").innerText = "";
    }
    return true;
}

//Funksjon for validering av epostadresse
function valideringSjekkEpost(epost){
    if(!epost){
        document.getElementById("validering epost").innerText="Må skrive inn noe inn i epost";
        return false;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)){ //Bruker dette mønsteret til å sjekke om epostadresse er gyldid ved å følge formatet der brukernavn er først, så @, domenenavn og toppnivådomene
        document.getElementById("validering epost").innerText="Ugyldig verdi - Vennligst skriv inn epost"; //Viser feilmelding hvsi epostadresse ikke er gyldig
        return false;
    } else {
        document.getElementById("validering epost").innerText = "";
    }
    return true;
}


//funksjon for å vise billettregister
function visBillettRegister(){

    const film = document.getElementById("velg").value;
    const antall = document.getElementById("antall").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;


    //Sjekker om alle valideringsfunksjonene returnerer 'false', som indikerer at minst en av inputverdiene ikke er gyldig
    //Hindrer at en billett blir registrert i billettregisteret dersom minst en av inputfeltene inneholder ugyldig verdi
    if(!valideringSjekkFilm(film) | !valideringSjekkAntall(antall) | !valideringSjekkFornavn(fornavn) | !valideringSjekkEtternavn(etternavn) | !valideringSjekkTelefonnr(telefonnr) | !valideringSjekkEpost(epost)){
        return;
    }
    //Brukte Bitwise OR operator, var eneste vei for å få koden til å vise alle feimeldinger på samme tid, ved benyttelse av vanlig OR operator (||), hadde en og en feilmedling vistes

    const nyBillett = {
        film : film,
        antall : antall,
        fornavn : fornavn,
        etternavn : etternavn,
        telefonnr : telefonnr,
        epost : epost
    };

    billettRegister.push(nyBillett); //Legger til billetten i arrayet
    visBillettTabell(); //Funksjon som viser billett teballen
    klarererForm(); //Resetter og klarerer utfyllingene for neste billett
}

//Funksjon som viser billett tabellen og tillegg til registrerte billetter
function visBillettTabell(){
    let utskriftAvBillett = "<table style='text-align: center'><tr>" +
        "<th><h3>Film</h3></th><th><h3>Antall</h3></th><th><h3>Fornavn</h3></th><th><h3>Etternavn</h3></th><th><h3>Telefonnr</h3></th><th><h3>Epost</h3></th>" +
        "</tr>";

    for(let i = 0; i < billettRegister.length; i++){
        utskriftAvBillett+="<tr>";
        utskriftAvBillett+="<td>"+billettRegister[i].film+"</td><td>"+billettRegister[i].antall+"</td><td>"+billettRegister[i].fornavn+"</td><td>"+billettRegister[i].etternavn+"</td><td>"+billettRegister[i].telefonnr+"</td><td>"+billettRegister[i].epost+"</td>";
        utskriftAvBillett+="</tr>";
    }
    utskriftAvBillett+="<table>";

    document.getElementById("billettRegister").innerHTML=utskriftAvBillett;
}

//Funksjon som fjerner skrevet inn verdier, denne funksjonen benyttes i visBillettRegister funksjonen
function klarererForm(){
    document.getElementById("velg").value = "";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";
}

//Funksjon som fjerner billettene i fra billettRegister Arrayet
function slettAlleBilletter(){
    billettRegister = []; //Tømmer arrayer
    visBillettTabell(); //Viser tabellen på nytt, skal vise en tom tabell
    console.log("Tabell slettet"); //viser log for å sjekke om arrayet faktisk ble tømt
}