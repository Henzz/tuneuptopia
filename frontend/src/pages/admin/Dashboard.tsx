import { Newspaper, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { http } from '../../api/api';

// const notifications = [
//   {
//     title: 'Your call has been confirmed.',
//     description: '1 hour ago',
//   },
//   {
//     title: 'You have a new message!',
//     description: '1 hour ago',
//   },
//   {
//     title: 'Your subscription is expiring soon!',
//     description: '2 hours ago',
//   },
// ];

function Dashboard() {
  const [noUsers, setNoUsers] = useState<number>(0);
  const [noNews, setNoNews] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    http
      .get('/users')
      .then((res) => {
        // console.log('user res: ', res, res.data.data);
        setNoUsers(res.data.count);
      })
      .catch((err) => {
        console.log('user res err: ', err);
      });
    http
      .get('/news')
      .then((res) => {
        // console.log('user res: ', res, res.data.data);
        setNoNews(res.data.count);
      })
      .catch((err) => {
        console.log('user res err: ', err);
      });
  };
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="px-4 py-8 bg-white border rounded-md shadow-md max-w-sm">
          <div className="flex items-center">
            <div className="flex items-center justify-between w-full">
              <User size={44} />
              <div className="flex-1 ml-2">
                <p className="text-sm font-medium leading-none">Users</p>
              </div>
            </div>
            <div>{noUsers}</div>
          </div>
        </div>
        <div className="px-4 py-8 bg-white border rounded-md shadow-md max-w-sm">
          <div className="flex items-center">
            <div className="flex items-center justify-between w-full">
              <Newspaper size={44} />
              <div className="flex-1 ml-2">
                <p className="text-sm font-medium leading-none">News</p>
              </div>
            </div>
            <div>{noNews}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
