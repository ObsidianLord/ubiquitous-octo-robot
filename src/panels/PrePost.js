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


import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';

import '@vkontakte/vkui/dist/vkui.css';

import Snippet from './Snippet';
import { store } from '../store';

const osName = platform();

export default class PrePost extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            id: data.id,
            go: data.go,

            description: ""
        };

        this.onDescriptionChange = this.onDescriptionChange.bind(this)
    }

    onDescriptionChange(event) {
        store.description = event.target.value;
        this.setState({
            description: event.target.value
        });
    }

    render() {
        return (
            <Panel id={this.state.id}>
                <PanelHeader
                  left={<PanelHeaderButton onClick={this.state.go} data-to="back">
                            {osName === IOS ? <Icon28CancelCircleOutline/> : <Icon28CancelOutline/>}
                        </PanelHeaderButton>}
                >
                    Матвей
                </PanelHeader>
                <FormLayout style={{paddingBottom: 60}}>
                  <Textarea
                    placeholder="Что у вас нового?"
                    onChange={this.onDescriptionChange}
                  />
                  <Div>
                    <Snippet/>
                  </Div>
                </FormLayout>
                <FixedLayout vertical="bottom" filled>
                    <Div>
                        <Button size="xl" stretched onClick={this.state.go} data-to="feed">Опубликовать</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}
