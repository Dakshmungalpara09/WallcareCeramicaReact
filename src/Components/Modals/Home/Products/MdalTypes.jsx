import React, { useEffect, useState } from "react";
import { GetApi } from "../../../AXIOS/ApiCalls";
import GetPortno from "../../../GlobalVar";
import TypeCard from "../Types/TypeCard";

function MdalTypes() {
  const GlobalVar = GetPortno();
  const [Catagory, setCatagories] = useState([]);

  const FetchCatagories = async () => {
    const response = await GetApi(GlobalVar + "/category");
    console.log("Catagories");
    console.log(response);
    console.log("====================================");
    setCatagories(response);
  };

  useEffect(() => {
    FetchCatagories();
  }, []);

  return (
    <>
      <div
        class="modal fade"
        id="ModalTypes"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className=" m-4">
                {
                  Catagory.map((Catagory) => {
                    return (
                      <>
                      <div>
                      {Catagory.name}
                      </div>
                      <TypeCard CatagoryID={Catagory.categorySysid}/>
                      </>
                    );
                })
              }
                
              </div>
              <div>
                <button type="button" class="btn btn-primary">
                  Add Type
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MdalTypes;
