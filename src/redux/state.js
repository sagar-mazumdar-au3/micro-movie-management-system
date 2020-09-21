import {
    createStore
} from 'redux';
import {
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    // Movies
    myList: []
}

const reducer = (state = initialState, action) => {
    //let copyOfState = Object.assign(state);
    let copyOfState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'ADD-TO-MY-LIST': {
            const moviesList = action.payload;
            moviesList.forEach(movie => {
                let alreadyPresent = false;
                for (let i = 0; i < copyOfState.myList.length; i++) {
                    if (copyOfState.myList[i].imdbID === movie.imdbID) {
                        alreadyPresent = true;
                        break;
                    }
                }

                if (!alreadyPresent) {
                    copyOfState.myList.unshift(movie);
                }
            });
            return copyOfState;
        }
        case 'ADD-TO-MY-WATCHED-LIST': {
            const moviesList = action.payload;
            let copyOfMyList = [...copyOfState.myList];
            moviesList.forEach(movie => {
                let alreadyPresent = false;
                let presentAt;

                for (let i = 0; i < copyOfMyList.length; i++) {
                    if (copyOfMyList[i].imdbID === movie.imdbID) {
                        alreadyPresent = true;
                        presentAt = i;
                        break;
                    }
                }

                if (alreadyPresent) {
                    copyOfMyList[presentAt].watched = true;
                    copyOfState.myList = copyOfMyList;
                } else {
                    movie.watched = true;
                    copyOfState.myList.unshift(movie);
                }
            });

            return copyOfState;
        }
        case 'REMOVE-FROM-MY-LIST': {
            const moviesList = action.payload;
            let copyOfMyList = [...copyOfState.myList];
            moviesList.forEach(movie => {
                copyOfMyList = copyOfMyList.filter(element => {
                    return element.imdbID !== movie.imdbID;
                }); 
            });
            
            copyOfState.myList = copyOfMyList;
            return copyOfState;
        }
        case 'REMOVE-FROM-MY-WATCHED-LIST': {
            const moviesList = action.payload;
            let copyOfMyList = [...copyOfState.myList];
            moviesList.forEach(movie => {
                for(let i = 0; i< copyOfMyList.length;i++){
                    if(movie.imdbID === copyOfMyList[i].imdbID)
                    delete copyOfMyList[i].watched;
                }
            });
            
            copyOfState.myList = copyOfMyList;
            return copyOfState;
        }
        default:
            return state;
    }
}

// Store
const store = createStore(reducer, applyMiddleware(thunk));
export default store;
