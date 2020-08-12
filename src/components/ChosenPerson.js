import React from "react";

const ChosenPerson = ({info}) => {
	if (Object.keys(info).length === 0)
		return (<></>);
	return (
		<div className='info'>
			<div>You chose <b>{info.firstName} {info.lastName}</b></div>
			<div className="description"><b>Description: </b>
				<div>{info.description}</div>
			</div>
			<div className="address">
				<div className="streetAddress"><b>Street address: </b>{info.address.streetAddress}</div>
				<div className="city"><b>City: </b>{info.address.city}</div>
				<div className="state"><b>State: </b>{info.address.state}</div>
				<div className="zip"><b>Zip: </b>{info.address.zip}</div>
			</div>
		</div>
	)
};

export default ChosenPerson