import React,{ useState } from 'react';
import axios from 'axios';
import '../App.css';

function NewWallet() {
    const [name, setName] = useState("");
    const [phone, setphone] = useState("");
    const [amount, setamount] = useState("");

    const onSubmit =async (e) => {
    e.preventDefault();
    if(name.length<=0 || phone.length<=0 || amount.length<=0  ){
      alert("empty field error");
      return;
    }
    if(amount<=1 || amount >=10000){
      alert("amount must be between 1-10000");
      return;
    }
    if(phone.length!=10){
      alert("invalid phone no , should be 10 digit");
      return;
    }
    var data={name:name,phone:parseInt(phone),amount:parseInt(amount)};
    axios.post('http://localhost:8080/user',{data:data}).then((res)=>{
        alert("wallet success")
    }).catch((err)=>{
      alert("wallet failed to add");
    })
    }


  return (
    <div className="box">
    <h1> Add Wallet</h1>
    <form onSubmit={onSubmit}>
    <label for="name">Name:</label>
    <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} /><br />
    <label for="phone">phone:</label>
    <input type="number" name="phone" onChange={e => setphone(e.target.value)} size="10" value={phone} /><br />
    <label for="amount">Amount:</label>
    <input type="number" name="amount" onChange={e => setamount(e.target.value)} value={amount} /><br />
    <input type="submit" value="Submit"/>
    </form>

    </div>

      )

}
/*

CREATE TABLE personal_wallet(
   wid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   usename CHAR(120)   NOT NULL,
   phone   INT UNIQUE NOT NULL,
   balance INT NOT NULL
);
CREATE TABLE transaction(
  transaction_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   transac_type CHAR(120)   NOT NULL,
   transac_date  Date   NOT NULL,
   init_bal INT NOT NULL,
   amount INT NOT NULL,
   final_bal INT NOT NULL,
   remark CHAR(200),
   wallet_id INT
);
ALTER TABLE transaction
    ADD CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES personal_wallet (wid);
*/
export default NewWallet;
