"use client"
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { PostHogProvider } from "./PostHogProvider";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
            <PostHogProvider>
                {children}
            </PostHogProvider>
        </SessionProvider>
    </RecoilRoot>
}