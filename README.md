# With or without Curry? - Playoffs

The visualization comprises a bar chart and a histogram, and was
implemented with [React](https://reactjs.org/) and [D3](https://d3js.org/). React renders the visualization 
components, whereas D3 handles data and axis calculations.

The bar chart depicts points scored in each Golden State Warriors
game of the 2019 NBA playoffs. Hovering over a bar causes a tooltip 
containing additional game information to be displayed. The histogram 
shows the number of games in which Stephen Curry's performance was within
each point interval. Selecting a point range in the histogram makes the
bar chart display games in which the number of points made by Curry fell
within said range.

Amelia Wattenberger's [hook](https://wattenberger.com/blog/react-and-d3) was used to make charts responsive, whereas [Peter Beshai](https://twitter.com/pbesh)'s code, which relies on [react-popper](https://github.com/popperjs/react-popper), was employed to prevent tooltips from being clipped.
Susie Lu's [react-annotation](https://react-annotation.susielu.com/) was used to render annotations.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Getting started

* Clone or download the repository 

* Navigate to the project directory: ```cd with-or-without-curry-playoffs```

* Install dependencies: ```npm install```

* Run the app in development mode: ```npm start```

Please refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for further information.

## Data source

[Basketball Reference](https://www.basketball-reference.com/players/c/curryst01/gamelog-playoffs/)
