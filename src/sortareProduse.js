"use strict"

let cloneData = JSON.parse(JSON.stringify(data));
let items = cloneData.items;

let cartRow = document.querySelector('#item-basket-template').content;
let produse = [];


let container = document.querySelectorAll('.container')[0];

let ol = document.querySelector('#data');


let templateLi = document.querySelector('#product-template').content;


function addItems(_items) {

	_items.forEach((item, index) => {

		let li = templateLi.cloneNode(true);


		let produs = li.querySelector('.produs');
		produs.querySelector('.name').textContent = item.name;
		produs.querySelector('.price').textContent = item.price;

		produs.querySelector('.image').setAttribute('src', item.image);
		produs.querySelector('.add').setAttribute('data-index', index);

		ol.appendChild(li);
	});


	let addButon = document.querySelectorAll('.add');

	addButon.forEach((add_button) =>
		add_button.addEventListener('click', (eveniment) => {

			let clone_table_row = cartRow.cloneNode(true);
			let parent = eveniment.currentTarget.parentNode;
			let name = parent.querySelector('.name').textContent;
			let data_index = eveniment.currentTarget.getAttribute('data-index');
			let nrRanduri = document.getElementById('items');

			if (nrRanduri.rows.length == 0 || !produse.includes(name)) {

				console.log(produse);
				if (!produse.includes(name)) {
					produse.push(name);
				}

				let price = parent.querySelector('.price').textContent;
				let total_price = price;
				clone_table_row.querySelector('.name').textContent = name;
				clone_table_row.querySelector('.price').textContent = price;
				clone_table_row.querySelector('.name').parentNode.dataset.index = data_index;

				let inputCantitate = clone_table_row.querySelectorAll('td')[1].querySelector('.cantitate');
				inputCantitate.onchange = function (ev) {
					let cantitateProdust = ev.currentTarget.value;
					total_price = price * cantitateProdust;
					ev.currentTarget.parentNode.parentNode.querySelector('.total').textContent = total_price.toFixed(2);
					totalTabel();
				};

				let sterge = clone_table_row.querySelectorAll('td')[1].querySelector('.remove');
				sterge.onclick = function (ev) {
					document.querySelector('tbody').removeChild(ev.currentTarget.parentNode.parentNode);
					totalTabel();
				};

				clone_table_row.querySelector('.total').textContent = total_price;
				document.querySelector('#items').appendChild(clone_table_row);

			} else {
				switch (name) {
					case 'Briosa':
						updateazaCantitate("Briosa");
						break;
					case 'Supa':
						updateazaCantitate("Supa");
						break;
					case 'Friptura':
						updateazaCantitate("Friptura");
						break;
					case 'Prajitura cu banane':
						updateazaCantitate("Prajitura cu banane");
						break;
					case 'Tort de fructe':
						updateazaCantitate("Tort de fructe");
						break;
					case 'Somon':
						updateazaCantitate("Somon");
						break;
					default:
						console.log("daca vezi mesajul acesta, ceva e gresit.")
				}
			}
			totalTabel();
		})
	);
}
addItems(items);

let sortare = document.querySelector('#sortare');
sortare.addEventListener('change', () => {
	let valoareSortare = sortare.value;
	let switchSortare = () => {
		switch (valoareSortare) {
			case 'cmpPretCrescator':
				return items.sort((a, b) => (a.price < b.price ? -1 : b.price < a.price ? 1 : 0));
			case 'cmpPretDescrescator':
				return items.sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
			case 'cmpNumeCrescator':
				return items.sort((a, b) => (a.name < b.name ? -1 : b.name < a.name ? 1 : 0));
			case 'cmpNumeDescrescator':
				return items.sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
			default:
				return items;
		}
	};
	let addNew = switchSortare();
	ol.innerHTML = '';
	addItems(addNew);
});

function reload() {
	document.getElementById("data").innerHTML = "";
}
items.sort((a, b) => (a.price < b.price ? -1 : b.price < a.price ? 1 : 0));
reload();
addItems(items);