export const setFriends = item => {
    return {
        type: 'SET_FRIENDS',
        payload: item
    }
}

export const addFriend = item => {
    return {
        type: 'ADD_FRIEND',
        payload: item
    }
}
