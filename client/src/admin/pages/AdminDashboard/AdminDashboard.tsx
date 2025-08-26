import { ActionIcon, Center, Container, Stack, Title } from "@mantine/core";

import {
  IconBriefcase2,
  IconCalendarCheck,
  IconChevronRight,
  IconUser,
  IconDeviceDesktopAnalytics,
  IconLogout2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { auth, shared } from "../../imports";

import { EntityItem } from "../../components";

const AdminDashboard = () => {
  const { logout } = auth.hooks.useAuth() as { logout: () => void };

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
  const handleLogout = () => {
    logout()
  }

  return (
    <>
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
      <shared.components.Footer>
        <ActionIcon size="xl" radius="xl" onClick={handleLogout}>
          <IconLogout2 />
        </ActionIcon>
      </shared.components.Footer>
    </>
  );
};

export { AdminDashboard };
