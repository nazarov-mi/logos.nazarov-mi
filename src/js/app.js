import '@/sass/app.sass'

window.location.hash = ''

import HashObserver from '@/js/HashObserver'
import Modal from '@/js/Modal'
import { qs } from '@/js/Utils'

const observer = new HashObserver()
const preview = new Modal(qs('#modal_preview'))
const order = new Modal(qs('#modal_order'))

observer.observe('modal', hash => {
	preview.close()
	order.close()

	switch (hash) {
		case 'preview':
			preview.open()
			break;
		
		case 'order':
			order.open()
			break;
	}
}, true)

// observer.fire()

function backToHistory() {
	observer.back()
}

preview.eventClose.add(() => backToHistory())
order.eventClose.add(() => backToHistory())
