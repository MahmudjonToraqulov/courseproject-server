

module.exports = (sequalize, Sequalize) => {
    const Role = sequalize.define('roles', {
        id: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequalize.STRING
        }
    })

    return Role
}