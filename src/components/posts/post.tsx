import React, { useState } from "react";
import PostLike from "./postLike";
import CommentPreview from "./commentPreview";

const Post : React.FC = (props : ) => { 
    return (
        <div>
    <PostLike />
    <CommentPreview />
    </div>)
}

export default Post;