import { Component } from 'react';

class Hello extends Component {
    state = {userinput:'',password:'',itemsList:[]}


    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const response = await fetch("https://sample-frontend-and-backend.vercel.app/users");
        const data = await response.json()
        console.log(data);
        this.setState({itemsList:data})
    };

    updateData = async () => {
        const {userinput,password} = this.state
        const data = {
            userinput,
            password
        }
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // stringify the JSON data
        };
        const response = await fetch("https://sample-frontend-and-backend.vercel.app/users", options);
        if(response.ok)
        console.log("Password Updated Successfully");
        else
        console.log("Failed to updated password");
    }

    postData = async () => {
        const {userinput,password} = this.state
        const data = {
            userinput,
            password
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // stringify the JSON data
        };
        const response = await fetch("https://sample-frontend-and-backend.vercel.app/users", options);
        if(response.ok)
        console.log("User inserted Successfully");
        else
        console.log("Failed to insert user");
    };

    onChangeUsername = (event) => {
        this.setState({userinput:event.target.value});
    }

    onDelete = async () => {
        console.log("I am Called");
        const { userinput } = this.state;
        console.log(userinput)
        const options = {
            method: "DELETE"
        };
        const response = await fetch(`https://sample-frontend-and-backend.vercel.app/users/${userinput}`, options);
        if (response.ok) {
            console.log("User deleted successfully");
        } else {
            console.error("Failed to delete user");
        }
    };


    onChangePassword = (event) => {
        this.setState({password : event.target.value})
    }
    
    onSubmitForm = (event) => {
        event.preventDefault();
        // this.onInsertData();
        this.updatedData();
        this.setState({userinput:'',password:''})
    }

    // onDelete = async () => {
    //     console.log("I am Called")
    //     const {userinput} = this.state
    //     const options = {
    //         method : "DELETE"   
    //     }
    //     const response = await fetch(`http://localhost:8085/users/${userinput}`,options)
    //     const data = await response.json()
    //     console.log(data);
    // }

    render() {
        const {userinput,password,itemsList} = this.state
        // this.postData();
        return (
            <>
            <h1>Hello</h1>
            {itemsList.map((ele) => <p>{ele.username},{ele.password}</p>)}
            <p>Delete User</p>
            <input type="text" onChange={this.onChangeUsername} value={userinput}/>
            <button type="button" onClick={this.onDelete}>Delete</button> 
            <form onSubmit={this.postData}>
                Username : <input type="text" onChange={this.onChangeUsername} value={userinput}/>
                Password : <input type="password" onChange={this.onChangePassword} value={password}/>
                <button type="submit">Add User</button>
            </form>
            </>
        );
    }
}

export default Hello;
