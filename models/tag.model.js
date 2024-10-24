module.exports = (sequalize, Sequalize) => {
    const Tags = sequalize.define('tags', {
        // id: {
        //     type: Sequalize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },
        tags: {
            type: Sequalize.STRING,
            primaryKey: true
        }
    })

    return Tags
}