import React, {useState} from 'react'
import axios from 'axios'
import Table from './components/Table'
import Filter from './components/Filter'
import ClassFilter from './classes/classFilter'
import ClassPage from './classes/classPage'
import ClassPersons from './classes/classPersons'
import './index.css'

const lowData = "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
const bigData = "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";


const App = () => {
	const [fetchedData, setFetchedData] = useState([]);
	const [tableContent, setTableContent] = useState([]);
	const [tablePage, setTablePage] = useState([]);
	const [filterData, setFilterData] = useState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: {
			streetAddress: '',
			city: '',
			state: '',
			zip: ''
		},
		description: ''
	});

	const page = new ClassPage(tablePage, setTablePage);
	const filter = new ClassFilter(filterData, setFilterData);
	const persons = new ClassPersons(fetchedData, setFetchedData);

	function clone(obj) {
		let res;

		res = Object.assign({}, obj);
		for (let elem of Object.keys(res)) {
			if (typeof res[elem] === 'object')
				res[elem] = clone(obj[elem]);
		}
		return res;
	}

	function wrapIntoArr(obj) {
		let arr = [];

		for (let elem in obj) {
			arr.push(obj[elem]);
		}
		return arr;
	}

	function fetchData(url) {
		axios
			.get(url)
			.then(response => {
				persons.fetchedData = wrapIntoArr(clone(response.data));
				persons.setData(response.data);
				page.setData(response.data);
			});
	}

	return (
		<>
			<button onClick={() => fetchData(lowData)}>Low data</button>
			<button onClick={() => fetchData(bigData)}>Big data</button><br/>
			<Filter filter={filter} persons={persons} page={page}/>
			<Table persons={persons} filter={filter} page={page}/>
		</>
	);
};

export default App
