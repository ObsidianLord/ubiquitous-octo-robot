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

const REGULAR_FORM_ID = "details-edit-form-regular"

const osName = platform();

export default class DetailsEditForm extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            id: data.id,
            go: data.go,

            name: undefined,
            price: undefined,
            goal: undefined,
            description: undefined,
            paymentAccount: undefined,
            author: undefined
        };
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
                <Div>
                    <Card size="l">
                        <div style={{height: 140}}/>
                    </Card>
                </Div>
                <FormLayout style={{paddingBottom: 60}}>
                    <Input
                        top="Название сбора"
                        placeholder="Название сбора"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                    />
                    <Input
                        type="number"
                        top="Сумма"
                        placeholder="Сколько нужно собрать"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                    />
                    <Input
                        top="Цель"
                        placeholder="Например, лечение человека"
                        value={this.state.goal}
                        onChange={(e) => this.setState({goal: e.target.value})}
                    />
                    <Textarea
                        top="Описание"
                        placeholder="На что пойдут деньги и как они кому-то помогут?"
                        value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}
                    />
                    <Select
                        top="Куда получать деньги"
                        value={this.state.paymentAccount}
                        onChange={(e) => this.setState({paymentAccount: e.target.value})}
                    >
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    {this.state.id === REGULAR_FORM_ID &&
                    <Select
                        top="Автор"
                        value={this.state.author}
                        onChange={(e) => this.setState({author: e.target.value})}
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
                        <Button size="xl" stretched onClick={this.state.go} data-to="additional-details-edit-form">
                            Далее
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}
