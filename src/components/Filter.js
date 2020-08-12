import React from 'react'
import AddForm from "./AddForm";


function filtrateData(filter, data) {
	let existingKeys = getExistingKeys(filter);

	function getExistingKeys() {
		let existingKeys = Object.keys(filter).filter(elem => filter[elem] !== '' && typeof filter[elem] !== 'object');
		return existingKeys.concat(Object.keys(filter.address).filter(elem => filter.address[elem] !== ''));
	}

	function filterFunc(elem) {
		for (let prop of existingKeys) {
			let reg1 = new RegExp(filter[prop], 'i');
			let reg2 = new RegExp(filter.address[prop], 'i');

			if (elem[prop] && !reg1.exec(elem[prop].toString()))
				return false;
			else if ((elem.address[prop] && !reg2.exec(elem.address[prop].toString())) ||
					elem.address[prop] === '')
				return false;
		}
		return true;
	}

	return data.filter(filterFunc);
}

const Filter = ({filter, setFilter, fetchedData, setTableContent, setFetchedData}) => {

	function handleFilter() {
		setTableContent(filtrateData(filter, fetchedData));
	}

	function clearFilter() {
		setTableContent(fetchedData);
	}

	function changeFilter (e) {
		let newFilter = Object.assign({}, filter),
			name = e.target.name;
		if (name.includes('address'))
			newFilter.address[name.slice(name.indexOf('.') + 1)] = e.target.value;
		else
			newFilter[e.target.name] = e.target.value;
		setFilter(newFilter);
	}

	return (
		<div className={'filter'}>
			<h2>Filter</h2>
			<div>Id: <br/><input onChange={changeFilter} type="text" name='id' value={filter.id}/></div>
			<div>First name: <br/> <input onChange={changeFilter} type="text" name='firstName' value={filter.firstName}/></div>
			<div>Last name: <br/> <input onChange={changeFilter} type="text" name='lastName' value={filter.lastName}/></div>
			<div>Email: <br/> <input onChange={changeFilter} type="email" name='email' value={filter.email}/></div>
			<div>Phone: <br/> <input onChange={changeFilter} type="text" name='phone' value={filter.phone}/></div>
			<div>Street address: <br/> <input onChange={changeFilter} type="text" name='address.streetAddress' value={filter.address.streetAddress}/></div>
			<div>City: <br/> <input onChange={changeFilter} type="text" name='address.city' value={filter.address.city}/></div>
			<div>State: <br/> <input onChange={changeFilter} type="text" name='address.state' value={filter.address.state}/></div>
			<div>Zip: <br/> <input onChange={changeFilter} type="text" name='address.zip' value={filter.address.zip}/></div>
			<div>Description: <br/> <input onChange={changeFilter} type="text" name='description' value={filter.description}/></div>
			<div className="filterButtons">
				<button onClick={handleFilter} disabled={!fetchedData.length}>Filter!</button>
				<AddForm
					fetchedData={fetchedData}
					setFetchedData={setFetchedData}
					setTableContent={setTableContent}
				/>
				<button onClick={clearFilter} disabled={!fetchedData.length}>Clear filter</button>
			</div>
		</div>
	)
};

export default Filter