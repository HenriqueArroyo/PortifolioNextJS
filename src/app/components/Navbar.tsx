"use client";
// Ele permite a troca de página, sem precisar recarregar a página por completo
import Link from "next/link";
import styles from "../styles/Navbar.module.css"

export default function Navbar() {

    return(
       <main>
        <nav className={styles.navbar}>
      <h1 className={styles.logo}>Meu Portifólio</h1>
      <ul className={styles.links}>
        <li><Link href="/">Início</Link></li>
        <li><Link href="/todolist">To-Do-List</Link></li>
        <li><Link href="/filme">Filmes</Link></li>
        <li><Link href="/clima">Clima</Link></li>
      </ul>
    </nav>
        </main>
    )

}