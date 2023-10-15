import Link from 'next/link';
import { useState } from "react";
import SeoMeta from "@/partials/SeoMeta";
import PageHeader from "@/partials/PageHeader";
import "@/styles/converter.scss"
import { Alert } from "@chakra-ui/react";
import "@/styles/auth.scss";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from 'config/firebase';
import Image from 'next/image'
import { analytics } from 'config/initializeAnalytics';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    // const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleSignIn = async () => {
        if (!email || !password) {
            setAlertMessage("Please fill in all fields.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // TODO: Redirect to dashboard or another page after successful sign-in.
            setAlertMessage('Successfully signed in!');
        } catch (error) {
            const firebaseError = error as { message?: string };
            setAlertMessage(firebaseError.message || 'An error occurred during sign in.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            // TODO: Redirect to dashboard or another page after successful sign-in.
            setAlertMessage('Successfully signed in with Google!');
        } catch (error) {
            const firebaseError = error as { message?: string };
            setAlertMessage(firebaseError.message || 'An error occurred during Google sign in.');
        }
    };


    return (
        <>
            <SeoMeta
                title="SignIn"
                description="Sign in to your account"
            />
            <PageHeader title="Sign In" />
            <section className="section-sm">
                <div className="container">
                    <div className="row">
                        <div className="mx-auto md:col-10 lg:col-6">

                            {/* Email */}
                            <div className="mb-6">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            {/* SignIn Button */}
                            <div className="mb-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                            </div>

                            {/* Google Sign-In Button */}
                            <div className="mt-4 text-center">
                                <button className="google-btn" onClick={handleGoogleSignIn}>
                                    <span className="google-icon-wrapper">
                                        <img className="google-icon"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg" alt="Google sign-in" />

                                    </span>
                                    <span className="btn-text">Sign in with Google</span>
                                </button>
                            </div>

                            {/* Alert Message */}
                            {alertMessage && (
                                <div className="alert alert-danger">
                                    {alertMessage}
                                </div>
                            )}

                            {/* Link to SignUp */}
                            <div className="mt-4 text-center">
                                <p>Don&apos;t have an account? <Link href="/signup"><b>Sign Up</b></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignIn;
