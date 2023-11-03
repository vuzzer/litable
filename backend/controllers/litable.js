const Litable = require("../models/litable")

//TODO: Split data for pagination in frontend

exports.addLitable = (req, res, next) => {
    //Destructing of req.body to get values
    const {city, street, rent, fullpath} = req.body;

    //Create an Litable object
    const litable = new Litable({
        city: city,
        street: street,
        rent: parseFloat(rent),
        imageUrl: [fullpath]
    });

    //Save object in mongodb database
    //throw error
    litable.save().then((result)=>{
        return res.status(201).json({message: "litable created successful", litable: {city: city, street: street, rent:rent} })
    }).catch((e)=>{
        console.log(e)
        const error = new Error("Error occured during operation")
        next(error)
    })
  
}

exports.displayLitable = (req, res, next) => {
    //Pagination parameter
    let numberPages; //Number of page
    let currentPage = req.query.page ?? 1 //Page number to retrieve
    let itemsPerPage = req.query.items ?? 3 //Number of items per page


    Litable.countDocuments().then((counts)=>{
        //Calculate number pages
        let quotient = parseInt(counts/itemsPerPage)
        let rest = counts % itemsPerPage === 0 ? 0 : 1
        numberPages = quotient + rest

        //Apply pagination and sorting
        return Litable.find().skip((currentPage-1)*itemsPerPage).limit(itemsPerPage).sort({rent: "asc"})
    }).then(data => {
        return res.json({metadata:{
            currentPage: parseInt(currentPage),
            itemsPerPage: parseInt(itemsPerPage),
            numberPages: parseInt(numberPages)
        }, data: data});
    }).catch(e=>{
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