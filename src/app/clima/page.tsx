"use client";

import { useState } from "react";

export default function Clima() {
    const [cidade, setCidade] = useState("");
    const [clima, setClima] = useState<any>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    async function buscarClima() {
        try {
            setCarregando(true);
            setErro(null);
            setClima(null);

            // Buscar latitude e longitude da cidade
            const geoResp = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
            );
            const geoData = await geoResp.json();

            if (!geoData.results || geoData.results.length === 0) {
                setErro("Cidade não encontrada.");
                return;
            }

            const {latitude, longitude, name, country} = geoData.results[0];

            const climaResp = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=America/Sao_Paulo`
                );
            const climaData = await climaResp.json();

            const temperatura = climaData.current.temperature_2m;
            const codigo = climaData.current.weather_code;

            setClima({
                cidade: name,
                pais: country,
                temperatura,
                descricao: traduzirClima(codigo)
            })
        } catch (error) {
            console.log(error);
            setErro("Erro ao buscar o clima. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

            function traduzirClima(codigo: number) {
                const condicoes: Record<number, string> = {
                    0: "Céu limpo ☀️",
                    1: "Principalmente limpo 🌤️",
                    2: "Parcialmente nublado ⛅",
                    3: "Nublado ☁️",
                    45: "Nevoeiro 🌫️",
                    48: "Nevoeiro com geada ❄️",
                    51: "Chuvisco leve 🌦️",
                    61: "Chuva leve 🌧️",
                    63: "Chuva moderada 🌧️",
                    65: "Chuva forte 🌧️",
                    71: "Neve leve ❄️",
                    80: "Pancadas isoladas 🌦️",
                };
                return condicoes[codigo] || "Condição desconhecida";
            }

            return (
                <div className="flex flex-col items-center min-h-screen p-6 ">
                  <h1 className="text-2xl font-bold mb-4  text-black-700">
                    Consulta de Clima
                  </h1>
            
                  <div className="flex gap-2 mb-6">
                    <input
                      type="text"
                      placeholder="Digite o nome da cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="border rounded px-3 py-2 w-64"
                    />
                    <button
                      onClick={buscarClima}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      disabled={carregando}
                    >
                      {carregando ? "Buscando..." : "Buscar"}
                    </button>
                  </div>
            
                  {erro && <p className="text-red-500">{erro}</p>}
            
                  {clima && (
                    <div className="bg-white rounded-lg shadow p-6 w-72 text-center">
                      <h2 className="text-lg font-semibold mb-2">
                        {clima.cidade}, {clima.pais}
                      </h2>
                      <p className="text-4xl font-bold mb-2">
                        {clima.temperatura}°C
                      </p>
                      <p className="text-gray-600">{clima.descricao}</p>
                    </div>
                  )}
                </div>
              );
            }

