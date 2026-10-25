import Profileform from "@/components/Profileform"
import { connectDB } from "@/lib/db"
import User from "@/models/user.model"
import { auth } from "@clerk/nextjs/server"







export default async function ProfilePage(){

    await connectDB()
    const {userId}=await auth()

    const currUser=await User.findOne({clerkId:userId})

    if(!currUser){
        throw new Error("no user logged in")
    }



    return(

    <div className="w-full h-screen flex flex-col border p-10 gap-2">

        <h1 className="text-4xl font-extrabold ">{currUser?.name}'s  Profile</h1>


        <div className="w-1/2 h-full  p-10">

            <Profileform userdata={JSON.parse(JSON.stringify(currUser))}/>

           

            

        </div>



    </div>





    )}