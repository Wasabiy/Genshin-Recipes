import homePageMovieMp4 from '../assets/homepage.mp4';
import homePageMovieWebm from '../assets/homepage.webm';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigateRecipes = useNavigate();

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    navigateRecipes('/recipes');
  };

  return (
    <>
      <section id="WholePage">
        <video loop autoPlay muted>
          <source src={homePageMovieMp4} type="video/mp4" />
          <source src={homePageMovieWebm} type="video/webm" />
        </video>
        <section id="homeTitle">
          <h1 id="wanminTitle" onClick={handleClick}>
            Welcome to Wanmin Restaurant. Press on this text to see more............
          </h1>
        </section>
      </section>
    </>
  );
}
export default HomePage;
