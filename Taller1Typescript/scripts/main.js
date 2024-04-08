import { dataSeries } from './dataSeries.js';
var seriesTbody = document.getElementById('series');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalSeasonElm = document.getElementById("seasons-average");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderSeriesInTable(dataSeries);
totalSeasonElm.innerHTML = "".concat(getSeasonsAverage(dataSeries));
function renderSeriesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td>").concat(serie.name, "</td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
        seriesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearSeriesInTable();
    var coursesFiltered = searchSerieByName(text, dataSeries);
    renderSeriesInTable(coursesFiltered);
}
function searchSerieByName(nameKey, series) {
    return nameKey === '' ? dataSeries : series.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getSeasonsAverage(series) {
    var seasonsAverage = series.reduce(function (total, serie) { return total + serie.seasons; }, 0);
    return seasonsAverage / series.length;
}
function clearSeriesInTable() {
    while (seriesTbody.hasChildNodes()) {
        if (seriesTbody.firstChild != null) {
            seriesTbody.removeChild(seriesTbody.firstChild);
        }
    }
}
