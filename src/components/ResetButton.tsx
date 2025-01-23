
import '../style/components/RecipeCard.css';
import 'react-router-dom';
import { MouseEventHandler } from 'react';




function RecipeCard({ onClick }: {onClick: MouseEventHandler<HTMLButtonElement>}) {


  return (
    <>
      <button id={"resetButton"} onClick={onClick}>
          Reset filters!
      </button>

    </>
  );
}

export default RecipeCard;
