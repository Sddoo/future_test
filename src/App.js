import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from './components/Table'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import './index.css'
import Person from "./classes/classPerson";

const lowData = "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
const bigData = "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

const App = () => {
	const [url, setUrl] = useState('');
	const [fetchedData, setFetchedData] = useState([]);
	const [tableContent, setTableContent] = useState([]);
	const [filter, setFilter] = useState(new Person());

	useEffect(() => {
		if (url !== '') {
			axios
				.get(url)
				.then(response => {
					setFetchedData(response.data);
					setTableContent(response.data);
				});
		}
	}, [url]);

	return (
		<>
			<button onClick={() => setUrl(lowData)}>Low data</button>
			<button onClick={() => setUrl(bigData)}>Big data</button><br/>
			<Filter filter={filter}
			        setFilter={setFilter}
			        fetchedData={fetchedData}
					setTableContent={setTableContent}
			/>
			<AddForm
					fetchedData={fetchedData}
					setFetchedData={setFetchedData}
					setTableContent={setTableContent}
			/>
			<Table tableContent={tableContent}
			       setTableContent={setTableContent}/>
		</>
	);
};

export default App
