module.exports = (sequalize, Sequalize) => {
    const Template = sequalize.define('templates', {
          title: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: { notAllowedEmpty: { message: 'Please enter title!' } }
          },
          description: {
            type: Sequalize.TEXT,
            allowNull: false,
            validate: { notAllowedEmpty: { message: 'Please enter description!' } }
          },
          imageUrl: {
            type: Sequalize.STRING, // Assuming image URL is a string
            allowNull: true,
            validate: { isUrl: true },
            defaultValue: null
          },
          userId: {
            type: Sequalize.INTEGER,
            allowNull: false,
            references: {
              model: 'users', // Adjust if your Users table name is different
              key: 'id',
            },
            onDelete: 'CASCADE'
          },
          topicId: {
            type: Sequalize.STRING,
            allowNull: true,
            references: {
              model: 'topics', // Adjust if your Topics table name is different
              key: 'id',
            },
          },
    })

    return Template
}