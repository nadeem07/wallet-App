import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import '../App.css';
import '../style.css';
function Balance() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [list, getlist] = useState();
  const [data, getdata] = useState([]);
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

  }, [])

  const onSubmit =  (e) => {
  e.preventDefault();
  if(!id){
    alert("No name selected");
    return;
  }

  axios.get('http://localhost:8080/balance/'+id).then((data)=>{
    loaded(true);
    getdata(data.data);
  }).catch((err)=>{
    console.log(err);
  })

  }

  return (
    <div>
    <div className="box">
    <h1> Search Balance</h1>
    <div className="bb-1">
    <SelectSearch options={list} onChange={e => setId(e)} search={true} name="name" autoComplete="on" placeholder="search name" />
    <button type="submit" onClick={onSubmit}>Enter</button>
    </div>
    </div>
    <div className="display-balance">
    {

    (load) ?
    (
      <div>
      {data.map(val => (
        <>Name : {val.usename} {"    "} |  Balance : {val.balance}</>
      ))
      }
    </div>
    ) :''
    }

    </div>


    </div>

  )

}


export default Balance;
