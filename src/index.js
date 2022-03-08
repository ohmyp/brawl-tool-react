import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  userData: null,
  clubData: null, 
  icons: null
}
const reducer = (state = defaultState, action) => {
  switch (action.type){
    case "ADD_USERDATA":
      return {...state, userData: action.payload}
    case "DELETE_USERDATA":
      return {...state, userData: null}
    case "ADD_CLUBDATA":
      return {...state, clubData: action.payload}
    case "DELETE_CLUBDATA":
      return {...state, clubData: null}
    case "ADD_ICONS":
      return {...state, icons: action.payload}
    case "DELETE_ICONS":
      return {...state, icons: null}
    // case "ADD_":
    //   return {...state, : action.payload}
    // case "DELETE_":
    //   return {...state, : null}
    default:
      return state
  }
}
const store = createStore(reducer)

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById("root")
)

// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}) //runtime download
// }
