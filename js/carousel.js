class Carousel{
	//appelle de nvles instances de cette classe

	//constructeur prends 2 param
	constructor(element, options = {}){

		this.element = element;
		this.options = Object.assign({}, {
			// Tableau d'options, on fusionne l'obj this.options w/ obj contenant 
			//les valeurs par defaut si elle ne sont pas déclarées dans l'instance

			slidesToScroll: 1,
			slidesVisibles: 1,
			loop: false,
			pagination: false,
			navigation: true,

		},options)
	}
}

let onReady = function(){
	new Carousel(document.querySelector('#carousel'),{
		slidesVisibles: 4,
		slidesToScroll: 1,
		loop: true
	})
}


if (document.readyState != 'loading'){
	onReady();
}

document.addEventListener('DOMContentLoaded', onReady);