import React, { useCallback } from 'react';
import NewsService from '../../services/NewsService';
import useFetch from '../../hooks/useFetch';
import ItemSkeleton from '../../components/skeletons/ItemSkeleton';
import { Link } from 'react-router-dom';

const Home = () => {
    const news = useCallback(() => {
        return NewsService.getNews();
    }, []);

    const { data, isLoading, error } = useFetch(news);
    // console.log(data);
    return (
        <div>
            <h3 className="text-primary text-center">Welcome to JKKNIU Website</h3>
            {
                isLoading && <ItemSkeleton />
            }
            {
                !isLoading && data?.map(news =>
                    <span className="bg-primary text-white mt-1 rounded text-center d-inline-block w-25" key={news.id}>{news.product_name}</span>
                )
            }

            <div className="mt-3 text-center">
                <Link to="/admin">Go to Admin panel</Link>
            </div>
        </div>
    );
};

export default Home;