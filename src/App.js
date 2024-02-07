import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextBlock from "./TextBlock";
import PictureBlock from "./PictureBlock";
import "./App.css";

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

  return (
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

      {blocks.map((block) => (
        <div key={block.id} className="blockContainer">
          {block.type === "text" && (
            <TextBlock
              content={block.content}
              onChange={(value) => handleBlockContentChange(block.id, value)}
            />
          )}
          {block.type === "picture" && <PictureBlock />}
        </div>
      ))}
    </div>
  );
};

export default App;
