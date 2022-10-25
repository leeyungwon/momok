import { withMiddleware } from "../middleware/verify"
import { Auth } from "../model/auth";
import { Restaurant } from "../model/restaurant";

const handler = async(req,res) => {
  const {idx} = req.user;
  const restaurant = new Restaurant();
  if(req.method === "POST"){
    const payload = req.body;
    const result = await restaurant.addRestaurant(payload,idx);
    res.status(result.status).json(result)
  }else if(req.method === "GET"){
    const {restaurantIdx} = req.body;
    const result = await restaurant.getRestaurant(idx,restaurantIdx);
    res.status(result.status).json(result)
  }else{
    res.status(400).json({ err: 'method eror' })  
  }
}

export default withMiddleware("tokenVerify")(handler);