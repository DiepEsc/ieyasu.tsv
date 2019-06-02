# ieyasu.tsv

ieyasu.tsv is a simple script try to export data from website ieyasu.co in tsv format.

## Browser support

This script was not intended to works with old browsers.
I have tested it only on newest version of Chrome.

## How to use

### Without user script engine

* Using bookmark bar
  + Set your browser to show the bookmark bar
  + Drag this link ([Export tsv](javascript:d=document,m=((e,t)=>[].map.call(e,t)),b=(e=>d.getElementById(e)),c="children",t=(e=>e.innerText.trim()),w=(e=>'"'+t(e)+'"'),g=((e,a,d)=>a?a>1&&a<7&&(r=t(e).match(/\d+:\d+/),r&&r.length)?r[0]:w(e):d+"/"+t(e).match(/\d+/)[0]),h=b("select").value.replace("-","/"),r=m(b("editGraphTable")[c][0][c],(e,t)=>m(e[c],(e,a)=>0==t?w(e):g(e,a,h)).join("\t")).join("\n"),a=d.createElement("a"),a.href="data:text/plain;charset=utf-8,"+encodeURIComponent(r),a.setAttribute("download","data.tsv"),d.body.appendChild(a),a.click(),d.body.removeChild(a); "download tsv file format")) into bookmark bar
  + Go to, and login into ieyasu.co
  + Open "日次勤怠" tab
  + Click this button on the book mark bar
* Using console
  + Copy below script
  + Go to, and login into ieyasu.co
  + Open "日次勤怠" tab
  + Press F12, open console tab
  + Paste the script there and hit enter.
  
```javascript
(() => {

    const documentx = document;
    const mapCall = (col, fun) => [].map.call(col, fun);
    const byId = id => documentx.getElementById(id);
    const chils = "children";
    const getText = element => element.innerText.trim();
    const getTextWrap = element => '"' + getText(element) + '"';

    const getCellData = (cell, index, timePrefix) => {
            if (index) {
                if (index > 1 && index < 7) {
                    const matches = getText(cell).match(/\d+:\d+/);
                    if (matches && matches.length) {
                        return matches[0];
                    }
                }
                return getTextWrap(cell);
            } else return timePrefix + "/" + getText(cell).match(/\d+/)[0];
        }
        (() => {
            const timePrefix = byId("select").value.replace("-", "/");
            const tsv = mapCall(
                byId("editGraphTable")[chils][0][chils],
                (row, i) => mapCall(
                    row[chils],
                    (cell, j) => i == 0 ? getTextWrap(cell) : getCellData(cell, j, timePrefix)
                ).join("\t")
            ).join("\n");
            const a = documentx.createElement("a");
            a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(tsv);
            a.setAttribute("download", "data.tsv");
            documentx.body.appendChild(a);
            a.click();
            documentx.body.removeChild(a);
        })();
})();
```

### With user script engine (TamperMonkey)

**Note:** *I have tested only on TamperMonkey.*

