import React, { type FC } from "react"
import { type Comment } from "@prisma/client";

type CommentPreviewProps = {
    comment : Comment
}

const CommentPreview : FC<CommentPreviewProps> = ({ comment }) => {
    return(<><div>wow</div></>);
}

export default CommentPreview