import React from "react";
import { Input } from "antd";

const TextBlock = ({ content, onChange }) => (
  <Input.TextArea
    value={content}
    onChange={(e) => onChange(e.target.value)}
    className="textArea"
    placeholder="Enter some text...      Maximum 250 characters allowed."
  />
);

export default TextBlock;
