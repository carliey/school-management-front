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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Assessment,
  Dashboard,
  Group,
  Groups,
  MeetingRoom,
  MenuBook,
  Note,
  NoteAlt,
} from "@mui/icons-material";
import TeacherAttendance from "../pages/attendance/TeacherAttendance";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../pages/auth/authSlice";
import {
  useGetClassroomsQuery,
  useGetMyClassroomsQuery,
} from "../pages/classrooms/classroomApiSlice";
import { useEffect, useMemo } from "react";
import { Classroom } from "../types/types";

type Props = {
  drawerWidth: number;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
};

type MenuItem = {
  icon: any;
  text: string;
  link: string;
};

const Sidebar = ({ drawerWidth, setPageTitle }: Props) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);
  const { data } = useGetMyClassroomsQuery();

  const myClassrooms = useMemo<Classroom[] | []>(() => {
    return data?.data?.length ? data.data : [];
  }, [data]);

  const adminMenuItems = [
    {
      icon: <Dashboard />,
      text: "Dashboard",
      link: "dashboard",
    },
    {
      icon: <Group />,
      text: "Teachers",
      link: "teachers",
    },
    {
      icon: <MenuBook />,
      text: "Subjects",
      link: "subjects",
    },
    {
      icon: <MeetingRoom />,
      text: "Classrooms",
      link: "classrooms",
    },
    {
      icon: <Groups />,
      text: "Students",
      link: "students",
    },
    {
      icon: <NoteAlt />,
      text: "Attendance",
      link: "attendance",
    },
    // {
    //   icon: <Assessment />,
    //   text: "Assessments",
    //   link: "assessments",
    // },
  ];

  const classItems: MenuItem[] = myClassrooms?.flatMap(
    (classroom: Classroom) => [
      {
        icon: <NoteAlt />,
        text: `${classroom.name} Attendance`,
        link: `attendance/${classroom.id}`,
      },
      // {
      //   icon: <Assessment />,
      //   text: `${classroom.name} Assessment`,
      //   link: `assessment/${classroom.id}`,
      // },
    ]
  );

  const teacherMenuItems = [
    {
      icon: <Dashboard />,
      text: "Dashboard",
      link: "dashboard",
    },
    ...classItems,
  ];

  const isAdmin = user?.roles?.includes("admin");
  const isTeacher = user?.roles?.includes("teacher");

  const menuItems = useMemo<MenuItem[] | []>(() => {
    let items: any[] = [];
    items = isAdmin ? [...items, ...adminMenuItems] : [...items];
    items = isTeacher ? [...items, ...teacherMenuItems] : [...items];
    return items;
  }, [myClassrooms]);

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
        {menuItems?.map((item: MenuItem, index: number) => (
          <ListItem
            key={index}
            onClick={() => setPageTitle(item.text.toLocaleUpperCase())}
            disablePadding
          >
            <NavLink
              to={item.text === "Dashboard" ? "/" : `${item.link}`}
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
