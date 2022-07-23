import Navbar from "../navbar/index";
// import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{marginTop: "50px"}}>{children}</main>
    </>
  );
}
