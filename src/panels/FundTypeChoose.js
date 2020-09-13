import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Icon28CalendarOutline from "@vkontakte/icons/dist/28/calendar_outline";
import Icon28TargetOutline from "@vkontakte/icons/dist/28/target_outline";

const FundTypeChoose = () => (
	<Panel id={id} styles={{background: 'black'}} centered={true}>
		<PanelHeader>Тип сбора</PanelHeader>
		<Group title="Fund type choose buttons">
			<Banner
				before={<Icon28TargetOutline fill={"royalblue"}/>}
				header="Целевой сбор"
				subheader="Когда есть определённая цель"
				asideMode="expand"
				onClick={() => console.log('[Podcast banner] onClick')}
			/>
			<Banner
				before={<Icon28CalendarOutline fill={"royalblue"}/>}
				header="Регулярный сбор"
				subheader="Если помощь нужна ежемесячно"
				asideMode="expand"
				onClick={() => console.log('[Podcast banner] onClick')}
			/>
		</Group>
	</Panel>
);

FundTypeChoose.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default FundTypeChoose;
