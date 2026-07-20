import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
});

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
}

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

app.post("/api/tarefas", (req: Request, res: Response) => {
    const { titulo, descricao } = req.body;

    if (!titulo) {
        res.status(400).json({
            mensagem: "O título é obrigatório."
        });
        return;
    }

    const novaTarefa: Tarefa = {
        id: tarefas.length + 1,
        titulo,
        descricao,
        concluida: false
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});

// ====================== PUT ======================

app.put("/api/tarefas/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const { titulo, descricao, concluida } = req.body;

    const tarefaExistente = tarefas.find(t => t.id === id);

    if (!tarefaExistente) {
        res.status(404).json({
            mensagem: "Tarefa não encontrada."
        });
        return;
    }

    let novoTitulo = tarefaExistente.titulo;
    let novaDescricao = tarefaExistente.descricao;
    let novaConcluida = tarefaExistente.concluida;

    if (titulo !== undefined) {
        novoTitulo = titulo;
    }

    if (descricao !== undefined) {
        novaDescricao = descricao;
    }

    if (concluida !== undefined) {
        novaConcluida = concluida;
    }

    const tarefaAtualizada: Tarefa = {
        id: tarefaExistente.id,
        titulo: novoTitulo,
        descricao: novaDescricao,
        concluida: novaConcluida
    };

    const indice = tarefas.findIndex(t => t.id === id);

    tarefas[indice] = tarefaAtualizada;

    res.status(200).json(tarefaAtualizada);
});

app.delete("/api/tarefas/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        res.status(404).json({
            mensagem: "Tarefa não encontrada."
        });
        return;
    }

    const indice = tarefas.findIndex(t => t.id === id);

    tarefas.splice(indice, 1);

    res.status(200).json({
        mensagem: "Tarefa removida com sucesso."
    });

});