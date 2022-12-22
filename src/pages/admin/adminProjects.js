import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, message, Button } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies?.split(", ") || [];
      values.technologies = tempTechnologies;
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
        setSelectedItemForEdit(null);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
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
      {/* button here */}
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 mb-4 text-fourth"
          onClick={() => {
            setType("add");
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Projects
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
        {projects.map((project) => (
          <div className="shadow border p-5 flex flex-col justify-between gap-5">
            <h1 className="text-primary text-3xl font-bold">{project.title}</h1>
            <hr />
            <img src={project.image} alt="" className="h-60 w-80" />
            <h1>{project.description}</h1>
            <h1>{project.link}</h1>
            <h1>Technology used: {project.technologies.join(", ")}</h1>
            <div className="flex justify-end gap-2 mt-5 ">
              <button
                className="bg-tertiary text-fourth px-5 py-2"
                onClick={() => {
                  onDelete(project);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-fourth px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Projects" : "Add Projects"}
          destroyOnClose={true}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
              }}
            >
              Cancel
            </Button>,
            <Button form="myForm" key="submit" htmlType="submit" type="primary">
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>,
          ]}
        >
          <Form
            id="myForm"
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies?.join(", "),
              } || {}
            }
          >
            <Form.Item name="title" label="Title">
              <Input placeholder="Enter Title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Whats the Description" />
            </Form.Item>
            <Form.Item name="image" label="Image link">
              <Input placeholder="Image link" defaultValue="img/3.svg" />
            </Form.Item>
            <Form.Item name="link" label="Project link">
              <Input placeholder="Whats the link of the project" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <Input placeholder="Technology used (Seperate by comma(,)" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
