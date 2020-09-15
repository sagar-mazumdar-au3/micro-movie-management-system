const axios = require('axios');

export function getMovies(year) { // year is optional
    let url = "http://www.omdbapi.com/?apikey=32395055&type=movie&s=bad";

    if (year)
        url = `${url}&y=${year}`;

    return async (dispatch) => {
        try {
            const response = await axios.get(url);
            if (response.data.Response) {
                return dispatch({ type: 'MOVIES', payload: response.data.Search });
            } else {
                return dispatch({ type: 'ERROR', payload: response.data.Error });
            }
        } catch (error) {
            return dispatch({ type: 'ERROR', payload: "Something went wrong ..." });
        }

    }
}

export function checkedListArray(list, exp) {
    if (exp === 'AddToMyList')
        return { type: 'ADD-TO-MY-LIST', payload: list };
    else if (exp === 'AddToMyWatchedList')
        return { type: 'ADD-TO-MY-WATCHED-LIST', payload: list };
    else if (exp === 'RemoveFromMyList') {
        return { type: 'REMOVE-FROM-MY-WATCHED-LIST', payload: list };
    }
}
