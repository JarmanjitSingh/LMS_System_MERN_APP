import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { DoughnutChart, LineChart } from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStats } from "../../../reduxToolkit/api_functions/admin";
import Loader from "../../../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    userCount,
    subscriptionCount,
    viewsCount,
    usersPercentage,
    viewsPercentage,
    subscriptionPercentage,
    usersProfit,
    viewsProfit,
    subscriptionProfit
  } = useSelector((state) => state.admin);

  useEffect(() => {
    getAdminStats(dispatch);
  }, [dispatch]);

  return (
    <Container
      maxW={"container.2xl"}
      minH={"100vh"}
      p={4}
     // css={{
    //  cursor: `url(${cursor}), default`,
    //  }}
    >
      <Stack
        direction={["column", "column", "row", "row"]}
        alignItems={"start"}
        justifyContent={"center"}
        w={"full"}
        h={"full"}
        gap={16}
      >
        <VStack
          w={["full", "full", "20%", "20%"]}
          gap={4}
          bg={"blue.800"}
          borderRadius={"10px"}
          minH={"70vh"}
        >
          <Sidebar />
        </VStack>

        <Box w={["full", "full", "70%", "70%"]} minH={"90vh"} py={4}>
          {loading || !stats ? (
            <Loader />
          ) : (
            <>
              <Text textAlign={"center"} opacity={0.5}>
                Last change was on {String(new Date(stats[11].createdAt)).split("G")[0]}
              </Text>
              <Heading
                ml={[0, 16]}
                mb={16}
                textAlign={["center", "left"]}
                w={"full"}
              >
                Dashboard
              </Heading>

              <Stack
                direction={["column", "row"]}
                minH={24}
                justifyContent={"space-evenly"}
              >
                <Databox
                  title="Views"
                  qty={viewsCount}
                  qtyPercentage={viewsPercentage}
                  profit={viewsProfit}
                />
                <Databox
                  title="Users"
                  qty={userCount}
                  qtyPercentage={usersPercentage}
                  profit={usersProfit}
                />
                <Databox
                  title="Subscription"
                  qty={subscriptionCount}
                  qtyPercentage={subscriptionPercentage}
                  profit={subscriptionProfit}
                />
              </Stack>

              <Box
                m={[0, 6]}
                borderRadius={"lg"}
                p={[0, 6]}
                mt={[4, 16]}
                bg={"blue.900"}
              >
                <Heading
                  textAlign={["center", "left"]}
                  size={"md"}
                  pt={[8, 0]}
                  w={"full"}
                >
                  View Graph
                </Heading>

                {/* line graph here */}
                <LineChart dataArray={stats.map(item=> item.views)}/>
              </Box>

              <Stack
                direction={["column", "column", "row", "row"]}
                w={"full"}
                m={[0, "auto"]}
                p={[0, 6]}
                mt={[6, 0]}
                gap={4}
              >
                <Box
                  w={["100%", "100%", "60%", "60%"]}
                  p={4}
                  bg={"blue.900"}
                  borderRadius={"lg"}
                >
                  <Heading textAlign={["center", "left"]} size={"md"} my={8}>
                    Progress Bar
                  </Heading>

                  <Box>
                    {/* bar */}

                    <Bar profit={viewsProfit} title="Views" value={viewsPercentage} />
                    <Bar profit={usersProfit} title="Users" value={usersPercentage} />
                    <Bar profit={subscriptionProfit} title="Subscriptions" value={subscriptionPercentage} />
                  </Box>
                </Box>

                <Box
                  w={["100%", "100%", "40%", "40%"]}
                  bg={"blue.900"}
                  p={4}
                  borderRadius={"lg"}
                >
                  <Heading textAlign={"center"} size={"md"} my={4}>
                    Users
                  </Heading>

                  {/* donut graph */}
                  <DoughnutChart doughnutArray={[subscriptionCount, userCount-subscriptionCount]} />
                </Box>
              </Stack>
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

const Databox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box w={["full", "30%"]} p={8} borderRadius={"lg"} bg={"blue.900"}>
      <Text>{title}</Text>

      <HStack spacing={6}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {qty}
        </Text>

        <HStack>
          <Text>{qtyPercentage}%</Text>
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>

      <Text opacity={0.6}>Since last month</Text>
    </Box>
  );
};

const Bar = ({ title, value, profit }) => (
  <Box py={4} px={2}>
    <Heading size={"sm"} mb={2}>
      {title}
    </Heading>
    <HStack w={"full"} alignItems={"center"}>
      <Text>{profit ? "0%" : `-${value}%`}</Text>
      <Progress w={"full"} value={profit ? value : 0} colorScheme="purple" />
      <Text>{value > 100 ? 100 : value}%</Text>
    </HStack>
  </Box>
);
export default Dashboard;
