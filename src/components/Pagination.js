import React from 'react'

const Pagination = ({page, persons}) => {
	const   res = [],
			pagesCount = Math.ceil(persons.data.length / page.personsCount);

	function changePage (e) {
		page.number = e.target.innerText;
		page.setData(persons.data);
	}

	for (let i = 1; i <= pagesCount; i++) {
		res.push(<div key={i} onClick={changePage} className={'paginationItem'}> {i} </div>);
	}

	return (
		<div className={'pagination'}>
			{res}
		</div>
	)
};

export default Pagination