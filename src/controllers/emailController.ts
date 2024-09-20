// sending email form the company to the user
import transporter from "../config/transporterConfig";
import { Request, Response } from 'express'; // Import necessary types
import { Inquiry } from "../db/index";


// Function to handle form submission
export const submitForm = async (req: Request, res: Response) => {
    const { firstName, lastName ,email, phoneNumber , country ,  message } = req.body;

    
    
    if(!firstName || !lastName || !email || !phoneNumber || !country || !message){
        return res.send("please input all the fields");
    }
    try {

        try{
         // Create a new Inquiry instance with the form data
        const fromSubmission = new Inquiry( {firstName, lastName ,email, phoneNumber , country ,  message ,} );
        await fromSubmission.save();


        }catch(e){
            return res.send("error "+ e);
        } 


        // Send the e-mails after successfully saving the form info in the db
        await sendEmailToUser(email);
        await sendEmailToCompany(firstName, lastName ,email, phoneNumber , country ,  message);

        return  res.status(200).send('Inquiry submitted successfully');
    } catch (error) {
        // Type assertion to ensure error is of type Error
        if (error instanceof Error) {
            return res.status(500).json({
                error: error.message,  // Now TypeScript knows error is an Error
                msg: "Error sending the mail"
            });
        } else {
            // Handle the case where error is not of type Error
            return res.status(500).json({
                error: "An unknown error occurred",
                msg: "Error sending the mail"
            });
        }
    }
};


    // sending an email to user from the companies email
    async function sendEmailToUser(to: string): Promise<void> {

        try {

            const info = {
                from: process.env.EMAIL_USER,
                to,
                subject: "Inquiry e-mail",
                text: "Your e-mail has been sent . Please wait until we get back to you soon. Thank you for reaching out to us",

            };
            await transporter.sendMail(info);
        } catch (error) {
            throw new Error("Error sending email to user");
        }


    }


    // sending an email to company 
    async function sendEmailToCompany(firstName : string, lastName:string ,email:string, phoneNumber : number, country :string ,  message:string): Promise<void> {

        const to = process.env.EMAIL_USER // the company's email address
        const user = email;
        try {
            const info = {
                from: to, // user's email
                to, // companies email address
                subject: "Inquiry e-mail",
                text: `First Name: ${firstName}\nLast Name : ${lastName}\nPh Number: ${phoneNumber}\nCountry : ${country}\nfrom : ${email}\nregarding : ${message}`,
                replyTo: email

            };
            await transporter.sendMail(info);

        } catch (error) {
            throw new Error("Error sending email to company");

        }


    }

