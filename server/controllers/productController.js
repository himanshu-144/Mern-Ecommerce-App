const Product = require("../models/productModel");
const User = require("../models/userModel");

const productController= async(req, res)=>{
   try {
    const products = await Product.find({});
    return res.status(201).json({products});
   } catch (error) {
     console.log(error.message);
     return res.status(500).send({
        success :false,
        message :"Failed to get products."
     })
   }
    
};

const checkoutController=async(req, res)=>{

    const {customerID, cartItems} = req.body;

    try {
        const user = await User.findById(customerID);
        const productIDs = Object.keys(cartItems);  // productIDs  count from cartItems Products
        const products = await Product.find({ _id: { $in : productIDs}});  // cartItem products
        
        if(!user){
            return res.status(403).send({message : "User not found!"})
        }

        if(products.length !== productIDs.length){
            return res.status(403).send({message : "Product not found!"});
        }

        let totalPrice = 0;
        for(const item in cartItems){
            const product = products.find((f)=> String(f._id) === item);

            if(!product){
              return res.status(403).send({message : "Product not found!"});
            }
            if(product.quantity < cartItems[item]){
                return res.status(403).send({message : "Out of Stock"});
            }

        totalPrice += product.productPrice* cartItems[item];
       }

       if (user.availableMoney < totalPrice) {
        return res.status(403).send({ message : "Not enough money available"});
      }
       user.availableMoney -= totalPrice;
       user.purchasedItems.push(...productIDs);
       await user.save();
       await Product.updateMany(
         { _id: { $in: productIDs } },
         { $inc:{ quantity : -1 } }
       );

       res.json({ purchasedItems : user.purchasedItems});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success:false,
            message : error.message
        })
    }
};

const purchasedItemsController=async(req, res)=>{
    const { customerID } = req.params;
    try {
        const user = await User.findById(customerID);
  
        if (!user) {
          return res.status(400).json({ message :"No User Found"});
        }
  
        const products = await Product.find({
          _id: { $in: user.purchasedItems },
        });
       res.json({ purchasedItems: products });
       
      } catch (error) {
        res.status(400).json({ message :error.message});
      }
};

module.exports = {productController, checkoutController, purchasedItemsController}