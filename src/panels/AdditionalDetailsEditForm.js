import React from 'react';

import {authors, store} from '../store'
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import {IOS, platform} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import dateToFormat from "../utils";

const osName = platform();

export default class AdditionalDetailsEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            go: props.go,

            fundEndsDefined: false,
            endsDate: null,
            displayDatePicker: false,
        }

        this.state = {
            ...this.state,

            author: authors[0].title,
            authorValue: authors[0].value
        }

        this.onAuthorChosen = this.onAuthorChosen.bind(this)
        this.onFundEndsChosen = this.onFundEndsChosen.bind(this)
        this.onDateChosen = this.onDateChosen.bind(this)
        this.canSubmitForm = this.canSubmitForm.bind(this)
    }

    componentDidMount() {
    }

    onAuthorChosen(event) {
        const authorValue = event.currentTarget.value;
        authors.forEach(author => {
            if (authorValue === author.value) {
                store.author = author.title
                this.setState({author: author.title, authorValue: author.value})
            }
        });
    }

    onFundEndsChosen(event, fundEndsAtExactDate) {
        this.setState({
            fundEndsDefined: true,
            displayDatePicker: fundEndsAtExactDate
        })
    }

    onDateChosen(event) {
        this.setState({
            endsDate: event.currentTarget.value
        })
        store.endsDate = event.currentTarget.value
    }

    canSubmitForm() {
        const authorDefined = this.state.author !== null
        const endsDateDefined = this.state.endsDate !== null
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
                            value={this.state.authorValue}
                            onChange={this.onAuthorChosen}
                    >
                        {
                            authors.map(author =>
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
                               min={dateToFormat(new Date())}
                               className={this.state.endsDate ? 'full' : ''}
                               value={this.endsDate}
                               onChange={this.onDateChosen}
                               required
                        />
                    }

                </FormLayout>

                <FixedLayout vertical="bottom" filled>
                    <Div>
                        <Button size="xl" stretched
                                onClick={this.state.go} data-to="pre-post"
                                disabled={!this.canSubmitForm()}>
                            Создать сбор
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
        );
    }
}
