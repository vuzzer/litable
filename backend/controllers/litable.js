const Litable = require("../models/litable")

exports.addLitable = (req, res, next) => {
    const {city, address, rent} = req.body;
    const litable = new Litable({
        city: city,
        address: address,
        rent: parseFloat(rent)
    });
    litable.save().then((result)=>{
        console.log(result)
        res.status(201).json({register: "register successful"})
    }).catch((e)=>{
        throw new Error("Error occured during operation")
    })
  
}

exports.displayLitable = (req, res, next) => {
    res.json({
       "data": "House available !"
    });
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