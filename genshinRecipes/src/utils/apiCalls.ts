export const fetchFood = async () => {
  const res = await fetch('https://genshin.jmp.blue/consumables/food/', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': 'https://genshin.jmp.blue/materials/cooking-ingredients/',
    },
  });
  return res.json();
};

export const fetchIngredient = async () => {
  const res = await fetch('https://genshin.jmp.blue/materials/cooking-ingredients/', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': 'https://genshin.jmp.blue/consumables/food/',
    },
  });
  return res.json();
};
