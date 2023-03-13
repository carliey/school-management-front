import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function Layout() {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <MainContent />
    </Box>
  );
}

export default Layout;
