import { API_URL } from './constants.js'

const authKeyName = "user";

function GetDefaultHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(authKeyName),
    };
}

export async function getAllUsers() {
    const response = await fetch(API_URL + "/users/", {
        headers: GetDefaultHeaders()
    });

    if (response.ok) {
        return await response.json()
    }

    throw Error("Failed to getAllUsers().");
}

export async function updateUsers(action, ids) {
    const request = {
        action: action,
        ids: ids,
    };

    const response = await fetch(API_URL + "/users/", {
        method: "POST",
        headers: GetDefaultHeaders(),
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        throw Error("Failed to updateUsers().")
    }
}