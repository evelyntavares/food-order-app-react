import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";
import useHttp from "./hooks/useHttp.jsx";

const requestConfig = {};

export default function Meals() {
  const URL = "http://localhost:3000/meals";

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(URL, requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
