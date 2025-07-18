import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Center, Container } from "@mantine/core";
import { Footer, HostForm } from "../../widgets";

const EditHostAdminPage = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/admin/hosts");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <HostForm
            item={{
              name: "Host",
              description: "Some Host Description",
              workingDays: ["Monday", "Tuesday", "Wednesday"],
              workingHours: [
                { start: "09:00", end: "13:00" },
                { start: "14:00", end: "18:00" },
              ],
            }}
          />
        </Container>
      </Center>

      <Footer onBack={handleBack} />
    </>
  );
};

export { EditHostAdminPage };
