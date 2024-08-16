import React, { useContext,useState,useEffect } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { FadeLoader } from 'react-spinners';
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (food_list && food_list.length > 0) {
        setLoading(false);
      } else if (food_list && food_list.length === 0) {
        setLoading(false);
      }
    }, [food_list]);

  return (
    <div className='food-display' id='food-display'>
      <h2 className='h2we'>Top dishes near you</h2>
      {loading ? (
        <FadeLoader loading={loading}
         cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader" />
      ) : (
        <div className="food-display-list">
          {food_list.length === 0 ? (
            <p>No food items available.</p>
          ) : (
            food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                );
              }
              return null;
            })
          )}
        </div>
      )}
    </div>
  );
}

export default FoodDisplay