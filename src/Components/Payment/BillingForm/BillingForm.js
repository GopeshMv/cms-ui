import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./BillingForm.css";

function BillingForm({billingCompleted}) {
    const [countries, setCountries] = useState([]);

    const [billingForm, setBillingForm] = useState({
        name: '',
        address: '',
        addressL2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
            setCountries(data.countries);
            setBillingForm({
                ...billingForm,
                country: data.userSelectValue
        });
        });
    }, []);
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBillingForm({
            ...billingForm,
            [name]: value
        });
    };

    const handleCountryChange = (value, actionMeta) => {
        setBillingForm({
            ...BillingForm,
            country: value
        });
        console.log(value);
    }

    const handleSubmit = (event) => {
        billingCompleted(true);
    }

    return (
        <form className="BillingForm" onSubmit={handleSubmit}>
            <div className="BillingFormHeader">
                <span className="FormTitle">Payment</span>
                <span className="FormDetail">Billing Information</span>
            </div>
            <div className="BillingBody">
                <div className="BillingDetails">
                    <label for="billingName" className="BillingLabel">Name</label>
                    <input type="text" id="billingName" name="name" className="BillingTextBox" value={billingForm.name} onChange={handleChange}></input>

                    <label for="billingAddress" className="BillingLabel">Billing Address</label>
                    <input type="text" id="billingAddress" name="address" className="BillingTextBox" value={billingForm.address} onChange={handleChange}></input>

                    <label for="billingAddressL2" className="BillingLabel">Billing Address, Line 2</label>
                    <input type="text" id="billingAddressL2" name="addressL2" className="BillingTextBox" value={billingForm.addressL2} onChange={handleChange}></input>

                    <div className="BillingDualContainer">
                        <div className="BillingDualItem">
                            <label for="city" className="BillingLabel">City</label>
                            <input type="text" id="city" name="city" className="BillingSmallTextBox" value={billingForm.city} onChange={handleChange}></input>
                        </div>
                        <div className="BillingDualItem">
                            <label for="state" className="BillingLabel">State/Province</label>
                            <input type="text" id="state" name="state" className="BillingSmallTextBox" value={billingForm.state} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="BillingDualContainer">
                        <div className="BillingDualItem">
                            <label for="zip" className="BillingLabel">Zip or Postal Code</label>
                            <input type="text" id="zip" name="zip" className="BillingSmallTextBox" value={billingForm.zip} onChange={handleChange}></input>
                        </div>
                        <div className="BillingDualItem">
                            <label for="country" className="BillingLabel">Country</label>
                            <Select id="country" name="country" className="BillingSmallTextBox" options={countries} value={billingForm.country} onChange={handleCountryChange} 
                            
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    color: 'black'
                                  }),
                                menuList: (base) => ({
                                    ...base,
                                    height: '150px',
                                  }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected? '#4C9AFF': 'white',
                                    padding: '5px 10px',
                                    color: 'black'
                                })
                            }}/>
                        </div>
                    </div>

                    <div className="BillingLastSection">
                        <button type="submit" className="BillingNextButton">
                            <span className="BillingNext">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BillingForm; 