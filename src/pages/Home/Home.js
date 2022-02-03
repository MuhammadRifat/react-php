import React, { useCallback } from 'react';
import NewsService from '../../services/NewsService';
import useFetch from '../../hooks/useFetch';
import ItemSkeleton from '../../components/skeletons/ItemSkeleton';

const Home = () => {
    const news = useCallback(() => {
        return NewsService.getNews();
    }, []);

    const { data, isLoading, error } = useFetch(news);
    console.log(data);
    return (
        <div>
            <h3 className="text-primary text-center">Welcome to JKKNIU Website</h3>
            {
                isLoading && <ItemSkeleton />
            }
            {
                !isLoading && data?.map(news =>
                    <p className="bg-primary text-white mt-1 rounded text-center" key={news.id}>{news.product_name}</p>
                )
            }
        </div>
    );
};

export default Home;