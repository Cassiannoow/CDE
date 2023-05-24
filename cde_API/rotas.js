const Estabelecimentos     = require ('./Estabelecimentos.js');
const Estabelecimento      = require ('./Estabelecimento.js');
const Comunicado = require ('./comunicado.js');


// para a rota de CREATE
async function inclusao (req, res)
{
    //nome, categoria, telefone, email, site, horario, cnpj, complemento, cep, cardapio, numero
    if (Object.values(req.body).length!=11 || !req.body.nome || !req.body.categoria || !req.body.telefone || 
    !req.body.email || !req.body.site || !req.body.horario || !req.body.cnpj || !req.body.complemento || 
    !req.body.cep || !req.body.cardapio )
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um estabelecimento (codigo, nome e preço)').object;
        return res.status(422).json(erro);
    }
    
    let estabelecimento;
    try
    {
        estabelecimento = Estabelecimento.novo(req.body.nome, req.body.categoria, req.body.telefone, req.body.email, req.body.site, req.body.horario, req.body.cnpj, req.body.complemento, req.body.numero, req.body.cep, req.body.cardapio);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo, nome deve ser um texto não vazio e preço deve ser um número real positivo').object;
        return res.status(422).json(erro);
    }

    const ret = await Estabelecimentos.inclua(estabelecimento);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('LJE','estabelecimento já existe','Já há estabelecimento cadastrado com o código informado').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','O estabelecimento foi incluído com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (Object.values(req.body).length!=11 || !req.body.nome || !req.body.categoria || !req.body.telefone || 
    !req.body.email || !req.body.site || !req.body.horario || !req.body.cnpj || !req.body.complemento || 
    !req.body.numero || !req.body.cep || !req.body.cardapio )
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um estabelecimento (codigo atual, novo nome e novo preço)').object;
        return res.status(422).json(erro);
    }
    
    let estabelecimento;
    try
    {
        estabelecimento = Estabelecimento.novo (req.body.nome, req.body.categoria, req.body.telefone,
            req.body.email, req.body.site, req.body.horario, req.body.cnpj, req.body.complemento, req.body.numero,
            req.body.cep, req.body.cardapio);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo, nome deve ser um texto não vazio e preço deve ser um número real positivo').object;
        return res.status(422).json(erro);
    }

    const codigo = req.params.cnpj;
    
    if (codigo!=estabelecimento.cnpj)
    {
        const erro = Comunicado.novo('TMC','Mudança de código','Tentativa de mudar o código do estabelecimento').object;
        return res.status(400).json(erro + codigo);    
    }
    
    let ret = await Estabelecimentos.recupereUm(codigo);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','estabelecimento inexistente','Não há estabelecimento cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await Estabelecimentos.atualize(estabelecimento);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('ABS','Alteração bem sucedida','O estabelecimento foi atualizado com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de DELETE
async function remocao (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }
    
    const codigo = req.params.cnpj;
    let ret = await Estabelecimentos.recupereUm(codigo);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','estabelecimento inexistente','Não há estabelecimento cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await Estabelecimentos.remova(codigo);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('RBS','Remoção bem sucedida','O estabelecimento foi removido com sucesso').object;
        return res.status(200).json(sucesso);
  //}    
}

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const codigo = req.params.cnpj;

    const ret = await Estabelecimentos.recupereUm(codigo);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','estabelecimento inexistente','Não há estabelecimento cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json(ret);
}

// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ret = await Estabelecimentos.recupereTodos();

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}