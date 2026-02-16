import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [form, setform] = useState({
    "email": "none",
    "password" : "none"
  })
  return (
    <>
      <input type="email" name="email" id="" onChange={(e)=>setform({...form,'email':e.target.value})} placeholder='email'/>
      <input type="password" name="password" id="" onChange={(e)=>setform({...form,'password':e.target.value})}  placeholder='password'/>
      <input type="submit" value="submit" onClick={()=>{axios.post(import.meta.env.VITE_URL,{'form' : form})}} />
    </>
  )
}

export default App
