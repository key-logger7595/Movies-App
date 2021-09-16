import React, { Component } from 'react'
import MoviesPage from './components/MoviesPage';
import {Redirect,Switch,Route} from 'react-router-dom';
import NewForm from './components/NewForm';


export default class App extends Component {
  
  state ={
    movies: [],
  }

  deleteHandler = (objId) => {
    let filteredArr = this.state.movies.filter((movieObj) => {
        return movieObj._id
            !== objId
    })
    this.setState({
        movies: filteredArr
    })
  }
  
  onDataSubmit = (newObj)=>{

   let{title,genre,rate,stock} = newObj ;
   
   let genreArr = [{ _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
   { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
   { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" }];


   for(let i=0;i<genreArr.length;i++){
     if(genreArr[i].name===genre){
       genre = genreArr[i];
     }
   }


   let newMovieObj ={
    _id: Date.now(),
    title: title,
    genre: genre,
    numberInStock: stock,
    dailyRentalRate:rate
   }   

   let newMoviesArr = [...this.state.movies,newMovieObj];
   this.setState({
     movies:newMoviesArr
   }) 
  }
  async componentDidMount() {
    let newPromise = await fetch("https://react-backend101.herokuapp.com/movies");
    let jsonMovies = await newPromise.json();

    this.setState({
      movies: jsonMovies.movies,
    })

}


  render() 
  {
    return (

       <Switch>
         <Route path="/NewForm" render={(props)=>{

          return <NewForm onDataSubmit={this.onDataSubmit}/>
         }}/>
          <Redirect from="/home" to="/"/>
         <Route exact path ="/" render={(props)=>{
           return <MoviesPage {...props} movies={this.state.movies} deleteHandler={this.deleteHandler} />
         }}/>
        
       </Switch>
        
    )
  }
}

