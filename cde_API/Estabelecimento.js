class Estabelecimento 
{
    #nome
    #categoria
    #telefone
    #email
    #site
    #horario
    #cnpj
    #complemento
    #numero
    #cep
    #cardapio

    constructor (nome, categoria, telefone, email, site, horario, cnpj, complemento, numero, cep, cardapio)
    {
        this.nome  =nome;
        this.categoria = categoria; 
        this.telefone = telefone;
        this.email = email;
        this.site = site;
        this.horario = horario;
        this.cnpj = cnpj;
        this.complemento = complemento;
        this.numero = numero;
        this.cep = cep;
        this.cardapio = cardapio;
    }

    get nome ()
    {
        return this.#nome
    }

    get categoria()
    {
        return this.#categoria
    }

    get telefone()
    {
        return this.#telefone
    }

    
    get email()
    {
        return this.#email
    }

    
    get site()
    {
        return this.#site
    }

    
    get horario()
    {
        return this.#horario
    }

    
    get cnpj()
    {
        return this.#cnpj
    }

    
    get complemento()
    {
        return this.#complemento
    }


    get cep()
    {
        return this.#cep
    }

    
    get cardapio()
    {
        return this.#cardapio
    }

    
    get numero()
    {
        return this.#numero
    }
    
    set nome (nome)
    {
        if (nome===undefined || typeof nome !== 'string' || nome==="")
            throw ('Nome inválido');

        this.#nome = nome;
    }

     
    set categoria (categoria)
    {
        if (categoria === undefined || typeof categoria !== 'string' || categoria==="")
            throw ('Categoria inválida');

        this.#categoria = categoria;
    }
 
    set telefone (telefone)
    {
        if (telefone === undefined || typeof telefone !== 'string' ) // aprimorar
            throw ('Telefone inválido');

        this.#telefone = telefone;
    }

    set email (email)
    {
        if (email === undefined || typeof email !== 'string' ) // aprimorar
            throw ('Email inválido');

        this.#email = email;
    }

    set site (site)
    {
        if (site === undefined || typeof site !== 'string' ) // aprimorar
            throw ('Site inválido');

        this.#site = site;
    }

    set horario (horario)
    {
        if (horario === undefined || typeof horario !== 'string' ) // aprimorar
            throw ('Horário inválido');

        this.#horario = horario;
    }

    set cnpj (cnpj)
    {
        if (cnpj === undefined || typeof cnpj !== 'string' ) // aprimorar
            throw ('Cnpj inválido');

        this.#cnpj = cnpj;
    }

    
    set complemento (complemento)
    {
        if (complemento === undefined || typeof complemento !== 'string' ) 
            throw ('Complemento Inválido');

        this.#complemento = complemento;
    }

      
    set cep (cep)
    {
        if (cep === undefined || typeof cep !== 'string' ) // aprimorar 
            throw ('Cep Inválido');

        this.#cep = cep;
    }

    set cardapio (cardapio)
    {
        if (cardapio === undefined || typeof cardapio !== 'string' ) // aprimorar 
            throw ('Cardapio Inválido');

        this.#cardapio = cardapio;
    }

    set numero (numero)
    {
        if (numero === undefined || typeof numero !== 'number' ) // aprimorar 
            throw ('Numero Inválido');

        this.#numero = numero;
    }

}

function novo (nome, categoria, telefone, email, site, horario, cnpj, complemento, numero, cep, cardapio)
{
    return new Estabelecimento (nome, categoria, telefone, email, site, horario, cnpj, complemento, numero, cep, cardapio);
}

module.exports = {novo}
