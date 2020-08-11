import React, {useEffect, useState} from 'react'
import Pagination from "./Pagination";

const Info = ({info}) => {
	if (Object.keys(info).length === 0)
		return (<></>);
	return (
		<div className='info'>
			<div>You chose <b>{info.firstName} {info.lastName}</b></div>
			<div className="description"><b>Description: </b>
				<div>{info.description}</div>
			</div>
			<div className="address">
				<div className="streetAddress"><b>Street address: </b>{info.address.streetAddress}</div>
				<div className="city"><b>City: </b>{info.address.city}</div>
				<div className="state"><b>State: </b>{info.address.state}</div>
				<div className="zip"><b>Zip: </b>{info.address.zip}</div>
			</div>
		</div>
	)
};

const PageContent = ({pageContent, setInfo}) => {

	function hideChosenTr() {
		document.querySelectorAll('tr').forEach( elem => {
			if (elem.classList.contains('chosen'))
				elem.classList.remove('chosen');
		});
	}

	function handleClick(event, elem) {
		hideChosenTr();
		event.target.parentNode.classList.add('chosen');
		setInfo(elem);
	}

	useEffect( hideChosenTr, [pageContent] );

	return (
		pageContent.map( (elem, i) =>
			<tr key={i} onClick={(e) => handleClick(e, elem)} className={'tableRow'}>
				<td>{elem.id}</td>
				<td>{elem.firstName}</td>
				<td>{elem.lastName}</td>
				<td>{elem.email}</td>
				<td>{elem.phone}</td>
			</tr>
		)
	);
};

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
		setPageContent(tableContent.slice(0, 50));
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
						             setInfo={setInfo}/>
					</tbody>
				</table>
			</div>
			<Pagination page={page}
			            tableContent={tableContent}
			            setPageContent={setPageContent}
			/>
			<Info info={info}/>
		</div>
	)
};

export default Table