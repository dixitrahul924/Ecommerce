import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./StateProvider";
import Header from "./components/header/Header";
import Pages from "./components/main_pages/Pages";
function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
