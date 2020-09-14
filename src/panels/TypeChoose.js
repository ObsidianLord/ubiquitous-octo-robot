import {platform, IOS} from '@vkontakte/vkui';
import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Icon28CalendarOutline from "@vkontakte/icons/dist/28/calendar_outline";
import Icon28TargetOutline from "@vkontakte/icons/dist/28/target_outline";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import {setStore} from '../store'
import {fundTypes} from '../store'

const osName = platform();

const TypeChoose = ({ id, go }) => (
    <Panel id={id} centered={true}>
        <PanelHeader
            left={<PanelHeaderButton onClick={go} data-to="back">
                      {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                  </PanelHeaderButton>}
        >
            Тип сбора
        </PanelHeader>
        <Group title="Fund type choose buttons">
            <Banner
                before={<Icon28TargetOutline fill={"royalblue"}/>}
                header="Целевой сбор"
                subheader="Когда есть определённая цель"
                asideMode="expand"
                onClick={(event) => { setStore({fundType: fundTypes.GOAL}); go(event) }}
                data-to="details-edit-form-goal"
            />
            <Banner
                before={<Icon28CalendarOutline fill={"royalblue"}/>}
                header="Регулярный сбор"
                subheader="Если помощь нужна ежемесячно"
                asideMode="expand"
                onClick={(event) => { setStore({fundType: fundTypes.REGULAR}); go(event) }}
                data-to="details-edit-form-regular"
            />
        </Group>
    </Panel>
);

TypeChoose.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default TypeChoose;
