import React, { useState } from 'react'

interface HandlerParams {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  rowId: number;
  colId: number;
}

interface CellProps {
  value: number;
  Key: string;
  rowId: number;
  colId: number;
  clickHandler: (params: HandlerParams) => void;
  isPlaceing: boolean;
  setIsPlaceing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cell = (props: CellProps): React.ReactElement<HTMLDivElement> => {
  const rowId = props.rowId;
  const colId = props.colId;

  return (
    <div
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => 
        props.clickHandler({event, rowId, colId})}
      onClick={() => props.setIsPlaceing(!props.isPlaceing)}

      className={`
        inline-block
        w-6
        border-t
        border-r
        border-black
        h-6
        ${props.value === 1 ? 'bg-red-500' : 
         (props.value === 2 ? 'bg-green-500' : 'bg-blue-500')}
      `}
      key={props.Key}
    ></div>
  );
}

const Arena = () => {
  const rowNum = 30, colNum = 37;

  const [grid, setGrid] = 
    useState<number[][]>(Array(rowNum)
      .fill(null)
      .map(() => Array(colNum).fill(0)));
  const [blockType, setBlockType] = useState<number>(1)
  const [isPlaceing, setIsPlaceing] = useState<boolean>(false);

  const changeCellState = (params: HandlerParams): void =>{
    if (isPlaceing) {
      const auxGrid = [...grid];
      auxGrid[params.rowId][params.colId] = blockType;
      setGrid(auxGrid);
    }
  };

  const clearBoard = () => {
    setGrid(Array(rowNum)
      .fill(null)
      .map(() => Array(colNum).fill(0)));

    setBlockType(1);
    setIsPlaceing(false);
  };


  return (
    <>
      <div className='board mx-3 mb-4 flex flex-wrap'>
        {grid.map((row: number[], rowId: number) => (
          <>
            {row.map((state: number, colId: number) => (
              <Cell
                value={state}
                Key={`${rowId}${colId}`}
                rowId={rowId}
                colId={colId}
                clickHandler={changeCellState}
                setIsPlaceing={setIsPlaceing}
                isPlaceing={isPlaceing}
              />
            ))}
          </>
        ))}
      </div>

      <div className='controls'>
        <button
          className="bg-red-500"
          onClick={clearBoard}
        >
          Clear
        </button>

        <button
          className="bg-green-500"
          onClick={() => setBlockType(2)}
        >
          Finish
        </button>

      </div>
      <h1>Current block type: {blockType}</h1>
      <h1>Placeing: {isPlaceing === true ? 1 : 0}</h1>
    </>
  )
}

export default Arena
