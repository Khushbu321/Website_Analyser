// const db = require('./connection');

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    user: 'khushbu.jain',
    host: 'localhost',
    database: 'website',
    port: 5432,
  }
})

// db.query(`CREATE INDEX index_name ON users(name)`, (err, res) => {
//   // if (err) {
//   //   return next(err)
//   // }
//   // console.log(res.rows);
//   // response.send(res.rows);
// })
exports.addURL = async (name) => {
  try{
  var url_info = await knex('url').insert({name: name}).returning('*');
  return (url_info[0].id);
  }
    catch (err) {
    console.log(err);
  }
}

exports.addURLData = async (values) => {
  try {
  console.log("called");
  await knex('urlData').insert({ urlId: values.id, data: values.data}).returning('*');
  }
  catch(err){
    console.log(err);
  }
}

exports.getURLData = async (url) => {
  try{
    // var id;
  // console.log("called");
  // console.log(url);
  // var output= [{id: null}]
  // console.log(knex.from('url').select('id').where({ name: url }).toString())
  const arr =  await knex.from('url').select('id').where({name: url});

  var last = arr.slice(-1)[0];
  console.log("id------",last.id);
    // console.log(knex.from('urlData').select('data').where({ urlId: id }).toString());
  var data = await knex.from('urlData').select('data').where({ urlId: last.id });
  console.log("data--------",data[0].data);
    return data[0].data;
  }
  catch(err){
    console.log(err);
  }
}

// var [{ id }] = await knex.select(‘id’).from(‘url’).where({ url: url });
// db.query(`SELECT * FROM users`, (err, res) => {
//   if (err) {
//     return next(err)
//   }
//   console.log(res.rows);
//   // response.send(res.rows);
// })


// app.get('/', async (req, response, next) => {
//   var a = await knex('url').insert({ a: 'b' });
//   console.log(a);
//   // db.query(`SELECT * FROM users`, (err, res) => {
//   //   if (err) {
//   //     return next(err)
//   //   }
//   //   response.send(res.rows);
//   // })
// })

// app.get('/:id', (req, response, next) => {
//   db.query(`SELECT * FROM users WHERE user_id = ${req.params.id}`, (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     response.send(res.rows);
//   })
// })

// const text = 'INSERT INTO users(user_id, name, company) VALUES($1, $2, $3) RETURNING *';
// const values = [3, 'brianc', 'cowrks'];

// app.post('/users', (req, response, next) => {
//   db.query(text, values, (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     // console.log(res.rows[0]);
//     response.send(res.rows);
//   })
// })


// app.put('/:id', (req, response, next) => {
//   db.query(`update users set company = 'cowrks' where user_id = ${req.params.id}`, (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     // console.log(res.rows[0]);
//     response.send(res.rows);
//   })
// })



// app.delete('/:id', (req, response, next) => {
//   db.query(`delete from users where user_id = ${req.params.id}`, (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     // console.log(res.rows[0]);
//     response.send(res.rows);
//   })
// })



