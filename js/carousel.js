class Carousel{ // Création de la class Carousel. Elle nous permettra d'appeller de nouvelle instance de cette class.


    constructor(element, options = {} ){ // Le constructeur prends deux parametres, qui correspondent qui correspondent aux parametres que l'on définira dans la nouvelle instance de la class Carousel. Par défaut on mettra un objet vide si on ne précise pas d'options.
        this.element = element; // On stock element dans une variable this.element pour y acceder dans touts les autres méthodes
        this.options = Object.assign({},{// On défini le tableau d'options. On fusionne l'objet this.options avec un objet qui contient les valeurs par défaut. ( Au cas ou elle n'ont pas été déclarée dans l'instance.) {} est un objet vide qui va obtenir les différentes propriétés fusionnées, puis les options par défaut.
            slidesToScroll:1,
            slidesVisibles:3,
            loop:false,
            pagination:false,
            navigation:true,
            useKey:false,
        }, options)
        let children = [].slice.call(element.children);//On transforme la nodelist (ce qui sort du querySelector(all)) qui contient les éléments enfants au moment de l'exécution du script. Plus simple d'itérer sur un tableau que sur une nodeList.
        this.currentItem = 0 // Permet de définir le premier éléments du slider comme départ du slider.

        //Modification du DOM
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel_container')
        this.root.setAttribute('tabindex','0')
        this.root.appendChild(this.container) //On rajoute la div container dans la div root
        this.element.appendChild(this.root) //On rajoute la div root dans le DOM
        this.items = children.map((child) =>{
            let item = this.createDivWithClass('carousel_item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        if(this.options.navigation){
            this.createNavigation()
        }
        if(this.options.pagination){
            this.createPagination()
        }

        if(this.options.useKey){
            this.root.addEventListener('keyup',e =>{
                if(e.key === 'ArrowRight' || e.key === 'Right'){
                    this.next()
                }else if(e.key ==='ArrowLeft' || e.key === 'Left'){
                    this.prev()
                }
            })
        }
    }

    //On applique les bonnes dimensions aux éléments du carousel
    setStyle(){// La création d'une méthode ici permet dr relancer cette méthode quand les valeurs changent. 
        let ratio = this.items.length / this.options.slidesVisibles
        this.container.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = ((100/this.options.slidesVisibles) / ratio) + '%')
    }

    createPagination(){
        let pagination = this.createDivWithClass('carousel_pagination')
        let buttons = []
        this.root.appendChild(pagination)
        for(let i = 0; i > this.items.length; i = i + this.options.slidesToScroll){
            let button = this.createDivWithClass('carousel_pagination_button')
            button.addEventListener('click', ()=> this.gotoItem(i))
            pagination.appendChild(button)
            buttons.push(button)
        }
    }
    

    createNavigation(){
        let nextButton = this.createDivWithClass('carousel_next')
        let prevButton = this.createDivWithClass('carousel_prev')
        this.root.appendChild(nextButton) //On les ajoutes à la racine du docuement
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this)) //On bind this pour ne pas perdre le contexte.
        prevButton.addEventListener('click', this.prev.bind(this)) 
        //Comme ca dans les méthode next et prev, this ne fera pas réference à l'élement sur lequel on vient d'appuyer mais à la class
        
    }

    next(){
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    prev(){
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }

    gotoItem(index){
        if(index < 0){
            if(this.options.loop){
                index = this.items.length - this.options.slidesVisibles
            }else{
                return
            }
        }else if(index >= this.length || (this.items[this.currentItem + this.options.slidesVisibles] === undefined && index > this.currentItem)){ //Permet d'aller au début du carrousel
            if(this.options.loop){
                index = 0
            }else{
                return
            }
        }
        let translateX = index * -100 / this.items.length //Permet d'avoir la longueur du slide en pourcentage par rapport à toutes les slides
        this.container.style.transform = `translate3d(${translateX}%, 0, 0)`
        this.currentItem = index
    }

    createDivWithClass(className){
        let div = document.createElement('div')
        div.setAttribute('class',className)
        return div
    }
}


let onReady = function(){
    new Carousel(document.querySelector("#carousel"),{
        slidesVisibles: 5,
        slidesToScroll:2,
        loop:true,
        useKey:true
    })
}

if(document.readyState != 'loading'){// Savoir si c'est charger
    onReady()
}
document.addEventListener('DOMContentLoaded', onReady)