const User = require('../users/user-model')


const validateRoleName = (req,res,next)=>{
  const {username,password} = req.body
  if(!username || !password){
      res.status(401).json("username and password required")
  }else{
      next()
  }
}

async function checkUsernameExists(req, res, next) {
  
  try{
    const users = await User.findBy({ username: req.body.username })
    if (!users.length) {
      next()
    }
    else next({ message: "Username taken", status: 422 })
  } catch (error){
    next(error)
  }
}


const checkUsernameTaken = async (req, res, next) => {
    try{
      const [user] = await User.findBy({username: req.body.username})
      if(!user){
        next({
          status: 401,
          message: 'Invalid credentials'
        })
      }else{
        req.user = user
        next()
      }
    }catch(err){
      next(err)
    }
}






module.exports = { validateRoleName, checkUsernameExists, checkUsernameTaken
  
};