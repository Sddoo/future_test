class ClassPersons {
	constructor(fetchedData, setFetchedData) {
		this.data = fetchedData;
		this.setData = setFetchedData;
		this.filteredData = [];
		this.fetchedData = [];
	}

	filter(filter) {
		let existingKeys = getExistingKeys();

		function getExistingKeys() {
			let existingKeys = Object.keys(filter.data).filter(elem => filter.data[elem] !== '' && typeof filter.data[elem] !== 'object');
			return existingKeys.concat(Object.keys(filter.data.address).filter(elem => filter.data.address[elem] !== ''));
		}

		function filterFunc(elem) {
			for (let prop of existingKeys) {
				if ((elem[prop] && elem[prop].toString().includes(filter.data[prop])) ||
					(elem.address[prop] && elem.address[prop].toString().includes(filter.data.address[prop])))
					return true;
				else
					return false;
			}
		}

		this.filteredData = this.data.filter(filterFunc, this);
	}
}

export default ClassPersons