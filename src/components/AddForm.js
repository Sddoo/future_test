import React, {useState} from "react";
import Person from '../classes/classPerson'

const AddForm = ({fetchedData, setFetchedData, setTableContent}) => {
	const [newField, setNewField] = useState(new Person());
	const [visible, setVisible] = useState(false);
	const [disable, setDisable] = useState(true);

	function submitHandler(e) {
		e.preventDefault();
		setFetchedData([newField].concat(fetchedData));
		setTableContent([newField].concat(fetchedData));
	}

	function changeHandler(e) {
		let field = Object.assign({}, newField);
		field[e.target.name] = e.target.value;
		setDisable(Object.values(field).includes(''));
		setNewField(field);
	}

	if (visible)
		return (
			<div className={'addFormWrap'}>
				<div className={'flexContainer'}>
					<div>id</div>
					<div>First name</div>
					<div>Last name</div>
					<div>Email</div>
					<div>Phone</div>
					<div></div>
				</div>
				<form onSubmit={submitHandler} className={'addForm'}>
					<input type="text" onChange={changeHandler} name='id' value={newField.id}/>
					<input type="text" onChange={changeHandler} name='firstName' value={newField.firstName}/>
					<input type="text" onChange={changeHandler} name='lastName' value={newField.lastName}/>
					<input type="email" onChange={changeHandler} name='email' value={newField.email}/>
					<input type="text" onChange={changeHandler} name='phone' value={newField.phone}/>
					<button type='submit' disabled={disable}>Add field</button>
				</form>
				<button onClick={() => setVisible(false)}>Close form</button>
			</div>
		);
	else
		return (
			<button onClick={() => setVisible(true)}>Add form</button>
		)
};

export default AddForm