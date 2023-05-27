import "@styles/globals.css";
import BlogSection from "@components/BlogSection";

export default function Home() {
  return (
    <section>
      <div
        className="text-center d-flex justify-content-center align-items-center flex-column"
        style={{ height: "50vh" }}
      >
        <h1 className="head_text text-center">
          Welcome Everyone!
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center gradient_color">
            ThoughtTrail
          </span>
        </h1>
        <p className="desc text-center">
          Find Your Path, Share Your Thoughts with ThoughtTrail
        </p>
      </div>
      <BlogSection />
    </section>
  );
}
