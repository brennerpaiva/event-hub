import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import { Provider } from "react-redux";
import store from "../src/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar/>
        <RoutesApp/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;