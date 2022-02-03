import React from 'react';
import { Placeholder } from 'react-bootstrap';

const AppSkeleton = () => {
    return (
        <div>
            <Placeholder as="p" animation="glow" style={{ height: '100vh' }}>
                <Placeholder xs={12} className="w-100 h-25 mt-2 rounded" />
                <Placeholder xs={12} className="w-100 h-25 mt-2 rounded" />
                <Placeholder xs={12} className="w-100 h-25 mt-2 rounded" />
                <Placeholder xs={12} className="w-100 h-25 mt-2 rounded" />
            </Placeholder>
        </div>
    );
};

export default AppSkeleton;