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

		// Get the form data
		HTMLFormElement.prototype.getForm = function () {
			return new FormData(this);
		}
		// Transform into json to store in Firebase
		HTMLFormElement.prototype.toJSON = function () {

			let json = {};

			this.getForm().forEach((value, key) => {
				json[key] = value
			})
			return json
		}


	} // end of elementsPrototype

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

		this.el.photoContainerEditProfile.on('click', e => {
			this.el.inputProfilePhoto.click();
		})

		// Edit profile picture
		this.el.inputNamePanelEditProfile.on('keypress', e => {
			// prevent new line and 'click' on 'check icon'
			if (e.key === 'Enter') {
				e.preventDefault();

				this.el.btnSavePanelEditProfile.click();
			}
		})

		this.el.btnSavePanelEditProfile.on('click', e => {
			console.log(this.el.inputNamePanelEditProfile.innerHTML)
		})

		// Add new contact
		this.el.formPanelAddContact.on('submit', e => {
			e.preventDefault();

			let formData = new FormData(this.el.formPanelAddContact);

		})

		// Open message and hide home panel
		this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
			item.on('click', e => {
				this.el.home.hide();
				this.el.main.css({
					display: 'flex'
				})
			})
		})

		// On click on the clip icon, open menu-attach
		this.el.btnAttach.on('click', e => {

			e.stopPropagation();// prevent propagation on ancestral elements

			this.el.menuAttach.addClass('open');
			document.addEventListener('click', this.closeMenuAttach.bind(this));

		})

		this.el.btnAttachPhoto.on('click', e => {
			this.el.inputPhoto.click();
		})

		this.el.inputPhoto.on('change', e => {
			console.log(this.el.inputPhoto.files);

			// using SPREAD OPERATOR to generats the array of files and allows us to use forEach()
			[...this.el.inputPhoto.files].forEach(file => {
				console.log(file)
			})
		})

		this.el.btnAttachCamera.on('click', e => {

			this.closeAllMainPanel();
			this.el.panelCamera.addClass('open');
			this.el.panelCamera.css({
				'height': 'calc(100% - 120px)'
			})

		})

		this.el.btnClosePanelCamera.on('click', e => {

			this.closeAllMainPanel();
			this.el.panelMessagesContainer.show();

		})

		this.el.btnTakePicture.on('click', e => {
			console.log("pic")
		})


		this.el.btnAttachDocument.on('click', e => {

			this.closeAllMainPanel();
			this.el.panelDocumentPreview.addClass('open');
			this.el.panelDocumentPreview.css({
				'height': 'calc(100% - 120px)'
			})

		})

		this.el.btnClosePanelDocumentPreview.on('click', e => {

			this.closeAllMainPanel();
			this.el.panelMessagesContainer.show();

		})

		this.el.btnSendDocument.on('click', e => {
			console.log("sent")
		})

		this.el.btnAttachContact.on('click', e => {
			this.el.modalContacts.show();
		})

		this.el.btnCloseModalContacts.on('click', e => {
			this.el.modalContacts.hide();
		})

		this.el.btnSendMicrophone.on('click', e => {

			this.el.recordMicrophone.show();
			this.el.btnSendMicrophone.hide();
			this.startRecordMicrophoneTimer();

		})

		this.el.btnCancelMicrophone.on('click', e => {
			this.closeRecordMicrophone()
		})

		this.el.btnFinishMicrophone.on('click', e => {
			this.closeRecordMicrophone();
		})



		// Keyboard events

		// Prevent to send the text if keys CONTROL + ENTER were pressed
		this.el.inputText.on('keypress', e => {

			if (e.key === 'Enter' && !e.ctrlKey) {
				e.preventDefault();
				this.el.btnSend.click();
			}

		})
		// Change mic btn to send btn and hide placeholder
		this.el.inputText.on('keyup', e => {

			if (this.el.inputText.innerHTML.length) {
				this.el.inputPlaceholder.hide();
				this.el.btnSendMicrophone.hide();
				this.el.btnSend.show();
			} else {
				this.el.btnSendMicrophone.show();
				this.el.inputPlaceholder.show();
				this.el.btnSend.hide();
			}

		})

		this.el.btnSend.on('click', e => {
			console.log(this.el.inputText.innerHTML)
		})
		// Open emoji panel
		this.el.btnEmojis.on('click', e => {
			this.el.panelEmojis.toggleClass('open');
		})
		// Select emoji clicked
		this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
			emoji.on('click', e => {
				console.log(emoji.dataset.unicode)

				let img = this.el.imgEmojiDefault.cloneNode()
				// cloneNode() clone the emoji because if we try to apply a second one it will replace the first one

				img.style.cssText = emoji.style.cssText;
				img.dataset.unicode = emoji.dataset.unicode;
				img.alt = emoji.dataset.alt;

				emoji.classList.forEach(name => {
					img.classList.add(name)
				})

				let cursor = window.getSelection();

				if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') { // checking if cursor is inside input text
					this.el.inputText.focus(); // forcing focus
					cursor = window.getSelection();
				}

				let range = document.createRange();

				range = cursor.getRangeAt(0); // start position of selected range (text selection)
				range.deleteContents(); // deleting selected range (text selection)

				let fragment = document.createDocumentFragment(); // create a new fragment (a 'space' to be filled) in the document
				fragment.appendChild(img) // add image

				range.insertNode(fragment); // place the emoji in the fragment

				range.setStartAfter(img); // set the cursor after the emoji

				this.el.inputText.dispatchEvent(new Event('keyup'));
				// dispatchEvent() 'forces' the 'new Event('keyup')' in order to hide the input placeholder

			})
		})


	} // end of initEvents


	startRecordMicrophoneTimer() {

		let start = Date.now();
		this._recordMicrphoneInterval = setInterval(() => {
			this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start)
		}, 100)

	}

	closeRecordMicrophone() {

		this.el.recordMicrophone.hide();
		this.el.btnSendMicrophone.show();
		clearInterval(this._recordMicrphoneInterval)

	}

	closeAllMainPanel() {
		this.el.panelMessagesContainer.hide();
		this.el.panelDocumentPreview.removeClass('open');
		this.el.panelCamera.removeClass('open');
	}

	closeMenuAttach(e) {
		document.removeEventListener('click', this.closeMenuAttach)
		this.el.menuAttach.removeClass('open');
	}

	closeLeftPanel() {
		this.el.panelEditProfile.hide();
		this.el.panelAddContact.hide();
	}

}