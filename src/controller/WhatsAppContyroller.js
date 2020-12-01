class WhatsAppContyroller {

	constructor() {
		console.log("WhatsAppContyroller OK")

		this.elementsPrototype();
		this.loadElements();
		this.initEvents();

	}

	loadElements() {
		this.el = {};

		document.querySelectorAll('[id]').forEach(element => {

			this.el[Format.getCamelCAse(element.id)] = element;

		})
	}

	elementsPrototype() {

		Element.prototype.hide = function () {
			this.style.display = 'none';
			return this; // returning "this" allow us to line up as many methods as we need as
			// show().css().addClass() and so on...
		}
		// testing hide method in the browser
		// app.el.app.hide()

		Element.prototype.show = function () {
			this.style.display = 'block';
			return this;
		}

		Element.prototype.toggle = function () {
			this.style.display = (this.style.display === 'none') ? 'block' : 'none';
			return this;
		}

		Element.prototype.on = function (events, func) {
			events.split(' ').forEach(event => {
				this.addEventListener(event, func);
			})
			return this;
		}

		Element.prototype.css = function (styles) {
			for (let name in styles) {
				this.style[name] = styles[name];
			}
			return this;
		}

		Element.prototype.addClass = function (name) {
			this.classList.add(name);
			return this;
		}
		Element.prototype.removeClass = function (name) {
			this.classList.remove(name);
			return this;
		}
		Element.prototype.toggleClass = function (name) {
			this.classList.toggle(name);
			return this;
		}
		Element.prototype.hasClass = function (name) {
			return this.classList.contains(name);
		}
	}

	initEvents() {
		this.el.myPhoto.on('click', e => {
			this.closeLeftPanel();
			this.el.panelEditProfile.show();

			setTimeout(() => {
				this.el.panelEditProfile.addClass('open');
			}, 100)//to deal with the scrol animation
		})

		this.el.btnNewContact.on('click', e => {
			this.closeLeftPanel()
			this.el.panelAddContact.show();

			setTimeout(() => {
				this.el.panelAddContact.addClass('open');
			}, 100)
		})

		this.el.btnClosePanelEditProfile.on('click', e => {
			this.el.panelEditProfile.removeClass('open');
		})

		this.el.btnClosePanelEditProfile.on('click', e => {
			this.el.panelEditProfile.removeClass('open');
		})

		this.el.btnClosePanelAddContact.on('click', e => {
			this.el.panelAddContact.removeClass('open');
		})
	}

	closeLeftPanel() {
		this.el.panelEditProfile.hide();
		this.el.panelAddContact.hide();
	}

}