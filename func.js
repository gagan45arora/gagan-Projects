const tot = function(P,T) {
    return P*(1+Math.floor(T)*0.3);
}
const poster = function(req,res,next){
    next();
}
module.exports.tot = tot;
module.exports.poster = poster