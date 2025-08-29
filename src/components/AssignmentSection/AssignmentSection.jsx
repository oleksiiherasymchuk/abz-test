import "./AssignmentSection.scss";

const AssignmentSection = () => {
  // SMOOTH SCROLL TO NESSESSARY BLOCK BY CLASSNAME
  const handleScroll = (className) => {
    const section = document.querySelector(`.${className}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="assignment-section">
      <div className="assignment-section__content">
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving..
        </p>
        <button onClick={() => handleScroll("registration")}>Sign up</button>
      </div>
    </section>
  );
};

export default AssignmentSection;
