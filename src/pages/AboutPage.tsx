
import '../style/pages/AboutPage.css';

function AboutPage() {
  return (
    <>
      <section id="allSectionsAbout">
        <h1 id="header1">About Wanmin Restaurant</h1>
          <section className="aboutBox" id="box1">
            <p>
              Welcome to Wanmin Restaurant, Traveler! This website is a catalogue for recipes in the game Genshin
              Impact.
            </p>
            <h3>Functionalities</h3>
            <p>
              Wanmin Restaurant offers an overview of all recipes under "Recipes" in the navbar. Each box containing a
              dish image will lead to their information page when clicked. Dishes can be favorited, and viewed later in
              "My Favorites". Our chosen API is set up so that the key of a response object (a dish) is appended to the
              URL to get the corresponding image. However, some of these keys do not correspond to their respective dish
              image URL, which causes some squares to not have their picture.
            </p>
            <p>
              In the overview page, dishes can be filtered based on ingredients, where recipes containing one or more of
              the selected filters will be displayed. The filtration is additive, so it is not exclusive. Dishes can also be filtered based on their types.
            </p>

            <p>
              Filter criterias are preserved after page refresh, and favorited dishes are preserved if browser is
              closed.
            </p>

            <p>Enjoy!</p>

            <a href="https://genshin.dev/" target="_blank"/>
              Genshin.Dev API
            <p> -xoxo, IT2810 group 30</p>
          </section>

      </section>
    </>
  );
}
export default AboutPage;
