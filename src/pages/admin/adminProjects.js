import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, message, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { URL } from "../../App";

function AdminProjects() {
  // const [uploadImage, setUploadImage] = React.useState(null);
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  // const [file, setFile] = React.useState(null);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  // const handleChange = (info) => {
  //   const file = info.file.originFileObj;
  //   console.log(file);
  //   setFile({ file });
  // };

  // const getFile = (e) => {
  //   console.log("Upload event:", e);

  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   //get the first object in the array
  //   return e && e.fileList[0];
  // };
  // const handleImageChange = (e) => {
  //   const { name, value } = e.target.files[0];
  //   setUploadImage({ [name]: value });
  // };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // const handleUpload = (e) => {
  //   setUploadImage(e.target.fileList[0]);
  // };
  // const props = {
  //   multiple: false,
  //   name: "file",
  //   customRequest: dummyRequest,

  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  const onFinish = async (values) => {
    // console.log(values.image.file.originFileObj);
    // // console.log(values.image);
    const formData = new FormData();
    // formData.append("_id", selectedItemForEdit._id);
    formData.append("title", values.title);
    formData.append("image", values.image[0].file);
    formData.append("link", values.link);
    formData.append("technologies", values.technologies);
    formData.append("description", values.description);
    // formData.append("image", values.image);
    console.log(...formData);
    try {
      const tempTechnologies = values.technologies?.split(", ") || [];
      values.technologies = tempTechnologies;
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios
          .post(
            `${URL}/api/portfolio/update-project`,
            {
              ...formData,
              _id: selectedItemForEdit._id,
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            console.log(response);
          });
      } else {
        response = await axios
          .post(`${URL}/api/portfolio/add-project`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(res);
          });
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
      const response = await axios.post(`${URL}/api/portfolio/delete-project`, {
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
        {projects.map((project, index) => (
          <div
            key={index}
            className="shadow border p-5 flex flex-col justify-between gap-5"
          >
            <h1 className="text-primary text-3xl font-bold">{project.title}</h1>
            <hr />
            <img src={project.image.filePath} alt="" className="h-60 w-80" />
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
            <Button
              form="myForm"
              key="submit"
              htmlType="submit"
              type="primary"
              // onClick={onFinish}
            >
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>,
          ]}
        >
          <Form
            id="myForm"
            layout="vertical"
            onFinish={onFinish}
            // encType="multipart/form-data"
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
            {/* <Form.Item name="image" label="Image link">
              <Input placeholder="Image link" defaultValue="img/3.svg" />
            </Form.Item> */}
            <Form.Item name="link" label="Project link">
              <Input placeholder="Whats the link of the project" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <Input placeholder="Technology used (Seperate by comma(,)" />
            </Form.Item>
            <Form.Item name="image">
              {/* <input type="file" name="image" onChange={handleImageChange} /> */}
              <Upload
                action="/update-project"
                accept="image/*"
                maxCount={1}
                // showUploadList={false}
                // onChange={handleChange}
                customRequest={dummyRequest}
                // onChange={uploadImage}
                // beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            {selectedItemForEdit ? (
              <img
                src={selectedItemForEdit.image.filePath}
                alt={selectedItemForEdit.image.fileName}
              />
            ) : (
              <h3>No image</h3>
            )}
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
