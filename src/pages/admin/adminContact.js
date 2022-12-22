import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { URL } from "../../App";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onfinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${URL}/api/portfolio/update-contact`, {
        ...values,
        _id: portfolioData.contacts._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        onFinish={onfinish}
        layout="vertical"
        initialValues={portfolioData.contacts}
      >
        <Form.Item name="name" label="Full name">
          <Input placeholder="Intro" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Input placeholder="Enter your Gender" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input placeholder="Enter your age" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Enter a email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <Input placeholder="Enter mobile" />
        </Form.Item>
        <Form.Item name="country" label="Description">
          <Input placeholder="Enter Description" />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminContact;
