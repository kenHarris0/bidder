import { connectDB } from "@/lib/db"



await connectDB()



export default function Home(){
  return <h1>hi</h1>
}