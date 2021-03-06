var store = {
    name: null,
    price: null,
    goal: null,
    endsDate: null,
    description: null,
    fundType: null,
    paymentAccount: null,
    author: 'Матвей Правосудов',
    imageSource: null
};

export function getStore() {
    return store;
}

export function setStore(storePart) {
    store = { ...store, ...storePart }
    return store
}

export const fundTypes = {
    GOAL: 'GOAL',
    REGULAR: 'REGULAR',
}

export const paymentAccounts = [
    {value: 'm', title: 'Счёт VK Pay · 1234'},
    {value: 'f', title: 'Счёт VK Pay · 4567'}
]

export const authors = [
    {value: 'm', title: 'Матвей Правосудов'},
    {value: 'f', title: 'Кирилл Левосудов'}
]
