import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({icon, size}) => {
    return (
        <FontAwesomeIcon icon={icon} size={size} />
    );
};

export default Icon;