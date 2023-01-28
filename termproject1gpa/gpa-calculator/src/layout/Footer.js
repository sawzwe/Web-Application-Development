import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer
        className="text-black mt-5 p-4 text-center"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        Copyright &copy; {new Date().getFullYear()} REVISION
      </footer>
    );
  }
}
export default Footer;
