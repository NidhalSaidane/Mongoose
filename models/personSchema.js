const mongoose = require ('mongoose')
const Schema = mongoose.Schema()
const personSchema={
name:{
    type:String,
    required:true,
},
age:Number,
favoriteFoods:[String]

}
const person = mongoose.model("person",personSchema)
module.exports = person 

