import React, { useEffect } from "react";
import GetPortno from "../GlobalVar";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom"

function Login() {
  const GlobalVar = GetPortno();
  const navigate = useNavigate(); 

  const NavigateToProduct = () =>{
    navigate('/Products')
  }

  const SubmitLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("clicked login");
      const username = document.getElementById("usernameLogin").value;
      const password = document.getElementById("PasswordLogin").value;
      const response = await fetch(GlobalVar + "/user/login", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
        credentials: "include",
      });
      console.log("this is res");
      console.log(response);
      if (response.status == 200) {
        NavigateToProduct();
        swal({
            icon: "success",
            title: "Looged in",
          });
          localStorage.setItem("Username", username);
          localStorage.setItem("Password", password);
          localStorage.setItem("isLoginWellcare", 1);
          
      }
      else
      {
        swal({
            icon: "error",
            title: "Something Went Wrong",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.getElementById("navmainDiv").style.backgroundColor = "#30373f";
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "90vh" }}
    >
      <form onSubmit={SubmitLogin} action="#">
        <div>
          <div>
            Username:
            <input type="text" name="userName" id="usernameLogin" />
          </div>
          <div>
            Passowrd:
            <input type="text" name="Password" id="PasswordLogin" />
          </div>
          <div>
            <input className="me-2" id="resetLogin" type="reset" value="reset" />
            <input type="submit" value="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
