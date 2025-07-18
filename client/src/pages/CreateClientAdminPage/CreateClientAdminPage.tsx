import { Center, Container } from "@mantine/core";
import { ClientForm, Footer } from "../../widgets";
import { useNavigate } from "react-router";
import { useCallback } from "react";

const CreateClientAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/clients");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <ClientForm />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { CreateClientAdminPage };
