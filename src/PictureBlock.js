// PictureBlock.js

import React from "react";
import { Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PictureBlock = () => (
  <Upload
    beforeUpload={() => false}
    onChange={(info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`);
      }
    }}
  >
    <Button icon={<PlusOutlined />} className="uploadButton">
      Upload Picture
    </Button>
  </Upload>
);

export default PictureBlock;
