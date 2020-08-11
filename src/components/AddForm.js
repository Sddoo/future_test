import React, {useState} from "react";
import Person from '../classes/classPerson'

const AddForm = ({fetchedData, setFetchedData, setTableContent}) => {
	const [newField, setNewField] = useState(new Person());
	const [visibleForm, setVisibleForm] = useState(false);
	const [disable, setDisable] = useState(true);

	function submitHandler(e) {
		e.preventDefault();
		setNewField(new Person());
		setFetchedData([newField].concat(fetchedData));
		setTableContent([newField].concat(fetchedData));
		toggleForm();
	}

	function toggleForm() {
		setVisibleForm(!visibleForm);
	}

	function changeHandler(e) {
		let field = Object.assign({}, newField),
			necessaryInputs = ['id', 'firstName', 'lastName', 'email', 'phone'],
			flag;

		field[e.target.name] = e.target.value;
		flag = necessaryInputs.reduce( (acc, cur) => acc += field[cur] === '' ? 1 : 0, 0);
		setDisable(!!flag);
		setNewField(field);
	}

	if (visibleForm)
		return (
			<div>
				<div className={'addFormBg'} onClick={toggleForm}> </div>
				<div className="addFormWrap">
					<form onSubmit={submitHandler} className={'addForm'}>
						<h2>Add form</h2>
						Id:<input onChange={changeHandler} type="text" name='id' value={newField.id}/>
						First name:<input onChange={changeHandler} type="text" name='firstName' value={newField.firstName}/>
						Last name:<input onChange={changeHandler} type="text" name='lastName' value={newField.lastName}/>
						Email:<input onChange={changeHandler} type="email" name='email' value={newField.email}/>
						Phone:<input onChange={changeHandler} type="text" name='phone' value={newField.phone}/>
						<button type='submit' disabled={disable}>Add field</button>
						<button onClick={toggleForm} disabled={!fetchedData.length}>Close form</button>
					</form>
				</div>
			</div>
		);
	else
		return (
			<button onClick={toggleForm} disabled={!fetchedData.length}>Add form</button>
		)
};

export default AddForm