import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-orange-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Meal Finder</Link>
        <Link to="/" className="text-white px-4 py-2 rounded bg-orange-700 hover:bg-orange-600">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
