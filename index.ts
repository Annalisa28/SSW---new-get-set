// Import stylesheets
import './style.css';

//RxJS è una libreria event-driven di Javascript, utilizzabile con React, con la quale è possibile gestire sequenze di eventi che possono avvenire in un'applicazione web.
import './style.css';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';
const URL: string =
  'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';
//variabile che conterrà la chiave generata e settata con un valore
var key: string; 

//eevent listener collegati al click dei 3 bottoni - chiamano ciascuno una funzione - callbak
document.getElementById('newbtn').addEventListener('click', newKey);
document.getElementById('setbtn').addEventListener('click', setValue);
document.getElementById('getbtn').addEventListener('click', getValue);

//terzo passo: funzione che genra una nuova coppia chiave-valore, visualizzando solo la chiave
//per farlo, fa una get, componendo un URL
function newKey() {
  const obs = ajax({
    method: 'GET',
    url: URL + '/new?secret=ssw2022',
    //reindirizzamento della richiesta ad un altro dominio se c'è bisogno
    crossDomain: true,
  })
  //prende la risposta alla richiesta (chiave) e la mette in key
  obs.subscribe({
    next: (res: AjaxResponse<any>) => {
      key = res.response;
      //stampa la key
      document.getElementById('key').innerHTML = key;
    },
    error: (err: AjaxError) => console.error(err.response),
  });
}

//funzione che setta una chiave generata dalla funzione new key
function setValue() {
  console.log(document.getElementById('data'));
  const obs = ajax({
    //volgio impostare il mio nuovo valore in corrispondenza della chiave 
    method: 'POST',
    //URL per scrivere la nuova chiave 
    url:URL + '/set?key=' + key,
    crossDomain: true,
    //valore da associare alla chiave - prende il valore inserito nel campo da associare alla chiave, i due dati saranno messi in collegamento dal server
    body: document.getElementById('data').value
  })
  obs.subscribe({
    //se la richiesta post avviene correttamente è stampato 'ok'
    next: (res: AjaxResponse<any>) => {
      document.getElementById('output').innerHTML = 'Ok!';
    },
    error: (err: AjaxError) => console.error(err.response),
  });
}

//la funzione restituisce il valore della chiave settata
function getValue() {
  const obs = ajax({
    method: 'GET',
    //url con chiave generata e settata con un valore
    url: URL + '/get?key=' + key,
    crossDomain: true,
  });
  obs.subscribe({
    //se non da errori, ristampa il valore della chiave per confermare
    next: (res: AjaxResponse<any>) => {
      document.getElementById('output').innerHTML = res.response;
    },
    error: (err: AjaxError) => console.error(err.response),
  });
}

