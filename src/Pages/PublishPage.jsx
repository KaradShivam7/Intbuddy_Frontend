function PublishPage() {
  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2">
          GET PUBLISHED
        </span>

        <h1 className="display-4 fw-bold mt-3">
          ✨ Get Your Interview Experience Published
        </h1>

        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "750px" }}>
          Share your interview journey with the IntBuddy community, inspire
          thousands of candidates, and build your professional presence.
        </p>
      </div>

      {/* Why Publish */}
      <div className="row align-items-center mb-5">

        <div className="col-lg-6">

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
            className="img-fluid rounded shadow"
            alt="Publish Experience"
          />

        </div>

        <div className="col-lg-6">

          <h2 className="fw-bold mb-4">
            Why Publish on IntBuddy?
          </h2>

          <div className="card shadow border-0 p-3 mb-3">
            ✅ Get featured on the IntBuddy platform.
          </div>

          <div className="card shadow border-0 p-3 mb-3">
            ✅ Help thousands of students prepare for interviews.
          </div>

          <div className="card shadow border-0 p-3 mb-3">
            ✅ Build your professional portfolio.
          </div>

          <div className="card shadow border-0 p-3 mb-3">
            ✅ Increase your LinkedIn visibility.
          </div>

          <div className="card shadow border-0 p-3 mb-3">
            ✅ Earn a Verified Contributor badge.
          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>📚</h1>
            <h2>1200+</h2>
            <p>Experiences Published</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>👨‍🎓</h1>
            <h2>18,000+</h2>
            <p>Candidates Helped</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>🎉</h1>
            <h2>850+</h2>
            <p>Candidates Placed</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>🌍</h1>
            <h2>180+</h2>
            <p>Companies Covered</p>
          </div>
        </div>

      </div>

      {/* Benefits Table */}

      <h2 className="fw-bold mb-4">
        📢 What You'll Get
      </h2>

      <table className="table table-hover table-bordered">

        <thead className="table-dark">

          <tr>
            <th>Benefit</th>
            <th>Description</th>
          </tr>

        </thead>

        <tbody>

          <tr>
            <td>🌟 Featured Profile</td>
            <td>Your profile may appear on the IntBuddy Community page.</td>
          </tr>

          <tr>
            <td>🏅 Recognition</td>
            <td>Receive badges based on your contributions.</td>
          </tr>

          <tr>
            <td>📈 Career Branding</td>
            <td>Strengthen your professional profile.</td>
          </tr>

          <tr>
            <td>🤝 Help Others</td>
            <td>Guide freshers with real interview experiences.</td>
          </tr>

          <tr>
            <td>🚀 Inspire Thousands</td>
            <td>Your experience can help many candidates succeed.</td>
          </tr>

        </tbody>

      </table>

      {/* CTA */}

      <div className="text-center mt-5">

        <h2 className="fw-bold">
          Ready to Share Your Story?
        </h2>

        <p className="text-muted">
          Publish your interview experience today and become a trusted member
          of the IntBuddy community.
        </p>

        <button className="btn btn-warning btn-lg">
          Publish Experience
        </button>

      </div>

    </div>
  );
}

export default PublishPage;