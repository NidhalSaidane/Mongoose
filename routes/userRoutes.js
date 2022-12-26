const express = require ('express')
const router = express.Router();
const person = require("../models/personSchema")


// Create and Save a Record of a Model
router.post("/newperson",(req,res)=>{
    let newperson = new person(req.body)
    newperson.save((err,data)=>{
        if(err) throw err
        else res.send({msg:"person added"})
    })
})

// Create Many Records
router.post("/many",(req,res)=>{
    
    person.create(req.body,(err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})

// Use model.find() to Search Your Database
router.get("/findall",(req,res)=>{

    person.find(req.body,(err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})


// Use model.findOne() 
router.get("/findone",(req,res)=>{

    person.findOne({favoriteFoods:req.body.favoriteFoods},(err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})

// Search Your Database By _id 
router.get("/findbyid/:id",(req,res)=>{

    person.findById({_id : req.params.id},(err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})

//Perform Classic Updates by Running Find, Edit, then Save

  router.put("/update/:id",(req,res)=>{

    person.findById({_id : req.params.id},(err,data)=>{
        if(err) throw err
        else data.favoriteFoods.push("hamburger");
                data.save();
                res.send(data);
    });
})

//Perform New Updates on a Document

router.put("/updateAge/:name", (req, res) => {
    Person.findOneAndUpdate({ name: req.params.name },{ age: 20 },(err, data) => {
        if (err) {
          return console.log("Something wrong when updating record!");
        }
        else res.send(data);
      }
    );
  });

  //Delete One Document Using model.findByIdAndRemove
router.delete("/delete/:id", (req, res) => {
    Person.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      err ? console.log(err) : res.json({ msg: "Person was deleted " });
    });
  });

//Delete One Document Using model.findByIdAndRemove
router.delete("/delete/:id", (req, res) => {
    Person.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
      err ? console.log(err) : res.json({ msg: "Person was deleted " });
    });
  });

  //MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/removeByName", (req, res) => {
    Person.remove({ name: "Mary" }, (err, data) => {
      err
        ? console.log(err)
        : res.json({ msg: "All Persons with Mary name are deleted" });
    });
  });
  
  
  
  //Chain Search Query Helpers to Narrow Search Results
  router.get("/Query", (req, res) => {
    Person.find({ favoriteFoods: "Pizza" }).sort({ name: "desc" }).limit(2).select("-age").exec((err, data) => {
        if (err) return console.log(err);
        res.json(data);
      });
  });








module.exports = router



