import React, { Component } from 'react'
import { sortByStock } from '../temp/MovieServices'
import Genres from './Genres'
import Navbar from './Navbar'
import Pagination from './Pagination'
import TableData from './TableData'

export default class MoviesPage extends Component {
    state = {
        genres: [{ id: Date.now(), name: "All Genres" }],
        currentSearchItem: "",
        sortIncreasing: false,
        sortDecreasing: false,
        limit: 4,
        currentPage: 1,
        currentGenre: "All Genres"
    }
    sortIncreasingFunction = () => {
        this.setState({
            sortIncreasing: !this.state.sortIncreasing,
            sortDecreasing: false

        })
    }

    sortDecreasingFunction = () => {
        this.setState({
            sortIncreasing: false,
            sortDecreasing: !this.state.sortDecreasing

        })
    }


    inputSearchFunction = (e) => {
        let curr = e.target.value;
        console.log(curr);

        this.setState({
            currentSearchItem: curr
        })
    }

    changeLimit = (e) => {
        let currentLimit = e.target.value;
        if (currentLimit < 1) {
            return;
        }
        this.setState({
            limit: currentLimit
        })
    }

    changeCurrentPage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }
    async componentDidMount() {


        let response = await fetch("https://react-backend101.herokuapp.com/genres");
        let jsonGenre = await response.json();
        this.setState({

            genres: [...this.state.genres, ...jsonGenre.genres]
        })

    }
    changeGenre = (name) => {
        this.setState({
            currentGenre: name,
            currentSearchItem: ""
        })
    }
    render() {
        let {currentSearchItem, sortIncreasing, sortDecreasing, limit, currentPage, genres, currentGenre } = this.state;
        let movies = this.props.movies
        let fileterdMovies = movies;

        //checking for which genre it is currently and
        //filtering according to that genre first.

        if (currentGenre !== "All Genres") {
            console.log("currentGenre" + currentGenre);
            fileterdMovies = fileterdMovies.filter(movieObj => {
                return movieObj.genre.name === currentGenre
            })
        }

        if (currentSearchItem !== "") {
            fileterdMovies = movies.filter((movieObj) => {
                let title = movieObj.title.trim().toLowerCase();
                return title.includes(currentSearchItem.toLowerCase())
            })
        }

        // here we will write logic for sorting up and down 
        if (sortIncreasing) {
            sortByStock(0, fileterdMovies, movies);
        }
        if (sortDecreasing) {
            sortByStock(-1, fileterdMovies, movies);
        }


        let numberofPage = Math.ceil(fileterdMovies.length / limit);
        let pageNumberArr = []
        for (let i = 0; i < numberofPage; i++) {
            pageNumberArr.push(i + 1);
        }
        // impliment
        let si = (currentPage - 1) * limit;
        let eidx = si + limit;
        fileterdMovies = fileterdMovies.slice(si, eidx);
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col-3">
                        <Genres genres={genres} currentGenre={currentGenre} changeGenre={this.changeGenre} />
                    </div>
                    <div className="col-9">
                        <input type="search" name="" id="" value={currentSearchItem}

                            onChange={this.inputSearchFunction} />
                        <input type="number" className="col-1"
                            placeholder="no of elements/page"
                            value={limit}
                            onChange={this.changeLimit}
                        />
                        <TableData
                            sortIncreasingFunction={this.sortIncreasingFunction}
                            sortDecreasingFunction={this.sortDecreasingFunction}
                            fileterdMovies={fileterdMovies}
                            deleteHandler={this.deleteHandler}
                        />
                        <Pagination pageNumberArr={pageNumberArr} currentPage={currentPage} changeCurrentPage={this.changeCurrentPage} />
                    </div>
                </div>
            </div>
        )
    }
}

