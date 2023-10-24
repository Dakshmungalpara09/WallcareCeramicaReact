import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchProductsList } from "../../../Redux/ProductSlices";
import { PutApi } from "../../../AXIOS/ApiCalls";
import GetPortno from "../../../GlobalVar";
import swal from "sweetalert";

function EditeProducts({ product }) {

  //Variable Declaration

  const GlobalVar = GetPortno();
  const dispatch = useDispatch();
  const [formData, setFromData] = useState({});
  const [catagory, setCatagory] = useState([]);
  const [Type, setTypes] = useState([]);

  //fetching initials

  const fetchCatagory = async () => {
    const response = await fetch(GlobalVar + "/category");
    const Catagories = await response.json();
    setCatagory(Catagories);
  };

  const fetchType = async () => {
    const response = await fetch(GlobalVar + "/type/get");
    const Types = await response.json();
    setTypes(Types);
  };

  // onChnage Functions

  const onChangeAddProducts = (element) => {
    setFromData({ ...formData, [element.target.name]: element.target.value });
  };

  //Edit Api Calls

  const EditeProductSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      productSysid:product.productSysid,
      name:document.getElementById('NameEdit').value,
      typeSysid:document.getElementById('TypeSysIdEdit').value,
      categorySysid:document.getElementById('CategorySysidEdit').value,
      size:document.getElementById('SizeEdit').value
    }
    const response = await PutApi(GlobalVar+'/product/update/1',sendData)
    console.log(response);
    if (response == 200) {
      document.getElementById('EditeModalClose').click();
      swal({
        icon: "success",
        title: "Product Edited"
      });
      dispatch(FetchProductsList());
    }
    else
    {
      swal({
        icon: "error",
        title: "Something Went Wrong"
      });
    }
    
  };

  //All UseEffects

  useEffect(() => {
    console.log(formData);
    console.log(catagory);
  }, [formData, catagory]);

  useEffect(() => {
    async function fetchInitialData() {
      await fetchCatagory();
      await fetchType();
    }
    fetchInitialData();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="EditeProductsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex w-100">
                <h5 className="text-dark w-50">Edit Product</h5>
                <div className="d-flex w-50 justify-content-end">
                  <button
                    type="button"
                    id="EditeModalClose"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="mt-4">
                <form action="#">
                  <div className="d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Product Name :
                    </div>
                    <div className="w-50">
                      <input
                        defaultValue={product.name}
                        name="name"
                        id="NameEdit"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Catagories :
                    </div>
                    <div className="w-50">
                      <select
                      id="CategorySysidEdit"
                        name="categorySysid"
                        onChange={onChangeAddProducts}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        {catagory.map((item) => {
                          if (item.categorySysid == product.categorySysid) {
                            return (
                              <option value={item.categorySysid} selected>
                                {item.name}
                              </option>
                            );
                          } else {
                            return (
                              <option value={item.categorySysid}>
                                {item.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Types :
                    </div>
                    <div className="w-50">
                      <select
                        name="typeSysid"
                        id="TypeSysIdEdit"
                        onChange={onChangeAddProducts}
                        className="form-select"
                      >
                        {Type.map((item) => {
                          if (item.typeSysid == product.typeSysid) {
                            return(
                            <option value={item.typeSysid} selected>
                              {item.name}
                            </option>
                            )
                          } 
                          else {
                            return (
                              <option value={item.typeSysid}>
                                {item.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Product Size :
                    </div>
                    <div className="w-50">
                      <input
                      id="SizeEdit"
                        defaultValue={product.size}
                        name="size"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Image :
                    </div>
                    <div className="w-50">
                      <input
                        name="ImageID"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                  {/* <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      PDF ID :
                    </div>
                    <div className="w-50">
                      <input
                        name="pdfID"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div> */}
                  <div className="mt-4 d-flex w-100 justify-content-end">
                    <input
                      id="reSetAddProducts"
                      class="btn btn-primary me-3"
                      type="reset"
                      value="Default"
                    />
                    <button
                      onClick={EditeProductSubmit}
                      class="btn btn-primary"
                    >
                      Edit Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditeProducts;
