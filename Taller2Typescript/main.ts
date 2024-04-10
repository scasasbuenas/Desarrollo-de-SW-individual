
import { Serie } from './serie.js';

import { dataSeries } from './dataSeries.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalSeasonElm: HTMLElement = document.getElementById("total-seasons")!;
let seriesInfo: HTMLElement = document.getElementById('seriesInfo')!;

btnfilterByName.onclick = () => applyFilterByName();

renderSeriesInTable(dataSeries);

totalSeasonElm.innerHTML = `${getSeasonsAverage(dataSeries)}`


function renderSeriesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  var tbody = document.querySelector('#id-del-tbody')!;

  series.forEach((serie) => {
    let trElement = document.createElement("tr");

        let tdID = document.createElement("td");
        tdID.innerHTML = serie.id.toString();
        trElement.appendChild(tdID);

        let tdName = document.createElement("td");
        tdName.innerHTML = `<a href="#" class="serie-name">${serie.name}</a>`;
        trElement.appendChild(tdName);

        tdName.addEventListener('click', () => seriesInfo.innerHTML = "\n<div class=\"card\" style=\"width: 30rem;\">\n<img class=\"card-img-top\" src=\"".concat(serie.image, "\"  height: auto;\">\n            <div class=\"card-body\">\n                <h1 class=\"card-title\" style=\"font-size:larger\">").concat(serie.name, "</h1>   \n                <p>").concat(serie.description, "</p>\n                <p> <a href=\"").concat(serie.link, "\" target=\"_blank\">").concat(serie.link, "</a></p>\n            </div>\n        </div>\n    "));

        let tdChannel = document.createElement("td");
        tdChannel.innerHTML = serie.channel;
        trElement.appendChild(tdChannel);

        let tdSeasons = document.createElement("td");
        tdSeasons.innerHTML = serie.seasons.toString();
        trElement.appendChild(tdSeasons);

        tbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearSeriesInTable();
  let seriesFiltered: Serie[] = searchSerieByName(text, dataSeries);
  renderSeriesInTable(seriesFiltered);
}

function searchSerieByName(nameKey: string, series: Serie[]) {
  return nameKey === '' ? dataSeries : series.filter( c => 
    c.name.match(nameKey));
}

function getSeasonsAverage(series: Serie[]): number {
  let seasonsAverage = series.reduce((total, serie) => total + serie.seasons, 0);
  return seasonsAverage / series.length;
}

function clearSeriesInTable() {
  while (seriesTbody.hasChildNodes()) {
    if (seriesTbody.firstChild != null) {
      seriesTbody.removeChild(seriesTbody.firstChild);
     
    }
  }
}
