import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({

    firstName: String,
    lastName: String,    
    email: String,
    phoneNumber: Number,
    country: String,
    message: String,
    

})




const Inquiry = mongoose.model('Inquiry', InquirySchema);
export { Inquiry };