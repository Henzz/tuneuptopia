import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '../../../hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { filteredForm, http } from '../../../api/api';
import { News } from '../../../interfaces/news';
import { Textarea } from '../../../components/ui/textarea';
// import { Checkbox } from '@radix-ui/react-checkbox';

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

const NewsManagement: React.FC = () => {
  const [datas, setDatas] = useState<News[] | []>([]);
  const [selectedData, setSelectedData] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDataAdd, setIsDataAdd] = useState<boolean>(false);

  // Form
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishedDate, setPublishedDate] = useState<string>('');
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = () => {
    setIsLoading(true);
    http
      .get('/news')
      .then((res) => {
        console.log('user res: ', res, res.data.data);
        setDatas(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('user res err: ', err);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) e.preventDefault();
    const sendData: News = {
      title,
      content,
      author,
      publishedDate,
      isPublished: isPublished ? '1' : '0',
    };
    // Append each field to the FormData object
    if (isDataAdd) {
      http
        .post('/news', filteredForm(sendData), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('user create res: ', res, res.data.data);
          setDatas([...datas, res.data.data]);
          setIsLoading(false);
          setIsFormDialogOpen(false);
          successPop('User succesfully created');
        })
        .catch((err) => {
          setIsLoading(false);
          console.log('user res err: ', err);
          errorPop(err.response.data.msg);
          // err.response.data.msg
        });
    }

    if (!isDataAdd) {
      http
        .put(`/news/${selectedData?._id}`, filteredForm(sendData), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('update user res: ', res, res.data.data);
          // setDatas([...datas, res.data.data]);
          fetchDatas();
          setIsLoading(false);
          setIsFormDialogOpen(false);
          successPop('User updated successfully');
        })
        .catch((err) => {
          setIsLoading(false);
          errorPop(err.response.data.msg);
          console.log('user res err: ', err);
        });
    }
  };

  const deleteData = (id: number | string) => {
    http
      .delete(`/news/${id}`)
      .then((res) => {
        console.log('user create res: ', res, res.data.data);
        setIsLoading(false);
        successPop('User deleted successfully');
        fetchDatas();
      })
      .catch((err) => {
        setIsLoading(false);
        errorPop(err.response.data.msg);
        console.log('user res err: ', err);
      });
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setPublishedDate('');
    setIsPublished(false);
    setIsDataAdd(false);
    setSelectedData(null);
  };

  const fillForm = (data: News) => {
    setTitle(data.title);
    setContent(data.content);
    setAuthor(data.author);
    const dateObject = new Date(data.publishedDate);
    setPublishedDate(dateObject.toISOString().split('T')[0]);
    setIsPublished(data.isPublished ? true : false);
  };

  const errorPop = (errors: string | []) => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: errors,
      action: (
        <ToastAction altText="Try again" onClick={() => handleSubmit(null)}>
          Try again
        </ToastAction>
      ),
    });
    // errors.map((er) => {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Uh oh! Something went wrong.',
    //     description: er,
    //     action: (
    //       <ToastAction altText="Try again" onClick={() => handleSubmit(er)}>
    //         Try again
    //       </ToastAction>
    //     ),
    //   });
    // });
  };

  const successPop = (msg: string) => {
    toast({
      variant: 'success',
      title: 'Success!',
      description: msg,
    });
  };

  return (
    <div>
      <Dialog
        open={isFormDialogOpen}
        onOpenChange={() => setIsFormDialogOpen(!isFormDialogOpen)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isDataAdd ? 'Add News' : 'Edit News'}</DialogTitle>
            <DialogDescription>
              Please check the form carefully.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="title" className="text-left">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // disabled={!isDataAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="content" className="text-left">
                  Content
                </Label>
                <Textarea
                  placeholder=""
                  className="resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  // disabled={!isDataAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="author" className="text-left">
                  Author
                </Label>
                <Input
                  id="author"
                  type="text"
                  className="col-span-3"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  // disabled={!isDataAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="published-date" className="text-left">
                  Published Date
                </Label>
                <Input
                  id="published-date"
                  type="date"
                  className="col-span-3"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  // disabled={!isDataAdd}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="is-published"
                  type="checkbox"
                  className="col-span-3 w-4 h-4"
                  checked={isPublished}
                  onChange={(e) =>
                    setIsPublished(e.target.checked ? true : false)
                  }
                  // disabled={!isDataAdd}
                />
                <Label htmlFor="is-published" className="text-left">
                  Published
                </Label>
              </div>
            </div>
            <div className="ml-auto flex gap-2 items-center justify-between">
              <DialogFooter>
                {isDataAdd ? (
                  <Button type="submit">Add News</Button>
                ) : (
                  <Button type="submit">Save changes</Button>
                )}
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-end justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">News Management</h1>
          <Button
            className=""
            onClick={() => {
              clearForm();
              setIsFormDialogOpen(true);
              setIsDataAdd(true);
            }}
          >
            Add News
          </Button>
        </div>
        <div className="w-full mx-auto relative bg-white">
          <Card>
            <CardHeader>
              <CardTitle>News List</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Published Date</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell>
                        <Skeleton className="w-full h-full min-h-72 absolute top-0 left-0" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {datas ? (
                        datas.map((data) => (
                          <TableRow key={data._id}>
                            <TableCell>{data.title}</TableCell>
                            <TableCell>{data.content}</TableCell>
                            <TableCell>{data.author}</TableCell>
                            <TableCell>{data.publishedDate}</TableCell>
                            <TableCell>
                              {data.isPublished ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-4">
                                <Button
                                  className="bg-blue-400 text-white hover:bg-blue-400 hover:opacity-90"
                                  onClick={() => {
                                    fillForm(data);
                                    setIsFormDialogOpen(true);
                                    setIsDataAdd(false);
                                    setSelectedData(data);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    setSelectedData(data);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        // <TableRow>
                        //   <TableCell>No record</TableCell>
                        // </TableRow>
                        <TableCaption>No records</TableCaption>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
          </Card>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={() => {
          setIsDeleteDialogOpen(!isDeleteDialogOpen);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete '{selectedData?.title}
              '?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteData(selectedData?._id ? selectedData._id : '')
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewsManagement;
