import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Icon28CalendarOutline from "@vkontakte/icons/dist/28/calendar_outline";
import Icon28TargetOutline from "@vkontakte/icons/dist/28/target_outline";

import {store} from '../store'
import {fundTypes} from '../store'

const TypeChoose = ({ go }) => (
	<Panel id={id} styles={{background: 'black'}} centered={true}>
		<PanelHeader>Тип сбора</PanelHeader>
		<Group title="Fund type choose buttons">
			<Banner
				before={<Icon28TargetOutline fill={"royalblue"}/>}
				header="Целевой сбор"
				subheader="Когда есть определённая цель"
				asideMode="expand"
				onClick={(event) => { store.fundTypes = fundTypes.GOAL; go(event) }}
				data-to="details-edit-form"
			/>
			<Banner
				before={<Icon28CalendarOutline fill={"royalblue"}/>}
				header="Регулярный сбор"
				subheader="Если помощь нужна ежемесячно"
				asideMode="expand"
				onClick={(event) => { store.fundTypes = fundTypes.REGULAR; go(event) }}
				data-to="details-edit-form"
			/>
		</Group>
	</Panel>
);

TypeChoose.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default TypeChoose;
