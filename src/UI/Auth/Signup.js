import React, { Component } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from '../../../axios';

export default class Signup extends Component {
  state = {
    signUpForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
      },
    },
    loading: false,
  };

  signUpFormSubmit = ( event ) => {
    event.preventDefault();
    this.setState( { loading: true } );
    const formData = {};
    for (let formElementIdentifier in this.state.signUpForm) {
        formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
    }
    const contact = {
        contact: formData
    }
    console.log(contact)
    axios.post( '/studentsContacts.json', contact )
        .then( response => {
            this.setState( { loading: false } );
            this.props.history.push( '/' );
        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
}

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedSignupForm = {
        ...this.state.signUpForm
    };
    const updatedFormElement = { 
        ...updatedSignupForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedSignupForm[inputIdentifier] = updatedFormElement;
    this.setState({signUpForm: updatedSignupForm});
}

  render() {
    const formElementsArray = [];
    for (let key in this.state.signUpForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signUpForm[key],
      });
    }

    let form = (
      <form onSubmit={this.signUpFormSubmit}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
         <Button btnType="Success">SUBMIT</Button>
      </form>
    );

    return (
      <div>
        {form}
       
      </div>
    );
  }
}
