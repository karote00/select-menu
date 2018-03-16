import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';
import { test1, test2 } from '../actions';

const propTypes = {
	icon: PropTypes.string,
	label: PropTypes.string,
	controlIcon: PropTypes.string,
	hasIcon: PropTypes.bool,
	onItemChange: PropTypes.func.isRequired,
};

const defaultProps = {
	icon: '',
	label: '',
	controlIcon: '',
	hasIcon: false,
	onItemChange() {},
};

const mapStateToProps = (state) => ({
	menu: state,
});

const mapDispatchToProps = {
	test1,
	test2,
};

const SelectMenuItemWrapper = styled.div`
	cursor: pointer;
	overflow: hidden;

	.fl-r {
		float: right;
	}

	.label {
		flex: 1;

		&.hasTips {
			white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
		}
	}

	.icon {
		width: 1.6em;
		padding: 4px 0;
		text-align: center;
	}

	.tips {
		.icon {
			width: 1em;
		}

		> span {
			padding: 0 4px;
			color: rgba(0, 0, 0, .3);
		}
	}
`;

const SelectMenuItemContentWrapper = styled.div`
	display: -webkit-flex;
  display: -moz-flex;
  display: flex;

	> div {
		padding: 4px 8px;
	}
`;

const tipsItem = (tips) => {
	let tipsContent = null;
	switch (typeof tips) {
		case 'object':
			if (tips.length) {
				tipsContent = tips.map((tip, i) => {
					if (typeof tip === 'string' && tip.indexOf('fa-') > -1) {
						return <FA key={i} className="icon" name={tip.substr(3)} />
					}
					return (<span key={i}>{tip}</span>);
				});
			}
			break;
		default:
			tipsContent = tips && (<span>{tips}</span>) || null;
			break;
	}

	return tipsContent;
};

class SelectMenuItem extends Component {
	constructor(props) {
		super(props);

		this.onItemChange = this.onItemChange.bind(this);
	}

	onItemChange(e) {
    const { onItemChange, label } = this.props;
    onItemChange(label);
    this.props.test2();
  }

  render() {
  	const {
  		icon,
  		label,
  		controlIcon,
  		hasIcon,
  		tips,
  		onItemChange,
  	} = this.props;

  	const iconContent = (hasIcon || icon.indexOf('fa-') > -1) ?
  		<div className="icon"><FA name={icon.substr(3)} /></div> : null;
  	const labelContent = <div className={`label ${tips ? 'hasTips' : ''}`}>{label}</div>;
  	const controlIconContent = controlIcon.indexOf('fa-') > -1 ?
  		<div className="fl-r"><FA name={controlIcon.substr(3)} /></div> : null;
  	const tipsContent = tips && <div className="fl-r tips">{tipsItem(tips)}</div>;


    return (
      <SelectMenuItemWrapper
      	onClick={this.onItemChange}
      >
      	<SelectMenuItemContentWrapper>
	      	{iconContent}
	      	{labelContent}
	      	{controlIconContent}
	      	{tipsContent}
	      </SelectMenuItemContentWrapper>
      </SelectMenuItemWrapper>
    );
  }
}

SelectMenuItem.propTypes = propTypes;
SelectMenuItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenuItem);
