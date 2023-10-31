import "../../../../CSS/Modals/Products/AddProducts.css";
import React, { useEffect, useState } from "react";
import GetPortno from "../../../GlobalVar";
import { PostApi } from "../../../AXIOS/ApiCalls";
import Loader from '../../../../Images/Loader.gif'
import { useDispatch } from "react-redux";
import { FetchProductsList } from "../../../Redux/ProductSlices";
import swal from "sweetalert";

function AddProductsModal({Loading,setLoading}) {
  //Variable Declaration

  const GlobalVar = GetPortno();
  const dispatch = useDispatch();
  const [formData, setFromData] = useState({
    size: "",
    imageId: null,
    pdfId: null,
  });
  const [image, setImage] = useState("");
  const [catagory, setCatagory] = useState([]);
  const [Type, setTypes] = useState([]);
  const ArgumentPass = {
    Catagory: "",
    Type: "",
  }

  //fetching default values

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

  //onChange Functions

  const onChangeAddProducts = (element) => {
    setFromData({ ...formData, [element.target.name]: element.target.value });
  };

  const onChangeAddProductsImage = async (event) => {
    //     const file = event.target.files[0];
    //     const imagere = await resizeFile(file);
    //     console.log(imagere);
    //     if (event.target.files[0]) {
    //       if (
    //         event.target.files[0].type === "image/png" ||
    //         event.target.files[0].type === "image/jpeg"
    //       ) {
    //         const reader = new FileReader();
    //         reader.onload = (r) => {
    //           setImage({
    //             ...image,
    //             imagePreview: imagere,
    //             image: event.target.files[0],
    //           });
    //         };
    //         reader.readAsDataURL(event.target.files[0]);
    //         console.log(
    //           image
    //         );
    //       } else {
    //         setImage({
    //           ...image,
    //           image: undefined,
    //           imagePreview: undefined,
    //         });
    //       }
    //     }
    //     console.log(image);
    setLoading(true);

    const file = event.target.files[0];

    if (file) {
      try {
        // Create a function to resize the image (you can use HTML5 Canvas)
        const resizedImage = await resizeImage(file);

        const reader = new FileReader();
        reader.onload = (r) => {
          setImage({
            ...image,
            imagePreview: r.target.result,
            image: resizedImage,
          });
        };
        reader.readAsDataURL(resizedImage);
        console.log(image);

        // Send the resized image to your API
        // await sendImageToAPI(resizedImage);
      } catch (error) {
        console.error("Error processing or sending the image:", error);
      }
    }
    setLoading(false);
  };

  //resizing image

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.8
          );
        };
        console.log(img);
      };

      reader.readAsDataURL(file);
    });
  };

  //Add Product Api call

  const AddProductSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const temp = formData;
    temp.typeSysid = parseInt(temp.typeSysid, 10);
    setFromData(temp);
    const response = await PostApi(GlobalVar + "/product/add/1", formData);
    console.log(response);

    var formDataImage = new FormData();
    formDataImage.append("productImage", image.image);

    fetch(GlobalVar + "/product/image/" + response.productSysid, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${localStorage.getItem('Username')}:${localStorage.getItem('Password')}`),
      },
      credentials: "include",
      body: formDataImage,
    })
      .then((response) => Promise.all([response.status, response.json()]))
      .then(function ([status, myJson]) {
        if (status == 200) {
          console.log("succeed!");
          document.getElementById("ModalCloseAddProoduct").click();
          swal({
            icon: "success",
            title: "Product Added",
          });
          dispatch(FetchProductsList(ArgumentPass));
        } else {
          document.getElementById("ModalCloseAddProoduct").click();
          swal({
            icon: "error",
            title: "Something Went Wrong",
          });
          dispatch(FetchProductsList(ArgumentPass));
        }
        document.getElementById("reSetAddProducts").click();
      })
      .catch((error) => console.log(error.message));
    // AddProduct(formData);
    setFromData({
      imageId: null,
      pdfId: null,
    });
  };

  //All useEffects

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
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={Loading?"modal-body d-block":"modal-body d-none"}>
              <div className="d-flex w-100">
                <h5 className="text-dark d-flex justify-content-center AddProductsModalTitle">
                  Add Product
                </h5>
                <div className="d-flex align-items-center">
                  <button
                    id="ModalCloseAddProoduct"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center m-4 LoadingDivSize">
                <div className="d-flex-column justify-content-center"><img src={Loader} width='50px' height='50px' alt="Loading..." /><p className="mt-2">Loading...</p></div>
              </div>
            </div>
            <div className={Loading?"modal-body d-none":"modal-body d-block"}>
              <div className="d-flex w-100">
                <h5 className="text-dark d-flex justify-content-center AddProductsModalTitle">
                  Add Product
                </h5>
                <div className="d-flex align-items-center">
                  <button
                    id="ModalCloseAddProoduct"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="m-4 LoadingDivSize">
                <form onSubmit={AddProductSubmit} action="#">
                  <div className="d-flex w-100">
                    <div className="w-50 d-flex align-items-center inputLableAddProducts">
                      Product Name
                    </div>
                    <div className="w-50">
                      <input
                        name="name"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="w-100 inputTagAddProducts"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center inputLableAddProducts">
                      Product Size
                    </div>
                    <div className="w-50">
                      <input
                        name="size"
                        onChange={onChangeAddProducts}
                        type="text"
                        className="w-100 inputTagAddProducts"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center inputLableAddProducts">
                      Catagories
                    </div>
                    <div className="w-50">
                      <select
                        name="categorySysid"
                        onChange={onChangeAddProducts}
                        className="SelectAddProducts"
                        required
                      >
                        <option selected>Select</option>
                        {catagory.map((item) => {
                          return (
                            <option value={item.categorySysid}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center inputLableAddProducts">
                      type
                    </div>
                    <div className="w-50">
                      <select
                        name="typeSysid"
                        onChange={onChangeAddProducts}
                        className="SelectAddProducts"
                        required
                      >
                        <option selected>Select</option>
                        {Type.map((item) => {
                          return (
                            <option value={item.typeSysid}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 d-flex w-100">
                    <div className="w-50 d-flex align-items-center inputLableAddProducts">
                      Image
                    </div>
                    <div className="w-50">
                      <input
                        name="imageId"
                        id="newImagesForm"
                        onChange={onChangeAddProductsImage}
                        type="file"
                        className="form-control w-100 fileSelectAddProducts"
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
                  <div className="mt-5 d-flex w-100 justify-content-center">
                    <input
                      id="reSetAddProducts"
                      class="btn btn-primary me-3 w-50 buttonAddProducts"
                      type="reset"
                      value="Reset"
                    />
                    <input
                      value="Add Product"
                      type="submit"
                      class="btn btn-primary w-50 buttonAddProducts"
                    />
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
