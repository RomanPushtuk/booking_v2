import { Center, Container } from "@mantine/core";
import { Footer, HostForm } from "../../widgets";
import { useNavigate } from "react-router";
import { useCallback } from "react";

const CreateHostAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/hosts");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <HostForm />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { CreateHostAdminPage };
