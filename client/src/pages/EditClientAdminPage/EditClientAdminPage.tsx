import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Center, Container } from "@mantine/core";
import { ClientForm, Footer } from "../../widgets";

const EditClientAdminPage = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/admin/clients");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <ClientForm
            item={{
              name: "Client",
            }}
          />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { EditClientAdminPage };
