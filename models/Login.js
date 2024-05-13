
import  mongoose  from "mongoose";
import  module  from "module";
// authentication schema
 const loginSchema = mongoose.Schema({
    userId : {
        type: String,
        required : true,
        unique : true
    },
    Password : {
        type: String,
        required : true
    }
});
export const login = module.exports = mongoose.model('login', loginSchema);
/*{
    userId : "heyIwantyourAPI",
    Password : "heyImPassword"
}*/