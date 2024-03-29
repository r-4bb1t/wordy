import jwt from "jsonwebtoken";

export const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "adsads", {
    expiresIn: "30m",
  });
  return token;
};

export const decodeToken: (token: string) => { userId: string } | null = (
  token: string
) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "asdasd") as {
      userId: string;
    };
    return decoded;
  } catch (e) {
    return null;
  }
};
