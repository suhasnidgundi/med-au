import Link from "next/link";

export default function Page() {
    return (
        <div >
            <h1 >Middleware usage</h1>
            <p>
                This page is protected by using the universal{" "}
                <Link href="https://nextjs.authjs.dev#auth">
                    <code>auth()</code>
                </Link>{" "}
                method in{" "}
                <Link href="https://nextjs.org/docs/app/building-your-application/routing/middleware">
                    Next.js Middleware
                </Link>
                .
            </p>
        </div>
    )
}