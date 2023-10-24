import React, { useEffect, useState } from "react";
import { GetApi } from "../../../AXIOS/ApiCalls";
import GetPortno from "../../../GlobalVar";

function MdalTypes() {
  const GlobalVar = GetPortno();
  const [Types, setTypes] = useState([]);
  const [Catagory, setCatagories] = useState([]);

  const FetchCatagories = async () => {
    const response = await GetApi(GlobalVar + "/category");
    console.log("Catagories");
    console.log(response);
    console.log("====================================");
    setCatagories(response);
  };

  const FetchTypes = async (CatagoryID) => {
    const response = await GetApi(
      GlobalVar + "/type/get?categorySysid=" + CatagoryID
    );
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    return response;
  };

  useEffect(() => {
    FetchCatagories();
  }, []);

  useEffect(() => {
    const temp = [];
    const createcustomarray = async () => {
      await Catagory.map(async (item) => {
        const response = await FetchTypes(item.categorySysid);
        temp.push(response);
        console.log("Custom Array =======================");
        console.log(temp);
        console.log("====================================");
      });
      setTypes(temp);
    };
    createcustomarray();
  }, [Catagory]);

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
                {Catagory.map((Catagory, index) => {
                  <div>{Catagory.name}</div>;
                  Types.map((Type) => {
                    return (
                      <>
                        <div
                          style={{
                            width: "100%",
                            border: "2px solid black",
                            borderRadius: "10px",
                          }}
                          className="d-flex m-2 align-items-center p-2"
                        >
                          <p
                            style={{
                              width: "90%",
                              marginBottom: "0px",
                            }}
                            className="d-flex align-items-center"
                          >
                            {Type.name}
                          </p>
                          <button
                            type="button"
                            className="ms-3 btn-close"
                          ></button>
                        </div>
                      </>
                    );
                  });
                })}
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
