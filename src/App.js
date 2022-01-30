import { useCallback } from 'react';
import useFetch from './hooks/useFetch';
import NewsService from './services/NewsService';

function App() {
  const news = useCallback(() => {
    return NewsService.getNews();
  }, []);

  const {data, isLoading, error} = useFetch(news);
  console.log(data);

  return (
    <div className="App">
      <h3 className="text-primary text-center">Welcome to JKKNIU Website</h3>
      {
        isLoading && <div>Loading...</div>
      }
      {
        !isLoading && data?.map( news =>
          <p className="bg-primary text-white mt-1 rounded text-center" key={news.id}>{news.product_name}</p>
        )
      }
    </div>
  );
}

export default App;
