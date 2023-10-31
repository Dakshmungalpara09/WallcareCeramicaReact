import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";import '../../CSS/Home/Home3.css'
import image3 from "../../Images/image3Home'.jpg";
import Footer from "../Footer/footer";
function Home3() {

  const refHome3 = useRef(null)
  const isview = useInView(refHome3, {once:true})
  const maincontrolHome3 = useAnimation()

  useEffect(()=>{
    if (isview==true) {
      maincontrolHome3.start('visible')
    }
    
  },[isview])

  return (
    <>
    <div ref={refHome3} id='mainHome3Div'>
      <motion.div
      variants={{
        hidden : {opacity:0,y:-200},
        visible: {opacity:1,y:0}
     }} initial="hidden" animate={maincontrolHome3} transition={{ duration: 0.5}}
       id='ChildDivHome31' >
        <img loading="lazy" id='image1Home3' src="https://i.pinimg.com/originals/09/bb/b8/09bbb8e14853186934c28b3b224e1de0.jpg" alt="" />
      </motion.div>
      <div id='ChildDivHome32'>
      Wellcare Ceramica is your one-stop destination for ceramic products that blend innovative design with timeless beauty, offering a range of choices as diverse as your imagination.
      </div>
      <motion.div
      variants={{
        hidden : {opacity:0,y:200},
        visible: {opacity:1,y:0}
     }} initial="hidden" animate={maincontrolHome3} transition={{ duration: 0.5}}
      id='ChildDivHome33'>
      <img loading="lazy" id='image2Home3' src={image3} alt="" />
      </motion.div>
    </div>
    <div style={{margin:'0px',padding:'0px'}}>
    </div>
  </>
  )
}

export default Home3
