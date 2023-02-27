import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { PowerOff } from "@mui/icons-material";
import { useAppDispatch } from "../redux/store";
import { logout } from "../pages/auth/authSlice";

type Props = {
  drawerWidth: number;
  menuItems: { icon: any; text: string }[];
};

const Sidebar = ({ drawerWidth, menuItems }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <NavLink
              to={item.text === "Dashboard" ? "/" : `${item.text}`}
              end
              style={({ isActive }) => ({
                width: "100%",
                backgroundColor: isActive ? "#d1d1d1" : "",
              })}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="error"
        endIcon={<PowerOff />}
        sx={{ mt: 4 }}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;
