import React, { useEffect, Suspense, useState } from "react";
import GetPortno from "../GlobalVar";
import "../../CSS/Products/Products.css";
import { BiEdit } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";
import { useSelector } from "react-redux";
import ModalTypes from '../Modals/Home/Products/MdalTypes'
import AddProductsModal from "../Modals/Home/Products/AddProductsModal";
import EditeProducts from "../Modals/Home/Products/EditeProducts";
import DeleteProducts from "../Modals/Home/Products/DeleteProducts";
const ProductCard = React.lazy(() => import("./ProductCard"));

function Products() {
  const GlobalVar = GetPortno();
  const ProductList = useSelector((state) => state.data);
  const lastpage = useSelector((state) => state.lastPage);
  const [editProduct, seteditProduct] = useState({});

  useEffect(() => {
    console.log(editProduct);
  }, [editProduct]);

  useEffect(() => {
    console.log(GlobalVar);
    document.getElementById("navmainDiv").style.backgroundColor = "#30373fdf";
  }, []);

  return (
    <>
      <AddProductsModal />
      <ModalTypes/>
      <EditeProducts product={editProduct} />
      <DeleteProducts product={editProduct} />
      <div className="product-list-main">
        <div className="d-flex justify-content-end container">
          <button
            type="button"
            className="mt-4 me-2 btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
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
        <div id="outercontainerScroll" className="product-list container">
          {ProductList.map((product, index) => (
            <Suspense fallback={<p>loading...</p>}>
              <div>
                <div style={{
                zIndex:99,
                marginBottom:'-20px',
                marginLeft:'-10px'
              }} className="d-flex">
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
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