* Download the script in master branch  ([here](https://github.com/DiepEsc/ieyasu.tsv/raw/master/ieyasu.tsv.user.js)) or copy the bellow code, and install it in to your user script engine.
* Go to, and login into ieyasu.co
* Open "日次勤怠" tab
* A ![TSV出力](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAlCAYAAACqL3wuAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABJ0AAASdAHeZh94AAAAB3RJTUUH4wYCCjEublFxDAAAA65JREFUaN7tm0FIG1kYx38TK3p0CGiDWuglkJMwMOvi3uYiZImEkYBQyMkcAkIWPJUIIlR68hAI5KAnYUEIDmFDA15y26AODPQUyKFQKbt1IWuOLaXNHsy4Js7EVGKM0/eHOeTNm+Hl+7/v//7fFyLRwr8f//r25fMnCYGhwejYOPJUwCdJUlMCOH//7ivgE6EZSjQnnz0fkUQmPYrMavoEScOPL58/SULuHgkEUYIoAUGUIEpAEOUV1Mts6jH2qoKoe8VF+TVhfZ/qI1v3k34G4EXW6mmuurbLljbR5TmF1O5LFv2tHZzIYUa3KcWD3Xd6Igf2u+tlNhMnLNjv6WX9lXl+39CQvUyUrL2kpLWPVfdjrJ8lXb58g6NXCTIW6Nt5VkMdQUvEqKztsqVprERzmIVjqvEgIbdAvz3BJMJOawN4DU8eToJyjiRdkT5XZu/t5eeQGoFCkYPy0lUmtqPGYdaC6LIrkf1WCTMdw3B7UEn2PTMfjKiPHyxAYXbSZYJfY9XO0NASKaVIpmJxoTkEoHqMAehqsK9rdFIJW2JnHTbY/xLqoYx6OqN8x+wJflpQIHvCaV3rOHMaHB0WQUmyfCNwFplEjAw3x9f1okMmzPe4ni4bzGvSJ2vL6Nk0mauzqPvZIs/No5Ij86bG4nVTUbeoWKCuKe2Z5tfYMjQXOZtmx4jfTSb/+YDJNCv+wcbrAe15kFUjT2k7gplNENZj1y4H++zXWIkCheO2e7aJWBmQiaiaRVBmeNpV0r1YR4XilIz8tWuXlFJkXY+xWW60T1UjQJGDq3HbRPzckR019u5QlN5eY9X4swDqgjJwCz+EBe8Eixt5dqJgZv9oD1poiZQCZsXi4h5NhDuRhxgoLMzdkr3PZvpO5NB2JpzNRstUWCec1m0ZcjIR94HL7FXXkl0K6AZnZx7LqOp+N4lpcFqxHM8CWVtGxyKTe83BwGSowdGrNIaS5LcezkJ1ZtI7RMHlORTer7l0LBRSSaeiMcgvUcCyBmQi7PVE2LmtiG050NlA/9f0YPY8FM9T+rXMZiJNuNBxM7pNacP93LE7FTdNRDsM1+6BSx0FwPT1tCecLgKRnux89U3ucvPcgxRL5+/fNb3XGauxp6fBpXvQvWXUqrE6m7yO8h1jvW2TRe5en/2YRHkP4odDQZSAIEoQJSCIEhBECaIEBFEC30nU6Ni4iMKQY3RsHJ88FfABojsxxJCnAiMSQLPZlC7O//4q/tQ2fJkkTwVGJEn69h8viXQs0TcQwgAAAABJRU5ErkJggg==) button will appear

```javascript
// ==UserScript==
// @name         ieyasu tsv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://p.ieyasu.co/works*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function init() {
        let parent = document.getElementById('month_apply').parentNode;
        let button = document.createElement("div");
        parent.appendChild(button);
        button.outerHTML = '<div class="floatR" style="margin-right:10px;"><a class="btn" onclick="window.exportTsv()">TSV出力</a></div>';
    }
    
    init();

    const documentx = document;
    const mapCall = (col, fun) => [].map.call(col, fun);
    const byId = id => documentx.getElementById(id);
    const chils = "children";
    const getText = element => element.innerText.trim();
    const getTextWrap = element => '"' + getText(element) + '"';

    const getCellData = (cell, index, timePrefix) => {
            if (index) {
                if (index > 1 && index < 7) {
                    const matches = getText(cell).match(/\d+:\d+/);
                    if (matches && matches.length) {
                        return matches[0];
                    }
                }
                return getTextWrap(cell);
            } else return timePrefix + "/" + getText(cell).match(/\d+/)[0];
        }
        window.exportTsv = () => {
            const timePrefix = byId("select").value.replace("-", "/");
            const tsv = mapCall(
                byId("editGraphTable")[chils][0][chils],
                (row, i) => mapCall(
                    row[chils],
                    (cell, j) => i == 0 ? getTextWrap(cell) : getCellData(cell, j, timePrefix)
                ).join("\t")
            ).join("\n");
            const a = documentx.createElement("a");
            a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(tsv);
            a.setAttribute("download", "data.tsv");
            documentx.body.appendChild(a);
            a.click();
            documentx.body.removeChild(a);
        };
})();
```
