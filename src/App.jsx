import { useState } from "react";
import Todos from "./Todos";


function App() {
  const [toggle,setToggle] = useState(true)
 return(
  <div>
    <button onClick={()=> setToggle(!toggle)}>toggle</button>
    {toggle && <Todos />}
  </div>
 )
}

export default App;
