import React from 'react'

const Filter = ({filter, persons, page}) => {

	function handleClick() {
		persons.filter(filter);
		persons.setData(persons.filteredData);
		page.number = 1;
		page.setData(persons.filteredData);
		console.log(persons.fetchedData);
		console.log(persons.data);
	}

	function clearFilter() {
		filter.clearFilter();
		page.number = 1;
		persons.setData(persons.fetchedData);
		page.setData(persons.fetchedData);
		console.log(persons.fetchedData);
		console.log(persons.data);
	}

	function changeFilter (e) {
		let newFilter = Object.assign({}, filter.data),
			name = e.target.name;
		if (name.includes('address'))
			newFilter.address[name.slice(name.indexOf('.') + 1)] = e.target.value;
		else
			newFilter[e.target.name] = e.target.value;
		filter.setData(newFilter);
	}

	return (
		<div className={'filter'}>
			<h2>Filter</h2>
			<div>
				Id: <input onChange={changeFilter} type="text" name='id' value={filter.data.id}/> <br/>
				First name: <input onChange={changeFilter} type="text" name='firstName' value={filter.data.firstName}/> <br/>
				Last name: <input onChange={changeFilter} type="text" name='lastName' value={filter.data.lastName}/> <br/>
				Email: <input onChange={changeFilter} type="email" name='email' value={filter.data.email}/> <br/>
				Street address: <input onChange={changeFilter} type="text" name='address.streetAddress' value={filter.data.address.streetAddress}/> <br/>
				City: <input onChange={changeFilter} type="text" name='address.city' value={filter.data.address.city}/> <br/>
				State: <input onChange={changeFilter} type="text" name='address.state' value={filter.data.address.state}/> <br/>
				Zip: <input onChange={changeFilter} type="text" name='address.zip' value={filter.data.address.zip}/> <br/>
				Description: <input onChange={changeFilter} type="text" name='description' value={filter.data.description}/> <br/>
			</div>
			<button onClick={handleClick}>Filter!</button>
			<button onClick={clearFilter}>Clear filter</button>
		</div>
	)
};

export default Filter