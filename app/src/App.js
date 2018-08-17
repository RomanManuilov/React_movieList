import React, { Component } from 'react';
import moviesData from './moviesData.js'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'


class MovieListWillWatch extends Component{
    render(){
        const {arrMovies} = this.props;
        return(
            arrMovies.map((item)=>
                <div className='movie-watch-item list-group-item'>
                    <div>{item.title}</div>
                    <div>{item.vote_average}</div>
                </div>
            )
        )
    }
}

class MovieItem extends Component{
    state={
        buttonColor: false
    }
    render(){
        const {dataBaseItem} = this.props;
        return(
            <div className='movie-item'>
                <img className='movie-item__img' src={'https://image.tmdb.org/t/p/w500' + dataBaseItem.backdrop_path} />
                <div className='movie-item__title'>{dataBaseItem.title}</div>
                <div className='movie-item-nav'>
                    <div className='movie-item-nav__rating'>Rating: {dataBaseItem.vote_average}</div>
                    <button className={this.state.buttonColor ? 'movie-item-nav__btn btn btn-success' : 'movie-item-nav__btn btn btn-secondary'} onClick={this.heandleClick}>Will Watch</button>
                </div>
            </div>
        )
    }
    heandleClick=()=>{
        this.props.newUpdateData(this.props.dataBaseItem)
        this.setState({
            buttonColor: !this.state.buttonColor
        })
    }

}

class MovieList extends Component{
    render(){
        const {database} = this.props;
        const newUpdateData = this.props.updateData;
        return(
            database.map((item)=>
                <div className='movie' key={item.id}>
                    <MovieItem dataBaseItem={item} newUpdateData={newUpdateData}/>
                </div>
            )
        )
    }
}

class App extends Component {
        state = {
            arrMovies: []
        }

    updateData = (value) =>{
        console.log(value)
        let elem = this.state.arrMovies.some((item) =>{
                return item.title === value.title
            }
        )
        console.log(this.state.arrMovies)
        if(elem){
            this.state.arrMovies.forEach((item , index)=>{
                if(item.title === value.title){
                    this.state.arrMovies.splice(index, 1)
                }
            })
        } else {
            this.state.arrMovies.push(value)
        }
        this.setState({
            arrMovies: this.state.arrMovies
        })

    }
  render() {
    return (
        <div className='movie-container'>
            <div className='movie-list-container'>
                <div className='movie-list'>
                    <MovieList database={moviesData} updateData={this.updateData} />
                </div>
            </div>
           <div className='movie-watch-container'>
               <div className='movie-watch__title'>Will Watch: {this.state.arrMovies.length} movies</div>
               <MovieListWillWatch arrMovies={this.state.arrMovies}/>
           </div>
        </div>
    );
  }
}
export default App;
