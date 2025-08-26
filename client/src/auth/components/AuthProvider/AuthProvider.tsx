import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { useAuthLogin } from "../../../queries/bookingComponents";
import { FETCH_ERROR_CHANNEL } from "../../channels";
import { AuthContext } from "../../contexts";

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState<string | null>(
		localStorage.getItem("accessToken")
	);

	const loginMutation = useAuthLogin();

	useEffect(() => {
		const handleMessage = (event: MessageEvent<any>) => {
			const error = event.data;
			if ([500, 404].includes(error.code)) {
				localStorage.removeItem("accessToken");
				navigate("/login");
			}
		};
		FETCH_ERROR_CHANNEL.addEventListener("message", handleMessage);
		return () => {
			FETCH_ERROR_CHANNEL.removeEventListener("message", handleMessage);
		};
	}, []);

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const { pathname, search } = window.location;

		if (accessToken) {
			setAccessToken(accessToken);
			navigate(pathname + search);
		} else {
			navigate("/login");
		}
	}, []);

	const login = async (login: string, password: string) => {
		await loginMutation.mutateAsync(
			{ body: { login, password } },
			{
				onSuccess: (data) => {
					setAccessToken(data.accessToken);
					localStorage.setItem("accessToken", data.accessToken);

					switch (data.role) {
						case "CLIENT":
							navigate("/client");
							break;
						case "HOST":
							navigate("/host");
							break;
						case "ADMIN":
							navigate("/admin");
							break;
						default:
							throw new Error("Unknown role for authentication");
					}
				},
			},
		);
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		navigate("/login");
	}

	return (
		<AuthContext.Provider value={{ accessToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
