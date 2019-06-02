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