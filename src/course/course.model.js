import {Schema, model} from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Tecnologia III', 'Taller III', 'Practica Supervisada'],
        unique: true
    },
    description: {
        type: String,
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

courseSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
}
);

const Course = model('Course', courseSchema);

export default Course;


