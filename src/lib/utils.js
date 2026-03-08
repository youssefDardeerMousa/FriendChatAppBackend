import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //   بتتبعت تلقائيًا في المتصفح او في بوست مانCookie ال Request  مع كل
  res.cookie("jwt", token, {
    // الـ Cookie دي بتتحفظ تلقائيًا في المتصفح وبتتبعت مع كل Request بعد كده للسيرفر.
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS milliseconds
    httpOnly: true, // حماية من هجمات XSS
    // في الـ production على Vercel لازم نخلي الكوكي cross-site علشان تشتغل بين دومين الـ frontend والـ backend
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
