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
import { User, UserCreate } from '../../../interfaces/user';
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

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [userData, setUserData] = useState<User | UserCreate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isUserAdd, setIsUserAdd] = useState<boolean>(false);

  // Form
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    http
      .get('/users')
      .then((res) => {
        console.log('user res: ', res, res.data.data);
        setUsers(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('user res err: ', err);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) e.preventDefault();
    const sendData: UserCreate = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    // Append each field to the FormData object
    if (isUserAdd) {
      http
        .post('/users', filteredForm(sendData), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('user create res: ', res, res.data.data);
          setUsers([...users, res.data.data]);
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

    if (!isUserAdd) {
      http
        .put(`/users/${userData?._id}`, filteredForm(sendData), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('update user res: ', res, res.data.data);
          // setUsers([...users, res.data.data]);
          fetchUsers();
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

  const deleteUser = (id: number | string) => {
    http
      .delete(`http://localhost:8080/api/v1/users/${id}`)
      .then((res) => {
        console.log('user create res: ', res, res.data.data);
        setIsLoading(false);
        successPop('User deleted successfully');
        fetchUsers();
      })
      .catch((err) => {
        setIsLoading(false);
        errorPop(err.response.data.msg);
        console.log('user res err: ', err);
      });
  };

  const clearForm = () => {
    setUsername('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setIsUserAdd(false);
    setUserData(null);
  };

  const fillForm = (user: User) => {
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phoneNumber);
    setEmail(user.email);
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
            <DialogTitle>{isUserAdd ? 'Add User' : 'Edit User'}</DialogTitle>
            <DialogDescription>
              Please check the form carefully.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="user-name" className="text-left">
                  User Name
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  className="col-span-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // disabled={!isUserAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="first-name" className="text-left">
                  First Name
                </Label>
                <Input
                  id="first-name"
                  type="text"
                  className="col-span-3"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  // disabled={!isUserAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="last-name" className="text-left">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  type="text"
                  className="col-span-3"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  // disabled={!isUserAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // disabled={!isUserAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="phone-number" className="text-left">
                  Phone Number
                </Label>
                <Input
                  id="phone-number"
                  type="text"
                  className="col-span-3"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  // disabled={!isUserAdd}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="password" className="text-left">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // disabled={!isUserAdd}
                />
              </div>
            </div>
            <div className="ml-auto flex gap-2 items-center justify-between">
              <DialogFooter>
                {isUserAdd ? (
                  <Button type="submit">Add User</Button>
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
          <h1 className="text-lg font-semibold md:text-2xl">User Management</h1>
          <Button
            className=""
            onClick={() => {
              clearForm();
              setIsFormDialogOpen(true);
              setIsUserAdd(true);
            }}
          >
            Add User
          </Button>
        </div>
        <div className="w-full mx-auto relative bg-white">
          <Card>
            <CardHeader>
              <CardTitle>Users List</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Role</TableHead>
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
                      {users ? (
                        users.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <div className="flex gap-4">
                                <Button
                                  className="bg-blue-400 text-white hover:bg-blue-400 hover:opacity-90"
                                  onClick={() => {
                                    fillForm(user);
                                    setIsFormDialogOpen(true);
                                    setIsUserAdd(false);
                                    setUserData(user);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    setUserData(user);
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
              Are you absolutely sure you want to delete '{userData?.firstName}
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
              onClick={() => deleteUser(userData?._id ? userData._id : '')}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
