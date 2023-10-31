import React, { useEffect } from 'react'
import { DelApi } from "../../../AXIOS/ApiCalls";
import { GetApi } from '../../../AXIOS/ApiCalls';
import GetPortno from "../../../GlobalVar";
import swal from "sweetalert";

function DeleteType({editType,rerender,setrerender}) {

    //Variable Declaration

  const GlobalVar = GetPortno();

  //Delete Api Call

  const DeleteType = async (e) => {
    e.preventDefault();
    const response = await DelApi(
      GlobalVar + "/type/delete/" + editType.typeSysid + "/1"
    );
    if (response.status == 200) {
      document.getElementById("TypeDeleteClose").click();
      setrerender(--rerender);
      swal({
        icon: "success",
        title: "Type Deleted",
      });

    } else {
        setrerender(--rerender);
      swal({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
  };

  return (
    <>
        <div
        class="modal fade"
        id="DeleteTypes"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body mt-5 mb-5">
              <div className="d-flex justify-content-center">Are You Sure to Delete Type?</div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                id="TypeDeleteClose"
                type="button"
                class="btn btn-secondary m-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={DeleteType}
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
  )
}

export default DeleteType
