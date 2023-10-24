import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainProvider from "./Components/Context/MainProvider";
import Products from "./Components/Products/Products";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchProductsList } from "./Components/Redux/ProductSlices";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchProductsList());
  }, []);

  return (
    <>
      <div id="mainDivApp" className="main-div-app">
        <MainProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/Products" element={<Products />} />
              <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        </MainProvider>
      </div>
    </>
  );
}

export default App;
