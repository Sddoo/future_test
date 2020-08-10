class ClassFilter {
	constructor(filterData, setFilterData) {
		this.data = filterData;
		this.setData = setFilterData;
	}

	clearFilter() {
		this.setData({
			id: '',
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			address: {
				streetAddress: '',
				city: '',
				state: '',
				zip: ''
			},
			description: ''
		});
	}
}

export default ClassFilter