module.exports = (sequalize, Sequalize) => {
    const Topic = sequalize.define('topic' , {
        id: {
            type: Sequalize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequalize.STRING,
            allowNull: false
        }
    })

    return Topic
}