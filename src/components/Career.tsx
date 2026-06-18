import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Education <span>&</span>
          <br /> Certifications
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Technology (CSE)</h4>
                <h5>Graphic Era Hill University</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Currently pursuing B.Tech in Computer Science Engineering with a CGPA of 7.77. 
              Strong foundation in Data Structures, Algorithms, DBMS, and Computer Networks.
              Expected graduation in 2026.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Programming in Java</h4>
                <h5>NPTEL - IIT Kharagpur</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed comprehensive certification covering object-oriented programming concepts, 
              data structures, and algorithmic problem solving using Java.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Career Essentials in Software Development</h4>
                <h5>Microsoft & LinkedIn Learning</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed training covering software development fundamentals including Git, 
              version control, programming concepts, and modern development workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
