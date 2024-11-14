import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
