import UserDetails from "../Common/UserDetails";
import Users from "../Common/Users";

const AppRoutes = [
  { key: "001", exact: true, path: "/user", component: Users },
  { key: "002", exact: true, path: `/user_details/:id`, component: UserDetails },
];

export default AppRoutes;
