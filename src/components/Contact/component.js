import React,{useState, useEffect} from 'react';
import './Contact.css';

const Contact = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/contacts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.contacts.regional);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <table>
    <tr>
        <th>State Name</th>
        <th>Helpline Number</th>
      </tr>
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
    );
  }
}

export default Contact;