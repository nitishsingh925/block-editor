import React, { useState } from "react";
import { Upload, Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PictureBlock = () => {
  const [preview, setPreview] = useState({
    open: false,
    image: "",
    title: "",
  });
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Upload
        beforeUpload={() => false}
        listType="picture-card"
        fileList={fileList}
        onPreview={async (file) => {
          if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }

          setPreview({
            open: true,
            image: file.url || file.preview,
            title:
              file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
          });
        }}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
      >
        {fileList.length >= 8 ? null : (
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={preview.open}
        title={preview.title}
        footer={null}
        onCancel={() => setPreview({ open: false, image: "", title: "" })}
      >
        <img alt="example" style={{ width: "100%" }} src={preview.image} />
      </Modal>
    </>
  );
};

export default PictureBlock;
