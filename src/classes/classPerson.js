function Person() {
	this.id = '';
	this.firstName = '';
	this.lastName = '';
	this.email = '';
	this.phone = '';
	this.description = '' || 'none description';
	this.address = {
		streetAddress: '' || 'none info',
		city: '' || 'none info',
		state: '' || 'none info',
		zip: '' || 'none info'
	}
}

export default Person