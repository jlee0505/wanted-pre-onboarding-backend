const { Company, Job, sequelize } = require('./models');

const seed = async () => {
  try {
    await sequelize.sync();

    const company = await Company.create({
      name: 'Example Corp',
      country: 'USA',
      location: 'New York',
    });

    await Job.create({
      companyId: company.id,
      position: 'Software Engineer',
      reward: 120000,
      description: 'Looking for a skilled software engineer.',
      skills: 'JavaScript, Node.js',
    });

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seed();
