class WhatsAppContyroller {

	constructor() {
		console.log("WhatsAppContyroller OK")

		this.loadElements();
	}

	loadElements(){
		this.el = {};

		document.querySelectorAll('[id]').forEach(element => {

			this.el[Format.getCamelCAse(element.id)] = element;

		})
	}

}