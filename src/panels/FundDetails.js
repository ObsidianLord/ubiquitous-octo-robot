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
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';



import Icon28SmileOutline from '@vkontakte/icons/dist/28/smile_outline';
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

import Icon16LikeOutline from '@vkontakte/icons/dist/16/like_outline';

import moment from 'moment';

import './FundDetails.css'

// import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import cat from '../img/cat.png';
import { Input } from '@vkontakte/vkui';
import { store } from '../store';

const TICK_INTERVAL = 10;

class FundDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      interval: null,
      isInnerDivTooShort: true,
      isOuterDivTooShort: false,
      price: store.price
    };
  }

  componentDidMount() {
    const step = Math.floor(this.state.price / (60000 / TICK_INTERVAL)) ?? 1;
    const interval = setInterval(() => {
      this.tick(step);
    }, TICK_INTERVAL);
    this.setState({
      interval
    });
  }

  tick(step) {
    this.checkWidth();
    if (this.state.progress < this.state.price) {
      this.setState({
        progress: this.state.progress + step
      });
    } else {
      this.setState({
        progress: this.state.price
      });
      clearInterval(this.state.interval);
    }
  }

  progressWidth() {
    return `${100 * this.state.progress / this.state.price}%`
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
      <Panel id={this.props.id}>
        <img src={cat} height="140" style={{display: 'block', width: '100%', objectFit: 'cover'}}></img>
        <Group separator="show">
          <Div>
            <Title level="1" weight="bold" style={{ marginBottom: 4 }}>{store.name}</Title>
            <Headline weight="medium" style={{ marginBottom: 4 }}>{`Автор ${store.author}`}</Headline>
            <Text weight="regular">
              Сбор закончится через {moment(store.endsDate).diff(moment(), 'days')} дней
            </Text>
          </Div>
        </Group>
        <Group separator="show">
          <Div>
            <Text weight="regular" style={{ marginBottom: 6 }}>Нужно собрать до {`${moment(store.endsDate).format('D MMMM').toLowerCase()}`}</Text>
            
            <div id='progress-outer-div' className='fund-details__progress-outer'>
              <Text
                id='current-text-outer'
                weight="regular"
                style={{position: 'absolute', left: this.outerTextPosition()}}
                className={!this.state.isInnerDivTooShort ? 'd-none' : ''}
              >{this.formattedSum(this.state.progress)}</Text>
              <Text id='goal-text' weight="regular" className={
                this.state.progress === this.state.price ? 'd-none' :
                (this.state.isOuterDivTooShort ? 'text-raised' : '')
              }>{this.formattedSum(this.state.price)}</Text>
              <div id='progress-inner-div' className='fund-details__progress-inner' style={{
                width: this.progressWidth()
              }}>
                <Text id='current-text-inner' weight="regular" className={
                  this.state.progress === this.state.price ? 'text-center d-block' :
                  (this.state.isInnerDivTooShort ? 'd-none' : '')
                }>
                  {`${this.formattedSum(this.state.progress)}${this.state.progress === this.state.price ? ' собраны!' : ''}`}
                </Text>
              </div>
            </div>
          </Div>
        </Group>
        <Group separator="show">
          <Div>
            <Text weight="regular">
              {store.description}
            </Text>
          </Div>
        </Group>
        <Group separator="show">
          <Div style={{paddingTop: 0, paddingBottom: 0}}>
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
        </Group>
        <Separator wide />

        <SimpleCell
          description="Отправил."
          disabled
          before={<Avatar/>}
          after={<Icon16LikeOutline fill="var(--dynamic_gray)"/>}
        >
            <div style={{display: "flex"}}>

                Артур Стамбульцян
                <div style={{display: "flex", color: "var(--content_placeholder_icon)", paddingLeft: "5px", alignItems: "center"}}>
                    <Caption level="1" weight="regular"> 5 мин.</Caption>
                </div>
            </div>
        </SimpleCell>

        <Div style={{display: "flex", marginBottom: "60px", alignItems: "center"}}>
            <Avatar/>
            <div style={{padding: "5px"}}/>
            <div style={{flexGrow: 1, position: "relative"}}>
                <Input placeholder="Комментарий"/>
                <div style={{position: "absolute", zIndex: 1, top:"50%", transform: "translateY(-50%)", right: "1%"}}>
                    <Icon28SmileOutline fill="var(--content_placeholder_icon)"/>
                </div>

            </div>
        </Div>



        <FixedLayout vertical="bottom" filled>
          <Separator wide />
          <SimpleCell        
                disabled
                after={
                 (this.state.progress !== this.state.price) ?
                  <Button disabled={this.state.buttonDisabled} onClick={this.state.onClick} mode="commerce" style={{marginRight: 0, marginLeft: 10}}>Помочь</Button>
                  : null
                }
                description={<Progress value={Math.ceil(100 * this.state.progress / this.state.price)} style={{background: "var(--icon_tertiary)"}}/>}
                >
                  <Subhead weight="regular" className={this.state.progress === this.state.price ? 'text-center' : ''}>
                      {
                        this.state.progress !== this.state.price
                        ? `Собрано ${this.formattedSum(this.state.progress)} из ${this.formattedSum(this.state.price)}`
                        : `${this.formattedSum(this.state.progress)}${this.state.progress === this.state.price ? ' собраны!' : ''}`
                      }
                  </Subhead>
              </SimpleCell>
        </FixedLayout>
      </Panel>
    )
  }
}

export default FundDetails;