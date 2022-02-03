import React from 'react';
import { ListGroup, Placeholder } from 'react-bootstrap';

const ListSkeleton = () => {
    const index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <ListGroup className="mt-1">
            {
                index.map((id) =>
                    <ListGroup.Item className="categoryNav">
                        <Placeholder as="p" key={id} animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
};

export default ListSkeleton;