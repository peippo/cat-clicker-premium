let currentId = 0;

function getUniqueId() {
	currentId++;
	return currentId;
}

class cat {
	constructor(name, filename) {
		this.name = name;
		this.filename = "images/" + filename + ".jpg";
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


let allCats = [];

allCats.push(new cat('Chewie', 'chewie'));
allCats.push(new cat('Poplinre', 'poplinre'))
allCats.push(new cat('Jetske', 'jetske'))

allCats.forEach(function(element) {
	element.render();
});