import React from 'react'
import Pagination from "./Pagination";

const PageContent = ({page}) => {
	return (
		page.data.map( (elem, i) =>
			<tr key={i}>
				<td>{elem.id}</td>
				<td>{elem.firstName}</td>
				<td>{elem.lastName}</td>
				<td>{elem.email}</td>
				<td>{elem.phone}</td>
			</tr>
		)
	);
};

const Table = ({persons, filter, page}) => {
	return (
		<div className={'tableWrap'}>
			<h2>Table</h2>
			<table>
				<tbody>
					<tr>
						<th>id</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Email</th>
						<th>Phone</th>
					</tr>
					<PageContent page={page}/>
				</tbody>
			</table>
			<Pagination page={page} persons={persons}/>
		</div>
	)
};

export default Table