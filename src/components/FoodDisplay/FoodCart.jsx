import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const FoodCart = ({ item, index }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);
  console.log(quantities.id);
  return (
    <div
      key={index}
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
    >
      <div className="card" style={{ width: "300px" }}>
        <Link to={`/food/${item.id}`}>
          <img
            src={item.imageUrl}
            className="card-img-top"
            alt="Product Image"
            height={200}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">&#8377; {item.price}</span>
            <div>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light">
          <Link to={`/food/${item.id}`} className="btn btn-primary btn-sm">
            View Food
          </Link>
          {quantities[item.id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-danger btn-sm" onClick={()=>decreaseQty(item.id)} >
                <i className="bi bi-dash-circle"></i>
              </button>
              <span className="fw-bold text-sm">{quantities[item.id]}</span>
              <button onClick={()=>increaseQty(item.id)} className="btn btn-success btn-sm">
               
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          ) : (
            <button className="btn btn-success btn-sm" onClick={()=>increaseQty(item.id)}>
              
              <i className="bi bi-plus-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
