import React, { Component } from 'react';
import Nav from '../front/nav';
import './stores.css';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SerialNumber: '',
            Brand: '',
            Color: '',
            Item: '',
            Price:'',
            Description:'',
            successmsg:'',
            showalert:false,
            showsuccess:false,
            addError:'',
            imagepath:[],
            file:null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChange = this.fileChange.bind(this);
    }
    fileChange=(e)=>{
        console.log(e.target.files[0]);
        this.setState({
            file:e.target.files[0]
        })
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            showalert:false,
            showsuccess:false
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        const fd = new FormData();
        fd.append('file',this.state.file);
      const stores = {
            serialnumber: this.state.SerialNumber,
            rand: this.state.Brand,
            color: this.state.Color,
            description: this.state.Description,
            Item: this.state.Item,
            price: this.state.Price,
            imagepath:this.state.imagepath
        }
        
        //console.log(customer)
        e.preventDefault();
            fetch("http://localhost:4000/stores/newitem", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer' + authToken
                },
                body:fd
            });
            fetch("http://localhost:4000/stores/newdetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body:JSON.stringify(stores)
            })
            .then(res => res.json())
           .then(json => {
                if (json.success) {
                    console.log(json.msg)
                    this.setState({
                        showsuccess:true,
                        addError:json.msg
                   })
                  this.resetForm();
                } else {
                    console.log(json.msg)
                    this.setState({
                        showalert:true,
                       addError:json.msg
                    })
                }
            })
               
         
    }
     alert() {
        if (this.state.showalert) {
            return (
                <div className="alert text-center bg-danger" role="alert">
                    <span>{this.state.addError}</span>
                </div>
            )
        }
        if (this.state.showsuccess) {
            return (
                <div className="success text-center bg-success" role="alert">
                    <span>{this.state.addError}</span>
                </div>
            )
        }
    }
    resetForm = () => {
        this.setState({
            ...this.state,
            SerialNumber: '',
            Brand: '',
            Color: '',
            Item: '',
            Price:'',
            Image:'',
            Description:'',
        })
    } 
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                    <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlInput1"> Serial Number :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="SerialNumber" placeholder=" Serial Number" value={this.state.SerialNumber} onChange={this.handleChange} required />
                        </div>
                        
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleFormControlInput1">Color :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="Color" placeholder="Color" value={this.state.Color} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Brand :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="Brand" placeholder="Brand" value={this.state.Brand} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Item :</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="Item" value={this.state.Item} onChange={this.handleChange} required>
                                <option >--Select Item--</option>
                                <option value="voice">voice</option>
                                <option value="router">Router</option>
                                <option value="peo-tv">peo-tv</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Image :</label>
                            <input type="file" className="form-control" id="exampleFormControlInput1" name="Image" onChange={this.fileChange} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Price :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="Price" placeholder="Price in Rupees" value={this.state.Price} onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Description :</label>
                            <input type="textarea" className="form-control" id="exampleFormControlInput1" name="Description" placeholder="Description" value={this.state.Description} onChange={this.handleChange} />
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        <Nav />
                    </div>
                    <div className="container-fluid">
                        <h3 className="title">NEW-ITEM</h3>
                        <div className="row content">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-8">
                            <hr />
                            <div>
                                {this.alert()}
                            </div>
                                <div>
                                    {this.formfield()}
                                </div>
                            <hr />
                            </div>
                            <div className="col-md-2">
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Stores;