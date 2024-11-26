import React from "react";
import { Modal, Button } from "antd";

const Profilepage = ({ open, handleOk, handleCancel }) => {
  return (
    <Modal
      open={open}
      title="Delete visitor"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          onClick={handleOk}
          className="bg-red-600"
        >
          Delete
        </Button>,
      ]}
    >
      <p>You are about to delete the visitor, are you sure?</p>
    </Modal>
  );
};

export default Profilepage;
