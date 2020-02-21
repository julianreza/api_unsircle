const nodemailer = require("nodemailer");
const express = require('express')
const app = express()
const port = 3000

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'ini user database',
  host: 'ini host database',
  database: 'ini nama database',
  password: 'ini password database',
  port: 'ini port database',
})

async function mail(email){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'ini email',
      pass: 'ini password email'
    }
  });

  let info = await transporter.sendMail({
    from: 'ini email from',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
  });
  console.log(info); 
}

app.post('/', (req, res) => {
  const email = req.query.email
  const password = req.query.password
  const name = req.query.name
  const query = `INSERT INTO public."User" (email, password, name) VALUES(${email}, ${password}, ${name})`
  pool.query(query, (err, response) => {
    console.log(err, res)
    mail(email)
    res.send(response)
    pool.end()
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))