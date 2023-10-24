import React, { useEffect, useState ,useRef } from "react";
import "../../CSS/Home/Home.css";
import image from "../../Images/Background4.png";
import image2 from "../../Images/image2Home.jpg";
import image3 from "../../Images/image3Home'.jpg";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import Home2 from "./Home2";

function Home() {
  useEffect(()=>{
    document.getElementById('navmainDiv').style.backgroundColor = '#30373f00'
  },[])

  const refHome1 = useRef(null)
  const isview = useInView(refHome1, {once:true})
  const maincontrol = useAnimation()

  useEffect(()=>{
    if (isview==true) {
      maincontrol.start('visible')
    }
  }
  )

  const [load, setLoad] = useState(false);
  const TomeForAnimation = 4000;
  const [animationImage1, setanimationImage1] = useState("Image1-homediv1");
  const [animationImage2, setanimationImage2] = useState("Image1-homediv2");
  const [animationImage3, setanimationImage3] = useState("Image1-homediv3");

  async function animationImageSlider1() {
    await setTimeout(() => {
      setanimationImage1("Image1-homediv1-animation1");
      setTimeout(() => {
        setanimationImage1("Image1-homediv1-animation2");
      }, 200);
    }, [TomeForAnimation]);
    await setTimeout(() => {
      setanimationImage1("Image1-homediv1-animation3");
    }, [TomeForAnimation * 2]);
    await setTimeout(() => {
      setanimationImage1("Image1-homediv1-animation4");
    }, [TomeForAnimation * 3]);
  }

  async function animationImageSlider2() {
    await setTimeout(() => {
      setanimationImage2("Image1-homediv2-animation1");
    }, [TomeForAnimation]);
    await setTimeout(() => {
      setanimationImage2("Image1-homediv2-animation2");
      setTimeout(() => {
        setanimationImage2("Image1-homediv2-animation3");
      }, 200);
    }, [TomeForAnimation * 2]);
    await setTimeout(() => {
      setanimationImage2("Image1-homediv2-animation4");
    }, [TomeForAnimation * 3]);
  }

  async function animationImageSlider3() {
    await setTimeout(() => {
      setanimationImage3("Image1-homediv3-animation1");
    }, [TomeForAnimation]);
    await setTimeout(() => {
      setanimationImage3("Image1-homediv3-animation2");
    }, [TomeForAnimation * 2]);
    await setTimeout(() => {
      setanimationImage3("Image1-homediv3-animation3");
      setTimeout(() => {
        setanimationImage3("Image1-homediv3-animation4");
      }, 200);
    }, [TomeForAnimation * 3]);
  }

  useEffect(() => {
    setLoad(true);
    const dynamicText = document.querySelector("h1 span");
    const words = ["Floor Tiles", "Wall Tiles", "Parking Tiles"];

    // Variables to track the position and deletion status of the word
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.textContent = currentChar;
      dynamicText.classList.add("stop-blinking");

      if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
      } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
      } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
      }
    };
    // animationImageSlider1();
    // animationImageSlider2();
    // animationImageSlider3();
    // setInterval(() => {
    //   animationImageSlider1();
    // }, TomeForAnimation * 3);
    // setInterval(() => {
    //   animationImageSlider2();
    // }, TomeForAnimation * 3);
    // setInterval(() => {
    //   animationImageSlider3();
    // }, TomeForAnimation * 3);
    typeEffect();
  }, []);

  return (
    <>
      <div id="mainDivHomeColor">
      <div ref={refHome1} id="mainDivHome" className="row glass">
        <div
          id="childDiv3"
          className="d-flex ChildDiv3"
        >
          <div
            
            id="childDiv2"
            className="col childDiv2load"
          >
            <motion.div
            variants={{
              hidden : {opacity:0,x:100},
              visible: {opacity:1,x:0}
           }} initial="hidden" animate={maincontrol}
           transition={{ duration:0.5 }}
            className="content-Home">
              <div className="d-flex first-childDiv2">
                <p className="welcome-Home">Welcome To Wellcare Ceramica</p>
              </div>
              <div className="d-flex mt-3">
                <p className="YouLookingFor-Home">
                  Are You Looking for{" "}
                  <h1 className="">
                    <span></span>
                  </h1>{" "}
                </p>
              </div>
              <div className="d-flex">
                <p className="TagLine-Home">
                  Your Vision, Our Tiles, Endless Possibilities
                </p>
              </div>
              <div className="d-flex mt-5">
                <Link to="/">
                  <button className="Shop-now-home">Shop Now</button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div
          id="image-home" className="align-items-center justify-content-end">

          <div id="image1-homedivId" className={animationImage1}>
            <img className="image1-home1" loading="lazy" src={image} alt="" />
          </div>
          <div className={animationImage2}>
            <img className="image1-home2" loading="lazy" src={image} alt="" />
          </div>
          <div className={animationImage3}>
            <img
            loading="lazy"
              id="image3-home"
              className="image1-home3"
              src={image}
              alt=""
            />
          </div>
          </div>
        </div>
      </div>
      </div>
      <div id="Home2Begin">
        <Home2/>
      </div>
    </>
  );
}

export default Home;
