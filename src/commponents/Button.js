import PropTypes from 'prop-types';

const Button = ({ color, text, onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{ backgroundColor: color }}
			className="btn"
		>
			{text}
		</button>
	);
};

Button.deaultProps = {
	color: 'steelblure',
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	onclick: PropTypes.func,
};

export default Button;
