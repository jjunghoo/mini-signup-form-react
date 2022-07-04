import { useRef } from 'react'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import './App.css'
import { FontControlBox } from './components/FontControlBox'
import { Footer } from './components/Footer'
import { Form } from './components/Form'
import { Modal } from './components/Modal'
import { reducer } from './redux'

const store = createStore(reducer)

function App() {
    const modalRef = useRef(null)
    return (
        <Provider store={store}>
            <section className="form-wrapper">
                <Form modalRef={modalRef} />
                <Footer />
            </section>
            <FontControlBox />
            <Modal ref={modalRef} />
        </Provider>
    )
}

export default App
