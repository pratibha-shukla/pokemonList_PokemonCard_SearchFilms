import React, { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

const containerStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "20px",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "sans-serif",
};

const baseCardStyle = {
  border: "4px solid #f1c40f",
  borderRadius: "12px",
  width: "180px",
  padding: "15px",
  textAlign: "center" as const,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
};

const typeColors: Record<string, string> = {
  grass: "linear-gradient(135deg, #a8e6cf, #dcedc1)",
  fire: "linear-gradient(135deg, #ff8b94, #ffaaa5)",
  water: "linear-gradient(135deg, #a8d8ea, #aa96da)",
};

export default function App() {
  const [list, setList] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        // Correct endpoint to get a list of Pokemon
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await res.json();

        const allDetails: Pokemon[] = await Promise.all(
          data.results.map(async (item: { name: string }) => {
            // Correct URL for detailed info
            const detailRes = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${item.name}`
            );
            return await detailRes.json();
          })
        );

        const targetTypes: string[] = ["grass", "fire", "water"];
        const filtered = allDetails.filter(
          (p) =>
            p.types && p.types.some((t) => targetTypes.includes(t.type.name))
        );

        setList(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    getData();
  }, []);

  return (
    <div style={containerStyle}>
      {list.map((p) => {
        const primaryType = p.types?.[0]?.type.name || "unknown";
        const background = typeColors[primaryType] || "#fff";

        return (
          <div key={p.id} style={{ ...baseCardStyle, background }}>
            <img
              src={p.sprites.front_default}
              alt={p.name}
              style={{ width: "96px", height: "96px" }}
            />
            <h3 style={{ margin: "10px 0 5px 0", fontSize: "16px" }}>
              {p.name.toUpperCase()}
            </h3>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: "bold" }}>
              {p.types.map((t) => t.type.name).join(", ")}
            </p>
          </div>
        );
      })}
    </div>
  )
}
