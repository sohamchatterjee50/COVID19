import React,{useState, useEffect} from 'react';
import './MedicalCollegeBed.css';

const MedicalCollegeBed = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [state, setState] = useState('');
  const [type, setType] = useState('');

 function filterByState(event){
 event.preventDefault();
  const value=event.target[0].value;
   var filteredItems = allItems.filter(function (item) {
      return item.state === value });
  setState('');
  if(value != ''){
  setItems(filteredItems);
  } else{
  setItems(allItems);
  }
  }

 function filterByType(event){
 event.preventDefault();
  const value=event.target[0].value;
  var filteredItems = allItems.filter(function (item) {
    return item.ownership === value });
  setType('');
  if(value != ''){
  setItems(filteredItems);
  } else{
  setItems(allItems);
  }
  }

   function onStateChange(event) {
      setState(event.target.value);
    }

   function onTypeChange(event) {
          setType(event.target.value);
        }



  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/hospitals/medical-colleges")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.medicalColleges);
          setAllItems(result.data.medicalColleges);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <>
    <form id="StateName" className="Form" onSubmit={filterByState}>
      <label className="Label">
        Filter by State Name:
        <input type="text" name="state" value={state} onChange={onStateChange} />
      </label>
    <button>Submit</button>
    </form>
     <form id="type" onSubmit={filterByType} >
          <label className="Label">
            Filter By Type:
            <input type="text" name="type" value={type} onChange={onTypeChange} />
          </label>
          <button>Submit</button>
        </form>

    <table>
            <thead>
            <tr>
                <th>State Name</th>
                <th>Institute Name</th>
                 <th>City</th>
                 <th>Type</th>
                  <th>Admission Capacity</th>
                   <th>Hospital Beds</th>
                   </tr>
              </thead>
                <tbody>
                   {
                      items.map((numList,i) =>(
                                       <tr key={i}>
                                              {
                                                Object.keys(numList).map((keyName, j) => (
                                                     <td key={j}>{numList[keyName]}</td>
                                                  ))
                                               }
                                         </tr>
                            ))
                       }
                     </tbody>
                   </table>
                   </>
    );
  }
}

export default MedicalCollegeBed;