import {platform, IOS} from '@vkontakte/vkui';
import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

export default class DetailsEditForm extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            id: data.id,
            go: data.go,
            fundName: ""
        };

        this.onFundNameChange = this.onFundNameChange.bind(this)
    }

    componentDidMount() {
    }

    onFundNameChange() {
    }

    render() {
        return (
            <Panel id={this.state.id}>
                <PanelHeader
                    left={<PanelHeaderButton onClick={this.state.go} data-to="back">
                              {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                          </PanelHeaderButton>}
                >
                    Целевой сбор
                </PanelHeader>
                <FormLayout style={{paddingBottom: 60}}>
                    <Input
                        top="Название сбора"
                        name="Название сбора"
                        value={this.state.fundName}
                        onChange={this.onFundNameChange}
                    />
                    <Input
                        type="number"
                        top="Сумма"
                        name="Сколько нужно собрать"
                        value={this.state.fundName}
                        onChange={this.onFundNameChange}
                    />
                    <Input
                        top="Цель"
                        name="Например, лечение человека"
                        value={this.state.fundName}
                        onChange={this.onFundNameChange}
                    />
                    <Textarea
                        top="Описание"
                        placeholder="На что пойдут деньги и как они кому-то помогут?"
                    />
                </FormLayout>
                <FixedLayout vertical="bottom">
                    <Div>
                        <Button size="l" stretched>Далее</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}
