const Litable = require("../models/litable")

exports.addLitable = (req, res, next) => {
    const {city, street, rent} = req.body;
    const litable = new Litable({
        city: city,
        street: street,
        rent: parseFloat(rent)
    });
    litable.save().then((result)=>{
        return res.status(201).json({message: "litable created successful", litable: litable.get()})
    }).catch((e)=>{
        const error = new Error("Error occured during operation")
        next(error)
    })
  
}

exports.displayLitable = (req, res, next) => {
    Litable.find().then(result => {
        console.log(result)
        return res.json({
            litable: result
         });
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