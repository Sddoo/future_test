class ClassPage {
	constructor(tablePage, setTablePage) {
		this.data = tablePage;
		this.personsCount = 50;
		this.number = 1;
		this.setData = function (arr) {
			const start = (this.number - 1) * this.personsCount;
			setTablePage(arr.slice(start, start + this.personsCount));
		}
	}
}

export default ClassPage