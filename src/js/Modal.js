
import Signal from '@/js/Signal'
import { qs, qsa } from '@/js/Utils'

class Modal {
	constructor(el) {
		this.$el = el
		this.$elBody = qs('.modal-body', el)
		this.$screen = qs('.screen')
		this.$screenWrapper = qs('.screen-wrapper')
		this.scrollTop = 0
		this.isOpen = false

		this.eventOpen = new Signal()
		this.eventClose = new Signal()

		this.$el.addEventListener('click', () => this.close(), false)
		this.$elBody.addEventListener('click', e => {
			e.stopPropagation()
			return false
		}, false)
	}

	open() {
		if (this.isOpen) return

		const scrollTop = window.pageYOffset || 0

		this.$screen.classList.add('screen--lock')
		this.$el.classList.add('modal--show')
		this.$screenWrapper.style.marginTop = -scrollTop + 'px'
		this.$elBody.style.marginTop = ''
		this.scrollTop = scrollTop
		this.isOpen = true

		window.scrollTo(0, 0)

		this.eventOpen.fire()
	}

	close() {
		if (!this.isOpen) return

		const scrollTop = window.pageYOffset || 0

		this.$screen.classList.remove('screen--lock')
		this.$el.classList.remove('modal--show')

		this.$screenWrapper.style.marginTop = ''
		this.$elBody.style.marginTop = -scrollTop + 'px'
		this.isOpen = false

		window.scrollTo(0, this.scrollTop)

		this.eventClose.fire()
	}
}

export default Modal