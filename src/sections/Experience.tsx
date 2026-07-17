import { workExperiences } from "../constants";

export const Experience = () => {
  return (
    <section className="c-space my-20" id="experience">
      <div className="w-full text-white-600">
        <h3 className="head-text">Experience</h3>

        <div className="work-container">
          <div className="work-content">
            <div className="experience-list">
              {workExperiences.map((experience) => (
                <article className="experience-item" key={experience.id}>
                  <div className="experience-company">
                    <img
                      src={experience.icon}
                      alt={`${experience.name} logo`}
                    />
                    <div>
                      <h4>{experience.name}</h4>
                      <p>{experience.employment}</p>
                    </div>
                  </div>

                  {experience.roles ? (
                    <div className="role-timeline">
                      {experience.roles.map((role) => (
                        <div className="role-item" key={role.position}>
                          <span aria-hidden="true" />
                          <div>
                            <h5>{role.position}</h5>
                            <p>{role.duration}</p>
                            <p>{role.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="experience-details">
                      <h5>{experience.position}</h5>
                      <p>{experience.duration}</p>
                      <p>{experience.location}</p>
                      <p className="experience-description">
                        {experience.description}
                      </p>
                      <div className="experience-skills">
                        {experience.skills?.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
