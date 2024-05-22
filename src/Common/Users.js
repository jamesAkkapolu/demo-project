import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  notification,
  Button,
  Popconfirm,
  Popover,
  Form,
  Col,
  Row,
  Input,
  Modal,
  Table,
  Card,
} from "antd";
import { DashOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
export default function Users() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    education: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await Axios.get("/getList");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (values) => {
    try {
      Axios.post("/create", values);
      handleOk();
      getData();
      setLoading(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/deleteDept/${id}`);
      notification["success"]({
        placement: "top",
        duration: 1,
        message: "Record Deleted Successfully!",
      });
      setLoading(true);
      getData();
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id, record) => {
        const content = (
          <>
            <div>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => handleDelete(_id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
            <br />
            <div>
              <Link to={{ pathname: "/user_details/" + _id }}>
                <Button style={{ width: "100%" }}>View</Button>
              </Link>
            </div>
          </>
        );
        return (
          <div>
            <Popover content={content}>
              <Button>
                <DashOutlined />
              </Button>
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row justify={"end"} style={{ marginTop: "20px" }}>
        <Col span={22}>
          <Card style={{ width: "200px" }}>
            <span>
              TOTAL USERS{" "}
              <span style={{ fontWeight: "bold" }}>({data.length})</span>
            </span>
          </Card>
        </Col>
        <Col span={2}>
          <Button
            onClick={showModal}
            style={{
              fontWeight: "bold",
              backgroundColor: "#632778",
              color: "#fff",
              height: "40px",
            }}
          >
            ADD RECORD
          </Button>
        </Col>
      </Row>
      <Loading enableLoading={loading} />
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "20px" }}
      />

      <Modal
        title="Add User"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                First Name
              </span>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstName!",
                  },
                ]}
              >
                <Input
                  value={formData.name}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your firstName"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Last Name
              </span>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastName!",
                  },
                ]}
              >
                <Input
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your lastName"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Email
              </span>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your Email"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Phone
              </span>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!",
                  },
                ]}
              >
                <Input
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your Phone"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Address
              </span>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input
                  value={formData.address}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your address"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Education
              </span>
              <Form.Item
                name="education"
                rules={[
                  {
                    required: true,
                    message: "Please input your education!",
                  },
                ]}
              >
                <Input
                  value={formData.education}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your education"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                Country
              </span>
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please input your country!",
                  },
                ]}
              >
                <Input
                  value={formData.country}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your country"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                State
              </span>
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Please input your state!",
                  },
                ]}
              >
                <Input
                  value={formData.state}
                  onChange={handleChange}
                  style={{ height: "40px" }}
                  placeholder="Please Enter Your state"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={[10, 10]}>
            <Col>
              <Button
                onClick={handleCancel}
                style={{
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                htmlType="submit"
                style={{
                  backgroundColor: "#632778",
                  color: "#fff",
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
