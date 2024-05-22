function testLength(value, length)
{
	let strValue = String(value);
	return strValue.length === length;
}

function testNumber(value)
{
	return !isNaN(value);
}

function validateControl(control, name)
{
	let controlValue = control.value;
	if (name == "CVC") 
	{
		if (testNumber(controlValue)) 
		{
			return true;
		} 
		else 
		{
			alert(`Error: ${name} must be a number.`);
			return false;
		}
	} 
	else 
	{
		if (!testNumber(controlValue)) 
		{
			return true;
		} 
		else 
		{
			alert(`Error: ${name} must be a string.`);
			return false;
		}
	}
}

function validateCreditCard(value)
{
	value=value.replace(/\s+/g, '');
	if(testNumber(value))
	{
		if(value[0] == 3)
		{
			if(testLength(value,15))
			{
				return true;
			}
			else
			{
				alert("Error: Card Number must be the correct length for card type.");
				return false;
			}
		}
		else if(value[0] == 6 ||value[0] == 5||value[0] == 4)
		{
			if(testLength(value,16))
			{
				return true;
			}
			else
			{
				alert("Error: Card Number must be the correct length for card type.");
				return false;
			}
		}
		else
		{
			alert("Error: Card Number must begin with valid type number.");
			return false;
		}
	}
	else
	{
		alert("Error: Credit Card Number must be a number");
		return false;
	}
}

function validateDate(value)
{
	let temp = new Date();
	value=new Date(value);
	if(value<temp)
	{
		alert("Error: Cannot select an expired date.");
		return false;
	}
	else
	{
		return true;
	}
}

function validateEmail(value)
{
	let emailRegex=  /^\S+@\S+\.\S+$/;
	if(emailRegex.test(value))
	{
		return true;
	}
	else
	{
		alert("Error: Enter a valid email address");
		return false;
	}
}

function validateCarType(control)
{
if(!(control[0].checked || control[1].checked || control[2].checked || control[3].checked))
	{
		alert("Error: Please select a car type");
		return false;
	}
	else return true;
	
}

function validateState(value)
{
	if(value == 0)
	{
		alert("Error: Select a valid state location");
		return false
	}
	else return true;
}

function validateDateTime(value)
{
	let current = new Date();
	current.setMinutes(current.getMinutes() - current.getTimezoneOffset());
	if(value == current.toISOString().slice(0, 16))
	{
	return true;
	}
	else
	{
		alert("Error: Enter a current time");
	}
}

function validateDropOffTime(pickUpTime, dropOffTime)
{
	if(pickUpTime > dropOffTime)
	{
		alert("Error: Pick Up Time cannot be\n   after Drop Off Time");
		return false;
	}
	else return true;
}

function validateForm()
{
	
	//validate control calls
	let fName=document.getElementById("fname");
	if( validateControl(fName, fName.name))
	{
		let nName=document.getElementById("lname");
		if (validateControl(nName, nName.name))
		{
		
			let cardName=document.getElementById("cardName");
			if (validateControl(cardName,cardName.name))
			{
			
				let CVC=document.getElementById("cvc");
				if (validateControl(CVC,CVC.name))
				{
				
					//validate credit card
					let cardNumber=document.getElementById("cardNumber");
					if (validateCreditCard(cardNumber.value))
					{
					
						//validate date
						let expireDate=document.getElementById("expire").value;
						if(validateDate(expireDate))
						{
						
							//validate email
							let email=document.getElementById("eaddress").value;
							if(validateEmail(email))
							{
							
								//validate car type
								let car=document.getElementsByName("type");
								if(validateCarType(car))
								{
								
									//validate state calls
									let pickUp=document.getElementById("pickUp").selectedIndex;
									if(validateState(pickUp))
									{
									
										let dropOff=document.getElementById("dropOff").selectedIndex;
										if(validateState(dropOff))
										{
										
										//validate time calls
											let pickUpTime=document.getElementById("pickUpTime").value;
											if(validateDateTime(pickUpTime))
											{
												
												let dropOffTime=document.getElementById("dropOffTime").value;
												if(validateDropOffTime(pickUpTime,dropOffTime))
												{
													alert("Payment Has Been Submitted!");
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	else return false;
}