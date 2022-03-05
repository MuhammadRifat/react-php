import { useCallback, useState } from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import categoryService from '../../services/CategoryService';
import useFetch from '../../hooks/useFetch';
import ListSkeleton from '../skeletons/ListSkeleton';

const SideNav = () => {
    const [show, setShow] = useState(false);

    // load all categories
    const getCategories = useCallback(() => {
        return categoryService.getCategories();
    }, [])

    const { data } = useFetch(getCategories);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // display loading skeleton
    if (data == null) {
        return (
            <ListSkeleton />
        );
    }

    return (
        <>
            <div className="positionSticky hide">
                <ListGroup className="mt-2">

                    {
                        data?.map(category => <NavLink to={`/category/${category.id}`} key={category.id}><ListGroup.Item className="categoryNav bg-lightPrimary border rounded">{category.category_name}</ListGroup.Item></NavLink>)
                    }

                    {/* <NavLink to="/category/vegetables"><ListGroup.Item className="categoryNav">Vegetables Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/grocery"><ListGroup.Item className="categoryNav">Grocery Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Fish market"><ListGroup.Item className="categoryNav">Fish market</ListGroup.Item></NavLink>
                    <NavLink to="/category/Chicken Shop"><ListGroup.Item className="categoryNav">Chicken Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Beef Shop"><ListGroup.Item className="categoryNav">Beef Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Mutton Shop"><ListGroup.Item className="categoryNav">Mutton Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Eggs Shop"><ListGroup.Item className="categoryNav">Eggs Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/fruits"><ListGroup.Item className="categoryNav">Fruits Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Cosmetics Shop"><ListGroup.Item className="categoryNav">Cosmetics Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Beverage & Foods Shop"><ListGroup.Item className="categoryNav">Beverage & Foods Shop</ListGroup.Item></NavLink>
                    <NavLink to="/category/Medicine Shop"><ListGroup.Item className="categoryNav">Medicine Shop</ListGroup.Item></NavLink> */}
                </ListGroup>
            </div>

            <div className="d-none show">
                <button className="border-0 bg-primary mt-1 px-3 py-1 text-white" onClick={handleShow}>
                    <Icon icon={faBars} /> Category
                </button>

                <Offcanvas show={show} onHide={handleClose} style={{ width: "220px" }}>
                    <Offcanvas.Header closeButton  className="bg-primary text-white">
                        <Offcanvas.Title>Campus Mart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        <ListGroup className="mt-1" onClick={handleClose}>
                            {
                                data?.map(category => <NavLink to={`/category/${category.id}`} key={category.id}><ListGroup.Item className="categoryNav bg-lightPrimary border rounded">{category.category_name}</ListGroup.Item></NavLink>)
                            }
                        </ListGroup>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default SideNav;