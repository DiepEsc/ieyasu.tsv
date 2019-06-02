(function() {

    documentx = document
    mapCall = (col, fun) => [].map.call(col, fun);
    byId = id => documentx.getElementById(id);
    chills = "children";
    getText = element => element.innerText.trim();
    getTextWrap = element => '"'+getText(element)+'"';

    function getCellData(cell, index, timePrefix) {
        if (index) {
            if (index > 1 && index < 7) {
                matches = getText(cell).match(/\d+:\d+/);
                if (matches && matches.length) {
                    return matches[0];
                }
            }
            return getTextWrap(cell);
        } else return timePrefix + "/" + getText(cell).match(/\d+/)[0];
    }
    timePrefix = byId("select").value.replace("-", "/");
    rows = mapCall(
        byId("editGraphTable")[chills][0][chills],
        (row, i) => mapCall(
            row[chills],
            (cell, j) => i == 0 ? getTextWrap(cell): getCellData(cell, j, timePrefix)
        ).join("\t")
    ).join("\n");
    a = documentx.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(rawData.join(""));
    a.setAttribute("download", "data.tsv");
    documentx.body.appendChild(a);
    a.click();
})();