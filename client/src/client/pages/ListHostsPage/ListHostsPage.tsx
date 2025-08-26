import { Container } from "@mantine/core";
import { usePublicGetHosts } from "../../../queries/bookingComponents"
import { HostsList } from "../../components";
import { auth, shared } from "../../imports";

export const ListHostsPage = () => {
	const { accessToken } = auth.hooks.useAuth() as { accessToken: string };

	const query = usePublicGetHosts({
		headers: {
			authorization: accessToken,
		},
	});

	return (
		<Container maw={640} w="100%" mb="64px">
			<shared.components.Section title="Booking app">
				<HostsList list={query.data} isLoading={query.isLoading} />
			</shared.components.Section>
		</Container>
	)
}
