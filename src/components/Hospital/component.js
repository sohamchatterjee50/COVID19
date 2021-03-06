import React,{useState, useEffect} from 'react';
import './Hospital.css';

const Hospital = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  function makeid(length) {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/hospitals/beds")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.regional);
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
    <table>
        <thead>
        <tr>
            <th>State Name</th>
            <th>Rural Hospitals</th>
             <th>Rural Beds</th>
             <th>Urban Hospitals</th>
              <th>Urban Beds</th>
               <th>Total Hospitals</th>
              <th>Total Beds(State Wise)</th>
              </tr>
          </thead>
            <tbody>
               {
                  items.map((numList,i) =>(
                                   <tr key={i}>
                                          {
                                            Object.keys(numList).map((keyName, j) => (
                                                j<7 &&  <td key={j}>{numList[keyName]}</td>
                                              ))
                                           }
                                     </tr>
                        ))
                   }
                 </tbody>
               </table>
    );
  }
}

export default Hospital;