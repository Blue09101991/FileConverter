"use client";

import Link from 'next/link';
import { useState } from "react";
import SeoMeta from "@/partials/SeoMeta";
import PageHeader from "@/partials/PageHeader";
import "@/styles/converter.scss"
import { Alert } from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "@/styles/auth.scss";
// import "config/firebase";
import { auth } from 'config/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { analytics } from 'config/initializeAnalytics';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth);

    // const router = useRouter();
    // if (!router.isReady) return null;

    // const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleSignUp = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setAlertMessage("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match.");
            return;
        }

        const auth = getAuth();  // Move this inside the handleSignUp function

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User signed up:', user);
            setAlertMessage('Successfully signed up!');

            // TODO: Redirect to dashboard or any other page after successful sign-up.
        } catch (error) {
            console.error('Error signing up:', error);

            const firebaseError = error as { message?: string };
            if (firebaseError.message) {
                setAlertMessage(firebaseError.message);
            } else {
                setAlertMessage('An unknown error occurred.');
            }
        }
    };

    const handleLoginGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await signInWithGoogle();
            // if (router.isReady) {
            //     router.push('/home');
            // }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <SeoMeta
                title="SignUp"
                description="Sign up for an account"
            />
            <PageHeader title="Sign Up" />
            <section className="section-sm">
                <div className="container">
                    <div className="row">
                        <div className="mx-auto md:col-10 lg:col-6">

                            {/* Username */}
                            <div className="mb-6">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-input"
                                />
                            </div>

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

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            {/* SignUp Button */}
                            <div className="mb-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleSignUp}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* Google Sign-In Button */}
                            <div className="mt-4 text-center">
                                <button className="google-btn" onClick={handleLoginGoogle}>
                                    <span className="google-icon-wrapper">
                                        <img className="google-icon"
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg" alt="Google sign-in" />
                                    </span>
                                    <span className="btn-text">Sign in with Google</span>
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p>You have already an account? <Link href="/signin">Sign In</Link></p>
                            </div>

                            {/* Alert Message */}
                            {alertMessage && (
                                <div className="alert alert-danger">
                                    {alertMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;
