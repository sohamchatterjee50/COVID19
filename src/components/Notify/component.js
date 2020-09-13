import React,{useState, useEffect} from 'react';
import './Notify.css';

const Notify = () => {
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
    fetch("https://api.rootnet.in/covid19-in/notifications")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.notifications);
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
          <thead key={makeid(6)}>
          <tr>
               <th>Date</th>
              <th>Notification Title</th>
              <th>Link</th>
              </tr>
            </thead>
              <tbody key={makeid(7)}>
                 {
                    items.map((numList,i) =>(
                                     <tr key={i + makeid(5)}>
                                            {


                                                Object.keys(numList).map((keyName, j) => (
                                                  keyName==="link" ?
                                                  (
                                                  <td key={j}><a href={numList[keyName]}>{numList[keyName]}</a></td>
                                                  ):
                                                  (
                                                   <>
                                                <td key={j + makeid(4)}>{numList[keyName].substr(0,numList[keyName].indexOf(" "))}</td>
                                                <td key={j + makeid(5)}>{numList[keyName].substr(numList[keyName].indexOf(" ")+1)}</td>
                                                  </>
                                              )
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

export default Notify;