# ieyasu.tsv

ieyasu.tsv is a simple script try to export data from website ieyasu.co in tsv format.

## Browser support

This script was not intended to works with old browsers.
I have tested it only on newest version of Chrome.

## How to use

### Without user script engine

* Using bookmark bar
  + Set your browser to show the bookmark bar
  + Create new bookmark on the the bookmark bar which title is `Export tsv` or anything and url is 
  ```javascript
  javascript:(()=>{d=document,m=((e,t)=>[].map.call(e,t)),b=(e=>d.getElementById(e)),c="children",t=(e=>e.innerText.trim()),w=(e=>'"'+t(e)+'"'),g=((e,a,d)=>a?a>1&&a<7&&(r=t(e).match(/\d+:\d+/),r&&r.length)?r[0]:w(e):d+"/"+t(e).match(/\d+/)[0]),h=b("select").value.replace("-","/"),r=m(b("editGraphTable")[c][0][c],(e,t)=>m(e[c],(e,a)=>0==t?w(e):g(e,a,h)).join("\t")).join("\n"),a=d.createElement("a"),a.href="data:text/plain;charset=utf-8,"+encodeURIComponent(r),a.setAttribute("download","data.tsv"),d.body.appendChild(a),a.click(),d.body.removeChild(a);})();
  ```
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
(()=>{d=document,m=((e,t)=>[].map.call(e,t)),b=(e=>d.getElementById(e)),c="children",t=(e=>e.innerText.trim()),w=(e=>'"'+t(e)+'"'),g=((e,a,d)=>a?a>1&&a<7&&(r=t(e).match(/\d+:\d+/),r&&r.length)?r[0]:w(e):d+"/"+t(e).match(/\d+/)[0]),h=b("select").value.replace("-","/"),r=m(b("editGraphTable")[c][0][c],(e,t)=>m(e[c],(e,a)=>0==t?w(e):g(e,a,h)).join("\t")).join("\n"),a=d.createElement("a"),a.href="data:text/plain;charset=utf-8,"+encodeURIComponent(r),a.setAttribute("download","data.tsv"),d.body.appendChild(a),a.click(),d.body.removeChild(a);})();
```

### With user script engine (TamperMonkey)

**Note:** *I have tested only on TamperMonkey.*

* Download the script in master branch  ([here](https://github.com/DiepEsc/ieyasu.tsv/raw/master/ieyasu.tsv.user.js)) or copy the bellow code, and install it in to your user script engine.
* Go to, and login into ieyasu.co
* Open "日次勤怠" tab
* TSV出力 button will appear

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
