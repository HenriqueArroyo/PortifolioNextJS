import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // sua senha do MySQL
  database: "teste_typescript", // nome do seu banco
});
