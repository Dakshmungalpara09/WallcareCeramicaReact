import React, { useEffect, useState } from 'react'
import { PostApi,GetApi } from '../../../AXIOS/ApiCalls';
import GetPortno from "../../../GlobalVar";
import swal from "sweetalert";

function ModalAddTypes({Catagory,setrerender,rerender}) {

  const GlobalVar = GetPortno();
  const [formData, setFromData] = useState({});
  
  const onChangeAddTypes = (element) => {
    setFromData({ ...formData, [element.target.name]: element.target.value });
  };

  const AddType = async ()=> {

    const response = await PostApi(GlobalVar+'/type/add/1',formData)
    console.log(response);
    if (response == 1) {
      document.getElementById("TypeAddClose").click();
      setrerender(++rerender);
      swal({
        icon: "success",
        title: "Type Deleted",
      });

    } else {
        setrerender(++rerender);
      swal({
        icon: "error",
        title: "Something Went Wrong",
      });

    }
  }

  return (
    <>
      <div
        class="modal fade"
        id="AddTypes"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body mt-5 mb-5">
            <form 
            // onSubmit={AddProductSubmit} 
             action="#">
                  <div className="d-flex w-100">
                    <div className="w-50 d-flex align-items-center">
                      Type Name 
                    </div>
                    <div className="w-50">
                      <input
                        name="name"
                        onChange={onChangeAddTypes}
                        type="text"
                        className="w-100"
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
                        onChange={onChangeAddTypes}
                        className="SelectAddProducts"
                        required
                      >
                        <option selected>Select</option>
                        {Catagory.map ((item) => {
                          return(
                          <option key={item.categorySysid} value={item.categorySysid}>
                            {item.name}
                          </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
              </form>
            </div>
            <div class="d-flex justify-content-end">
              <button
                id="TypeAddClose"
                type="button"
                class="btn btn-secondary m-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={AddType}
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

export default ModalAddTypes
