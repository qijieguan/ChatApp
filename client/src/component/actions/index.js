export const setFriends = data => {
    return {
        type: 'SET_FRIENDS',
        payload: data
    }
}

export const addFriend = id => {
    return {
        type: 'ADD_FRIEND',
        payload: id
    }
}

export const deleteFriend = id => {
    return {
        type: 'DELETE_FRIEND',
        payload: id
    }
}
