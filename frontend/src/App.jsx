import { useState } from "react";
import Body from "./Body";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
