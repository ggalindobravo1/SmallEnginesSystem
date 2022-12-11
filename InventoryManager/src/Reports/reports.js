const reportPage = {};

reportPage.init = () => {
	document.getElementById("startDateInvoice").max = new Date().toLocaleDateString('en-CA');
	document.getElementById("endDateInvoice").max = new Date().toLocaleDateString('en-CA');

	loadSelectSuppliers();
	loadSelectCustomers();
};

loadSelectSuppliers = () => {
	let jsonSuppliers = JSON.parse(localStorage.getItem("supplier")).map(
		(x) => x.supplierName
	);

	var select = document.getElementById("selectSupplierInvoice");
	var option = document.createElement("option");
	option.text = "None";
	option.value = "";
	select.add(option);

	jsonSuppliers.forEach((element) => {
		option = document.createElement("option");
		option.text = element;
		option.value = element;
		select.add(option);
	});
}

loadSelectCustomers = () => {
	let jsonCustomers = JSON.parse(localStorage.getItem("Customer")).map(
		(x) => x.lastName + ", " + x.firstName
	);

	var select = document.getElementById("selectCustomerSale");
	var option = document.createElement("option");
	option.text = "None";
	option.value = "";
	select.add(option);

	jsonCustomers.forEach((element) => {
		option = document.createElement("option");
		option.text = element;
		option.value = element;
		select.add(option);
	});
}

searchReport = (sourceReport) => {
	var json = JSON.parse(localStorage.getItem(sourceReport));
	if (json) {
		const csvData = convertToCsv(json);
		// document.getElementById("dataDownload").textContent = csvData;
		// document.getElementById("lblResult").hidden = false;
		// document.getElementById("dataDownload").hidden = false;
		// document.getElementById("btnDownload").hidden = false;
		console.log(csvData);
		window.open("data:text/csv;charset=utf-8," + escape(csvData));
	}
};

downloadResult = () => {
	const csvData = document.getElementById("dataDownload").textContent;
	console.log(csvData);
	window.open("data:text/csv;charset=utf-8," + escape(csvData));
};

const convertToCsv = (arr) => {
	const keys = Object.keys(arr[0]);
	const replacer = (_key, value) => (value === null ? "" : value);
	const processRow = (row) =>
		keys.map((key) => JSON.stringify(row[key], replacer)).join(",");
	return [keys.join(","), ...arr.map(processRow)].join("\r\n");
};
