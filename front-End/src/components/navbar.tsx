
import { Link, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';


export const Navbar = () => {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();

    const signOut = useSignOut()

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            signOut();
            navigate('/')
        }
    };
    


        return (
            <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center z-50">
                <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                    <Logo />
                    <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                        {isAuth() ? (
                            <>
                                <Button  size="sm" asChild>
                                    <Link to="/products">Купи</Link>
                                </Button>

                                <Button  size="sm" asChild>
                                    <a onClick={handleSignOut}>Изход</a>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button size="sm" variant="outline" asChild>
                                    <Link to="/auth/login">Влез в профил</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link to="/auth/register">
                                        Регистрирай се
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };
