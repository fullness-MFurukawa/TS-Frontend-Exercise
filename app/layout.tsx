import { Geist } from "next/font/google";
import FrontMenuLayout from "./layout/frontmenu";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
/**
 * 演習 7-4 ログアウトUIを作成し、ログイン可能にする
 */
const geist = Geist({subsets:['latin'],variable:'--font-sans'});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <FrontMenuLayout>{children}</FrontMenuLayout>
    </NextAuthProvider>
  );
}