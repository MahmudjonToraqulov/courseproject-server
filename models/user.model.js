module.exports = (sequalize, Sequalize) => {
    const User = sequalize.define('users', {
        username: {
            type: Sequalize.STRING,
            allowNull: false
        },
        email: {
            type: Sequalize.STRING,
            allowNull: false
        },
        password: {
            type: Sequalize.STRING,
            allowNull: false
        },
        // roleId: {
        //     type: Sequalize.INTEGER,
        //     references: {
        //         model: 'user_roles',
        //         key: 'id'
        //     },
        //     allowNull: false,
        //     onDelete: 'CASCADE'
        // },
        isBlocked: {
            type: Sequalize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return User
}