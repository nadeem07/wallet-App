import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import '../App.css';
import '../style.css';

function Spendfund() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [list, getlist] = useState();
  const [amount, setAmount] = useState([]);
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

  const onSubmit =async (e) => {
  e.preventDefault();
  if(!id || amount.length<=0){
    alert("Empty field error");
    return;
  }
  if(amount<=1 || amount >=1000){
    alert("amount must be between 1-1000");
    return;
  }
  axios.put('http://localhost:8080/spendFunds',{user_id:id,amount:amount}).then((data)=>{
    alert("fund spent");
}).catch((err)=>{
  alert("failed spending fund");
});

  }
  return (
    <div className="box">
    <h1>Spend Fund</h1>
    <SelectSearch options={list} onChange={e => setId(e)} search={true} name="name" autoComplete="on" placeholder="search name" /><br />
    <input type="number" name="amount" onChange={e=> setAmount(e.target.value)} value={amount}  placeholder="add amount" />
    <br />
    <button type="submit" onClick={onSubmit}>Enter</button>
    </div>
  )

}


export default Spendfund;
