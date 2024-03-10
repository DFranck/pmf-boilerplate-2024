import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <h1>Home content</h1>
      <Link href="/signup">Signup</Link>
    </section>
  );
}
