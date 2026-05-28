import {useState} from "react"

export default function PokemonCard(){
    const [pokemonCards, setPokemonCards] = useState([]);
    const[inputName, setInputName] = useState("");
    const[loading, setLoading] = useState(false);
    const[error, setError] =useState("");

    const handleSearch = async(e) => {
          if (e && e.preventDefault) e.preventDefault();
        if(!inputName.trim ()) return;

        setLoading(true);
        setError("");

    try{
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputName.toLowerCase().trim()}`);
      

         if(!res.ok){
            throw new Error ("pokemon not found");
         }
        const data = await res.json();
        console.log(data);

// ADD THIS TYPE FILTER BLOCK HERE
          const allowedTypes = ["grass", "fire", "water"];
      const hasAllowedType = data.types.some(item => allowedTypes.includes(item.type.name));

      if (!hasAllowedType) {
        throw new Error("Only grass, fire, or water types are allowed!");
      }

        setPokemonCards( prev => {
            if(prev.some (p => p.id ===data.id )) return prev;
            return[...prev, data];
        });

        
        setInputName("");

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    
    };

        return(
        <div>
            <h1>Pokemon Card</h1>
            <input 
            type="text"
            placeholder="type here(bulbasaur,charizard,squirtle,wartortle).." 
            value={inputName}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onChange={(e) => setInputName(e.target.value)} style={{padding: "20px", width: "400px"}}/>

            {loading && <p style={{color: "green"}}>loading ....</p>}
            {error && <p style={{ color: "red"}}>{error}</p>}

          {/* Grid container to hold your cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {pokemonCards.map((p) => {
          // Extract primary and secondary types
          const pokemonTypes = p.types.map(item => item.type.name).join(", ");
          
          // Safely extract stats (HP is usually at index 0, Attack is index 1)
          const hp = p.stats[0]?.base_stat || 0;
          const attack = p.stats[1]?.base_stat || 0;

          return (
            /* Visual Trading Card Layout */
            <div 
              key={p.id} 
              style={{
                border: "4px solid #f1c40f",
                borderRadius: "10px",
                width: "200px",
                padding: "15px",
                background: "#fdfefe",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
                textAlign: "center"
              }}
            >
              {/* Card Header (Name and HP) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px" }}>
                <span style={{ fontWeight: "bold" }}>{p.name.toUpperCase()}</span>
                <span style={{ color: "red", fontWeight: "bold" }}>{hp} HP</span>
              </div>

              {/* Card Image Area */}
              <div style={{ background: "#f2f4f4", borderRadius: "5px", margin: "10px 0", padding: "10px" }}>
                <img 
                  src={p.sprites.front_default} 
                  alt={p.name} 
                  style={{ width: "96px", height: "96px" }}
                />
              </div>

              {/* Card Footer (Type and Attack Info) */}
              <div style={{ fontSize: "12px", textAlign: "left" }}>
                <p style={{color: "green", fontSize:"15px"}}><strong>Type:</strong> {pokemonTypes}</p>
                <p style={{color:"purple", fontSize: "15px"}}><strong>Attack:</strong> {attack}</p>
                <p style={{ color: "blue", fontSize: "15px" }}>ID: #{p.id}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
