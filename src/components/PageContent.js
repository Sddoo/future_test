import React, {useState} from "react";

const PageContent = ({pageContent, setInfo}) => {
	const [chosen, setChosen] = useState({});

	function handleClick(event, elem) {
		event.target.parentNode.classList.add('chosen');
		setChosen(elem);
		setInfo(elem);
	}

	if (typeof pageContent === 'string') {
		return (<tr><td colSpan="5">{pageContent}</td></tr>);
	} else {
		return (
			pageContent.map((elem, i) =>
				<tr key={i}
				    onClick={(e) => handleClick(e, elem)}
				    className={`${'tableRow'} ${elem === chosen ? 'chosen' : ''}`}>
					<td>{elem.id}</td>
					<td>{elem.firstName}</td>
					<td>{elem.lastName}</td>
					<td>{elem.email}</td>
					<td>{elem.phone}</td>
				</tr>
			)
		);
	}
};

export default PageContent
