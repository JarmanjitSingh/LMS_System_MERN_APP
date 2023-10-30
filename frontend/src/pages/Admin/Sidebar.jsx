import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { PiBookOpenTextLight, PiLockKeyBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { RiDashboardFill } from "react-icons/ri";
import {  BsFillPlusCircleFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <HStack
        w={"full"}
        p={2}
        alignItems={"center"}
        justifyContent={"start"}
        bg={"blue.900"}
        css={{ borderRadius: "10px 10px 0 0" }  }
      >
        <Avatar /> <Text>Admin Account</Text>
      </HStack>

      <Button
        variant={"unstyled"}
        display={"flex"}
        gap={4}
        alignItems={"center"}
        justifyContent={"start"}
        w={"full"}
        p={4}
        onClick={() => navigate("/admin/dashboard")}
        color={`${location.pathname === '/admin/dashboard' ? "blue.400" : ""}`}
      >
        <RiDashboardFill size={20} style={{ marginLeft: "5px" }} />
        <Text>Dashboard</Text>
      </Button>

      <Button
        variant={"unstyled"}
        display={"flex"}
        gap={4}
        alignItems={"center"}
        justifyContent={"start"}
        w={"full"}
        p={4}
        onClick={() => navigate("/admin/createcourse")}
        color={`${location.pathname === '/admin/createcourse' ? "blue.400" : ""}`}

      >
        <BsFillPlusCircleFill size={20} /> <Text>Create Course</Text>
      </Button>

      <Button
        variant={"unstyled"}
        display={"flex"}
        gap={4}
        alignItems={"center"}
        justifyContent={"start"}
        w={"full"}
        p={4}
        onClick={() => navigate("/admin/courses")}
        color={`${location.pathname === '/admin/courses' ? "blue.400" : ""}`}

      >
        <PiBookOpenTextLight size={20} /> <Text>Courses</Text>
      </Button>

      <Button
        variant={"unstyled"}
        display={"flex"}
        gap={4}
        alignItems={"center"}
        justifyContent={"start"}
        w={"full"}
        p={4}
        onClick={() => navigate("/admin/users")}
        color={`${location.pathname === '/admin/users' ? "blue.400" : ""}`}

      >
        <FaUsers size={20} /> <Text>Users</Text>
      </Button>
    </>
  );
};

export default Sidebar;
