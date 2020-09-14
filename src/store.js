export const store = {
    name: null,
    price: null,
    goal: null,
    endsDate: null,
    description: null,
    paymentAccount: null,
    author: 'Матвей Правосудов',
    authorValue: 'm',
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
