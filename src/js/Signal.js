
class Signal {
	constructor() {
		this.listeners = []
	}

	fire(options) {
		const listeners = this.listeners
		let i = listeners.length

		while (--i >= 0) {
			listeners[i](options)
		}
	}

	add(listener) {
		const index = this.listeners.indexOf(listener)

		if (index < 0) {
			this.listeners.push(listener)
		}
	}

	remove(listener) {
		const index = this.listeners.indexOf(listener)

		if (index >= 0) {
			this.listeners.splice(i, 1)
		}
	}
}

export default Signal