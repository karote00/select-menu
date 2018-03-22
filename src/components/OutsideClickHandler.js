import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  onOutsideClick() {},
};

class OutsideClickHandler extends React.Component {
  constructor(...args) {
    super(...args);

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.setChildNodeRef = this.setChildNodeRef.bind(this);
  }

  componentDidMount() {
    this.removeEventListener =
      document.addEventListener('click', this.onOutsideClick, { capture: true });
  }

  componentWillUnmount() {
    if (this.removeEventListener) document.removeEventListener('click', this.removeEventListener);
  }

  onOutsideClick(e) {
    const { onOutsideClick } = this.props;
    const { childNode } = this;
    const isDescendantOfRoot = childNode && childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  }

  setChildNodeRef(ref) {
    this.childNode = ref;
  }

  render() {
    return (
      <div ref={this.setChildNodeRef}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;
