import React, { useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
const Cart = () => {
  const { foodList, increaseQty, decreaseQty, quantities,removeItem,removeCart } =
    useContext(StoreContext);

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const shipping = subtotal === 0 ? 0.0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
 
  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <>
                    <div key={index} className="row cart-item mb-3">
                      <div className="col-md-3">
                        <Link to={`/food/${item.id}`}>
                        <img width={100}
                          src={item.imageUrl}
                          alt="Food 1"
                          className="img-fluid rounded"
                        />
                        </Link>
                      </div>
                      <div className="col-md-5">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="text-muted">Category: {item.category}</p>
                      </div>
                      <div className="col-md-2">
                        <div className="input-group">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                          >
                            -
                          </button>
                          <input
                            style={{ maxWidth: "80px" }}
                            type="text"
                            value={quantities[item.id]}
                            className="form-control  form-control-sm text-center quantity-input"
                            readOnly
                          />
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <p className="fw-bold">
                          &#8377;{item.price * quantities[item.id]}.00
                        </p>
                        <button onClick={()=>removeItem(item.id)} className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </>
                ))
              ) : (
                <div className="text-center text-md text-bold">
                  Cart is Empty
                </div>
              )}
            </div>
          </div>

          <div className="text-start mb-4 d-flex justify-content-between">
            <Link to={"/home"} className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
            <button onClick={()=>removeCart()} className="btn btn-outline-danger" >Clear Cart</button>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>&#8377;{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>&#8377;{shipping}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>&#8377;{tax}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>&#8377;{total}</strong>
              </div>
               <Link to={"/order"}>
              <button disabled={cartItems.length===0} className="btn btn-primary w-100">
                Proceed to Checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
