export const store = {
    name: undefined,
    price: undefined,
    goal: undefined,
    description: undefined,
    paymentAccount: undefined,
    author: undefined,

    imageSource: undefined
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
