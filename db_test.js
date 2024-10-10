const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
let db = new sqlite3.Database('./demo.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

/* Create a table
db.run(`
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER
  )
`, (err) => {
  if (err) {
    console.error("Error creating table: " + err.message);
  } else {
    console.log("Table 'users' created or already exists.");
  }
});

*/

// Insert a new user
 const sql = 'INSERT INTO User (name, email, age) VALUES (?, ?, ?)';
 const params = ['John Doe', 'john.doe@example.com', 30];

 db.run(sql, params, function(err) {
   if (err) {
     console.error("Error inserting data: " + err.message);
     return;
   }
   console.log(`A new row has been inserted with rowid ${this.lastID}`);
 });

// Close the database connection when done


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});