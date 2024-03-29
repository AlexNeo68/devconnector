import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileCard from "./ProfileCard";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    let profilesList;
    const { profiles, loading } = this.props.profile;

    if (profiles === null || loading) {
      profilesList = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profilesList = profiles.map(profile => (
          <ProfileCard key={profile._id} profile={profile} />
        ));
      } else {
        profilesList = <h4>Profiles not found</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profilesList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
