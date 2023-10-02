import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from './Services/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={Store}>
      <App />
    </Provider>
  </Router>
)
