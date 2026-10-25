'use client'
import { Field,FieldContent,FieldDescription,FieldGroup, FieldLabel } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { IUser } from "@/models/type"
import { useState } from "react"
import { Button } from "./ui/button"
import { profileUpdate } from "@/lib/actions/profileupdate"
import { toast } from "react-toastify"


   export type newinfoType={
        name:string,
        location:string | undefined,
        contact:number
    }

const Profileform = ({userdata}:{userdata:IUser}) => {


const [newinfo,setnewinfo]=useState<newinfoType>({
    name:userdata?.name,
    location:userdata?.location,
    contact:userdata?.contact
})


const changehandle=async(e:React.ChangeEvent<HTMLInputElement>)=>{

    const {name,value}=e.target;

    setnewinfo((prev)=>({...prev,[name]:value}))
}


const submitForm=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{

        const res=await profileUpdate(newinfo);
        if(res.success){
            toast.success("Profile updated")
            setnewinfo({
                name:res.payload.name,
                location:res.payload.location,
                contact:res.payload.contact

            })
        }

    }
    catch(err){
        console.log(err);
        toast.error(err as string);
    }
}



  return (
    <div className="w-full h-full flex flex-col gap-10">

        <form className="flex flex-col gap-10" onSubmit={submitForm}>

         <FieldGroup>
                <Field>
                    <Label>Name</Label>
                    <Input value={newinfo?.name} name="name"  id="name" type="text" onChange={changehandle}/>

                </Field>
            </FieldGroup>

             <FieldGroup>
                <Field>
                    <Label>Location</Label>
                    <Input value={newinfo?.location} name="location" id="name" type="text" onChange={changehandle}/>

                </Field>
            </FieldGroup>

             <FieldGroup>
                <Field>
                    <Label>Contact</Label>
                    <Input value={newinfo?.contact} name="contact" id="name" type="number" onChange={changehandle}/>

                </Field>
            </FieldGroup>


            <Field>
                <div className="w-100 ">
<Button type="submit" variant="secondary" className="cursor-pointer hover:bg-orange-500 hover:text-white">Update</Button>
                </div>
                
            </Field>

            </form>

    </div>
  )
}

export default Profileform
