searchReport = () => {
	var json = JSON.parse(localStorage.getItem( document.getElementById("reportType").value ));
    if( json ) {
        const csvData = convertToCsv(json);
        document.getElementById("dataDownload").textContent = csvData;
        document.getElementById("lblResult").hidden = false;
        document.getElementById("dataDownload").hidden = false;
        document.getElementById("btnDownload").hidden = false;
    }
};

downloadResult = () => {
    const csvData = document.getElementById("dataDownload").textContent;
    console.log(csvData)
    window.open('data:text/csv;charset=utf-8,' + escape(csvData));
};

const convertToCsv = (arr) => {
    const keys = Object.keys(arr[0]);
    const replacer = (_key, value) => value === null ? '' : value;
    const processRow = row => keys.map(key => JSON.stringify(row[key], replacer)).join(',');
    return [ keys.join(','), ...arr.map(processRow) ].join('\r\n');
};