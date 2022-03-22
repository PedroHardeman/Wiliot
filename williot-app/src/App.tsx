import { useState } from 'react';
import { Header } from './components/Header';
import { TemperatureCard } from './components/TemperatureCard';
import { DataChart } from './components/DataChart';
import useWebSocket from 'react-use-websocket';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

function App() {
	const [chartOptions, setOptions] = useState<any>({
		title: { text: "Data chart" },
		yAxis: { ceiling: 100 },
		series: [{ data: [] }, { data: [] }]
	});
	const [webSocketURL, setWebSocketURL] = useState('ws://localhost:8999');
	const [temperatures, setTemperatures] = useState([0, 0]);
	const [firstTimestamp, setFirstTimestamp] = useState<Object>();
	const [diffTimestamp, setDiffTimestamp] = useState<Array<Number>>([0, 0]);
	
	const {lastJsonMessage} = useWebSocket(webSocketURL, {
	  onOpen: () => toast.success('Websocket connected!', {
	    position: "top-right",
	    autoClose: 5000,
	    hideProgressBar: false,
	    closeOnClick: true,
	    pauseOnHover: true,
	  }), //add toast that indicate the socket connect
	  onMessage: () => { //the data should update every time new data will received from the socket
	    if (lastJsonMessage) {
				if (!firstTimestamp) setFirstTimestamp(moment(lastJsonMessage[0].timestamp));
				const compareTimestamp = moment(lastJsonMessage[0].timestamp);
				if (compareTimestamp.diff(firstTimestamp, 'minutes') < 5) { //save 5 minutes data 
					setDiffTimestamp([
						compareTimestamp.diff(firstTimestamp, 'minutes'),
						compareTimestamp.diff(firstTimestamp, 'seconds') - compareTimestamp.diff(firstTimestamp, 'minutes')*60
					]);
					setTemperatures([lastJsonMessage[0].temperature, lastJsonMessage[1].temperature]);
					updateSeries(lastJsonMessage);
				} else {
					setWebSocketURL('');
					toast.success('Websocket disconnected!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
					}); //add toast that indicate the socket disconnect
				};
	    };
	  },
		onError: (event) => toast.error("Couldn't connect to websocket!", {
	    position: "top-right",
	    autoClose: 5000,
	    hideProgressBar: false,
	    closeOnClick: true,
	    pauseOnHover: true,
	  }),
		shouldReconnect: (closeEvent) => true,
	});

	function updateSeries(newData: Array<any>) {
		const data1 : Array<Number> = chartOptions.series[0].data;
		if (newData[0].data < 100) data1.push(newData[0].data) //if data value is bigger than 100

		const data2 : Array<Number> = chartOptions.series[1].data;
		if (newData[1].data < 100) data2.push(newData[1].data) //if data value is bigger than 100

		setOptions({
			series: [
				{ data: data1 },
				{ data: data2 }
			]
		})
	};

	return (
		<>
			<ToastContainer />
			<Header counter={diffTimestamp} />
			<TemperatureCard temperatures={temperatures} />
			<DataChart options={chartOptions} />
		</>
	);
}

export default App;
