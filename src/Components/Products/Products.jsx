import React, { useEffect, Suspense, useState } from "react";
import GetPortno from "../GlobalVar";
import "../../CSS/Products/Products.css";
import { BiEdit } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import ModalTypes from "../Modals/Home/Products/MdalTypes";
import AddProductsModal from "../Modals/Home/Products/AddProductsModal";
import EditeProducts from "../Modals/Home/Products/EditeProducts";
import DeleteProducts from "../Modals/Home/Products/DeleteProducts";
import { GetApi } from "../AXIOS/ApiCalls";
import { AiOutlineSearch } from "react-icons/ai";
import { FetchProductsList } from "../Redux/ProductSlices";
import LogoLoader from "../Loader/LogoLoader";
const ProductCard = React.lazy(() => import("./ProductCard"));

function Products() {
  const GlobalVar = GetPortno();
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.data);
  const lastpage = useSelector((state) => state.lastPage);
  const [LoadingProduct, setLoadingProducts] = useState(false);
  const [editProduct, seteditProduct] = useState({});
  const [Types, SetTypes] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Catagories, setCatagories] = useState([]);
  const [CatagorySelect, setCatagorySelect] = useState({
    Catagory: "",
    Type: "",
  });

  const FetchCatagories = async () => {
    const response = await GetApi(GlobalVar + "/category");
    console.log("catagories Products");
    console.log(response);
    setCatagories(response);
  };

  const FetchTypes = async (Id) => {
    const response = await GetApi(GlobalVar + "/type/get?categorySysid=" + Id);
    console.log("catagories Products");
    console.log(response);
    SetTypes(response);
  };

  useEffect(() => {
    console.log(CatagorySelect);
    dispatch(FetchProductsList(CatagorySelect));
    setTimeout(()=>{
      setLoadingProducts(false);
    },1000)
  }, [CatagorySelect]);

  useEffect(() => {
    console.log(editProduct);
  }, [editProduct]);

  function handleScroll() {
    if (window.scrollY > 3) {
      document.getElementById("navmainDiv").style.backgroundColor = "#30373f";
    } else {
      document.getElementById("navmainDiv").style.backgroundColor = "#30373f";
    }
  }

  useEffect(() => {
    setLoadingProducts(true);
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    FetchCatagories();
    console.log(GlobalVar);
    document.getElementById("navmainDiv").style.backgroundColor = "#30373f";
  }, []);

  return (
    <>
      <AddProductsModal Loading={Loading} setLoading={setLoading} />
      <ModalTypes />
      <EditeProducts product={editProduct} />
      <DeleteProducts product={editProduct} />

      <div className="product-list-main">
        <div className="d-flex justify-content-end container d-none">
          <button
            type="button"
            className="mt-4 me-2 btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => {
              setLoading(false);
            }}
          >
            Add Product
          </button>
          <button
            type="button"
            className="mt-4 btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#ModalTypes"
          >
            Edit Types
          </button>
        </div>
        <div
          style={{
            position: "sticky",
            top: "70px",
            paddingTop: "20px",
            paddingBottom: "20px",
            zIndex: "999",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="d-flex mx-5 p-3"
            style={{
              backgroundColor: "#f6f6f6",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                fontFamily: "serif",
                fontWeight: "700",
                letterSpacing: "3px",
              }}
            >
              Filters
            </div>
            <div className="w-50 d-flex justify-content-start">
              <div
                style={{ fontWeight: "700" }}
                className="d-flex align-items-center fs-5 me-3"
              >
                Catagory 
              </div>
              <select
                className="SelectionProductsCatagory"
                onChange={(element) => {
                  setLoadingProducts(true);
                  setCatagorySelect({
                    ...CatagorySelect,
                    [element.target.name]: element.target.value,
                  });
                  if (element.target.value == "") {
                    SetTypes([]);
                    setCatagorySelect({
                      Catagory: "",
                      Type: "",
                    });
                  } else {
                    FetchTypes(element.target.value);
                  }
                }}
                style={{ width: "200px" }}
                name="Catagory"
              >
                <option className="optionsFilters" selected value="">
                  All Catagories
                </option>
                {Catagories.map((item) => {
                  return (
                    <option
                      className="optionsFilters"
                      value={item.categorySysid}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <div
                style={{ fontWeight: "700" }}
                className="d-flex align-items-center fs-5 mx-3"
              >
                Type 
              </div>

              <select
                onChange={(element) => {
                  setLoadingProducts(true);
                  setCatagorySelect({
                    ...CatagorySelect,
                    [element.target.name]: element.target.value,
                  });
                }}
                style={{ width: "200px" }}
                className="SelectionProductsCatagory"
                name="Type"
              >
                <option className="optionsFilters" selected value={""}>
                All Types
                </option>
                {Types.map((item) => {
                  return (
                    <option className="optionsFilters" value={item.typeSysid}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-50 d-flex justify-content-end">
              <div id="SearchBoxProductsDiv" className="d-flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="ps-3"
                  name="SearchBox"
                  id="SearchBoxProducts"
                />
                <div
                  className="d-flex align-items-center"
                  style={{ fontSize: "30px", cursor: "pointer" }}
                >
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="outercontainerScroll" className="">
          <div className={LoadingProduct?"d-flex justify-content-center align-items-center flex-column loading":"d-none justify-content-center align-items-center flex-column loading"} style={{width:'100%',height:'80vh'}}>
              <LogoLoader/>
              <div className="mt-3 ms-3">
                Loading...
              </div>
          </div>
          
          <div className={!LoadingProduct && ProductList.length==0?"d-flex justify-content-center align-items-center flex-column loading":"d-none justify-content-center align-items-center flex-column loading"} style={{width:'100%',height:'80vh'}}>
              No Product Found
          </div>

          <div className={LoadingProduct && ProductList.length!=0?'d-none':'product-list'}>
            {ProductList.map((product, index) => {
              return (
                <Suspense fallback={<p>loading...</p>}>
                  <div>
                    <div
                      style={{
                        zIndex: 99,
                        marginBottom: "-20px",
                        marginLeft: "-10px",
                      }}
                      className="d-none"
                    >
                      <button
                        style={{
                          display: "block",
                          marginInlineStart: "10px",
                          backgroundColor: "black",
                          color: "white",
                          zIndex: 99,
                        }}
                        onClick={() => {
                          console.log(product);
                          seteditProduct(product);
                        }}
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#EditeProductsModal"
                      >
                        <BiEdit />
                      </button>
                      <button
                        style={{
                          display: "block",
                          marginInlineStart: "10px",
                          backgroundColor: "black",
                          color: "white",
                          zIndex: 99,
                        }}
                        onClick={() => {
                          console.log(product);
                          seteditProduct(product);
                        }}
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#DeleteProducts"
                      >
                        <CiTrash />
                      </button>
                    </div>
                    <ProductCard
                      key={index}
                      LinkImage={
                        GlobalVar + "/product/image/" + product.productSysid
                        // 'https://picsum.photos/500'
                      }
                      product={product}
                    />
                  </div>
                </Suspense>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
