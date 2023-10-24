import React from "react";
import { DelApi } from "../../../AXIOS/ApiCalls";
import { useDispatch } from "react-redux";
import { FetchProductsList } from "../../../Redux/ProductSlices";
import GetPortno from "../../../GlobalVar";
import swal from "sweetalert";

function DeleteProducts({ product }) {

  //Variable Declaration

  const GlobalVar = GetPortno();
  const dispatch = useDispatch(); 

  //Delete Api Call

  const DeleteProduct = async (e) => {
    e.preventDefault();
    const response = await DelApi(
      GlobalVar + "/product/delete/" + product.productSysid + "/1"
    );
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    if (response.status == 200) {
      document.getElementById("ProductDeleteClose").click();
      swal({
        icon: "success",
        title: "Product Deleted",
      });
    } else {
      swal({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
    dispatch(FetchProductsList());
  };

  return (
    <>
      <div
        class="modal fade"
        id="DeleteProducts"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body mt-5 mb-5">
              <div className="d-flex justify-content-center">Are You Sure?</div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                id="ProductDeleteClose"
                type="button"
                class="btn btn-secondary m-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={DeleteProduct}
                type="button"
                class="btn btn-primary m-2"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteProducts;
