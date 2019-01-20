import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { profileGet, profileDelete } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.profileGet();
  }

  onClickDelete(e) {
    this.props.profileDelete();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        let experienceContent =
          profile.experience.length > 0 ? (
            <Experience experience={profile.experience} />
          ) : null;
        let educationContent =
          profile.education.length > 0 ? (
            <Education education={profile.education} />
          ) : null;
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to="/edit-profile">{user.name}</Link>
            </p>
            <ProfileActions />
            {experienceContent}
            {educationContent}
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={e => this.onClickDelete(e)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  profileGet: PropTypes.func.isRequired,
  profileDelete: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile
});
export default connect(
  mapStateToProps,
  { profileGet, profileDelete }
)(Dashboard);
