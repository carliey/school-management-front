import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import {
  Dashboard,
  Group,
  Groups,
  MeetingRoom,
  MenuBook,
  TableRows,
} from "@mui/icons-material";

function Layout() {
  const drawerWidth = 240;
  const menuItems = [
    {
      icon: <Dashboard />,
      text: "Dashboard",
    },
    {
      icon: <Group />,
      text: "Teachers",
    },
    {
      icon: <MenuBook />,
      text: "Subjects",
    },
    {
      icon: <MeetingRoom />,
      text: "Classrooms",
    },
    {
      icon: <Groups />,
      text: "Students",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar drawerWidth={drawerWidth} />
      <Sidebar menuItems={menuItems} drawerWidth={drawerWidth} />
      <MainContent />
    </Box>
  );
}

export default Layout;
