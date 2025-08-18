import { useEffect, useState } from "react";

type Message = {
	time: string,
	text: string
}

const LogFilter = () => {
	const [isRealTimeMode, setRealTimeMode] = useState(true);
	const [filter, setFilter] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);


	useEffect(() => {
		const handleSocketOpen = () => {
			console.log("[open] Connection established");
		};

		const handleSocketMessage = (event: MessageEvent) => {
			// format: { time: number, text: json.string }
			const data = JSON.parse(event.data);
			data.time = new Date(data.time).toISOString();

			if (isRealTimeMode) {
				setMessages((prev) => [data, ...prev])
			}
		};

		const handleSocketClose = (event: CloseEvent) => {
			if (event.wasClean) {
				console.log(
					`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
				);
			} else {
				// e.g. server process killed or network down
				// event.code is usually 1006 in this case
				console.log("[close] Connection died");
			}
		};

		const handleSocketError = () => {
			console.log(`[error]`);
		};

		const socket = new WebSocket("ws://localhost:3001");

		socket.addEventListener('open', handleSocketOpen);
		socket.addEventListener('message', handleSocketMessage);
		socket.addEventListener('close', handleSocketClose);
		socket.addEventListener('error', handleSocketError)

		return () => {
			socket.removeEventListener('open', handleSocketOpen);
			socket.removeEventListener('message', handleSocketMessage);
			socket.removeEventListener('close', handleSocketClose);
			socket.removeEventListener('error', handleSocketError)
		}
	}, [])

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	}

	const handleRealTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setMessages([]);
		}
		setRealTimeMode(event.target.checked)
	}

	const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (filter) {
			const queryString = new URLSearchParams({ filter }).toString();
			const response = await fetch(`http://localhost:3000/logs?${queryString}`);
			if (!response.ok) throw new Error("Network error");

			// format: Array<{ time: number, text: json.string }>
			const data = await response.json() as { time: number, text: string }[];
			const messages = data.map((item) => ({
				...item,
				time: new Date(item.time).toISOString(),
			}));
			setRealTimeMode(false);
			setMessages(messages);
		}
	}

	return (
		<>
			<form className="form" onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
				<div className="form-filter" style={{ display: 'flex', marginBottom: '8px' }}>
					<label className="filter-label" htmlFor="filter" style={{ marginRight: '8px' }}>
						Filter:
					</label>
					<input
						className="filter-input"
						type="text"
						id="filterInput"
						name="filter"
						onChange={handleFilterChange}
						value={filter}
						style={{ width: '100%', marginRight: '8px' }}
					/>
					<button id="filterButton">Find</button>
				</div>
				<div className="form-controls">
					<label htmlFor="realtime">Real-Time Logs: </label>
					<input
						id="realtimeModeCheckbox"
						type="checkbox"
						checked={isRealTimeMode}
						onChange={handleRealTimeChange}
					/>
				</div>
			</form>
			<div className="log-container" id="logContainer">
				{messages.map(item => {
					return (
						<div
							key={item.time}
							className="log-item"
							style={{ display: 'flex', marginBottom: '8px' }}
						>
							<p
								className='log-item_timestamp'
								style={{ width: '180px', marginRight: '16px', fontSize: '14px' }}
							>
								{item.time}
							</p>
							<p
								className='log-item_log-content'
								style={{ wordBreak: 'break-all', fontSize: '14px' }}
							>
								{item.text}
							</p>
						</div>
					)
				})}
			</div>
		</>
	)
}

export { LogFilter }
