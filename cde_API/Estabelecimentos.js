const bd = require ('./bd');

async function inclua (estabelecimento)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = "INSERT INTO Estabelecimento (Nome, Categoria, Telefone, Email, WebSite, Horario, CNPJ, Complemento, Numero, CEP, Cardapio)" +
                        "VALUES " +
                        "(?,?,?,?,?,?,?,?,?,?,?)";
        const dados   = [estabelecimento.nome, estabelecimento.categoria, estabelecimento.telefone, estabelecimento.email, estabelecimento.site, estabelecimento.horario, estabelecimento.cnpj, 
                        estabelecimento.complemento, estabelecimento.numero, estabelecimento.cep, estabelecimento.cardapio];
        await conexao.query (sql, dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function atualize (estabelecimento)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   =   "UPDATE Estabelecimento " +
                        "SET Nome = ? ," +
                        "Categoria = ? ," +
                        "Telefone = ? ," +
                        "Email = ? ," +
                        "WebSite = ? ," +
                        "Horario = ? ," +
                        "Complemento = ? ," +
                        "Numero = ? ," +
                        "CEP = ? ," +
                        "Cardapio = ? " +

                        "WHERE CNPJ = ?";
        const dados = [estabelecimento.nome, estabelecimento.categoria, estabelecimento.telefone, estabelecimento.email, estabelecimento.site, estabelecimento.horario,
            estabelecimento.complemento, estabelecimento.numero, estabelecimento.cep, estabelecimento.cardapio, estabelecimento.cnpj];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}
    
async function remova (CNPJ)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = "DELETE FROM Estabelecimento " +
                      "WHERE CNPJ = ?";
        const dados = [CNPJ];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereUm (cnpj)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     =    "SELECT * " +
                            "FROM Estabelecimento " +
                            "WHERE CNPJ = ?";
        const  dados   = [cnpj];
        const [linhas] = await conexao.execute(sql,dados);
        return linhas.length > 0 ? linhas[0] : {};
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereTodos ()
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM Estabelecimento';
        const [linhas] = await conexao.query(sql);
        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

module.exports = {inclua, atualize, remova, recupereUm, recupereTodos}



