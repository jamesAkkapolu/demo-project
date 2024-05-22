import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";

const { Content, Sider } = Layout;

export default function Application() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "#fff" }}>
        <Menu>
          <Menu.Item icon={<UserOutlined />}>
            <Link to="/user">
              <span>Users</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <div>
          <Content>
            <Routes>
              {AppRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={route.key}
                />
              ))}
            </Routes>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
