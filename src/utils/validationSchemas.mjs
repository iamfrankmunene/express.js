export const createUserValidationSchema = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 30
            },
            errorMessage: "Name must be between 3 to 30 characters"
        },
        notEmpty: {
            errorMessage: "Enter a name"
        },
        isString: {
            errorMessage: "Name must be a string"
        }
    },
    displayName: {
        notEmpty: {
            errorMessage : "Enter a display name"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Enter a password"
        }
    }
}
