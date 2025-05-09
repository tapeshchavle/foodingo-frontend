import React, { useContext, useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { StoreContext } from "../../context/StoreContext";

const ExploreFood = () => {
  //const {foodList}  = useContext(StoreContext);
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3">
                <select
                  style={{ maxWidth: "150px" }}
                  id=""
                  className="form-select mt-2"
                  onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">Select</option>
                  <option value="poha">Poha</option>
                  <option value="paratha">Paratha</option>
                  <option value="idli">Idli</option>
                  <option value="biryani">Biryani</option>
                  <option value="dosa">Dosa</option>
                  <option value="chole bhature">Chole Bhature</option>
                  <option value="cake">Cake</option>
                </select>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Search your favourite dish... "
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="btn btn-primary mt-2" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchText={searchText} />
    </>
  );
};

export default ExploreFood;
