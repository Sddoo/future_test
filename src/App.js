import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from './components/Table'
import Filter from './components/Filter'
import DataChoose from "./components/DataChoose";
import './index.css'
import './fonts/Sora-Light.ttf'
import Person from "./classes/classPerson";

const App = () => {
	const [url, setUrl] = useState('');
	const [fetchedData, setFetchedData] = useState([]);
	const [tableContent, setTableContent] = useState([]);
	const [filter, setFilter] = useState(new Person());

	useEffect(() => {
		if (url !== '') {
			document.querySelector('.tableContent').classList.add('preload');
			setFetchedData([]);
			setTableContent([]);
			axios
				.get(url)
				.then(response => {
					document.querySelector('.tableContent').classList.remove('preload');
					setFetchedData(response.data);
					setTableContent(response.data);
				})
				.catch( error => {
					setTableContent("Data haven't been fetched. Try again later.");
					document.querySelector('.tableContent').classList.remove('preload');
				});
		}
	}, [url]);

	return (
		<div className={'gridContainer'}>
			<DataChoose setUrl={setUrl}/>
			<div className="aside">
				<Filter filter={filter}
				        setFilter={setFilter}
				        fetchedData={fetchedData}
				        setTableContent={setTableContent}
				        setFetchedData={setFetchedData}
				/>
			</div>
			<Table tableContent={tableContent}
			       setTableContent={setTableContent}
			/>
		</div>
	);
};

export default App
