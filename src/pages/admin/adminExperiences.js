import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Form, Input, message, Button, Upload } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const Upload = require("rc-upload");

function AdminExperiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");
  const [file, setFile] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState("");

  const props = {
    name: "title",

    onChange({ file, fileList, fileUrl }) {
      setFileUrl(fileUrl);
    },
  };

  const onFinish = async (values) => {
    // console.log(values);
    const imageStorage = ref(storage, `images/${file}`);
    // console.log(imageStorage);
    uploadBytes(imageStorage, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl((prev) => [...prev, url]);
        // console.log(first)
      });
    });
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", values);
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
      const response = await axios.post("/api/portfolio/delete-experience", {
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
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 mb-4 text-fourth"
          onClick={() => {
            setType("add");
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-1 gap-2">
        {experiences.map((experience) => (
          <div className="shadow border p-5 flex flex-col justify-between">
            <h1 className="text-primary text-3xl font-bold">
              {experience.period}
            </h1>
            <hr />
            <h1>Company: {experience.company}</h1>
            <h1>Title: {experience.title}</h1>
            <h1>{experience.description}</h1>
            <div className="flex justify-end gap-2 mt-5 ">
              <button
                className="bg-tertiary text-fourth px-5 py-2"
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-fourth px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(true);
                  setSelectedItemForEdit(experience);
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
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
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
            initialValues={selectedItemForEdit}
          >
            <Form.Item name="period" label="Period">
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <Input placeholder="Company name" />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name="title">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperiences;
