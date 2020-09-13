import React from 'react';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';


export default class Snippet extends React.Component {
    constructor(data) {
        super(data)

        this.state = {
            description: "",
            progressText: data.progressTest ? data.progressTest : "Помогите первым",
            progressValue: data.progressValue ? data.progressValue : 0,
            fundName: data.fundName ? data.fundName : "Добряши помогают котикам",
            author: data.author ? data.author : "Матвей Правосудов",
            buttonDisabled: data.onClick ? false : true,
            onClick: data.onClick,
        };
    }

    render() {
        return (
            <Card size="l">
                <img src="https://cdn.mos.cms.futurecdn.net/hFm4iWXhbw4c4rdcMH8tUD-320-80.jpg"
                    height={140} width="100%" style={{objectFit: "cover"}} alt="Girl in a jacket"/>
                <SimpleCell
                  disabled
                  description={this.state.author + " · Закончится через 5 дней"}
                  >
                    <Text weight="semibold">
                        {this.state.fundName}
                    </Text>
                </SimpleCell>
                <Separator />
                <SimpleCell        
                  disabled
                  after={<Button disabled={this.state.buttonDisabled} onClick={this.state.onClick} mode="outline" style={{marginRight: 0}}>Помочь</Button>}
                  description={<Progress value={this.state.progressValue} />}
                  >
                    {this.state.progressText}
                </SimpleCell>
            </Card>
        )
    }
}
