export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <img
          src="https://momentum-clone-jason.netlify.app/images/news-icon.png"
          alt="Visa"
          className="h-6 mr-4"
        />
        <h1 className="font-bold">Spend Clarity | Enterprise</h1>
      </div>
      <div className="items-center">
        <img
          src="https://momentum-clone-jason.netlify.app/images/news-icon.png"
          alt="Bank"
          className="h-6"
        />
      </div>
    </header>
  );
};
