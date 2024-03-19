import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  return (
    <main>
      <section>Herobanner</section>
      <section>
        <h1>Home content</h1>
        <Button asChild>
          <Link href="/auth/signup">Commencer</Link>
        </Button>

        <Button asChild>
          <Link href="/subscribe">Souscription</Link>
        </Button>
      </section>
    </main>
  );
}
