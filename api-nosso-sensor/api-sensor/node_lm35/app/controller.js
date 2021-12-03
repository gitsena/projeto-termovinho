const express = require('express');
const { ArduinoDataTemp } = require('./newserial');
const db = require('./database')
const router = express.Router();


router.get('/', (request, response, next) => {
    
    ArduinoDataTemp.List.map((item)=>{
        let sum = item.data.reduce((a, b) => a + b, 0);
        let average = (sum / item.data.length).toFixed(2);
        item.total = item.data.length;
        item.average = isNaN(average) ? 0 : average
    })
    
    //let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    //let average = (sum / ArduinoDataTemp.List.length).toFixed(2);


    /*response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
    });*/

    response.json(ArduinoDataTemp.List);


});

router.post('/sendData', (request, response) => {

    // var umidade  =  ArduinoDataTemp.List[0].data;
    // var temperatura_dht11 = ArduinoDataTemp.List[1].data;
    // var luminosidade = ArduinoDataTemp.List[2].data;
    var temperatura_lm35 = ArduinoDataTemp.List[3].data;
  

    // umidade = umidade[umidade.length-1];
    // temperatura_dht11 = temperatura_dht11[temperatura_dht11.length-1];
    // luminosidade = luminosidade[luminosidade.length-1];
    temperatura_lm35 = temperatura_lm35[temperatura_lm35.length-1];
    
    var sql = `insert into leitura (idLeitura, temperatura_lm35, fkSensor) values 
    (null, '${temperatura_lm35}', 200);`;

    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log(temperatura_lm35)
      });
      
    
    response.sendStatus(200);
})

module.exports = router;