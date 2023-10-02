exports.addREntal = (req, res, next) => {
    const data = req.body;
    console.log(data);
    res.status(201).json({register: "register successful"})
}