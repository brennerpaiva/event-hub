import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NavBar />
          <RoutesApp />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
