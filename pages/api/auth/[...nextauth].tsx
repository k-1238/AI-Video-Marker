import { getToken, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NextAuth, { AuthOptions, Session, User, Account, Profile } from "next-auth";
import { ConnectDB } from "../../../config/db";
import { UserModel } from "../../../models/users";
import bcrypt from "bcryptjs";

interface Credentials {
  email: string;
  password: string;
}

const maxAge = 86400

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: maxAge, // 1 day
  },
  jwt: {
    maxAge: maxAge,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials?: Partial<Credentials>) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await ConnectDB();
        const user = await UserModel.findOne({ email: credentials.email }).populate("priceName");

        if (!user) {
          throw new Error("No user found");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        const priceName = user.priceName && typeof user.priceName !== "string"
          ? (user.priceName as { name: string }).name
          : null;

        return { id: user._id.toString(), email: user.email, userName: user.userName, priceName };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account; profile?: Profile }) {
      await ConnectDB();
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          if (!existingUser) {
            await UserModel.create({
              email: user.email,
              password: "-",
              picture: user.image || "",
              priceName: null,
            });
          }
        } catch (error) {
          console.error("ERROR:", error);
        }
        return true;
      }
      return true;
    },

    async jwt({ token, user, trigger, session }: { token: JWT; user?: User; trigger?: string; session?: Session }) {
      await ConnectDB();

      if (trigger === "update" && session) {
        token.userData.priceName = session.user.priceName;
      }

      if (user) {
        const userData = await UserModel.findOne({ email: user.email }).populate("priceName");
        token.userData = {
          _id: userData._id.toString(),
          email: userData.email,
          role: userData.role,
          priceName: userData.priceName || null,
          image: userData.picture,
        };
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        userName: token.userName as string,
        priceName: token.priceName as string,
      };

      if (token.userData) {
        session.user = token.userData
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} as AuthOptions);