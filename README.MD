# ieyasu.tsv

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


    const COL_DAY = 0;
    const COL_WORK = 1;
    const COL_START = 2;
    const COL_END = 3;
    const COL_TOTAL = 4;
    const COL_BREAK = 5;
    const COL_OVER = 6;
    const COL_COMMENT = 7;
    const COL_CONFIRM = 8;


    function getCellData(cells, index, meta) {
        let text = cells[index].innerText.trim();
        switch (index) {
            case COL_DAY:
                return meta.year + "/" + meta.month + "/" + text.match(/\d+/)[0];
            case COL_START:
            case COL_END:
            case COL_TOTAL:
            case COL_BREAK:
            case COL_OVER:
                let matches = text.match(/\d+:\d+/);
                if (matches && matches.length) {
                    return matches[0];
                } else {
                    return text;
                }
            default:
                return '"' + text + '"';
        }
    }

    function getColHead(cells, index) {
        return "\"" + cells[index].innerText.trim() + "\"";
    }

    window.exportTsv = function() {
        let table = document.getElementById('editGraphTable');
        let rows = table.firstElementChild.children;
        let rawData = [];
        for (let i = 0; i < rows.length; i += 1) {
            let cells = rows[i].children;
            for (let j = 0; j < cells.length; j += 1) {
                if (j != 0) {
                    rawData.push("\t");
                }
                if (i == 0) {
                    rawData.push(getColHead(cells, j));
                } else {
                    rawData.push(getCellData(cells, j, {
                        month: 3,
                        year: 2019
                    }));
                }
            }
            rawData.push("\n");
        }
        console.log(rawData.join(""));
        let a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(rawData.join(""));
        a.setAttribute("download", "data.tsv");

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

})();
```