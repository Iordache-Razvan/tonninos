'use strict';

function totalTabel() {


	let cartItems = document.querySelector("#items");
	let cartRows = cartItems.getElementsByTagName("tr");
	let cartLength = cartRows.length;

	let total = 0;

	for (let i = 0; i < cartLength; i++) {
		let pretProdus = cartRows[i].getElementsByTagName('td')[2].textContent;
		let cantitateProdus = cartRows[i].getElementsByTagName('input').cantitate.value;
		total = total + pretProdus * cantitateProdus;

	}

	document.querySelector('#total').textContent = parseFloat(total).toFixed(2);
}

function updateazaCantitate(numeProdus) {

	let cartItems = document.querySelector("#items");
	let cartRows = cartItems.getElementsByTagName("tr");
	let cartLength = cartRows.length;

	for (let i = 0; i < cartLength; i++) {
		let productName = cartRows[i].querySelector('.name').textContent;

		if (productName == numeProdus) {
			let inputulCantitatiiCurente = cartRows[i].querySelector('.cantitate');
			let valoareaCantitatiiCurente = inputulCantitatiiCurente.getAttribute("value");
			inputulCantitatiiCurente.setAttribute("value", ++valoareaCantitatiiCurente);
			let eventUpdateCantitate = new Event("change");
			inputulCantitatiiCurente.dispatchEvent(eventUpdateCantitate);
		}
	}
}