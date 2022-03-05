import React, { useCallback } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import RectangleSkeleton from '../../components/skeletons/RectangleSkeleton';
import useFetch from '../../hooks/useFetch';
import SettingsService from '../../services/SettingsService';

const HeaderMain = () => {
    const Sliders = useCallback(() => {
        return SettingsService.getSliders();
    }, []);

    const { data, isLoading } = useFetch(Sliders);

    if (isLoading) {
        return <RectangleSkeleton />
    }

    return (
        <Container fluid className="mt-1">
            <Carousel fade>
                {
                    data?.map(slider =>
                        <Carousel.Item key={slider.id}>
                            <img
                                className="d-block w-100"
                                height="320"
                                src={process.env.REACT_APP_IMAGE_BASE_URL + slider.imageURL}
                                alt={slider.caption}
                            />
                            <Carousel.Caption>
                                <h3>{slider.caption}</h3>
                                <p>{slider.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>)
                }
            </Carousel>
        </Container>
    );
};

export default HeaderMain;