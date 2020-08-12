import React, {useEffect, useState} from 'react'
import Pagination from "./Pagination";
import PageContent from "./PageContent";
import ChosenPerson from "./ChosenPerson"

const Table = ({tableContent, setTableContent}) => {
	const page = {
		number: 1,
		personsCount: 50
	};
	const [pageContent, setPageContent] = useState([]);
	const [info, setInfo] = useState({});

	function toggleArrow() {
		let th = document.querySelectorAll('th');

		th.forEach( elem => {
			if (elem.innerText.includes(' \u25B4'))
				elem.innerText = elem.innerText.slice(0, elem.innerText.indexOf(' \u25B4'));
			else if (elem.innerText.includes(' \u25BE'))
				elem.innerText = elem.innerText.slice(0, elem.innerText.indexOf(' \u25BE'));
		});
	}

	function sortContent(e) {
		if (typeof tableContent === 'string')
			return ;
		let sorted = tableContent.map( elem => Object.assign(elem) );

		toggleArrow();
		e.target.dataset.order = e.target.dataset.order || 'increase';
		if (e.target.dataset.order === 'increase') {
			sorted.sort((a, b) => {
				if (a[e.target.innerText] > b[e.target.innerText])
					return 1;
				else if (a[e.target.innerText] < b[e.target.innerText])
					return -1;
				else
					return 0;
			});
			e.target.innerText = e.target.innerText.concat(' \u25B4');
			e.target.dataset.order = 'decrease';
		}
		else {
			sorted.sort((a, b) => {
				if (a[e.target.innerText] < b[e.target.innerText])
					return 1;
				else if (a[e.target.innerText] > b[e.target.innerText])
					return -1;
				else
					return 0;
			});
			e.target.innerText = e.target.innerText.concat(' \u25BE');
			e.target.dataset.order = 'increase';
		}
		setTableContent(sorted);
	}

	useEffect(() => {
		if (typeof tableContent === 'string')
			setPageContent(tableContent);
		else {
			setPageContent(tableContent.slice(0, 50));
			setInfo({});
		}
	}, [tableContent]);

	return (
		<div className={'tableWrap'}>
			<h2>Table</h2>
			<div className={'tableContent'}>
				<table>
					<thead>
					<tr>
						<th onClick={sortContent} data-order={''}>id</th>
						<th onClick={sortContent} data-order={''}>firstName</th>
						<th onClick={sortContent} data-order={''}>lastName</th>
						<th onClick={sortContent} data-order={''}>email</th>
						<th onClick={sortContent} data-order={''}>phone</th>
					</tr>
					</thead>
					<tbody>
					<PageContent pageContent={pageContent}
					             setInfo={setInfo}
					/>
					</tbody>
				</table>
				<Pagination page={page}
				            tableContent={tableContent}
				            setPageContent={setPageContent}
				/>
			</div>
			<ChosenPerson info={info}/>
		</div>
	)
};

export default Table