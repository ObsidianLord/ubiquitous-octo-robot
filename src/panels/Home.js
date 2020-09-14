import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

const Home = ({ id, go }) => (
    <Panel id={id} centered>
        <PanelHeader>Пожертвования</PanelHeader>
        <Div style={{textAlign: "center"}}>
            <Div>
                <Text weight="regular">У Вас пока нет сборов.</Text>
                <Text weight="regular">Начните доброе дело.</Text>
            </Div>
            <Div>
                <Button size="l" onClick={go} data-to="type-choose">Создать Сбор</Button>
            </Div>
        </Div>
    </Panel>
);

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Home;
