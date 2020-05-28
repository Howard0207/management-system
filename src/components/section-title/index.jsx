import PropTypes from 'prop-types';
import '_less/components/section-title';

const SectionTitle = (props) => {
    const { title, isShowArrow, size, className } = props;
    return (
        <div className={`section-title ${className}`}>
            <span className={size === 'small' ? 'section-title--small' : 'section-title--large'}>{title}</span>
            {isShowArrow && (
                <i className={size === 'small' ? 'section-title__arrow--small' : 'section-title__arrow--large'}></i>
            )}
        </div>
    );
};
SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    isShowArrow: PropTypes.bool,
    size: PropTypes.string,
    className: PropTypes.string,
};

SectionTitle.defaultProps = {
    isShowArrow: true,
    size: 'small',
    className: '',
};
export default SectionTitle;
