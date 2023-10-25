import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "../../CSS//Home/Home2.css";
import image from "../../Images/Background4.png";
import { BsQuote } from "react-icons/bs";
import Home3 from "./Home3";

function Home2() {
  const ref = useRef(null);
  const isview = useInView(ref);
  const maincontrol = useAnimation();

  useEffect(() => {
    if (isview == true) {
      maincontrol.start("visible");
    }
  }, [isview]);

  return (
    <>
      <div ref={ref} id="mainDivHome2">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 300 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={maincontrol}
          transition={{ duration: 0.5 }}
          id="ChildDivHome2-1"
        >
          <div id="ChildChildDivHome2-1">
            <div id="ChildChildChildDivHome2">
              <div
                className="d-flex align-items-center"
                style={{ fontSize: "80px", color: "white" }}
              >
                <BsQuote />
              </div>
              <div className="text-center" id="contentHome2">
                <div>
                  At Wellcare Ceramica, we are dedicated to providing
                  top-quality ceramic products that enhance the beauty and
                  functionality of your living spaces.
                </div>
                <p style={{fontWeight:'750'}} className="pt-4">
                  Elegance and Durability for Every Space <br />- Wellcare Ceramica.
                </p>
              </div>
            </div>
          </div>
          <div id="ChildChildDivHome2-2">
            <div className="homeContentLine">CREATING LASTING </div>
            <div className="homeContentLine">THROUGH BEAUTIFUL</div>
            <div className="homeContentLine">CERAMIC CREATIONS </div>
          </div>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 300 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={maincontrol}
          transition={{ duration: 0.5 }}
          id="ChildDivHome2-2"
        >
          <img
            className="skeleton"
            loading="lazy"
            id="imageHome2"
            src={image}
            alt=""
            srcset=""
          />
        </motion.div>
      </div>
      <div style={{ margin: "0px", padding: "0px" }}>
        <Home3 />
      </div>
    </>
  );
}

export default Home2;
