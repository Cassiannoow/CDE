const mysql    = require("mysql2/promise");
const bdConfig = 'mysql://o4dcg449uqsxhwxvuzzp:pscale_pw_Oyrh5kTdsn3e8e26IrDX8DdV5QSkLrhods6tW1rleqX@aws.connect.psdb.cloud/cde?ssl={"rejectUnauthorized":true}';
//require('./bdconfig.js');

async function getConexao ()
{
    if (global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;

    try
    {
        const conexao = await mysql.createConnection (bdConfig);
        global.conexao = conexao;
        return conexao;
    }
    catch (erro)
    {
        console.log('1')
        return null;
    }
}

async function estrutureSe ()
{
    const conexao = await getConexao ();
    if (conexao==undefined) return null;

    const sql = 'CREATE TABLE IF NOT EXISTS  `Estabelecimento` (`Id` int,`Nome` varchar(255),`Categoria` varchar(50),`Telefone` varchar(15),'
    + '`Email` varchar(100),`Website` varchar(100),`Horario` text,`CNPJ` varchar(18) NOT NULL,`Complemento` varchar(150),'
    + '`Numero` varchar(20),`CEP` varchar(9),`Cardapio` text,PRIMARY KEY (`CNPJ`)) ';
    
    try
    {
        await conexao.query (sql);
        return true;
    }
    catch (erro)
    {
        return false;
        console.log('2')
    }
}

module.exports = {getConexao, estrutureSe}
