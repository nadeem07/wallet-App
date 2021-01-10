import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function AllWallet() {
  const [user, getUser] = useState([]);
  const [load,loaded]   = useState(false);
  useEffect(() => {
     axios.get('http://localhost:8080/getAllUser').then(async (data)=>{
       var alluser = data.data;
       console.log(alluser);
       loaded(true);
       getUser(alluser);
     }).catch((err)=>{
       console.log(err);
     });

  }, [])
  return (
    <div>
    <h1 align="center">Wallets</h1>
    {

    (load) ?
    (
      <div>
      <table className="table">
      <tr>
    <th>Id</th>
    <th>Username</th>
    <th>Phone No</th>
    <th>Balance</th>
  </tr>

      {
        user.map(val => (

        <><tr><td>{val.wid}</td>  <td>{val.usename}</td> <td>{val.phone}</td> <td>{val.balance}</td></tr> </>
      ))
      }

      </table>
    </div>
    ) :''
    }
    </div>
  )

}


export default AllWallet;
