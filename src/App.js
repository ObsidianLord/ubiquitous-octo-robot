import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import { store } from './store';
import TypeChoose from "./panels/TypeChoose";

export default class App extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            activePanel: "home",
        };

        // window.onpopstate = function(event) {
        //     if (state.history.length > 0) {
        //         const pair = state.history.pop();
        //         setState({
        //             activeStory: pair.story,
        //             activePanel: pair.panel,
        //             prev_story: obj.state.activeStory
        //         });
        //     } else {
        //     }
        // }
        this.go = this.go.bind(this);
    }

    go(event){
        this.setState({
            activePanel: event.currentTarget.dataset.to
        });
    };

    componentDidMount() {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
        // async function fetchData() {
        //     const user = await bridge.send('VKWebAppGetUserInfo');
        //     setUser(user);
        //     setPopout(null);
        // }
        // fetchData();
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Home id='home' go={this.go} />
                <Persik id='persik' go={this.go} />
                <TypeChoose id='type-choose' go={this.go} />
            </View>
        )
    }
}
