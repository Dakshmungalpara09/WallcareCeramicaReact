import React, { useEffect, useState } from "react";
import GetPortno from "../../../GlobalVar";
import {PostApi} from '../../../AXIOS/ApiCalls'
import { useDispatch, useSelector } from "react-redux";
import { FetchProductsList } from "../../../Redux/ProductSlices";
import swal from "sweetalert";

function AddProductsModal() {

  //Variable Declaration

  const GlobalVar = GetPortno();
  const dispatch = useDispatch();
  const [formData, setFromData] = useState({
    "size":'',
    "imageId": null,
    "pdfId": null
  });
  const [image,setImage] = useState('')
  const [catagory, setCatagory] = useState([]);
  const [Type, setTypes] = useState([]);

  //fetching default values

  const fetchCatagory = async () => {
    const response = await fetch(GlobalVar+"/category");
    const Catagories = await response.json();
    setCatagory(Catagories);
  };

  const fetchType = async () => {
    const response = await fetch(GlobalVar+"/type/get");
    const Types = await response.json();
    setTypes(Types);
  };

  //onChange Functions

  const onChangeAddProducts = (element) => {
    setFromData({ ...formData, [element.target.name]: element.target.value });
    
  };

  const onChangeAddProductsImage = (event) => {
    // console.log(element.target.files);
    // setImage(element.target.files[0])
    if (event.target.files[0]) {
      if (
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpeg"
      ) {
        const reader = new FileReader();
        reader.onload = (r) => {
          setImage({
            ...image,
            imagePreview: r.target.result,
            image: event.target.files[0],
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        setImage({
          ...image,
          image: undefined,
          imagePreview: undefined,
        });
      }
    }
    console.log(image);
  }

  //addProduct api call

  const AddProductSubmit = async (e) => {
    e.preventDefault();
    const temp = formData
    temp.typeSysid = parseInt(temp.typeSysid, 10);
    setFromData(temp)
    const response = await PostApi(GlobalVar+'/product/add/1',formData)  
    console.log(response);
    var formDataImage = new FormData();
    formDataImage.append("productImage", image.image)
    fetch(GlobalVar+'/product/image/'+response.productSysid, {
       method: 'POST', body: formDataImage 
    })
    .then(response => Promise.all([response.status, response.json()]))
        .then(function([status, myJson]) {
            if (status == 200) {
                console.log("succeed!");
                document.getElementById('ModalCloseAddProoduct').click();
                swal({
                  icon: "success",
                  title: "Product Added"
                });
            } else {
                swal({
                  icon: "error",
                  title: "Something Went Wrong"
                });
            }
            document.getElementById('reSetAddProducts').click();
        })
        .catch(error => console.log(error.message));
    // AddProduct(formData);
    dispatch(FetchProductsList());
    setFromData({
      "imageId": null,
      "pdfId": null
    })
  }

  //All useEffects

  useEffect(() => {
    console.log(formData);
    console.log(catagory);
  }, [formData, catagory]);

  useEffect(() => {
    async function fetchInitialData(){
      await fetchCatagory();
      await fetchType();
    }
    fetchInitialData()
    
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
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
                <h5 className="text-dark w-50">Add Product</h5>
                <div className="d-flex w-50 justify-content-end">
                  <button
                  id="ModalCloseAddProoduct"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="mt-4">
                <form onSubmit={AddProductSubmit}  action="#">
                  <div className="d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Product Name :
                    </div>
                    <div className="w-50">
                      <input
                        name="name"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Catagories :
                    </div>
                    <div className="w-50">
                      <select
                        name="categorySysid"
                        onChange={onChangeAddProducts}
                        className="form-select"
                        aria-label="Default select example"
                        required
                      >
                        <option selected>Select Catagory</option>
                        {catagory.map((item) => {
                          return(
                          <option value={item.categorySysid}>
                            {item.name}
                          </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      type :
                    </div>
                    <div className="w-50">
                      <select
                        name="typeSysid"
                        onChange={onChangeAddProducts}
                        className="form-select"
                        aria-label="Default select example"
                        required
                      >
                        <option selected>Select Catagory</option>
                        {Type.map((item) => {
                          return(
                          <option value={item.categorySysid}>
                            {item.name}
                          </option>
                          )
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
                        name="size"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Image :
                    </div>
                    <div className="w-50">
                      <input
                        name="imageId"
                        id="newImagesForm"
                        onChange={onChangeAddProductsImage}
                        type="file"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      PDF ID :
                    </div>
                    <div className="w-50">
                      <input
                        name="pdfId"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="form-control w-100"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div> */}
                  <div className="mt-4 d-flex w-100 justify-content-end">
                    <input id="reSetAddProducts" class="btn btn-primary me-3" type="reset" value="Reset"/>
                    <input value="Add Product" type="submit" class="btn btn-primary"/>
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

export default AddProductsModal;
