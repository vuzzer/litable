const Litable = require("../models/litable")

exports.addLitable = (req, res, next) => {
    //Destructing of req.body to get values
    const {city, street, rent} = req.body;

    //Create an Litable object
    const litable = new Litable({
        city: city,
        street: street,
        rent: parseFloat(rent)
    });

    //Save object in mongodb database
    //throw error
    litable.save().then((result)=>{
        return res.status(201).json({message: "litable created successful", litable: {city: city, street: street, rent:rent} })
    }).catch((e)=>{
        const error = new Error("Error occured during operation")
        next(error)
    })
  
}

exports.displayLitable = (req, res, next) => {
    Litable.find().then(data => {
        //console.log(data)
        return res.json(data);
    }).catch(e=>{
        console.log(e)
        const error = new Error("Error occured during operation")
        next(error) 
    })
 
}


exports.updateLitable = (req, res, next) => {
    res.json({
        "update": "House update !"
    })
}


exports.deleteLitable = (req, res, next) => {
    res.json({
        "delete": "House deleted !"
    })
}