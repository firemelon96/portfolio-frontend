import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { URL } from "../../App";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onfinish = async (values) => {
    try {
      const tempSkills = values.skills.split(", ");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post(`${URL}/api/portfolio/update-about`, {
        ...values,
        _id: portfolioData.about._id,
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
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(", "),
        }}
      >
        <Form.Item name="image" label="Image link">
          <Input placeholder="Image link" />
        </Form.Item>
        <Form.Item name="description1" label="Short Description">
          <Input.TextArea placeholder="Enter short description" />
        </Form.Item>
        <Form.Item name="description2" label="Full Description">
          <Input.TextArea placeholder="Enter full description" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <Input placeholder="Enter your skills (Seperated by comma)" />
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

export default AdminAbout;
