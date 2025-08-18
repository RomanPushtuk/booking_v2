import { Center, Container, Stack, Title } from "@mantine/core";

import {
  IconBriefcase2,
  IconCalendarCheck,
  IconChevronRight,
  IconUser,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { EntityItem } from "../../components";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const onClientsClick = () => {
    navigate("/admin/clients");
  };
  const onHostsClick = () => {
    navigate("/admin/hosts");
  };
  const onBookingsClick = () => {
    navigate("/admin/bookings");
  };
  const onMonitoringClick = () => {
    navigate("/monitoring");
  }

  return (
    <Center h="100vh">
      <Container maw={640} w="100%" mb="64px">
        <Title mb="md">Dashboard</Title>
        <Stack>
          <EntityItem
            icon={<IconUser />}
            title={<Title order={4}>Clients</Title>}
            onDetailsClick={onClientsClick}
            detailsIcon={<IconChevronRight />}
          />
          <EntityItem
            icon={<IconBriefcase2 />}
            title={<Title order={4}>Hosts</Title>}
            onDetailsClick={onHostsClick}
            detailsIcon={<IconChevronRight />}
          />
          <EntityItem
            icon={<IconCalendarCheck />}
            title={<Title order={4}>Bookings</Title>}
            onDetailsClick={onBookingsClick}
            detailsIcon={<IconChevronRight />}
          />
          <EntityItem
            icon={<IconDeviceDesktopAnalytics />}
            title={<Title order={4}>Monitoring & Logs</Title>}
            onDetailsClick={onMonitoringClick}
            detailsIcon={<IconChevronRight />}
          />
        </Stack>
      </Container>
    </Center>
  );
};

export { AdminDashboard };
