import React from 'react';
import { Container, Placeholder } from 'react-bootstrap';

const RectangleSkeleton = () => {
    return (
        <Container fluid className="mt-1">
            <Placeholder as="p" animation="glow">
                <Placeholder xs={12} className="w-100 mt-2 rounded" style={{ height: '320px' }} />
            </Placeholder>
        </Container>
    );
};

export default RectangleSkeleton;