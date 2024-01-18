import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./Services/Store.jsx";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <NextUIProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </NextUIProvider>
  </Router>
);
