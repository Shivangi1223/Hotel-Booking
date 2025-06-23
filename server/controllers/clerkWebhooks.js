import { get } from "mongoose";
import User from "../models/User.js";
import { Webhook} from "svix";

const clerkWebhooks = async (req, res)=> {
    try {

        // CREATE A SVIX INSTANCE WITH CLERK WENHOOK SECRET. -->>
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
 
        // Getting Headers
        const headers = {
              "svix-id": req.headers["svix-id"],
              "svix-timestamp": req.headers["svix-timestamp"],
              "svix-signature": req.headers["svix-signature"],
        };

        //verifying headers -->
        await whook.verify(JSON.stringify(req.body), headers)

        //Getting data from request body -->

        const {data, type} = req.body

        const userData = {
              _id: data.id,
              email: data.email_address[0].email_address,
              username: data.first_name + " " + data.last_name,
              image: data.image_url,
        }

        //switch cases for different events --->>

        switch(type){
            case "user.created":{
                await User.create(userData)
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
            }
            req.JSON({success: true, message: "Webhook Recieved"})
       } 
            catch (error) {
                console.log(error.message);
                res.JSON({success: false, message: error.message});
        
    }
}


export default clerkWebhooks;