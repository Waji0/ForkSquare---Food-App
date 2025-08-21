import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button";

export type FilterOptionsState = {
  id: string;
  label: string;
};


// If item is already in Applied filter[] that means its checked
const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  { id: "biryani", label: "Biryani" },
  { id: "bbq", label: "BBQ" },
  { id: "karahi", label: "Karahi" },
  { id: "handi", label: "Handi" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };


  return (
    <div className="md:w-72">

      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={"link"} onClick={resetAppliedFilter}>
          Reset
        </Button>
        {/* <Button variant={"link"}>Reset</Button> */}
      </div>

      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={option.id}
              checked={appliedFilter.includes(option.label)}
              onChange={() => appliedFilterHandler(option.label)}
              className="h-5 w-5 accent-blue-600"
            />
            <span>{option.label}</span>
          </label>
        </div>
      ))}
      
    </div>
  );
};

export default FilterPage;