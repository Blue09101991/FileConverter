import { Analytics, getAnalytics } from "firebase/analytics";
import { app } from './firebase';  // Adjust the path accordingly

let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { analytics };
