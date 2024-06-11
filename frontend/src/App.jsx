import { useState } from "react";
import Body from "./Body";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Body />
      </Provider>
    </>
  );
}

export default App;
