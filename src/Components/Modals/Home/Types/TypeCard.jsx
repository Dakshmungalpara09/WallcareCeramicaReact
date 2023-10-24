import React, { useEffect, useState } from "react";
import { GetApi } from "../../../AXIOS/ApiCalls";
import GetPortno from "../../../GlobalVar";
import { AiOutlineClose } from "react-icons/ai";

function TypeCard({ rerender,CatagoryID,setEditType }) {
  const [Types, setTypes] = useState([]);
  const GlobalVar = GetPortno();

  const fetchTypes = async () => {
    const response = await GetApi(
      GlobalVar + "/type/get?categorySysid=" + CatagoryID
    );
    console.log(response);
    setTypes(response);
  };

  useEffect(()=>{
    fetchTypes();
  },[])

  useEffect(()=>{
    fetchTypes();
  },[rerender])

  return (
    <div>
      {Types.map((Type) => {
        return(
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
            <button onClick={()=>{
                console.log(Type);
                setEditType(Type)
            }} data-bs-toggle="modal"
            data-bs-target="#DeleteTypes" className="ms-3 btn"><AiOutlineClose/></button>
          </div>
        </>
        )
      })}
    </div>
  );
}

export default TypeCard;
