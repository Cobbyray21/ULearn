import user from "../models/user";
import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

export const register = async (req, res) =>{
    
    try {
       const {name, email, password} = req.body;
       //Validation
         if (!name){
            return res.status(400).send("Name required!");}
         if(!password || password.length < 6){
            return res.status(400).send("Password required. min 6 characters long!")
         };
         //find user existence
         let userExist = await User.findOne({email}).exec();
         if (userExist) return res.status(400).send("Email already taken !!")
       // if (userExist.name) return res.status(400).send("Create New Password !!")
      
         
       //create user 
       //hash password first

       const hashedPassword = await hashPassword(password)
       //register user
       const user = new User({
          name,
          email,
          password: hashedPassword
       })
       //save user
       await user.save();
       console.log("user saved", user)
       return res.json({ok: true}) 

      
    } catch (err) {
      
       return res.status(400).send("Error!! Try Again " ),
       console.log("Error =>", err)
    }
    
    //res.json("registration page from controller!!!")
};

export const login = async (req, res)=> {
      try {
         //Get data
         const{name, email, password}= req.body
         
         //Validation
         if(!email){
            return res.status(400).send("Email required")
         }
         if(!password){
            return res.status(400).send("Password required") 
         }
         let userExist = await User.findOne({email}).exec()
         if(!userExist){
            return res.status(400).send("User Not Found")
         }

         //Login user
         //Check password
         const PasswordMatch= await comparePassword(password, user.password)
         
         const token= jwt.sign({_id: user.id},process.env.JWT_SECRECT, {expiresIn: "7d"} );
         
         //return user email and token to client, exclude password
         user.password= undefined;
         
         //send token to cookie
         res.cookie("token", token,{
         httpOnly: true
      //secure: true //works on https 
         })
         //send user as json response
         res.json(user);

      } catch (err) {
         return res.status(400).send("Error !!, Try Again "),
         console.log("Error Try Again", err)
      }
}



