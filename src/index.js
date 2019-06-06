import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/createStore";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import Loading from "./common/components/loading/Loading";
import './index.css';

render(
  <Provider store={store}>
    <PersistGate loading={<Loading loading={true} />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
