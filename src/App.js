import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import TypeChoose from "./panels/TypeChoose";
import DetailsEditForm from './panels/DetailsEditForm';
import AdditionalDetailsEditForm from "./panels/AdditionalDetailsEditForm";
import PrePost from './panels/PrePost';
import Feed from './panels/Feed';

import FundDetails from './panels/FundDetails';

export default class App extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            activePanel: "home",
            history: []
        };

        const state = this.state
        const changeActivePanel = this.changeActivePanel.bind(this)
        window.onpopstate = function(event) {
            if (state.history.length > 0) {
                changeActivePanel("back")
            } else {
            }
        }
        this.go = this.go.bind(this);
    }

    changeActivePanel(toPanel) {
        if (toPanel == "back") {
            const previousPanel = this.state.history.pop()
            console.log("BACK TO " + previousPanel)
            this.setState({
                activePanel: previousPanel
            })
        } else {
            this.state.history.push(this.state.activePanel)
            window.history.pushState({}, "")
            this.setState({
                activePanel: toPanel
            });
        }
    }

    go(event){
        const toPanel = event.currentTarget.dataset.to
        this.changeActivePanel(toPanel)
    };

    componentDidMount() {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
                const status_bar = schemeAttribute.value.includes("light") ? "dark" : "light"
                bridge.send("VKWebAppSetViewSettings", {"status_bar_style": status_bar});
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
            <View activePanel={this.state.activePanel} header={this.state.activePanel !== 'fund-details'}>
                <Home id='home' go={this.go} />
                <Persik id='persik' go={this.go} />
                <TypeChoose id='type-choose' go={this.go} />
                <DetailsEditForm id='details-edit-form-regular' go={this.go} />
                <DetailsEditForm id='details-edit-form-goal' go={this.go} />
                <AdditionalDetailsEditForm id='additional-details-edit-form' go={this.go} />
                <PrePost id='pre-post' go={this.go} />
                <Feed id='feed' go={this.go} />
                <FundDetails id='fund-details'/>
            </View>
            // <View activePanel={this.state.activePanel}>
            //     <FundDetails id='fundDetails' go={this.go} />
            //     <Home id='home' go={this.go} />
            //     <Persik id='persik' go={this.go} />
            // </View>
        )
    }
}
