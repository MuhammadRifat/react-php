import { useCallback } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Item from '../../components/common/Items/Item';
import ItemSkeleton from '../../components/skeletons/ItemSkeleton';
import useFetch from '../../hooks/useFetch';
import CategoryService from '../../services/CategoryService';
import ProductService from '../../services/ProductService';

const Category = () => {
    const { categoryId } = useParams();

    //load category name by category id
    const getCategoryName = useCallback(() => {
        return CategoryService.getCategoryById(`${categoryId}`);
    }, [categoryId]);

    const category = useFetch(getCategoryName);

    //load all products by category id
    const getProduct = useCallback(() => {
        return ProductService.getProductByCategory(`${categoryId}`);
    }, [categoryId])

    const { data, isLoading } = useFetch(getProduct);

    return (
        <Container fluid>
            <h4 className="text-center border-bottom">{category?.data?.category_name}</h4>
            {
                isLoading && <ItemSkeleton />
            }
            <Row>
                {
                    !isLoading && data?.map((product) => <Item product={product} isLoading={isLoading} key={product.id} />)
                }
            </Row>
            {
                !data?.length && <h5 className="text-center text-danger mt-4">Products Not Found</h5>
            }
        </Container>
    );
};

export default Category;