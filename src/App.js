import React,{useState} from 'react';
import './App.css';
import Link from './components/Link/component.js';
import Contact from './components/Contact/component.js';
import Notify from './components/Notify/component.js';
import Hospital from './components/Hospital.js';
import MedicalCollegeBed from './components/MedicalCollegeBed.js';
import Compare from './components/Compare.js';

const App = () => {
  const [choice, setChoice] = useState(0);

 function handleClick(ch) {
  setChoice(ch);
  }

  return (
    <div className="App">
   <div className="App-header">
           <button id="Contact" onClick={() => handleClick(1)}>Contact/Helpline</button>
           <button id="Notify" onClick={() => handleClick(2)}>Notify/Advisory</button>
           <button id="Hospital"  onClick={() => handleClick(3)}>Hospital Dashboard (Hospitals and beds)</button>
           <button id="Hospital"  onClick={() => handleClick(4)}>Hospital Dashboard (Medical colleges and beds)</button>
           <button id="Compare" onClick={() => handleClick(5)}>Daily Sample Tests vs Confirmed Cases</button>
   	  </div>


     <div>
  {choice===1 && <Contact/>}
   {choice===2 && <Notify/>}
    {choice===3 && <Hospital/>}
     {choice===4 && <MedicalCollegeBed/>}
    {choice===5 && <Compare/>}
     </div>

    </div>
  );
}

export default App;
