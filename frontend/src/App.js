import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./components/productContext";
function App() {
  return (
    <div className="App">
      <h1 className="banner"> E-Commerce Dashboard</h1>
      <ProductProvider>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </ProductProvider>
      <Footer />
    </div>
  );
}

export default App;
