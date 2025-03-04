
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import ReactDOM from 'react-dom/client'


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <Provider store={store}>
      <App />
    </Provider>

  </BrowserRouter>


)
