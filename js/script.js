"use strict";
//importante è tipizzare tutto
class Smartphone {
    constructor(credito) {
        this._credito = credito;
        this._numerochiamate = 0;
        this._inchiamata = {}; //dizionario per inserire i 2 ID che mi servono
        this._tempochiamata = 0;
        this._registro = []; //array
    }
    //Tempo di chiamata e Credito
    addsec() {
        this._tempochiamata++; //ad ogni secondo incrementa di 1 il tempo della chiamata
    }
    starttempochiamata() {
        if (this._inchiamata["tempo"] === undefined) { //se ID tempo è undefined -> esegui e assegna il setInterval.
            this.addsec();
            this._inchiamata["tempo"] = setInterval(this.addsec.bind(this), 1000); //Mi dava problemi con il "this", da quel che ho capito è una parola con un significato particolare e mi dava strane interferenze. Ho cercato setInterval per Typescript e ho trovato la funzione "bind" che ha risolto il problema. Da quel che ho capito crea un puntatore (??)
        }
    }
    menocent() {
        if (this._credito < 0.20) { //se il credito è inferiore a 0.20, esegui la funzione chiudi
            this.chiudi();
            return;
        }
        this._credito -= 0.20; //altrimenti scala 0.20 dal credito
    }
    startscalasoldi() {
        if (this._inchiamata["credito"] === undefined) { // e qui uguale, se l'ID ha valore undefined, gli assegna il setInterval facendo scalare di 0.20 il credito ogni 60sec.
            this.menocent();
            this._inchiamata["credito"] = setInterval(this.menocent.bind(this), 60000);
        }
    }
    chiama() {
        this.starttempochiamata();
        this.startscalasoldi();
    }
    // Fine chiamata
    chiudi() {
        clearInterval(this._inchiamata["tempo"]);
        this._inchiamata["tempo"] = undefined;
        clearInterval(this._inchiamata["credito"]);
        this._inchiamata["credito"] = undefined;
        this._numerochiamate++;
        this._registro.push(this._tempochiamata); //il registro l'ho reso un Array dove al click di "chiudi" segna il tempo di chiamata nell'array
        this._tempochiamata = 0;
    }
    // Reset numero chiamate
    resetchiamate() {
        this._numerochiamate = 0;
    }
    // Ricarica credito
    ricarica(soldi) {
        this._credito += soldi;
    }
}
let CarloMagno = new Smartphone(10);
let GiannaNanna = new Smartphone(1);
let BeppeReppe = new Smartphone(5);
