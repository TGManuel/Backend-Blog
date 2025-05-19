import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';


const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/dqj8xgk4h/image/upload/v1698231230/curso-frontend/curso-frontend.png'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        autopopulate: { select: 'name' }
    },
    status: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
});

postSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
}
);

postSchema.plugin(autopopulate);


const Post = model('Post', postSchema);

export default Post;



