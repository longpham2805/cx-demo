import React from "react";
import house from "./images/house.jpeg";
import roof_red from "./images/roof-red.png";
import roof_blue from "./images/roof-blue.png";
import roof_highlight from "./images/roof-highlight.png";
import wall_white from "./images/wall-white.png";
import wall_blue from "./images/wall-blue.png";
import wall_highlight from "./images/wall-highlight.png";

import "./styles.css";

const elementsData = [
  {
    id: "roof",
    name: "Mái nhà",
    highlight: roof_highlight,
    options: [
      {
        id: '1',
        name: "Ngói đỏ",
        image: roof_red,
      },
      {
        id: '2',
        name: "Ngói xanh",
        image: roof_blue,
      },
    ],
  },
  {
    id: "wall",
    name: "Tường",
    highlight: wall_highlight,
    options: [
      {
        id: '1',
        name: "Trắng",
        image: wall_white,
      },
      {
        id: '2',
        name: "Xanh",
        image: wall_blue,
      },
    ],
  },
];

const Settings = ({ onChange, onHover }) => {
  return (
    <div className="settings">
      {elementsData.map(({ id, name, options }) => (
        <div
          key={id}
          className="element"
          onMouseEnter={() => onHover(id)}
          onMouseLeave={() => onHover()}
        >
          <div>{name}</div>
          <select onChange={(e) => onChange(id, e.target.value)}>
            {options.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      ))}
    </div>
  );
};

const Preview = ({ slices }) => {
  return (
    <div className="preview">
      {slices.map(({ id, img }) => {
        return <img key={id} alt="demo" src={img} />;
      })}
    </div>
  );
};

const ImgList = () => {
  return <div className="assets">
    <h3>Assets:</h3>
    <div>
      <img alt='house' src={house} />
    </div>
    <div>
      <img alt='house' src={roof_red} />
      <img alt='house' src={roof_blue} />
      <img alt='house' src={roof_highlight} />
    </div>
    <div>
      <img alt='house' src={wall_white} />
      <img alt='house' src={wall_blue} />
      <img alt='house' src={wall_highlight} />
    </div>
  </div>
};

function App() {
  const [elements, setElements] = React.useState({});
  const [highlight, setHighlight] = React.useState(null);
  const onChange = React.useCallback((elementId, optionId) => {
    setElements((current) => ({
      ...current,
      [elementId]: optionId,
    }));
  }, []);
  const onHover = React.useCallback((elementId) => {
    setHighlight(elementId);
  }, []);
  const slices = React.useMemo(() => {
    let slices = [{ id: "house", img: house }];
    elementsData.forEach((element) => {
      const option =
        element.options.find(({ id }) => elements[element.id] === id) ??
        element.options[0];
      if (option) {
        slices = [
          { id: `${element.id}-${option.id}`, img: option.image },
          ...slices,
        ];
      }
    });
    if (highlight) {
      const highlightElement = elementsData.find(({ id }) => id === highlight);
      slices = [{ id: `highlight-${highlightElement.id}`, img: highlightElement.highlight }, ...slices];
    }
    return slices.reverse();
  }, [elements, highlight]);
  return (
    <>
      <div className="app">
        <Settings onChange={onChange} onHover={onHover} />
        <Preview slices={slices} />
      </div>
      <ImgList />
    </>
  );
}

export default App;
