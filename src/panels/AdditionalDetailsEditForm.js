import React from 'react';

import {store} from '../store'
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import {IOS, platform} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";

const osName = platform();

export default class AdditionalDetailsEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            go: props.go,
            store: store,

            availableAuthors: [
                {value: 'm', title: 'Матвей Правосудов'},
                {value: 'f', title: 'Женский'}
            ],

            fundEndsDefined: false,
            endsDate: undefined,
            displayDatePicker: false,
        }

        this.state = {
            ...this.state,

            author: this.state.availableAuthors[0].title,
            defaultAuthor: this.state.availableAuthors[0].value
        }

        this.onAuthorChosen = this.onAuthorChosen.bind(this)
        this.onFundEndsChosen = this.onFundEndsChosen.bind(this)
        this.onDateChosen = this.onDateChosen.bind(this)
        this.dateToFormat = this.dateToFormat.bind(this)
        this.canSubmitForm = this.canSubmitForm.bind(this)
    }

    componentDidMount() {
    }

    onAuthorChosen(event) {
        const {name, value} = event.currentTarget;
        this.state.availableAuthors.forEach(author => {
            if (value === author.value) {
                store.author = author.title
                this.setState({
                    ...this.state,
                    author: author.title
                })
            }
        });
    }

    onFundEndsChosen(event, fundEndsAtExactDate) {
        this.setState({
            ...this.state,
            fundEndsDefined: true,
            displayDatePicker: fundEndsAtExactDate
        })
    }

    onDateChosen(event) {
        const {name, value} = event.currentTarget
        console.log("onDateChosen")
    }

    dateToFormat(date) {
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    }

    canSubmitForm() {
        const authorDefined = this.state.author !== undefined
        const endsDateDefined = this.endsDate !== undefined
        const mustPickDate = this.state.displayDatePicker

        return authorDefined && this.state.fundEndsDefined && (!mustPickDate || endsDateDefined)
    }

    render() {
        return (
            <Panel id={this.state.id}>
                <PanelHeader
                    left={<PanelHeaderButton onClick={this.state.go} data-to="back">
                        {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </PanelHeaderButton>}
                >
                    Дополнительно
                </PanelHeader>
                <FormLayout style={{paddingBottom: 60}}>

                    <Select top="Автор"
                            defaultValue={this.state.defaultAuthor}
                            onChange={this.onAuthorChosen}
                            value={this.state.author}
                            name={"author"}
                    >
                        {
                            this.state.availableAuthors.map(author =>
                                (<option value={author.value}>{author.title}</option>)
                            )
                        }
                    </Select>

                    <FormLayoutGroup top="Сбор завершится">
                        <Radio onChange={(event) => this.onFundEndsChosen(event, false)} name="type">Когда соберём
                            сумму</Radio>
                        <Radio onChange={(event) => this.onFundEndsChosen(event, true)} name="type">В определённую
                            дату</Radio>
                    </FormLayoutGroup>

                    {
                        this.state.displayDatePicker &&
                        <Input type="date"
                               top="Сбор завершится"
                               placeholder="Выберите дату"
                               name={"dateEnds"}
                               min={this.dateToFormat(new Date)}
                               onChange={this.onDateChosen}
                               required
                        />
                    }

                </FormLayout>

                <FixedLayout vertical="bottom">
                    <Div>
                        <Button size="xl" stretched disabled={!this.canSubmitForm()}>Создать сбор</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        );
    }
}
