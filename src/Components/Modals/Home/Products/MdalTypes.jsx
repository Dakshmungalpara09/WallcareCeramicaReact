import React, { useEffect, useState } from "react";
import { GetApi } from "../../../AXIOS/ApiCalls";
import GetPortno from "../../../GlobalVar";
import TypeCard from "../Types/TypeCard";
import DeleteType from "../Types/DeleteType";
import ModalAddTypes from "../Types/ModalAddTypes";

function MdalTypes() {
  const GlobalVar = GetPortno();
  var temp = []
  const [Catagory, setCatagories] = useState([]);
  const [rerender,setrerender] = useState(1)
  const [editType, setEditType] = useState({});

  const FetchCatagories = async () => {
    const response = await GetApi(GlobalVar + "/category");
    console.log("Catagories");
    setCatagories(response)
  };

  useEffect(() => {
    FetchCatagories();
  }, []);

  useEffect(() => {
    console.log("effect ====================================");
    console.log(editType);
    console.log("====================================");
  }, [editType]);


  useEffect(()=>{
    console.log(temp);
  },[temp])

  return Catagory && (
    <>
      <DeleteType
        editType={editType}
        rerender={rerender}
        setrerender={setrerender}
      />
      <ModalAddTypes
      rerender={rerender}
      setrerender={setrerender}
       Catagory={Catagory}
      />
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
                {Catagory.map((Catagory,index) => {
                  return (
                    <>
                    
                      <div>{Catagory.name}</div>
                      <TypeCard
                        rerender={rerender}
                        CatagoryID = {Catagory.categorySysid}
                        setEditType={setEditType}
                      />
                    </>
                  );
                })}
              </div>
              <div>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#AddTypes"
                  class="btn btn-primary"
                >
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
