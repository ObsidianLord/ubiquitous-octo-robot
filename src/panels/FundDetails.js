import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import View from '@vkontakte/vkui/dist/components/View/View';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';



import './FundDetails.css'

// import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import cat from '../img/cat.png';

const FUND_GOAL = 10000;
const TICK_INTERVAL = 6;

class FundDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      interval: null,
      isInnerDivTooShort: true,
      isOuterDivTooShort: false,
    };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.tick();
    }, TICK_INTERVAL);
    this.setState({
      interval
    });
  }

  tick() {
    this.checkWidth();
    if (this.state.progress < FUND_GOAL) {
      this.setState({
        progress: this.state.progress + 1
      });
    } else {
      clearInterval(this.state.interval);
    }
  }

  progressWidth() {
    return `${100 * this.state.progress / FUND_GOAL}%`
  }

  checkWidth() {
    if (this.state.isInnerDivTooShort) {
      const div = document.getElementById('progress-inner-div');
      const text = document.getElementById('current-text-inner');
      if (div && text) {
        const divWidth = div.clientWidth;
        const textWidth = text.clientWidth;
        if (textWidth + 65 <= divWidth) {
          this.setState({
            isInnerDivTooShort: false
          });
        }
      }
    }
    if (!this.state.isOuterDivTooShort) {
      const innerDiv = document.getElementById('progress-inner-div');
      const outerDiv = document.getElementById('progress-outer-div');
      const text = document.getElementById('goal-text');
      if (innerDiv && outerDiv && text) {
        const innerDivWidth = innerDiv.clientWidth;
        const outerDivWidth = outerDiv.clientWidth;
        const textWidth = text.clientWidth;
        if (textWidth + 10 > outerDivWidth - innerDivWidth) {
          this.setState({
            isOuterDivTooShort: true
          });
        }
      }
    }
  }

  outerTextPosition() {
    const div = document.getElementById('progress-inner-div');
    if (div) {
      const divWidth = div.clientWidth;
      return `${divWidth + 10}px`;
    }
    return 0;
  }

  formattedSum(sum) {
    return `${new Intl.NumberFormat().format(sum)} ₽`
  }

  render() {
    return (
      <View id={this.props.id} header={false}>
        <Panel>
          <img src={cat} height="140" style={{display: 'block', width: '100%', objectFit: 'cover'}}></img>
          <Group separator="show">
            <Div>
              <Title level="1" weight="bold" style={{ marginBottom: 4 }}>Добряши помогают котикам</Title>
              <Headline weight="medium" style={{ marginBottom: 4 }}>Headline medium</Headline>
              <Text weight="regular">Text regular</Text>
            </Div>
          </Group>
          <Group separator="show">
            <Div>
              <Text weight="regular" style={{ marginBottom: 6 }}>Text regular</Text>
              
              <div id='progress-outer-div' className='fund-details__progress-outer'>
                <Text
                  id='current-text-outer'
                  weight="regular"
                  style={{position: 'absolute', left: this.outerTextPosition()}}
                  className={!this.state.isInnerDivTooShort ? 'd-none' : ''}
                >{this.formattedSum(this.state.progress)}</Text>
                <Text id='goal-text' weight="regular" className={
                  this.state.progress === FUND_GOAL ? 'd-none' :
                  (this.state.isOuterDivTooShort ? 'text-raised' : '')
                }>{this.formattedSum(FUND_GOAL)}</Text>
                <div id='progress-inner-div' className='fund-details__progress-inner' style={{
                  width: this.progressWidth()
                }}>
                  <Text id='current-text-inner' weight="regular" className={
                    this.state.progress === FUND_GOAL ? 'text-center d-block' :
                    (this.state.isInnerDivTooShort ? 'd-none' : '')
                  }>
                    {this.formattedSum(this.state.progress) + (this.state.progress === FUND_GOAL ? ' собраны!' : '')}
                  </Text>
                </div>
              </div>
            </Div>
          </Group>
          <Group separator="show">
            <Div>
              <Text weight="regular">
                Привет-привет, добряш!
              </Text>
            </Div>
          </Group>
          <Group separator="show">
            <Div>
              <Text weight="regular">
                Привет-привет, добряш!
              </Text>
            </Div>
          </Group>
          <Separator wide />
          <FixedLayout vertical="bottom">
            <Separator wide />
          </FixedLayout>
        </Panel>
      </View>
    )
  }
}

export default FundDetails;