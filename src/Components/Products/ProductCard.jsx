import React from "react";
import "../../CSS/Products/ProductCard.css";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";

const ProductCard = ({editProduct,UpdateEditeProduct, LinkImage, product }) => {
  return (
    <>
      <div style={{zIndex:-99}} className="d-flex justify-content-center">
        <div className="product-card">
          <section className="SectionProductCard">
            <img src={LinkImage} alt="Product" decoding="auto" className="image-Product-card skeleton" />
            <div className="overlay">
              <div className="text">
                <div className="text1">{product.name}</div>
                <div className="text2">
                  {product.size + " X " + product.size}
                </div>
                <div className="text3">
                  <button className="pdf-Productcard">
                    <p className="Productcard-btn-p">
                      <AiFillEye />
                    </p>
                    PDF
                  </button>
                </div>
                <div className="text4">
                  <button className="pdf-Productcard">
                    <p className="Productcard-btn-p">
                      <AiOutlineWhatsApp />
                    </p>
                    ENQUIRY
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div style={{fontWeight:'700'}} className="d-flex justify-content-center">
        <p className="d-flex justify-content-center pt-1 pb-1" style={{backgroundColor:'black',color:'white',width:'290px',marginTop:'4px'}}>
        {product.name.toUpperCase()}
        </p>
      </div>
    </>
  );
};

export default ProductCard;
