export class CameraController {

	constructor(videoEl) {

		this._videoEl = videoEl;

		navigator.mediaDevices.getUserMedia({
			video: true
		}).then(stream => {

			this._stream = stream; // to get access out on stop() method 

			this._videoEl.srcObject = stream;
			this._videoEl.play();
			
		}).catch(err => {
			console.error(err)
		});

	}

	stop() {

		this._stream.getTracks().forEach(track => {
			track.stop();
		})

	}

}