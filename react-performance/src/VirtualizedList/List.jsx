import React from "react";
import items from "./mock.json";
import Row from "./Row";
import { FixedSizeList } from "react-window";

const RowComponent = ({ index, style }) => (
  <Row image={items[index]} number={index} style={style} />
);

const List = () => {
  return (
    <FixedSizeList
      height={500}
      width={500}
      itemSize={150}
      itemCount={items.length}
    >
      {RowComponent}
    </FixedSizeList>
  );
};

export default List;
