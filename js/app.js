let currentId = 0;
let newCatButton = document.getElementById('newCatButton')

function getUniqueId() {
	currentId++;
	return currentId;
}

class cat {
	constructor(name, filename) {
		this.name = name;
		this.filename = filename;
		this.clicks = 0;
		this.id = getUniqueId();
	}

	render() {
		const elementMarkup =
			`<img class="cat__image" src="${this.filename}" alt="${this.name}">
			<div class="cat__name">${this.name}</div>
			<div class="cat__counter"><span class="js-click-counter">${this.clicks}</span> clicks</div>`;

		if (this.clicks > 0) {
			const domElement = document.querySelector('[data-id="' + this.id + '"]');
			domElement.innerHTML = elementMarkup;
		} else {
			const catAreaElement = document.querySelector('.cats');
			const element = document.createElement('div');
			element.classList.add('cat__wrapper');
			element.innerHTML = elementMarkup;
			element.dataset.id = this.id;
			element.addEventListener('click', () => this.addClick());
			catAreaElement.append(element);
		}
	}

	addClick() {
		this.clicks++;
		this.render();
	}
}

function newCat() {
	let newCatName;
	fetch('js/cat-names.json')
		.then(response =>  response.json())
		.then(json => {
			newCatName = json[Math.floor(Math.random() * json.length)];
			return fetch('https://cataas.com/cat');
		})
		.then(response => response.blob())
		.then(blob => {
			let imageURL = URL.createObjectURL(blob);
			let newCat = new cat(newCatName, imageURL);
			newCat.render();
		})
		.catch(function(error) {
			console.log('Error fetching a new cat: ', error.message);
		});
}

newCatButton.addEventListener('click', newCat);