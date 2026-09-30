import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import createUser from "./createUser";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID,
    scopes: ["profile", "email"],
    responseType: "id_token",
  });

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === "success") {
        try {
          const idToken = response.params?.id_token;

          if (!idToken) throw new Error("No id_token received");

          const credential = GoogleAuthProvider.credential(idToken);
          const userCredential = await signInWithCredential(
            getAuth(),
            credential,
          );

          const { displayName, email: userEmail, uid } = userCredential.user;

          const additionalUserInfo = getAdditionalUserInfo(userCredential);
          const isNewUser = additionalUserInfo?.isNewUser;

          if (isNewUser) {
            await createUser({
              uid: uid,
              name: displayName || "",
              email: userEmail || "",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    signInWithGoogle();
  }, [response]);

  return { request, promptAsync };
};
