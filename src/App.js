import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <RoutesApp/>
    </BrowserRouter>
  );
}

export default App;