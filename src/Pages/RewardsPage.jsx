function RewardsPage() {
  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2">
          INTBUDDY REWARDS
        </span>

        <h1 className="display-4 fw-bold mt-3">
          🏆 Earn Rewards & Recognition
        </h1>

        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "750px" }}>
          Share your interview experiences, help thousands of job seekers,
          unlock exclusive badges, certificates, recognition and exciting
          community rewards.
        </p>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>🎁</h1>
            <h2>500+</h2>
            <p>Rewards Distributed</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>🏅</h1>
            <h2>1200+</h2>
            <p>Badges Earned</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>👥</h1>
            <h2>320</h2>
            <p>Top Contributors</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h1>⭐</h1>
            <h2>4.9/5</h2>
            <p>Community Rating</p>
          </div>
        </div>

      </div>

      {/* Reward Levels */}
      <h2 className="fw-bold mb-4">🎯 Reward Levels</h2>

      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Badge</th>
            <th>Requirement</th>
            <th>Reward</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>🥉 Bronze</td>
            <td>Share 1 Interview Experience</td>
            <td>Bronze Badge</td>
          </tr>

          <tr>
            <td>🥈 Silver</td>
            <td>Share 5 Experiences</td>
            <td>Certificate</td>
          </tr>

          <tr>
            <td>🥇 Gold</td>
            <td>Share 10 Experiences</td>
            <td>Featured Profile</td>
          </tr>

          <tr>
            <td>👑 Platinum</td>
            <td>Help 500 Candidates</td>
            <td>Premium Mentor</td>
          </tr>

          <tr>
            <td>🏆 Champion</td>
            <td>Top Contributor</td>
            <td>Hall of Fame</td>
          </tr>
        </tbody>
      </table>

      {/* Achievements */}
      <h2 className="fw-bold mt-5 mb-4">🎖 Achievements</h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h1>🏅</h1>
            <h4>First Contribution</h4>
            <p>Share your first interview experience.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h1>🔥</h1>
            <h4>Popular Contributor</h4>
            <p>Receive 100+ Likes from users.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h1>🎯</h1>
            <h4>Placement Hero</h4>
            <p>Help 100+ students crack interviews.</p>
          </div>
        </div>

      </div>

      {/* Leaderboard */}
      <h2 className="fw-bold mt-5">🏆 Leaderboard</h2>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
            <th>Badge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>🥇</td>
            <td>Chaitanya Chelkar</td>
            <td>2500</td>
            <td>Champion</td>
          </tr>

          <tr>
            <td>🥈</td>
            <td>Mahesh Gavale</td>
            <td>2100</td>
            <td>Top Mentor</td>
          </tr>

          <tr>
            <td>🥉</td>
            <td>Amar Bhise</td>
            <td>1800</td>
            <td>Verified Contributor</td>
          </tr>
        </tbody>
      </table>

      {/* CTA */}
      <div className="text-center mt-5">
        <h2 className="fw-bold">🚀 Become a Contributor Today</h2>

        <p className="text-muted">
          Share your interview experience, inspire future professionals,
          earn recognition and unlock exciting rewards.
        </p>

        <button className="btn btn-warning btn-lg">
          Share Your Experience
        </button>
      </div>

    </div>
  );
}

export default RewardsPage;