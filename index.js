const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/jsonp", (req, res, next) => {
    const method = req.query.method;
    const args = JSON.parse(req.query.args);
    const callbackName = req.query.callback;
    res.type(".js");
    if (method === "sum"){
        const sum = exports.sum.call(this, args.a, args.b);
        const result = {
            sum
        };
        setTimeout(function(){
            res.send(callbackName + "(" + JSON.stringify(result) + ")");
        } , Math.random() * 1000);
    }
});

app.get("/jqueryP", (req, res, next) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const callback = req.query.callback;
    const sum = exports.sum.call(this, a, b);
    const result = { sum };
    setTimeout(function(){
        res.send(`${callback}(${JSON.stringify(result)})`);
    }, Math.random() * 500);
});

app.listen(8080, () => {
    console.log("Running...");
});

exports.sum = function(a, b){
    return parseInt(a) + parseInt(b);
}
