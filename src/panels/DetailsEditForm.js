import {IOS, platform} from '@vkontakte/vkui';
import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';


import '@vkontakte/vkui/dist/vkui.css';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {authors, getStore, paymentAccounts, setStore} from "../store";
import {rippleEffect} from "../utils";
import './Persik.css'
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import Icon24DismissOverlay from '@vkontakte/icons/dist/24/dismiss_overlay';
import Icon56GalleryOutline from "@vkontakte/icons/dist/56/gallery_outline";
import File from "@vkontakte/vkui/dist/components/File/File";

const REGULAR_FORM_ID = "details-edit-form-regular"
const GOAL_FORM_ID = "details-edit-form-goal"

const osName = platform();

const NUMBER_FORMAT = new Intl.NumberFormat('ru-RU')

export default class DetailsEditForm extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            id: data.id,
            go: data.go,

            imageLoaded: !!getStore().imageSource,
            imageSource: getStore().imageSource,

            name: getStore().name,
            price: (getStore().price == null) ? null : NUMBER_FORMAT.format(getStore().price) + ' ₽',
            goal: getStore().goal,
            description: getStore().description,
            paymentAccount: getStore().paymentAccount,

            author: getStore().author ? getStore().author : authors[0].title,
            authorValue: getStore().author ? authors.filter(author => author.title === getStore().author).value : authors[0].value
        };
        setStore({author: this.state.author})

        this.onImageUpload = this.onImageUpload.bind(this)
        this.onFundNameChange = this.onFundNameChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onGoalChange = this.onGoalChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onPaymentAccountChange = this.onPaymentAccountChange.bind(this)
        this.onAuthorChosen = this.onAuthorChosen.bind(this)
        this.canSubmitForm = this.canSubmitForm.bind(this)
    }

    onImageUpload(event) {
        let component = this
        let target = event.target

        let files = target.files
        if (files && files[0]) {
            const reader = new FileReader()
            reader.onload = function (e) {
                const imageUrl = e.target.result
                component.setState({
                    imageLoaded: true,
                    imageSource: imageUrl
                })
                setStore({imageSource: imageUrl})
            };
            reader.readAsDataURL(files[0])
        }
    }

    onFundNameChange(event) {
        const name = event.target.value
        setStore({name: name})
        this.setState({name: name})
    }

    onPriceChange(event) {
        let price = event.target.value
        if (!price || price === "") {
            setStore({price: null})
            this.setState({price: null})
            return
        }

        const actualPrice = NUMBER_FORMAT.format(getStore().price) + ' ₽'
        if (price.length + 1 === actualPrice.length && getStore().price != null) { // one character deleted
            price = getStore().price.toString()
            price = price.substring(0, price.length - 1)
            if (price.length === 0) {
                setStore({price: null})
                this.setState({price: ''})
                return
            }
        }

        const purePrice = price
            .replace(/\s+₽/g, '')
            .replace(/\s+/g, '')

        const containsInvalidCharacters = !purePrice.match(/^\d+$/g)
        if (containsInvalidCharacters) {
            price = NUMBER_FORMAT.format(getStore().price) + ' ₽'
            this.setState({price: price})
        } else {
            price = NUMBER_FORMAT.format(purePrice) + ' ₽'
            setStore({price: parseInt(purePrice)})
            this.setState({price: price})
        }
    }

    onGoalChange(event) {
        let goal = event.target.value
        if (goal === "") {
            goal = undefined
        }

        setStore({goal: goal})
        this.setState({goal: goal})
    }

    onDescriptionChange(event) {
        let description = event.target.value
        if (description === "") {
            description = undefined
        }

        setStore({description: description})
        this.setState({description: description})
    }

    onPaymentAccountChange(event) {
        let paymentAccountValue = event.target.value
        paymentAccounts.forEach(paymentAccount => {
            if (paymentAccountValue === paymentAccount.value) {
                setStore({paymentAccount: paymentAccount.title})
                this.setState({author: paymentAccount.title, authorValue: paymentAccount.value})
            }
        });
    }

    onAuthorChosen(event) {
        const authorValue = event.target.value
        authors.forEach(author => {
            if (authorValue === author.value) {
                setStore({author: author.title})
                this.setState({author: author.title, authorValue: author.value})
            }
        });
    }

    resetImage() {
        getStore().imageSource = null;
        this.setState({
            imageLoaded: false,
            imageSource: null
        });
    }

    canSubmitForm() {
        const nameDefined = this.state.name && this.state.name !== ""
        const priceDefined = this.state.price && this.state.price !== ""
        const paymentAccountDefined = true // default value always chosen
        const authorDefined = true // default value always chosen

        return nameDefined && priceDefined && paymentAccountDefined && authorDefined
    }

    render() {
        return (
            <Panel id={this.state.id}>
                <PanelHeader
                    left={
                        <PanelHeaderButton onClick={this.state.go} data-to="back">
                            {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </PanelHeaderButton>
                    }
                >
                    {this.state.id === REGULAR_FORM_ID ? "Регулярный сбор" : "Целевой сбор"}
                </PanelHeader>
                <div id={'file'}>
                    {this.state.imageLoaded ?
                        (
                            <div style={{margin: '0 12px', position: 'relative'}}>
                                <img id={'image'} src={this.state.imageSource} alt={'loaded image'}
                                     style={{
                                         display: 'block',
                                         height: '170px',
                                         objectFit: 'cover',
                                         width: '100%',
                                         margin: '11px 0',
                                         borderRadius: '10px'
                                     }}/>
                                <div style={{position: 'absolute', right: 8, top: 8}}>
                                    <Icon24DismissOverlay onClick={() => {
                                        this.resetImage()
                                    }}/>
                                </div>
                            </div>
                        ) :
                        (
                            <File controlSize={'xl'}
                                  accept={'image/jpeg, image/png'}
                                  style={{padding: 0, margin: 0, background: 'transparent'}}
                                  onChange={this.onImageUpload}>
                                <Div
                                    onClick={rippleEffect}
                                    style={{
                                        height: '140px',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        border: '2px #3F8AE0', borderStyle: 'dashed', borderRadius: '10px'
                                    }}
                                >
                                    <Icon56GalleryOutline fill={'var(--accent)'} height={22} width={22} style={{marginRight: 11}}/>
                                    <Title style={{color: 'var(--accent)', marginBottom: 2}}>Загрузить обложку</Title>
                                </Div>
                            </File>
                        )
                    }
                </div>
                <FormLayout style={{paddingBottom: 60}}>
                    <Input
                        top="Название сбора"
                        placeholder="Название сбора"
                        value={this.state.name}
                        onChange={this.onFundNameChange}
                    />
                    <Input
                        type="tel"
                        top="Сумма, ₽"
                        placeholder="Сколько нужно собрать"
                        value={this.state.price}
                        onChange={this.onPriceChange}
                    />
                    <Input
                        top="Цель"
                        placeholder="Например, лечение человека"
                        value={this.state.goal}
                        onChange={this.onGoalChange}
                    />
                    <Textarea
                        top="Описание"
                        placeholder="На что пойдут деньги и как они кому-то помогут?"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <Select
                        top="Куда получать деньги"
                        value={this.state.paymentAccount}
                        onChange={this.onPaymentAccountChange}
                    >
                        {
                            paymentAccounts.map(option =>
                                (<option key={option.value} value={option.value}>{option.title}</option>)
                            )
                        }
                    </Select>

                    {this.state.id === REGULAR_FORM_ID &&
                    <Select
                        top="Автор"
                        value={this.state.authorValue}
                        onChange={this.onAuthorChosen}
                    >
                        {
                            authors.map(author =>
                                (<option value={author.value}>{author.title}</option>)
                            )
                        }
                    </Select>
                    }
                </FormLayout>
                <FixedLayout vertical="bottom" filled>
                    <Div>
                        <Button size="xl" stretched disabled={!this.canSubmitForm()}
                                onClick={this.state.go}
                                data-to={this.state.id === GOAL_FORM_ID ? 'additional-details-edit-form' : 'pre-post'}>
                            Далее
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}
