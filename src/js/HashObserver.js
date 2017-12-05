
import Signal from '@/js/Signal'

class HashObserver {
	constructor() {
		this.hash = this.getHash()
		this.history = []
		this.defaultListener = null
		this.listeners = {}

		this.eventChange = new Signal()

		if ('onhashchange' in window && false) { ///////////////////////////////////////
			window.addEventListener('hashchange', () => this.check(), false);
		} else {
			setInterval(() => this.check(), 100)
		}
	}

	getHash() {
		return window.location.hash.replace(/^#/, '') || ''
	}

	check() {
		const hash = this.getHash()

		if (hash !== this.hash) {
			const oldHash = this.hash

			this.oldHash = oldHash
			this.hash = hash
			this.history.push(this.oldHash)
			console.log(this.history, hash, oldHash)
			this.eventChange.fire({ hash, oldHash })
			this.fire(hash)
		}
	}

	fire(hash) {
		hash = hash || this.hash

		const match = hash.match(/^([a-z0-9-_]+)@?([a-z0-9-_]+)?$/)

		if (match && match.length >= 2) {
			const param = match[1]
			const name = match[2]

			if (this.listeners[name]) {
				this.listeners[name](param, this.oldHash)
			} else
			if (this.defaultListener) {
				this.defaultListener(param, this.oldHash)
			}
		}
	}

	observe(name, callback, def) {
		if (this.listeners[name] === undefined) {
			this.listeners[name] = callback

			if (def) {
				this.defaultListener = callback
			}
		}
	}

	back() {
		const hash = this.history.pop()

		if (hash !== undefined) {
			const oldHash = this.hash

			this.oldHash = oldHash
			this.hash = hash
			console.log(this.history, hash, oldHash)

			if ('history' in window) {
				window.history.back()
			} else {
				window.location.hash = hash
			}

			this.eventChange.fire({ hash, oldHash })
			this.fire(hash)
		}
	}
}

export default HashObserver