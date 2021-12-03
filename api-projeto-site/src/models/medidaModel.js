var database = require("../database/config");


function buscarUltimasMedidas(idBarril, limite_linhas) {
    instrucaoSql = `select 
                        idSensor,
                        temperatura_lm35, 
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                        from leitura join sensor on idSensor = 200
                        order by idLeitura asc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoReal(idBarril) {
    instrucaoSql = `select 
                        idSensor,
                        temperatura_lm35, 
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                        from leitura join sensor on idSensor = 200
                        order by idLeitura asc;
    `;
                    
    console.log("Executando a instrução SQL: \n"+instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}