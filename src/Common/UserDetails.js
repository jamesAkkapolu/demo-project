import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Avatar,
  Space,
  Modal,
  notification,
} from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
export default function UserDetails() {
  const [userData, setUserData] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (id) {
        await getData(id);
      }
    };

    fetchData();
  }, [id]);

  const getData = async (id) => {
    try {
      const response = await Axios.get(`/getDetail/${id}`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const userUpdate = (value) => {
    setLoading(true);
    const data = {
      firstName: value.firstName,
      lastName: value.lastName,
      phone: value.phone,
      email: value.email,
      address: value.address,
      education: value.education,
      country: value.country,
      state: value.state,
    };

    try {
      Axios.put(`/editDept/${userData._id}`, data);
      notification["success"]({
        placement: "top",
        duration: 1,
        message: "Record Updated Successfully!",
      });
      setModal(false);
      getData();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Loading enableLoading={loading} />
      <Card style={{ borderRadius: "0px" }}>
        <span style={{ fontWeight: "bold", fontSize: "22px" }}>
          <LeftOutlined onClick={() => window.history.go(-1)} />
          {userData.firstName + " " + userData.lastName} Details
        </span>
      </Card>
      <Row justify={"center"}>
        <Col span={22}>
          <Card style={{ marginTop: "100px" }}>
            <Row>
              <Col span={8}>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "295px",
                  }}
                >
                  <Space direction="vertical" size={16} square>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <span style={{ marginLeft: "10px", fontWeight: "bold" ,textTransform:"capitalize"}}>
                      {userData.firstName + " " + userData.lastName}
                    </span>
                    <span style={{ marginLeft: "-20px" }}>
                      {userData.email}
                    </span>
                  </Space>
                </Card>
              </Col>
              <Col span={16}>
                <Card>
                  <Row justify="end">
                    <Button
                      onClick={() => setModal(true)}
                      style={{ backgroundColor: "#632778", color: "#fff" }}
                    >
                      Edit
                    </Button>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col span={8}>
                      <span>First Name</span>
                      <br />
                      <b>{userData.firstName}</b>
                    </Col>
                    <Col span={8}>
                      <span>last Name</span>
                      <br />
                      <b>{userData.lastName}</b>
                    </Col>
                    <Col span={8}>
                      <span>Email</span>
                      <br />
                      <b>{userData.email}</b>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "30px" }}>
                    <Col span={8}>
                      <span>Phone</span>
                      <br />
                      <b>{userData.phone}</b>
                    </Col>
                    <Col span={8}>
                      <span>Address</span>
                      <br />
                      <b>{userData.address}</b>
                    </Col>
                    <Col span={8}>
                      <span>Country</span>
                      <br />
                      <b>{userData.country}</b>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "30px" }}>
                    <Col span={8}>
                      <span>State</span>
                      <br />
                      <b>{userData.state}</b>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Modal
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={false}
      >
        <Form onFinish={userUpdate}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <span>First Name</span>
              <Form.Item name="firstName" initialValue={userData.firstName}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>First Name</span>
              <Form.Item initialValue={userData.lastName} name="lastName">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <span>Phone Number</span>
            <Form.Item initialValue={userData.phone} name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <span>Address</span>
            <Form.Item initialValue={userData.address} name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <span>Email</span>
            <Form.Item initialValue={userData.email} name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <span>Education</span>
            <Form.Item initialValue={userData.education} name="education">
              <Input />
            </Form.Item>
          </Col>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <span>Country</span>
              <Form.Item initialValue={userData.country} name="country">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>State</span>
              <Form.Item initialValue={userData.state} name="state">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"} gutter={[20, 20]}>
            <Button
              style={{
                backgroundColor: "#632778",
                color: "#fff",
                height: "40px",
              }}
              onClick={() => setModal(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: "#632778",
                color: "#fff",
                height: "40px",
              }}
              htmlType="submit"
            >
              Save Profile
            </Button>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
