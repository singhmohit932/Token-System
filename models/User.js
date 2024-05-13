
import  mongoose  from "mongoose";
import  module  from "module";

 const userSchema = mongoose.Schema({
    userName : {
        type: String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    Age : Number
  

});
/*{
	"userName" : "Mohit",
  	"lastName" : "Singh",
  	"Age" :21
}*/
export const User = module.exports = mongoose.model('User',userSchema);