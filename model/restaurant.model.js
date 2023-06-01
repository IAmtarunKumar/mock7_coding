const mongoose = require("mongoose")


//schema
const restSchema = mongoose.Schema({
    
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
    
          name: String,
          description: String,
          price: Number,
          image: String
        }]
           
})


//model

const RestModel = mongoose.model("restaurant" , restSchema)

module.exports={
    RestModel
}