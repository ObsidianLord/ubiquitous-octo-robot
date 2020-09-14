export const store = {
    name: null,
    price: null,
    goal: null,
    description: null,
    paymentAccount: null,
    author: null,
    imageSource: null
};

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
