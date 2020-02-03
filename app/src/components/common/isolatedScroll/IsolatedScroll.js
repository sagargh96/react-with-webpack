import React, { Component } from 'react';
import PropTypes from 'prop-types';

const unbindHandlersKey = '__unbind_handlers__';

export default class IsolatedScroll extends Component {

  constructor() {
    super();

    this.storeComponentReference = this.storeComponentReference.bind(this);
  }

  makeHandler(el) {
  return function (event) {
    /*var scrollTop = el.scrollTop;
    var scrollHeight = el.scrollHeight;
    var type = event.type;
    var detail = event.detail;
    var wheelDelta = event.wheelDelta;

    var height = calculateHeight(el);
    var delta = type === 'DOMMouseScroll' ? detail * -40 : wheelDelta;
    var up = delta > 0;*/

    var prevent = function prevent() {
      event.stopPropagation();
      event.preventDefault();
      event.returnValue = false;

      return false;
    };

    /*if (!up && -delta > scrollHeight - height - scrollTop) {
      el.scrollTop = scrollHeight;
      return prevent();
    } else if (up && delta > scrollTop) {
      el.scrollTop = 0;
      return prevent();
    }*/

      var scrollWidth = el.scrollWidth;
      var scrollHeight = el.scrollHeight;
      var clientWidth = el.clientWidth;
      var clientHeight = el.clientHeight;
    	var hasScrollX = scrollWidth !== clientWidth;
    	var hasScrollY = scrollHeight !== clientHeight;
			
      if (!hasScrollX && !hasScrollY) {
      	return;
      }
      
      var isHorizontalScroll = event.deltaX !== 0
      var isVerticalScroll = event.deltaY !== 0;
			var isIsolatedScroll = false;
      
			// TODO: 기본 옵션에 따른 작동 정하기
      // TODO: 좌우 스크롤 막기
      if (isHorizontalScroll) {
				var scrollLeft = el.scrollLeft;
          var meetLeft = scrollLeft === 0;
        var meetRight = (scrollWidth - clientWidth) === scrollLeft;
        var isLeft = event.deltaX < 0;
				isIsolatedScroll = (meetLeft && isLeft) || (meetRight && !isLeft);
        console.log(isIsolatedScroll)
      }
      
      if (isVerticalScroll) {
      	var scrollTop = el.scrollTop;
        var meetTop = scrollTop === 0;
        var meetBottom = (scrollHeight - clientHeight) === scrollTop;
        var isUpward = event.deltaY < 0;
				isIsolatedScroll = (meetBottom && !isUpward) || (meetTop && isUpward);
      }
			
      if (isIsolatedScroll) {
          return prevent();
      }
  };
};

  isolatedScroll(el) {
    var handler = this.makeHandler(el);

    var addEvent = (el.addEventListener || el.attachEvent).bind(el);
    var removeEvent = (el.removeEventListener || el.detachEvent).bind(el);

    addEvent('mousewheel', handler);
    addEvent('DOMMouseScroll', handler);

    return function () {
    removeEvent('mousewheel', handler);
    removeEvent('DOMMouseScroll', handler);
    };
  }

  componentDidMount() {
    this[unbindHandlersKey] = this.isolatedScroll(this.component);
  }

  componentWillUnmount() {
    this[unbindHandlersKey]();
  }

  storeComponentReference(component) {
    if (component !== null) {
      this.component = component;
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={this.storeComponentReference} {...this.props}>
        { children }
      </div>
    );
  }

}
IsolatedScroll.PropTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
}