import { useSignIn } from 'react-auth-kit';
import { AuthenticationResponse } from '../../../Interfaces/IUserData';


// Custom hook
export const useAuth = () => {
    const signIn = useSignIn();

    const authenticateUser = async (data: AuthenticationResponse) => {
        try {
            signIn({
                token: data.accessToken,
                expiresIn: 9999, // change this later
                tokenType: 'Bearer',
                authState: data,
            });
            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    return authenticateUser;
};

