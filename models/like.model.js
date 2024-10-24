module.exports = (sequalize, Sequalize) => {
    const Like = sequalize.define('like', {
        id: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    })

    return Like
}