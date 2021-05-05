import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>With or without Curry?</h1>
      <p>
        The bar chart displays points scored by Golden State Warriors in
        team&apos;s <span className="win">wins</span> and{' '}
        <span className="loss">losses</span> during the 2019 NBA playoffs. The
        histogram shows the number of games in which Stephen Curry&#39;s
        performance was within each point range. Select any point interval in
        the histogram to filter the data displayed by the bar chart.
      </p>
    </header>
  );
};

export default Header;
