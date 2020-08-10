import React from 'react'
import Person from '../classes/classPerson'


function filtrateData(filter, data) {
	let existingKeys = getExistingKeys(filter);

	function getExistingKeys() {
		let existingKeys = Object.keys(filter).filter(elem => filter[elem] !== '' && typeof filter[elem] !== 'object');
		return existingKeys.concat(Object.keys(filter.address).filter(elem => filter.address[elem] !== ''));
	}

	function filterFunc(elem) {
		for (let prop of existingKeys) {
			if (elem[prop] && elem[prop].toString().includes(filter[prop]) === false)
				return false;
			else if (elem.address[prop] && elem.address[prop].toString().includes(filter.address[prop]) === false)
				return false;
		}
		return true;
	}

	return data.filter(filterFunc);
}

const Filter = ({filter, setFilter, fetchedData, setTableContent}) => {

	function handleClick() {
		setTableContent(filtrateData(filter, fetchedData));
	}

	function clearFilter() {
		setTableContent(fetchedData);
		setFilter(new Person());
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
			<div>
				Id: <input onChange={changeFilter} type="text" name='id' value={filter.id}/> <br/>
				First name: <input onChange={changeFilter} type="text" name='firstName' value={filter.firstName}/> <br/>
				Last name: <input onChange={changeFilter} type="text" name='lastName' value={filter.lastName}/> <br/>
				Email: <input onChange={changeFilter} type="email" name='email' value={filter.email}/> <br/>
				Phone: <input onChange={changeFilter} type="text" name='phone' value={filter.phone}/> <br/>
				Street address: <input onChange={changeFilter} type="text" name='address.streetAddress' value={filter.address.streetAddress}/> <br/>
				City: <input onChange={changeFilter} type="text" name='address.city' value={filter.address.city}/> <br/>
				State: <input onChange={changeFilter} type="text" name='address.state' value={filter.address.state}/> <br/>
				Zip: <input onChange={changeFilter} type="text" name='address.zip' value={filter.address.zip}/> <br/>
				Description: <input onChange={changeFilter} type="text" name='description' value={filter.description}/> <br/>
			</div>
			<button onClick={handleClick}>Filter!</button>
			<button onClick={clearFilter}>Clear filter</button>
		</div>
	)
};

export default Filter