import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./StateProvider";
import Header from "./components/header/Header";
import Pages from "./components/main_pages/Pages";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <Header />
          <Pages />
        </div>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
      />
    </DataProvider>
  );
}

export default App;
