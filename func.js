const { v4: uuidv4 } = require('uuid');
const sql_q = require('./sql_q');

tot = function(P,T) {
    return P*(1+Math.floor(T)*0.3);
}
exports.tot = tot;

exports.post = function(req,res){
    let user = req.body;
    user = { ...user,Total: tot(user.Amount,user.Tenure), AC: uuidv4() }
    sql_q.post_user(user,(err)=>{
        if (err) throw err;
        res.send('Done');
    });
}

exports.get_all_info = function(req,resp){
    sql_q.all_users((err,rows)=>{
        if(err) throw err;
        resp.send(rows);
    });
}

exports.get_user_info = function(req,resp){
    let {id} = req.params;
    sql_q.single_user(id,'AC',(err,rows)=>{
        if(err) throw err;
        resp.send(rows);
    });
}

exports.basic_joins = function(req,resp){
    str = req.path;
    i = str.length;
    while (str[i]!='/'){
        i--;
    }
    result = str.slice(i+1,str.length);
    sql_q.join(result,(err,rows)=>{
        if (err) throw err;
        res.send(rows);
    });
};

exports.delete_user = function(req,resp){
    const {id} = req.params;
    sql_q.del_user(id,()=>{
        resp.send('Deleted');
    });
};

exports.update_user = function(req,resp){
    const {id} = req.params;
    const {Name,username, Amount, Tenure} = req.body;
    if(Name){
        sql_q.update_user('Name',Name,id);
        resp.send('Name Updated');
    }
    if(username){
        sql_q.update_user('username',username,id);
        resp.send('username Updated');
    }
    if(Amount){  
        sql_q.update_user('Amount',Amount,id);
        resp.send('Amount Updated');
    }
    if(Tenure){
        sql_q.update_user('Tenure',Tenure,id);
        resp.send('Tenure Updated');
    }
}

exports.log_user = function(req,resp){
    sql_q.check_user(req.body.username,req.body.password,(err,tree)=>{
        if (err) throw err;
        if (tree.length!=0) resp.send(tree);
        else resp.send('Invalid Credentials');
    });
}
