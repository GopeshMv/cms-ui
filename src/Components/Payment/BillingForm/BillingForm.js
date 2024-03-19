import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./BillingForm.css";

function BillingForm() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
    }, []);

    return (
        <form className="BillingForm">
            <div className="BillingFormHeader">
                <span className="FormTitle">Payment</span>
                <span className="FormDetail">Billing Information</span>
            </div>
            <div className="BillingBody">
                <div className="BillingDetails">
                    <label for="billingName" className="BillingLabel">Name</label>
                    <input type="text" id="billingName" name="name" className="BillingTextBox"></input>

                    <label for="billingAddress" className="BillingLabel">Billing Address</label>
                    <input type="text" id="billingAddress" name="address" className="BillingTextBox"></input>

                    <label for="billingAddressL2" className="BillingLabel">Billing Address, Line 2</label>
                    <input type="text" id="billingAddressL2" name="addressL2" className="BillingTextBox"></input>

                    <div className="BillingDualContainer">
                        <div className="BillingDualItem">
                            <label for="city" className="BillingLabel">City</label>
                            <input type="text" id="city" name="city" className="BillingSmallTextBox"></input>
                        </div>
                        <div className="BillingDualItem">
                            <label for="state" className="BillingLabel">State/Province</label>
                            <input type="text" id="state" name="state" className="BillingSmallTextBox"></input>
                        </div>
                    </div>
                    <div className="BillingDualContainer">
                        <div className="BillingDualItem">
                            <label for="zip" className="BillingLabel">Zip or Postal Code</label>
                            <input type="text" id="zip" name="zip" className="BillingSmallTextBox"></input>
                        </div>
                        <div className="BillingDualItem">
                            <label for="country" className="BillingLabel">Country</label>
                            <Select id="country" name="country" className="BillingSmallTextBox" options={countries} value={selectedCountry} onChange={(selectedOption) => setSelectedCountry(selectedOption)} 
                            
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
                        <div className="BillingNextButton">
                            <span className="BillingNext">Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default BillingForm; 