const mongoose = require('mongoose');
const mongoURL="mongodb+srv://vagdevi137:Vagdevi_1307@gofooddata.vyz0h1y.mongodb.net/gofooddata?retryWrites=true&w=majority"
const mongoDB=async()=>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true}).then(async()=>{
        console.log("connected")
        const fetched_data=mongoose.connection.db.collection("food_items")
        const fetched_cat=mongoose.connection.db.collection("foodCategory")
        console.log(fetched_data)
        try{
            global.food_items = await fetched_data.find({}).toArray()
            global.foodCategory=await fetched_cat.find({}).toArray()
        }
        catch(err){
            console.log(err)
        }
}) 
    .catch((err)=>{
        console.log(err)
    })
 }
module.exports=mongoDB;
