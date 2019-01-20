import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { profileCreate, profileGet } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  state = {
    handle: "",
    status: "",
    location: "",
    company: "",
    website: "",
    githubusername: "",
    bio: "",
    skills: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    displaySocialInputs: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) {
      this.setState({ errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      this.setState({
        handle: profile.handle,
        status: profile.status,
        location: profile.location,
        company: profile.company,
        website: profile.website,
        githubusername: profile.githubusername,
        bio: profile.bio,
        skills: skillsCSV,
        facebook: profile.facebook,
        youtube: profile.youtube,
        twitter: profile.twitter,
        instagram: profile.instagram,
        linkedin: profile.linkedin
      });
    }
  }

  componentDidMount() {
    this.props.profileGet();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      location: this.state.location,
      company: this.state.company,
      website: this.state.website,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      skills: this.state.skills,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin
    };
    this.props.profileCreate(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    let socialInputs = null;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            name="twitter"
            placeholder="Twitter Profile URL"
            value={this.state.twitter}
            error={errors.twitter}
            type="text"
            icon="fab fa-twitter"
            onChange={e => this.onChange(e)}
          />
          <InputGroup
            name="facebook"
            placeholder="Facebook Profile URL"
            value={this.state.facebook}
            error={errors.facebook}
            type="text"
            icon="fab fa-facebook"
            onChange={e => this.onChange(e)}
          />
          <InputGroup
            name="linkedin"
            placeholder="Linkedin Profile URL"
            value={this.state.linkedin}
            error={errors.linkedin}
            type="text"
            icon="fab fa-linkedin"
            onChange={e => this.onChange(e)}
          />
          <InputGroup
            name="youtube"
            placeholder="Youtube Profile URL"
            value={this.state.youtube}
            error={errors.youtube}
            type="text"
            icon="fab fa-youtube"
            onChange={e => this.onChange(e)}
          />
          <InputGroup
            name="instagram"
            placeholder="Instagram Profile URL"
            value={this.state.instagram}
            error={errors.instagram}
            type="text"
            icon="fab fa-instagram"
            onChange={e => this.onChange(e)}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Profile handle"
                  value={this.state.handle}
                  error={errors.handle}
                  type="text"
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                  onChange={e => this.onChange(e)}
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  error={errors.company}
                  type="text"
                  info="Could be your own company or one you work for"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  error={errors.website}
                  type="text"
                  info="Could be your own or a company website"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  error={errors.location}
                  type="text"
                  info="City & state suggested (eg. Boston, MA)"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  error={errors.skills}
                  type="text"
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder="GitHub Username"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  type="text"
                  info="If you want your latest repos and a Github link, include your username"
                  onChange={e => this.onChange(e)}
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  value={this.state.bio}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                  onChange={e => this.onChange(e)}
                />
                <div className="mb-3">
                  <button
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                    type="button"
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profileCreate: PropTypes.func.isRequired,
  profileGet: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

export default connect(
  mapStateToProps,
  { profileCreate, profileGet }
)(withRouter(EditProfile));
