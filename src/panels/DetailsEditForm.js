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
import Select from '@vkontakte/vkui/dist/components/Select/Select';

import '@vkontakte/vkui/dist/vkui.css';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

export default class DetailsEditForm extends React.Component {
    constructor(data) {
        super(data)

        if (data.id == "details-edit-form-regular") {

        }

        this.state = {
            id: data.id,
            go: data.go,

            fundName: "",
            fundMoney: null,
            targetName: "",
            description: ""
        };
    }

    render() {
        return (
            <Panel id={this.state.id}>
                <PanelHeader
                  left={<PanelHeaderButton onClick={this.state.go} data-to="back">
                            {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </PanelHeaderButton>}
                >
                    {this.state.id == "details-edit-form-regular" ? "Регулярный сбор" : "Целевой сбор"}
                </PanelHeader>
                <FormLayout style={{paddingBottom: 60}}>
                    <Input
                      top="Название сбора"
                      placeholder="Название сбора"
                      value={this.state.fundName}
                      onChange={(e) => this.setState({fundName: e.target.value})}
                    />
                    <Input
                      type="number"
                      top="Сумма"
                      placeholder="Сколько нужно собрать"
                      value={this.state.fundName}
                      onChange={(e) => this.setState({fundName: e.target.value})}
                    />
                    <Input
                      top="Цель"
                      placeholder="Например, лечение человека"
                      value={this.state.targetName}
                      onChange={(e) => this.setState({targetName: e.target.value})}
                    />
                    <Textarea
                      top="Описание"
                      placeholder="На что пойдут деньги и как они кому-то помогут?"
                      value={this.state.description}
                      onChange={(e) => this.setState({description: e.target.value})}
                    />
                    <Select
                      top="Куда получать деньги"
                      value={this.state.moneyCard}
                      onChange={(e) => this.setState({moneyCard: e.target.value})}
                    >
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    {this.state.id == "details-edit-form-regular" && 
                        <Select
                          top="Куда получать деньги"
                          value={this.state.author}
                          onChange={(e) => this.setState({author: e.target.value})}
                        >
                            <option value="m">Матвей Правосудов</option>
                            <option value="f">Женский</option>
                        </Select>
                    }
                </FormLayout>
                <FixedLayout vertical="bottom" filled>
                    <Div>
                        <Button size="xl" stretched>Далее</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}
