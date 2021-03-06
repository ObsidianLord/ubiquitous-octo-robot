import React from 'react';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';

import { getStore } from '../store';
import moment from 'moment';

export default class Snippet extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            description: "",
            progressText: data.progressText ? data.progressText : "Помогите первым",
            progressValue: data.progressValue ? data.progressValue : 0,
            fundName: data.fundName ? data.fundName : "Добряши помогают котикам",
            author: data.author ? data.author : "Матвей Правосудов",
            buttonDisabled: data.go ? false : true,
            go: data.go,
        };
    }

    render() {
        return (
            <Card size="l" mode="outline">
                { getStore().imageSource &&
                <img src={getStore().imageSource}
                    height={140} width="100%" style={{objectFit: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10}} alt="Girl in a jacket"/>}
                <SimpleCell
                  disabled
                  description={getStore().author + (getStore().endsDate ? ` · Закончится через ${moment(getStore().endsDate).diff(moment(), 'days')} дней` : '')}
                  >
                    <Text weight="semibold">
                        {getStore().name}
                    </Text>
                </SimpleCell>
                <Separator />
                <SimpleCell        
                  disabled
                  after={<Button disabled={this.state.buttonDisabled} onClick={this.state.go} data-to="fund-details" mode="outline" style={{marginRight: 0, marginLeft: 10}}>Помочь</Button>}
                  description={<Progress value={this.state.progressValue} />}
                  >
                    <Subhead weight="regular">
                        {this.state.progressText}
                    </Subhead>
                </SimpleCell>
            </Card>
        )
    }
}
