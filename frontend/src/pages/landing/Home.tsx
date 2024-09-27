import { useEffect, useState } from 'react';
import { http } from '../../api/api';
import { News } from '../../interfaces/news';

function Home() {
  const [newsData, setNewsData] = useState<News[] | []>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    http
      .get('/news')
      .then((res) => {
        setNewsData(res.data.data);
      })
      .catch((err) => {
        console.log('user res err: ', err);
      });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {newsData
        ? newsData.map(
            (data) =>
              data.isPublished && (
                <div
                  key={data._id}
                  className="px-4 py-8 bg-white border rounded-md shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between w-full">
                      {/* <User size={44} /> */}
                      <div className="flex-1 ml-2">
                        <p className="text-xl md:text-3xl font-medium leading-none">
                          {data.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 ml-2">{data.content}</div>
                  </div>
                </div>
              )
          )
        : ''}
    </div>
  );
}

export default Home;
