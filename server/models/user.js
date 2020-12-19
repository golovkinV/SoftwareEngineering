
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        country: String,
        about: String,
        pin: String,
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
        }
    }, { timestamps: true })

    userSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("User", userSchema);
};