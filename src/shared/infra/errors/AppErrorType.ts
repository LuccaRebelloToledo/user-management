export const AppErrorType = {
  users: {
    emailAlreadyInUse: "email-already-in-use",
    notFound: "user-not-found",
    tokenNotFound: "user-token-not-found",
    expiredToken: "user-token-expired",
  },
  sessions: {
    authenticationError: "authentication-error",
    expiredToken: "auth-token-expired",
    invalidTokenFormat: "invalid-token-format",
    invalidCredentials: "invalid-credentials",
    invalidRefreshToken: "invalid-refresh-token",
    tokenNotFound: "auth-token-not-found",
  },
};
