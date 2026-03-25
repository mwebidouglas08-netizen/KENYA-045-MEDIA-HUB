
import {useState} from "react";
import axios from "axios";

export default function App(){
  const [form,setForm]=useState({});
  const submit=async()=>{
    await axios.post("/api/book",form);
    alert("Booking submitted!");
  };

  return(
    <div style={{fontFamily:"sans-serif",padding:20}}>
      <h1>KENYA045 MEDIA HUB</h1>
      <h2>Book a Session</h2>

      <input placeholder="First Name" onChange={e=>setForm({...form,first:e.target.value})}/><br/>
      <input placeholder="Last Name" onChange={e=>setForm({...form,last:e.target.value})}/><br/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/><br/>
      <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/><br/>
      <input placeholder="Event Type" onChange={e=>setForm({...form,event:e.target.value})}/><br/>

      <button onClick={submit}>Submit Booking</button>
    </div>
  );
}
