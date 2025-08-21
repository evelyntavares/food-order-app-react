import MealItem from "./MealItem.jsx";
import useHttp from "./hooks/useHttp.jsx";

export default function Meals() {
  const URL = "http://localhost:3000/meals";

  const requestConfig = {};

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(URL, requestConfig, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
