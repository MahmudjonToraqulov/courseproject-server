module.exports = (sequalize, Sequalize) => {
    const allTags = sequalize.define('allTags', {
        allTags: {
            type: Sequalize.STRING,
            allowNull: false,
        }
    })

    return allTags
}