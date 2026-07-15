import express, { Request, Response } from "express";

const app = express();

app.use(express.json());


const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
})

app.get("/api/status", (req: Request, res: Response) => {
    res.status(200).json({
        status: "Online",
        mensagem: "Meu servidor está funcionando!"
    });
});

interface Tarefa {
    id: number;
    titulo: string;
    descricao?: string;
    concluida: boolean;
};

const tarefas: Tarefa[] = [
    {
        id: 1,
        titulo: "Estudar Express",
        descricao: "Aprender rotas GET",
        concluida: false
    }
];

app.get("/api/tarefas", (req: Request, res: Response) => {
    res.status(200).json(tarefas);
    
});

app.get("/api/tarefas/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const tarefa = tarefas.find(t => t.id === Number(id));
    if (!tarefa) {
    res.status(404).json({
        mensagem: "Tarefa não encontrada."
    });
    return;
}
res.status(200).json(tarefa);

});

app.post("/api/tarefas", (req: Request, res: Response)=>{
    const{titulo, descricao} = req.body;
    if (!titulo) {
    res.status(400).json({
        mensagem: "O título é obrigatório."
    });
    return;
}
})