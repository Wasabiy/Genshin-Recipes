import { http } from 'msw';
import { KeyFood, Type } from '../../models/interface';

export const apiHandlers = [
    http.get<any, KeyFood | null>('https://genshin.jmp.blue/consumables/food', (req: any, res: any, ctx: any) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: [
              {
                key: "sweet-madame",
                name: "Sweet Madame",
                rarity: 2,
                type: Type.RecoveryDish,
                effect: "Restores 20~24% of Max HP and an additional 900~1,500 HP to the selected character.",
                hasRecipe: true,
                description: "Honey-roasted fowl. The honey and sweet flowers come together to compliment the tender fowl meat.",
                proficiency: 10,
                recipe: [],
              }
            ]
          })
        );
      }),
]