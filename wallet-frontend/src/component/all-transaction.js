import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import '../App.css';
import '../style.css';

function AllTransaction() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [list, getlist] = useState();
  const [transaction, getTransaction] = useState([]);
  const [load,loaded]   = useState(false);
  useEffect(() => {
     axios.get('http://localhost:8080/getAllUsername').then(async (data)=>{
       var obj = data.data;
       obj =await obj.map(item => {
       return {
         name: item.usename,
         value: item.wid
       };
     });
       getlist(obj)
     }).catch((err)=>{
       console.log(err);
     });

  }, []);

  const onSubmit =  (e) => {
  e.preventDefault();
  if(!id){
    alert("No name selected");
    return;
  }
  axios.get('http://localhost:8080/transaction/'+id).then((data)=>{
    loaded(true);
    getTransaction(data.data);
  }).catch((err)=>{
    console.log(err);
  })
  }
console.log(transaction);

  return (
    <div className="box">

    <h1>All Transaction</h1>
      <div className="transaction-box">
    <SelectSearch options={list} onChange={e => setId(e)} search={true} name="name" autoComplete="on" placeholder="search name" />
    <button type="submit" onClick={onSubmit}>Enter</button>
    </div>
    {

    (load) ?
    (
      <div>
      <table className="table">
      <tr>
    <th> Transaction Id</th>
    <th>Type</th>
    <th>Date</th>
    <th>Initial Balance</th>
    <th>Amount</th>
    <th>Final Balance</th>
    <th>Remark</th>
  </tr>
      {
        transaction.map(val => (
        <><tr><td>{val.transaction_id}</td>  <td>{val.transac_type}</td> <td>{val.transac_date}</td> <td>{val.init_bal}</td>
        <td>{ val.remark.trim()==='credited' ? "+" :"-"}{val.amount}</td> <td>{val.final_bal}</td><td>{val.remark}</td> </tr> </>
      ))
      }
      </table>
    </div>
    ) :''
    }
    </div>
  )

}


export default AllTransaction;
