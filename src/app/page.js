import "@styles/globals.css";
import BlogSection from "@components/BlogSection";
import Dashboard from "@components/Dashboard";
export default function Home() {
  return (
    <section>
      <div
        className="text-center d-flex justify-content-center align-items-center flex-column"
        style={{ height: "50vh" }}
      >
        <Dashboard />
      </div>
    </section>
  );
}
