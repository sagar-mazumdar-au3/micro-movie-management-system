export function addToList(list, exp) {
    if (exp === 'AddToMyList') {
        return { type: 'ADD-TO-MY-LIST', payload: list };
    }
    else if (exp === 'AddToMyWatchedList'){
        return { type: 'ADD-TO-MY-WATCHED-LIST', payload: list };
    }
    else if (exp === 'RemoveFromMyList') {
        return { type: 'REMOVE-FROM-MY-LIST', payload: list };
    }
    else if (exp === 'RemoveFromMyWatchedList') {
        return { type: 'REMOVE-FROM-MY-WATCHED-LIST', payload: list };
    }
}
