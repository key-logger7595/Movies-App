import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './NewForm.css';

export default class NewForm extends Component {

    state = {

        data:{
           title:"",
           genre:"",
           stock:"",
           rate:""
        }    
    }
    onSubmitHandler = (e) => {
      e.preventDefault();
      let newObj = {
          ...this.state.data
      }
      this.props.onDataSubmit(newObj); 
      console.log(this.state.data);
    }
    onDataChangeHandler = (e) =>{ 
       let id = e.currentTarget.id ;
       let value = e.target.value;
       console.log(id+""+value);
       let newObj = {...this.state.data} ;
       newObj[id] = value;
       this.setState({
           data:newObj
       })
    }


    render() {
        return(
        <div className="container">
            <form onSubmit={this.onSubmitHandler}>

                <label htmlFor="Title">Title</label>
                <input type="text" id="title" placeholder="Movie Title.." value={this.title} onChange={this.onDataChangeHandler} ></input>

                <label htmlFor="Genre">Genre</label>
                <select id="genre" value={this.genre} onChange={this.onDataChangeHandler} >
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Thriller">Thriller</option>
                </select>

                <label htmlFor="Stock">Stock</label>
                <input type="number" id="stock" value={this.stock} onChange={this.onDataChangeHandler}></input>
               
                <label htmlFor="Rate">Rate</label>
                <input type="number" id="rate" value={this.rate} onChange={this.onDataChangeHandler} ></input>
                    
                <input type="submit" value="Submit" ></input>

            </form>
            <button>
                <Link to="/home">Home</Link>
            </button>
        </div>
        )

    }
}
