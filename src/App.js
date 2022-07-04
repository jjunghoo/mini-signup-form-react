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
    return (
        <Provider store={store}>
            <section className="form-wrapper">
                <Form />
                <Footer />
            </section>
            <FontControlBox />
            <Modal />
        </Provider>
    )
}

export default App
