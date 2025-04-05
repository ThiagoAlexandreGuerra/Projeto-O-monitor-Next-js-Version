interface LogoProp {
    color: string;
  }
  
  const color = {
    color1: {
      color: "#000",
      position:'fixed',
      left:"7%",
      top:"2%",
      display:"grid",
      fontSize:"1.7rem",
      
      fontFamily: "Catamaran, serif",
      fontOpticalSizing: "auto",
      fontStyle: "normal",

    },
    color2: {
      color: "#ffffff",
      position:'fixed',
      left:"7%",
      top:"2%",
      display:"grid",
      fontSize:"1.7rem",
      fontFamily: "Catamaran, sans-serif"

    },
  };
  
  export default function Logo(prop: LogoProp) {
    const appliedStyle = prop.color === "black" ? color.color1 : color.color2;
  
    return (
      <h1 style={appliedStyle}>
        O MONITOR
      </h1>
    );
  }
  