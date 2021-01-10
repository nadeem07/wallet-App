var express = require('express')
var router = express.Router()
var pgp = require('pg-promise')();
var db = pgp('postgres://{username}:{password}@localhost:{port}/{database}')



router.post('/user',async (req,res)=>{
  var data=req.body.data;
  var username=data.name;
  var phone=data.phone;
  var balance=data.amount;
  const values=[username,parseInt(phone),parseInt(balance)];
  var result=await db.query(`INSERT INTO personal_wallet (usename, phone,balance) VALUES ($1,$2,$3) returning *`,values).then((result)=>{
    console.log(result);
    res.status(200).send(result);
  }).catch((err)=>{
      res.status(400).send();
  })
});

router.get('/getAllUsername',async (req,res)=>{

  var data=await db.query(`SELECT usename,wid from personal_wallet`);
  res.send(data)
});

router.put('/addFunds',async (req,res)=>{
    console.log(req.body);
    var date=new Date().toString();
    date=await date.slice(date.indexOf(" ")+1,date.indexOf("GMT")-1);
    var init_bal=await db.query(`SELECT balance from personal_wallet Where wid=${req.body.user_id}`);
    var amount=parseInt(req.body.amount);
    var final_bal=parseInt(init_bal[0].balance)+parseInt(amount);
    init_bal=parseInt(init_bal[0].balance);

    var values=["addFund",date,init_bal,amount,final_bal,"credited",req.body.user_id]
    await db.query(`UPDATE personal_wallet SET balance=balance+${req.body.amount} Where wid=${req.body.user_id}`).then((response)=>{
      db.query(`INSERT INTO transaction (transac_type, transac_date,init_bal,amount,final_bal,remark,wallet_id) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *`,values).then((resp)=>{
        res.status(200).send(resp);
      }).catch((err)=>{
        res.status(400).send();
      })
    }).catch((err)=>{
      res.status(400).send();
    })

});

router.put('/spendFunds',async (req,res)=>{
    console.log(req.body);
    var date=new Date().toString();
    date=await date.slice(date.indexOf(" ")+1,date.indexOf("GMT")-1);
    var init_bal=await db.query(`SELECT balance from personal_wallet Where wid=${req.body.user_id}`);
    var amount=parseInt(req.body.amount);
    var final_bal=parseInt(init_bal[0].balance)-parseInt(amount);
    init_bal=parseInt(init_bal[0].balance);
    var remark="spendFund";
    var values=[remark,date,init_bal,amount,final_bal,"debited",req.body.user_id]
    await db.query(`UPDATE personal_wallet SET balance=balance-${req.body.amount} Where wid=${req.body.user_id}`).then((response)=>{
      db.query(`INSERT INTO transaction (transac_type, transac_date,init_bal,amount,final_bal,remark,wallet_id) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *`,values).then((resp)=>{
        res.status(200).send(resp);
      }).catch((err)=>{
          res.status(400).send();
      })
    }).catch((err)=>{
        res.status(400).send();
    })

});

router.get('/getAllUser',async (req,res)=>{

  var data=await db.query(`SELECT * from personal_wallet`);
  console.log(data);
  res.send(data);
});

router.get('/balance/:user_id',async (req,res)=>{
  const id=req.params.user_id;
  console.log(id);
  var data=await db.query(`SELECT * from personal_wallet WHERE wid=${id}`);
  res.send(data)
});

router.get('/transaction/:user_id',async (req,res)=>{
  console.log("transaction");
  const id=req.params.user_id;
  var data=await db.query(`SELECT * from transaction WHERE wallet_id=${id}`);
  console.log(data);
  res.send(data)
});



module.exports = router;
