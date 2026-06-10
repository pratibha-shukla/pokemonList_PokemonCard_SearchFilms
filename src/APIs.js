// APIs.js

// Mock function that mimics a real backend network request
export const fetchProducts = () => {
  return new Promise((resolve) => {
    // Simulate a brief 300ms network delay
    setTimeout(() => {
      resolve({
        products: [
          { id: 1, title: "Bulbasaur Card", category: "Grass" },
          { id: 2, title: "Ivysaur Card", category: "Grass" },
          { id: 3, title: "Charmander Card", category: "Fire" },
          { id: 4, title: "Charizard Card", category: "Fire" },
          { id: 5, title: "Squirtle Card", category: "Water" },
          { id: 6, title: "Blastoise Card", category: "Water" },
          { id: 7, title: "Pikachu Card", category: "Electric" },
          { id: 8, title: "Raichu Card", category: "Electric" },
          { id: 9, title: "Eevee Card", category: "Normal" },
        ]
      });
    }, 300);
  });
};
