import React from "react";
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App";
import 'video-react/dist/video-react.css'
createRoot(globalThis.window.document.getElementById('explore-app')).render(
  <Provider store={store}>
    <App />
  </Provider>
)