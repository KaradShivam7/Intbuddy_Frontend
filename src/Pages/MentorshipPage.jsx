function MentorshipPage() {
  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">

        <span className="badge bg-warning text-dark px-3 py-2">
          INTBUDDY MENTORSHIP
        </span>

        <h1 className="display-4 fw-bold mt-3">
          🤝 Become a Mentor. Inspire Careers.
        </h1>

        <p
          className="text-muted fs-5 mx-auto"
          style={{ maxWidth: "750px" }}
        >
          Every interview experience you share helps thousands of students
          prepare smarter, gain confidence and secure better career
          opportunities.
        </p>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="card border-0 shadow text-center p-4">
            <h1>👨‍🎓</h1>
            <h2>18,000+</h2>
            <p>Students Helped</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow text-center p-4">
            <h1>🎯</h1>
            <h2>850+</h2>
            <p>Placements</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow text-center p-4">
            <h1>🏢</h1>
            <h2>180+</h2>
            <p>Companies Covered</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow text-center p-4">
            <h1>⭐</h1>
            <h2>4.9/5</h2>
            <p>Community Rating</p>
          </div>
        </div>

      </div>

      {/* Mentor Benefits */}

      <h2 className="fw-bold mb-4">
        🌟 Why Become a Mentor?
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 p-4 text-center h-100">

            <h1>📘</h1>

            <h4>Share Knowledge</h4>

            <p>
              Help freshers understand real interview processes through
              your own experience.
            </p>

          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 p-4 text-center h-100">

            <h1>🌍</h1>

            <h4>Build Your Network</h4>

            <p>
              Connect with thousands of professionals and increase your
              visibility in the tech community.
            </p>

          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 p-4 text-center h-100">

            <h1>🏆</h1>

            <h4>Gain Recognition</h4>

            <p>
              Earn mentor badges, featured profiles and community
              recognition.
            </p>

          </div>
        </div>

      </div>

      {/* Mentor Journey */}

      <h2 className="fw-bold mt-5 mb-4">
        🚀 Mentor Journey
      </h2>

      <table className="table table-bordered table-hover">

        <thead className="table-warning">

          <tr>

            <th>Step</th>

            <th>Action</th>

            <th>Impact</th>

          </tr>

        </thead>

        <tbody>

          <tr>
            <td>1️⃣</td>
            <td>Share Interview Experience</td>
            <td>Help Freshers Learn</td>
          </tr>

          <tr>
            <td>2️⃣</td>
            <td>Receive Likes & Comments</td>
            <td>Grow Your Reputation</td>
          </tr>

          <tr>
            <td>3️⃣</td>
            <td>Become Top Mentor</td>
            <td>Get Featured on IntBuddy</td>
          </tr>

          <tr>
            <td>4️⃣</td>
            <td>Guide More Candidates</td>
            <td>Create Real Career Impact</td>
          </tr>

        </tbody>

      </table>

      {/* Success */}

      <h2 className="fw-bold mt-5 mb-4">
        💬 Community Impact
      </h2>

      <div className="card shadow border-0 p-4">

        <ul className="fs-5">

          <li>✅ 18,000+ Candidates improved interview confidence.</li>

          <li>✅ 850+ Students got placed using IntBuddy.</li>

          <li>✅ 1,200+ Interview Experiences shared.</li>

          <li>✅ 320+ Active Community Mentors.</li>

          <li>✅ Helping candidates every single day.</li>

        </ul>

      </div>

      {/* CTA */}

      <div className="text-center mt-5">

        <h2 className="fw-bold">
          🚀 Become a Mentor Today
        </h2>

        <p className="text-muted">
          Your experience can change someone's career.
        </p>

        <button className="btn btn-warning btn-lg">
          Share Your Experience
        </button>

      </div>

    </div>
  );
}

export default MentorshipPage;