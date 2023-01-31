import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function Layout() {
  const drawerWidth = 240;
  const menuItems = [
    {
      icon: <InboxIcon />,
      text: "Dashboard",
    },
    {
      icon: <InboxIcon />,
      text: "Teachers",
    },
    {
      icon: <InboxIcon />,
      text: "Classrooms",
    },
    {
      icon: <InboxIcon />,
      text: "Students",
    },
    {
      icon: <InboxIcon />,
      text: "Subjects",
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
