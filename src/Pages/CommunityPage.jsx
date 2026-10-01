import communityData from "./communityData";

function CommunityPage() {
  return (
    <div className="container py-5">

      {/* Heading */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          🌟 Trusted by the IntBuddy Community
        </h1>

        <p className="text-muted fs-5">
          Thousands of candidates have used IntBuddy to prepare smarter,
          learn from real interview experiences, and achieve their career goals.
        </p>

      </div>

      {/* Statistics */}

      <div className="row text-center mb-5">

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h2>👥</h2>
              <h3>2,500+</h3>
              <p>Community Members</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h2>💼</h2>
              <h3>1,200+</h3>
              <p>Interview Experiences</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h2>🎯</h2>
              <h3>18,000+</h3>
              <p>Candidates Helped</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h2>🎉</h2>
              <h3>850+</h3>
              <p>Placed Candidates</p>
            </div>
          </div>
        </div>

      </div>

      {/* Success Story */}

      <div className="card shadow border-0 p-4 mb-5">

        <h2 className="fw-bold mb-3">
          🚀 Real Success from Our Community
        </h2>

        <p>
          ✔ 850+ candidates secured internships and full-time jobs after
          preparing through interview experiences available on IntBuddy.
        </p>

        <p>
          ✔ 18,000+ job seekers improved their interview confidence by learning
          from real interview journeys.
        </p>

        <p>
          ✔ More than 1,200 verified interview experiences from
          TCS, Infosys, Cognizant, Accenture, Capgemini, Wipro,
          Deloitte, LTIMindtree and many more.
        </p>

      </div>

      {/* What You'll Learn */}

      <div className="card shadow border-0 p-4 mb-5">

        <h2 className="fw-bold mb-4">
          📚 What You'll Learn
        </h2>

        <div className="row">

          <div className="col-md-4">
            <ul>
              <li>HR Interview Questions</li>
              <li>Technical Interview Questions</li>
              <li>Coding Round Experience</li>
              <li>Machine Coding Challenges</li>
            </ul>
          </div>

          <div className="col-md-4">
            <ul>
              <li>System Design Discussions</li>
              <li>Java & Spring Boot</li>
              <li>React Interview Questions</li>
              <li>SQL Interview Questions</li>
            </ul>
          </div>

          <div className="col-md-4">
            <ul>
              <li>Salary Negotiation Tips</li>
              <li>Resume Preparation</li>
              <li>Placement Roadmaps</li>
              <li>Interview Tips</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Contributors */}

      <div className="text-center mb-4">

        <h2 className="fw-bold">
          👨‍💻 Top Community Contributors
        </h2>

        <p className="text-muted">
          Professionals who shared their interview experiences on IntBuddy.
        </p>

      </div>

      <div className="row">

        {communityData.map((user) => (

          <div className="col-md-6 col-lg-4 mb-4 d-flex" key={user.id}>

            <div className="card shadow border-0 h-100">

              <img
                src={user.image}
                alt={user.name}
                className="card-img-top"
                style={{
                  height: "320px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body d-flex flex-column">

                <h4>{user.name}</h4>

                <p className="text-primary fw-bold">
                  {user.role}
                </p>

                <p>{user.company}</p>

                <p className="text-muted">
                  {user.experience}
                </p>

                <hr />

                <p>👥 Helped : {user.helped} Candidates</p>

                <p>👍 {user.likes} Likes</p>

                <p>💬 {user.comments} Comments</p>

                <span className="badge bg-warning text-dark">
                  {user.badge}
                </span>

                <button className="btn btn-primary w-100 mt-auto mt-3">
                  Read Full Experience
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CommunityPage;