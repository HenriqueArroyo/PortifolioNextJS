import { NextResponse } from "next/server";
// Importa NextResponse, uma utilidade do Next.js para construir respostas HTTP
// (JSON, status codes, headers etc.) dentro de rotas do App Router.

import { db } from "@/lib/db";
// Importa o pool/cliente de conexão com o banco (definido em src/lib/db.ts).
// `db` é usado para executar queries SQL contra o MySQL.

//Listar filmes
export async function GET() {
    const [rows] = await db.query("SELECT * FROM filmes");
    return NextResponse.json(rows);
}

// Adicionar filme
export async function POST(req: Request) {
    const {id, titulo, nota, imagem} = await req.json();

    await db.query(
        "INSERT INTO filmes (id, titulo, nota, imagem) VALUES (?,?,?,?)",
        [id, titulo, nota, imagem]
    )

    return NextResponse.json({message: "Filme adicionado com sucesso!"});
}

//Remover FIlmes
export async function DELETE(req: Request) {
    const {id} = await req.json();
    await db.query("DELETE FROM filmes WHERE id = ?", [id]);
    return NextResponse.json({message: "Filme removido com sucesso!"});
}

//Editar Nota
export async function PUT(req: Request) {
    const {id, nota} = await req.json();
    await db.query("UPDATE filmes SET nota = ? WHERE id = ?", [nota, id]);
    return NextResponse.json({message: "Nota atualizada com sucesso!"})
}

