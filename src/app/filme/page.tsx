"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Filme.module.css";

interface Filme {
  id: string;
  titulo: string;
  nota: number;
  imagem: string;
}

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [novoTitulo, setTitulo] = useState("");
  const [novaNota, setNota] = useState<number | "">("");
  const [novaImagem, setImage] = useState("");

  useEffect(() => {
    fetch("/api/filmes")
      .then((res) => res.json())
      .then((data) => setFilmes(data));
  }, []);

  const addFilme = async () => {
    if (!novaImagem.trim() || !novoTitulo.trim()) return false;

    const novoFilme: Filme = {
      id: crypto.randomUUID(),
      titulo: novoTitulo,
      nota: Number(novaNota),
      imagem: novaImagem,
    };

    await fetch("/api/filmes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoFilme),
    });

    setFilmes([...filmes, novoFilme]);
    setTitulo("");
    setNota("");
    setImage("");
  };

  const removeFilme = async (id: string) => {
    await fetch("/api/filmes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setFilmes(filmes.filter((filme) => filme.id !== id));
  };

  const atualizarNota = async (id: string, novaNota: number) => {
    await fetch("/api/filmes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nota: novaNota }),
    });

    setFilmes((prevFilmes) =>
      prevFilmes.map((filme) =>
        filme.id === id ? { ...filme, nota: novaNota } : filme
      )
    );
  };

  return (
    <main className={styles.menu}>
      <h1 className="text-3xl font-bold mb-4">Lista de Filmes</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-64"
          value={novoTitulo}
          onChange={(e) => setTitulo(e.target.value)}
          // Atualiza o estado "newTask" conforme o usuário digita.
          placeholder="Digite o titulo do filme"
          // Texto de dica dentro do campo.
        />
        <input
          type="number"
          max={10}
          min={0}
          className="border p-2 rounded"
          value={novaNota}
          onChange={(e) =>
            setNota(e.target.value === "" ? "" : Number(e.target.value))
          }
          // Atualiza o estado "newTask" conforme o usuário digita.
          placeholder="Nota"
          // Texto de dica dentro do campo.
        />
        <input
          className="border p-2 rounded w-64"
          value={novaImagem}
          onChange={(e) => setImage(e.target.value)}
          // Atualiza o estado "newTask" conforme o usuário digita.
          placeholder="Digite o URL da imagem"
          // Texto de dica dentro do campo.
        />

        {novaImagem && (
          <img
            src={novaImagem}
            alt="Prévia do filme"
            className="rounded shadow w-[150px] h-[200px] object-cover"
          />
        )}

        <button
          className={styles.adicionar}
          onClick={addFilme}
          // Ao clicar, executa a função addTask() para adicionar a nova tarefa.
        >
          Adicionar
        </button>
      </div>

      <ul className="w-64">
        {filmes.map((filme) => (
          <li
            key={filme.id}
            className="bg-gray-100 p-4 rounded shadow flex flex-col items-center"
          >
            <img
              src={filme.imagem}
              alt="Prévia do filme"
              className="rounded shadow w-[150px] h-[200px] object-cover"
            />
            <h2 className="font-semibold">{filme.titulo}</h2>
     
         

            <select  className="border p1 rounded w-16 text-center"  value={Number(filme.nota)} onChange={(e) => atualizarNota(filme.id, Number(e.target.value))}  id="">
             {[...Array(11)].map((_, i) => (
                <option key={i} value={10 - i}>⭐ {10 - i}</option>
             ))}
            </select>

            <button
              className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition"
              onClick={() => removeFilme(filme.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
