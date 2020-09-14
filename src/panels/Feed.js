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
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import Icon28CancelCircleOutline from '@vkontakte/icons/dist/28/cancel_circle_outline';
import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';

import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';

import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';

import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';
import Icon28MessageOutline from '@vkontakte/icons/dist/28/message_outline';
import Icon28ClipOutline from '@vkontakte/icons/dist/28/clip_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';

import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24CommentOutline from '@vkontakte/icons/dist/24/comment_outline';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon20ViewOutline from '@vkontakte/icons/dist/20/view_outline';



import '@vkontakte/vkui/dist/vkui.css';
import { getStore, fundTypes } from '../store.js';
import avatar from '../img/avatar-1.png';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Snippet from './Snippet';

const osName = platform();

export default class Feed extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            id: data.id,
            go: data.go,
        };
    }

    render() {

        const feedElement = (
                    <Card size="l" mode="outline">
                        <SimpleCell
                          description="час назад"
                          before={<Avatar src={avatar}/>}
                          after={<Icon24MoreHorizontal fill="var(--dynamic_gray)"/>}
                        >
                          Артур Стамбульцян
                        </SimpleCell>
                        <Div>
                            <Text style={{marginBottom: 12}}>
                                {getStore().description}
                            </Text>
                            <Snippet go={this.state.go} progressValue={80} progressText={getStore().fundType === fundTypes.GOAL  ? 'Собрано 8 750 ₽ из 10 000 ₽' : 'Собрано в сентябре 8 750 ₽'}/>
                        </Div>
                        <Div style={{paddingTop: 0}}>
                            <div style={{  display: "flex", textAlign: "center", alignItems: "center"}}>
                                <Icon24LikeOutline fill={"var(--content_placeholder_icon)"}/>
                                <div style={{paddingRight: "5px", color: "var(--content_placeholder_icon)"}}>65</div>
                                <Icon24CommentOutline fill={"var(--content_placeholder_icon)"}/>
                                <div style={{paddingRight: "5px", color: "var(--content_placeholder_icon)"}}>65</div>
                                <Icon24ShareOutline fill={"var(--content_placeholder_icon)"}/>
                                <div style={{paddingRight: "5px", color: "var(--content_placeholder_icon)"}}>24</div>
                                <div style={{flexGrow:1, textAlign: "right", alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
                                        <Icon20ViewOutline fill={"var(--content_placeholder_icon)"}/>
                                        <div style={{color: "var(--content_placeholder_icon)"}}>
                                            7.2K
                                        </div>
                                </div>
                            </div>
                            

                        </Div>
                    </Card>)
        return (
            <Panel id={this.state.id} style={{}}>
                <PanelHeader
                  left={<PanelHeaderButton>
                          <Icon28CameraOutline/>
                        </PanelHeaderButton>}
                  right={<PanelHeaderButton><Icon28Notifications/></PanelHeaderButton>}
                  separator={false}
                >
                <Tabs>
                    <TabsItem selected
                      after={<Icon16Dropdown fill="var(--accent)" style={{
                        transform: `rotate(${this.state.contextOpened ? '180deg' : '0'})`
                      }}/>}>Новости</TabsItem>
                    <TabsItem>Интересное</TabsItem>
                  </Tabs>
                </PanelHeader>
                <div style={{paddingBottom: 72, backgroundColor: "var(--background_page)"}}>
                    {feedElement}
                    <Div/>
                    {feedElement}
                </div>
                <FixedLayout vertical="bottom" filled>
                    <Tabbar>
                        <TabbarItem
                          selected
                          text="Новости"
                        ><Icon28NewsfeedOutline /></TabbarItem>
                        <TabbarItem
                          text="Сервисы"
                        ><Icon28ServicesOutline /></TabbarItem>
                        <TabbarItem
                          text="Сообщения"
                        ><Icon28MessageOutline /></TabbarItem>
                        <TabbarItem
                          text="Клипы"
                        ><Icon28ClipOutline /></TabbarItem>
                        <TabbarItem
                          text="Профиль"
                        ><Icon28Profile /></TabbarItem>
                    </Tabbar>
                </FixedLayout>
            </Panel>
        )
    }
}
