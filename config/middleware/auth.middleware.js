
let jwt = require("jsonwebtoken")

let auth = (req,res,next)=>{
   
    let token = req.headers.authorization
console.log(token)
    var decoded = jwt.verify(token, 'masai');
if(decoded){
    next()
}else{
    res.send({msg : "something went wrong"})
}
}

module.exports={
    auth
}