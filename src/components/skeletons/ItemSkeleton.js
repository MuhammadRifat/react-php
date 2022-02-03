import React from 'react';
import { Card, Col, Container, Placeholder, Row } from 'react-bootstrap';

const ItemSkeleton = () => {
    const index = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <Container fluid className="my-3">
            <Row>
                {
                    index.map((id) =>
                        <Col sm={6} lg={4} xl={3} className="pt-2" key={id}>
                            <Card>
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={6} />
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </Container>
    );
};

export default ItemSkeleton;