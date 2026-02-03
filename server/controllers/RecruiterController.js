exports.createJob = (req, res) => {
  const { title, company, location, salary, jobType, minExperience, skills, description, isActive } = req.body;

      console.log(title,company,location,salary,jobType,minExperience,skills,description,isActive)


}