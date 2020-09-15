import {
    createStore
} from 'redux';
import {
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    // Movies
    movies: [],
    myList: [],

    // Error
    error: { error: false, message: '' }
}

const reducer = (state = initialState, action) => {
    let copyOfState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'MOVIES': {
            copyOfState.movies = action.payload;
            copyOfState.error.error = false;
            copyOfState.error.message = "";
            return copyOfState;
        }
        case 'ERROR': {
            copyOfState.error.error = true;
            copyOfState.error.message = action.payload;
            return copyOfState;
        }
        case 'ADD-TO-MY-LIST': {
            const checkedList = action.payload;
            checkedList.forEach(index => {
                const movie = copyOfState.movies[index];
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
            const checkedList = action.payload;
            checkedList.forEach(index => {
                const movie = copyOfState.movies[index];
                let alreadyPresent = false;
                let presentAt;

                for (let i = 0; i < copyOfState.myList.length; i++) {
                    if (copyOfState.myList[i].imdbID === movie.imdbID) {
                        alreadyPresent = true;
                        presentAt = i;
                        break;
                    }
                }

                if (alreadyPresent) {
                    copyOfState.myList[presentAt].watched = true;
                } else {
                    movie.watched = true;
                    copyOfState.myList.unshift(movie);
                }
            });
            return copyOfState;
        }
        case 'REMOVE-FROM-MY-WATCHED-LIST': {
            const checkedList = action.payload;
            const imdbIDList = [];
            let copyOfMyList = [...copyOfState.myList];
            checkedList.forEach(index => {
                imdbIDList.push(copyOfMyList[index].imdbID);
            });
           
            imdbIDList.forEach(imdbID => {
                copyOfMyList = copyOfMyList.filter(element => {
                    return element.imdbID !== imdbID;
                }); 
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