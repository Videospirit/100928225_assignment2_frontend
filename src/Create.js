import React, { Component } from 'react'
import axios from 'axios';



export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailId: '',
            employee: []
        }
    }



    componentDidMount = () => {
        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    emailId: response.data.emailId
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        employee: response.data.map(employee => employee.firstName),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    readData = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    
    submitForm = (e) => {

        const employees = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        }

        console.log(employees);

        axios.post('http://localhost:9090/api/v1/employees/', employees)
            .then(res => console.log(res.data));

    }

    render() {
        return (
            <div>
                <h2>Create a new employee</h2>
                <br />
                <form onSubmit={this.submitForm} action="/view">

                    <label>First Name </label>
                    <input type="text" required name="firstName" value={this.state.firstName} onChange={this.readData}/>
                    <br/>
                        
                    <label>Last Name </label>
                    <input type="text" required name="lastName" value={this.state.lastName} onChange={this.readData}/>
                    <br/>

                    <label>Email Address</label>
                    <input type="text" required name="emailID" value={this.state.emailId} onChange={this.readData}/>
                    <br/>

                    <input type="submit" value="Submit"/>
                    <a href="/view"><button>Cancel</button> </a>
                </form>
            </div>
        )
    }
}
