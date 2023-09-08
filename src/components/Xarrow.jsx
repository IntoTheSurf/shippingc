import React, { useState } from 'react';
import Xarrow from 'react-xarrows';

//{props: {line, setSelected, selected}}
export default ({setSelected, selected, index, line: { props }, lineProps }) => {
  // console.log(sss)
  const selectedLine = lineProps.lineCustomization[index];
  const labelText = selectedLine.label;
  const lineStyle = selectedLine.style;
  const lineColor = selectedLine.color;
  const lineWidth = selectedLine.width;


  const arrowProps = {
    // this is the important part of the example! play with the props to understand better the API options
    curveness: Number(0),
    lineColor: lineColor,
    dashness: lineStyle != "solid",
    strokeWidth: Number(lineWidth)+2,
    showHead: false,
    labels: {
      middle: (
        <div
          style={{
            fontSize: '1.3em',
            fontStyle: 'bold',
            textShadow: '2px 0px 0px white',
          }}>
          {labelText}
        </div>
      ),
    },
  };
  const [state, setState] = useState({ color: 'coral' });
  const defProps = {
    passProps: {
      className: 'xarrow',
      onMouseEnter: () => setState({ color: 'IndianRed' }),
      onMouseLeave: () => setState({ color: 'coral' }),
      onClick: (e) => {
        e.stopPropagation(); //so only the click event on the box will fire on not on the container itself
        setSelected({
          id: { start: props.start, end: props.end },
          type: 'arrow',
        });
        lineProps.setEditMenu({type:'line', index: index});
        console.log(lineProps.editMenu);
      },
      cursor: 'pointer',
    },
  };
  let color = state.color;
  if (selected && selected.type === 'arrow' && selected.id.start === props.start && selected.id.end === props.end)
    color = 'red';
  return <Xarrow {...{ ...defProps, ...props, ...state, ...arrowProps }} />;
};
