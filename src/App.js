import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextBlock from "./TextBlock";
import PictureBlock from "./PictureBlock";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
  const [blocks, setBlocks] = useState([]);

  const handleAddBlock = (type) => {
    const newBlock = {
      id: new Date().getTime(),
      type,
      content: "",
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockContentChange = (id, content) => {
    if (content.length > 250) alert("Maximum 250 characters allowed.");

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedBlocks = Array.from(blocks);
    const [movedBlock] = updatedBlocks.splice(result.source.index, 1);
    updatedBlocks.splice(result.destination.index, 0, movedBlock);

    setBlocks(updatedBlocks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="addButton"
          onClick={() => handleAddBlock("text")}
        >
          Add Text Block
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="addButton"
          onClick={() => handleAddBlock("picture")}
        >
          Add Picture Block
        </Button>

        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable
                  key={block.id}
                  draggableId={block.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="blockContainer"
                    >
                      {block.type === "text" && (
                        <TextBlock
                          content={block.content}
                          onChange={(value) =>
                            handleBlockContentChange(block.id, value)
                          }
                        />
                      )}
                      {block.type === "picture" && <PictureBlock />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default App;
