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
import Card from '@vkontakte/vkui/dist/components/Card/Card';


import '@vkontakte/vkui/dist/vkui.css';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {store, authors} from "../store";
import {rippleEffect} from "../utils";
import './Persik.css'
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import Icon56GalleryOutline from "@vkontakte/icons/dist/56/gallery_outline";
import File from "@vkontakte/vkui/dist/components/File/File";

const REGULAR_FORM_ID = "details-edit-form-regular"

const osName = platform();

export default class DetailsEditForm extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            id: data.id,
            go: data.go,

            imageLoaded: false,
            imageSource: undefined,

            name: undefined,
            price: undefined,
            goal: undefined,
            description: undefined,
            paymentAccount: undefined,
            author: undefined
        };

        this.onImageUpload = this.onImageUpload.bind(this)
        this.onFundNameChange = this.onFundNameChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onGoalChange = this.onGoalChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onPaymentAccountChange = this.onPaymentAccountChange.bind(this)
        this.onAuthorChange = this.onAuthorChange.bind(this)
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
                store.imageSource = imageUrl
            };
            reader.readAsDataURL(files[0])
        }
    }

    onFundNameChange(event) {
        const name = event.target.value
        store.name = name
        this.setState({name: name})
    }

    onPriceChange(event) {
        let price = event.target.value
        if (price === "") {
            price = undefined
        }

        store.price = price
        this.setState({price: price})
    }

    onGoalChange(event) {
        let goal = event.target.value
        if (goal === "") {
            goal = undefined
        }

        store.goal = goal
        this.setState({goal: goal})
    }

    onDescriptionChange(event) {
        let description = event.target.value
        if (description === "") {
            description = undefined
        }

        store.description = description
        this.setState({description: description})
    }

    onPaymentAccountChange(event) {
        let paymentAccount = event.target.value
        store.paymentAccount = paymentAccount
        this.setState({paymentAccount: paymentAccount})
    }

    onAuthorChange(event) {
        const author = event.target.value
        store.author = author
        this.setState({author: author})
    }

    canSubmitForm() {
        const nameDefined = this.state.name !== undefined && this.state.name !== ""
        const priceDefined = this.state.price !== undefined && this.state.price !== ""
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
                            <img id={'image'} src={this.state.imageSource} alt={'loaded image'}
                                 style={{maxWidth: '100%', height: 'auto'}}/>
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
                                    <Icon56GalleryOutline fill={'royalblue'} height={22} width={22}/>
                                    <Title style={{color: 'royalblue'}}>Загрузить обложку</Title>
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
                        type="number"
                        top="Сумма"
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
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    {this.state.id === REGULAR_FORM_ID &&
                    <Select
                        top="Автор"
                        value={this.state.author}
                        onChange={this.onAuthorChange}
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
                                onClick={this.state.go} data-to="additional-details-edit-form">
                            Далее
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}
