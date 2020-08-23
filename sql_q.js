const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1912530506_ncdr',
    database : 'my_db'
});

connection.connect((err)=>{
    if(err)
        console.log(err);
    else
        console.log('connected');
});


exports.post_user = function(user,callback){
    connection.query('INSERT INTO customers SET ?', user, (err) => {
        callback(err);
    });
}

exports.all_users = function(callback){
    connection.query('SELECT * FROM customers', (err,rows) => {
        callback(err,rows);
    });
}

exports.single_user = function(id,str,callback){
    connection.query('SELECT * FROM customers WHERE '+str+' = ?', id, (err,rows) => {
        callback(err,rows);
    });
}

exports.join = function(result,callback){
    var sql = 'SELECT * FROM customers '+result+' JOIN Personal_Data ON customers.Name = Personal_Data.Name';
    connection.query(sql, (err,rows) => {
        callback(err,rows);
    });
}

exports.del_user =function(id,callback){
    connection.query('DELETE FROM customers WHERE AC = ?',id , (err) => {
        if (err) throw err;
        callback();
    });
}

exports.update_user = function(str,val,id){
    connection.query('UPDATE customers SET '+str+ ' = ? WHERE AC = ?',[val,id], (err) => {
        if (err) throw err;
    });
}

exports.check_user = function(us,pa,callback){
    connection.query('SELECT * FROM customers WHERE username = ? AND password = ?',[us,pa],(err,rows)=>{
        callback(err,rows);
    })
}