import * as AppleAuthentication from "expo-apple-authentication";
import {
  OAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import createUser from "./createUser";
const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    const provider = new OAuthProvider("apple.com");
    const firebaseCredential = provider.credential({
      idToken: credential.identityToken!,
    });

    const userCredential = await signInWithCredential(
      getAuth(),
      firebaseCredential,
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
  } catch (e: any) {
    alert(e);
    if (e.code === "ERR_REQUEST_CANCELED") {
      // handle that the user canceled the sign-in flow
    } else {
      // handle other errors
    }
  }
};

export default signInWithApple;
