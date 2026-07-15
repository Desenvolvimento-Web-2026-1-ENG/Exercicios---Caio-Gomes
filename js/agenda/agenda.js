class Agenda {
    constructor(){
        this.contatos = []
    }
    adicionarContato(nome, telefone){
        this.contatos.push({
            nome, 
            telefone});

    }

    listarContatos(){
        for (let i = 0; i<this.contatos.length; i++){
            this.contatos[i]
            console.log(this.contatos[i].nome)
            console.log(this.contatos[i].telefone)
        }
    }
    buscarContato(nome){
        for(let i = 0; i< this.contatos.length; i++){
            if (nome == this.contatos[i].nome){
                console.log(this.contatos[i].telefone);
            }
            else {
                console.log("Contato não encontrado");
            }
        }
    }
}

const minhaAgenda = new Agenda();


minhaAgenda.adicionarContato("Caio", "99999-9999");
minhaAgenda.adicionarContato("Maria", "88888-8888");

console.log(minhaAgenda);

minhaAgenda.listarContatos();

minhaAgenda.buscarContato("Caio");

