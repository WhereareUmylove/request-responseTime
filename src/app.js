var fs = require('fs-extra')

var list = {}
exports.addList =(req,res)=>{
    if(req.body.uid){
        let name = req.body.uid+''
        list[name] = req.body
        let time = new Date().toLocaleString()
        let str = JSON.stringify(req.body)+'||'
        let path = "./list/"+name+".txt"
        try{
            fs.appendFile(path, str, (err)=>{
                if(err) {
                    console.log(err);
                    res.sendStatus(404)
                }
            });
            res.json({ status: 200, describe: 'OK' });
            return
        }catch(err){
            console.log(err)
            res.sendStatus(404)
            return
        }
    }else{
        res.sendStatus(404)
        return
    }
}
exports.getList = (req,res)=>{
    let data = []
    for(let key  in list){
        data.push(list[key])
  }
    res.render("index",{list:data});
}

exports.detail = (req, res) => {
    let uid = req.params.uid
    fs.readFile("./list/"+uid+".txt","utf-8", (err, data)=>{
        if (err) {
            console.log(err)
            res.sendStatus(404)
            return
        }
        let details = []
        let newData = data.split("||")
        newData.pop()
        newData.forEach(item=>{
            details.push(JSON.parse(item))
        })
        res.render("index",{list:details});
    });
}