import { Button, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="mx-auto max-w-2xl text-[clamp(2.4rem,1.6rem+3.6vw,4rem)] font-medium">
        This shop hasn’t been built yet.
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-lg text-muted">The page you were looking for doesn’t exist or has moved.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact/" variant="secondary" arrow={false}>Contact us</Button>
      </div>
    </Container>
  );
}
