import React from 'react'

const Pagination = ({page, tableContent, setPageContent}) => {
	const   res = [],
			pagesCount = Math.ceil(tableContent.length / page.personsCount);

	function changePage (e) {
		document.querySelectorAll('.paginationItem').forEach( elem => {
			if (elem.classList.contains('chosen'))
				elem.classList.remove('chosen');
		});
		e.target.classList.add('chosen');
		page.number = e.target.innerText;
		const start = (page.number - 1) * page.personsCount;
		setPageContent(tableContent.slice(start, start + page.personsCount));
	}

	for (let i = 1; i <= pagesCount; i++) {
		res.push(<div key={i} onClick={changePage} className={ `paginationItem ${i === 1 ? 'chosen' : ''}` }> {i} </div>);
	}

	return (
		<div className={'pagination'}>
			{res}
		</div>
	)
};

export default Pagination