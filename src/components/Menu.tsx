export const Menu = () => {
  return (
    <div className="flex justify-between bg-gray-100">
      <aside className="p-4">
        <ul className="flex space-x-8">
          <li>Home</li>
          <li>Administration</li>
          <li>Search</li>
          <li>Reports</li>
        </ul>
      </aside>
      <div className="flex items-center pr-4">Andrew</div>
    </div>
  );
};
