import { Link } from "react-router-dom";

export const Back = () => {
  return (
    <div className="p-4">
      <Link to="/reportList">&lt; Back</Link>
    </div>
  );
};
