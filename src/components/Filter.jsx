import useRecipeStore from "../store/useRecipeStore";

const Filters = () => {
  const { categories, areas, selectedCategory, selectedArea, setSelectedCategory, setSelectedArea } =
    useRecipeStore();

  return (
    <div className="flex gap-4">
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.idCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>

      {/* Cuisine Filter */}
      <select
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Cuisines</option>
        {areas.map((area, index) => (
          <option key={index} value={area.strArea}>
            {area.strArea}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
